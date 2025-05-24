import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Maximize,
  Pause,
  Play,
  Settings,
  FileText,
  HelpCircle,
  X as XIcon,
  Loader,
  Clock as ClockIcon,
} from "lucide-react";
import { useGetEnrollmentMaterials } from "@/hooks/useEnrollment.hook";
import {
  useMarkLessonCompleted,
  useUpdateWatchTime,
} from "@/hooks/useLessonProgress";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { ImageUrl } from "@/api/api";

export default function VideoLessonPage() {
  const { handleNext, isLast } = useOutletContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const { contentId, typeID, lessonId } = useParams();
  const { data, isLoading } = useGetEnrollmentMaterials(
    contentId,
    typeID,
    lessonId
  );
  const navigate = useNavigate();
  const enrollment = data;
  console.log(data);

  // Add hooks for lesson progress
  const markLessonCompleted = useMarkLessonCompleted();
  const updateWatchTime = useUpdateWatchTime();
  const [watchTimeUpdateInterval, setWatchTimeUpdateInterval] = useState(null);

  // Destructure course data if available
  const course = enrollment?.course || {};
  const sections = course?.sections || [];

  const courseImage =
    course?.image ||
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=400&width=600";

  // State for expanded sections and active content
  const [, setExpandedSections] = useState({});
  const [activeContent, setActiveContent] = useState(null);
  const [isContentLoading, setIsContentLoading] = useState(true);

  // Video player state
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [savedProgress, setSavedProgress] = useState(0);

  // New quiz state variables
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Content type based on typeID from params
  const contentTypeFromParams = typeID?.toUpperCase() || "";

  // Get current content info
  const currentVideoUrl = activeContent?.video?.[0]?.url || "";
  const currentVideoDescription = activeContent?.video?.[0]?.description || "";
  const contentType = activeContent?.type || contentTypeFromParams || "";
  const currentQuiz = activeContent?.quiz?.[0];
  const currentQuizQuestions = currentQuiz?.questions || [];
  const currentAssignment = activeContent?.assignment?.[0];

  // Toggle play/pause (define as useCallback to avoid dependency loops)
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, videoRef]);

  // Keyboard event handler for spacebar control
  useEffect(() => {
    // Only add keyboard listener if we have an active video
    if (contentType === "VIDEO" && currentVideoUrl) {
      const handleKeyDown = (e) => {
        // Check if it's the spacebar and not in an input/textarea element
        if (
          e.code === "Space" &&
          !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
        ) {
          e.preventDefault(); // Prevent scrolling on spacebar
          togglePlay();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      // Clean up event listener
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [contentType, currentVideoUrl, togglePlay]);

  // Initialize expanded sections and set first content as active on data load
  useEffect(() => {
    if (sections.length > 0) {
      // Initialize all sections as expanded by default
      const initialExpandedState = sections.reduce((acc, section, index) => {
        acc[section.id] = index === 0; // Only expand first section by default
        return acc;
      }, {});

      setExpandedSections(initialExpandedState);

      // Set first content as active if it exists
      if (sections[0]?.contents?.length > 0) {
        setActiveContent(sections[0].contents[0]);
      }
      setIsContentLoading(false);
    }
  }, [sections]);

  // If we have a direct content object from the API, use it
  useEffect(() => {
    if (data && !Array.isArray(data) && data.url) {
      // Create a video content structure similar to what the component expects
      setActiveContent({
        id: data.id || lessonId,
        title: data.title || "Video Lesson",
        type: contentTypeFromParams || "VIDEO",
        video: [
          {
            url: data.url,
            description: data.description || "",
            duration: data.duration,
          },
        ],
      });
      setIsContentLoading(false);
    } else if (data && typeID?.toUpperCase() === "QUIZ") {
      // Create a quiz content structure
      setActiveContent({
        id: data.id || lessonId,
        title: data.title || "Quiz",
        type: "QUIZ",
        quiz: [
          {
            id: data.id || "quiz-1",
            instructions:
              data.description || "Complete this quiz to test your knowledge.",
            questions: data.questions || [],
          },
        ],
      });
      setIsContentLoading(false);
    }
  }, [data, lessonId, contentTypeFromParams, typeID]);

  // Restore video playback time from localStorage when the video loads
  useEffect(() => {
    if (videoRef.current && activeContent?.id && contentType === "VIDEO") {
      const savedTime = localStorage.getItem(
        `video-progress-${activeContent.id}`
      );
      if (savedTime) {
        const parsedTime = parseFloat(savedTime);
        if (!isNaN(parsedTime) && parsedTime > 0) {
          videoRef.current.currentTime = parsedTime;
          setCurrentTime(parsedTime);

          // Calculate saved progress percentage for marker
          if (videoRef.current.duration) {
            setSavedProgress((parsedTime / videoRef.current.duration) * 100);
          } else {
            // If duration isn't loaded yet, set a callback
            const handleDurationChange = () => {
              setSavedProgress((parsedTime / videoRef.current.duration) * 100);
              videoRef.current.removeEventListener(
                "durationchange",
                handleDurationChange
              );
            };
            videoRef.current.addEventListener(
              "durationchange",
              handleDurationChange
            );
          }
        }
      }
    }
  }, [activeContent, contentType]);

  // Save video position to localStorage periodically
  useEffect(() => {
    if (contentType === "VIDEO" && activeContent?.id) {
      const saveInterval = setInterval(() => {
        if (videoRef.current && !videoRef.current.paused) {
          localStorage.setItem(
            `video-progress-${activeContent.id}`,
            videoRef.current.currentTime.toString()
          );
        }
      }, 5000); // Save every 5 seconds

      return () => clearInterval(saveInterval);
    }
  }, [contentType, activeContent?.id]);

  // Save video position when the user leaves or pauses
  useEffect(() => {
    const saveVideoPosition = () => {
      if (videoRef.current && activeContent?.id && contentType === "VIDEO") {
        localStorage.setItem(
          `video-progress-${activeContent.id}`,
          videoRef.current.currentTime.toString()
        );
      }
    };

    // Save on page unload
    window.addEventListener("beforeunload", saveVideoPosition);

    // Save when video is paused
    if (videoRef.current) {
      videoRef.current.addEventListener("pause", saveVideoPosition);
    }

    return () => {
      window.removeEventListener("beforeunload", saveVideoPosition);
      if (videoRef.current) {
        videoRef.current.removeEventListener("pause", saveVideoPosition);
      }
    };
  }, [activeContent?.id, contentType]);

  // Update loading state when API call completes
  useEffect(() => {
    if (!isLoading && data) {
      setIsContentLoading(false);
    }
  }, [isLoading, data]);

  // Update video timeUpdate handler to track progress
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const videoDuration = videoRef.current.duration;

      setCurrentTime(current);
      setDuration(videoDuration);
      setProgress((current / videoDuration) * 100);
    }
  };

  // Set up interval to periodically update watch time in the backend
  useEffect(() => {
    if (
      isPlaying &&
      activeContent &&
      activeContent.type === "VIDEO" &&
      enrollment
    ) {
      // Set up an interval to update the watch time every 10 seconds
      const interval = setInterval(() => {
        if (videoRef.current && activeContent.id) {
          updateWatchTime.mutate({
            enrollmentId: enrollment.id,
            lessonId: activeContent.id,
            watchedSeconds: Math.floor(videoRef.current.currentTime),
          });
        }
      }, 10000); // Update every 10 seconds

      setWatchTimeUpdateInterval(interval);

      // Clean up the interval on unmount or when video stops playing
      return () => {
        clearInterval(interval);
      };
    } else if (watchTimeUpdateInterval) {
      // Clear interval if video is paused
      clearInterval(watchTimeUpdateInterval);
      setWatchTimeUpdateInterval(null);
    }
  }, [
    isPlaying,
    activeContent,
    enrollment,
    watchTimeUpdateInterval,
    updateWatchTime,
  ]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (watchTimeUpdateInterval) {
        clearInterval(watchTimeUpdateInterval);
      }
    };
  }, [watchTimeUpdateInterval]);

  // Handle marking lesson as complete
  const handleMarkComplete = () => {
    if (activeContent && enrollment) {
      markLessonCompleted.mutate({
        enrollmentId: enrollment.id,
        lessonId: activeContent.id,
      });
    }
  };

  // Handle video loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      setDuration(videoDuration);

      // Update saved progress marker position based on duration
      const storedTimeValue = localStorage.getItem(
        `video-progress-${activeContent?.id}`
      );
      if (storedTimeValue) {
        const parsedStoredTime = parseFloat(storedTimeValue);
        if (!isNaN(parsedStoredTime) && parsedStoredTime > 0) {
          setSavedProgress((parsedStoredTime / videoDuration) * 100);
        }
      }
    }
  };

  // Format time for display (mm:ss)
  const formatTime = (timeInSeconds) => {
    if (!timeInSeconds) return "--:--";

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle progress bar click for seeking
  const handleProgressBarClick = (e) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const percentClicked = (clickPosition / rect.width) * 100;
      const seekTime = (videoRef.current.duration * percentClicked) / 100;

      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
      setProgress(percentClicked);
    }
  };

  // Start quiz handler
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setQuizScore(0);
  };

  // Handle quiz answer selection
  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    });
  };

  // Submit quiz
  const handleSubmitQuiz = () => {
    // Calculate score - in a real app, you would check against correct answers
    // For demo, we're just setting a fixed score
    const totalQuestions = currentQuiz?.questions?.length || 0;
    const answeredQuestions = Object.keys(selectedAnswers).length;
    const score = Math.round((answeredQuestions / totalQuestions) * 100);

    setQuizScore(score);
    setQuizCompleted(true);
  };

  // Reset quiz
  const handleResetQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
  };

  // Navigate to next/previous question
  const goToNextQuestion = () => {
    if (
      currentQuiz?.questions &&
      currentQuestionIndex < currentQuiz.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Toggle settings dropdown
  const toggleSettings = (e) => {
    e.stopPropagation();
    setShowSettings(!showSettings);
  };

  // Handle playback rate change
  const handlePlaybackRateChange = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSettings(false);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(`Error exiting fullscreen: ${err.message}`);
      });
    } else {
      videoContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    }
  };

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSettings && !event.target.closest(".settings-menu")) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings]);

  // Loading state component
  const renderLoading = () => (
    <div className="flex-1 flex items-center justify-center p-10">
      <div className="text-center">
        <Loader size={48} className="animate-spin text-red-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading content...</p>
      </div>
    </div>
  );

  // Render content based on type
  const renderContent = () => {
    // Show loading state if content is loading
    if (isLoading || isContentLoading) {
      return renderLoading();
    }

    switch (contentType) {
      case "VIDEO":
        return (
          <div className="relative w-full">
            <div
              ref={videoContainerRef}
              className="relative bg-black aspect-video"
            >
              {currentVideoUrl ? (
                <video
                  ref={videoRef}
                  src={
                    currentVideoUrl.startsWith("/uploads")
                      ? `${ImageUrl}${currentVideoUrl}`
                      : currentVideoUrl
                  }
                  className="w-full h-full object-cover"
                  poster={courseImage}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              ) : (
                <img
                  src={courseImage}
                  alt="Course thumbnail"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause
                      size={24}
                      className="text-white sm:size-8 md:size-10"
                    />
                  ) : (
                    <Play
                      size={24}
                      className="text-white ml-1 sm:size-8 md:size-10"
                    />
                  )}
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex items-center">
                <button onClick={togglePlay} className="mr-2">
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <span className="text-xs sm:text-sm mr-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <div
                  className="flex-1 mx-2 h-1 bg-gray-600 rounded-full overflow-hidden relative cursor-pointer"
                  onClick={handleProgressBarClick}
                >
                  <div
                    className="h-full bg-red-600 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                  {savedProgress > 0 &&
                    savedProgress < 100 &&
                    progress < savedProgress && (
                      <div
                        className="absolute top-0 h-full w-1 bg-yellow-400"
                        style={{ left: `${savedProgress}%` }}
                        title="Resume from here"
                      ></div>
                    )}
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="relative settings-menu">
                    <button onClick={toggleSettings}>
                      <Settings size={14} className="sm:size-4" />
                    </button>
                    {showSettings && (
                      <div className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-90 rounded-md p-2 min-w-32 text-sm">
                        <div className="mb-2 pb-1 border-b border-gray-700">
                          <p className="text-gray-300 mb-1">Playback Speed</p>
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => handlePlaybackRateChange(rate)}
                              className={`block w-full text-left px-2 py-1 rounded ${
                                playbackRate === rate
                                  ? "bg-red-700"
                                  : "hover:bg-gray-700"
                              }`}
                            >
                              {rate === 1 ? "Normal" : `${rate}x`}
                            </button>
                          ))}
                        </div>
                        <div>
                          <p className="text-gray-300 mb-1">Quality</p>
                          <button className="block w-full text-left px-2 py-1 rounded bg-red-700">
                            Auto
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <button onClick={toggleFullscreen}>
                    <Maximize size={14} className="sm:size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "QUIZ": {
        // Use the actual quiz data structure
        const quizData = {
          id: currentQuiz?.id || "quiz-1",
          instructions:
            currentQuiz?.instructions ||
            "Complete this quiz to test your knowledge.",
          timeLimit: currentQuiz?.timeLimit || null,
          passingScore: currentQuiz?.passingScore || 70,
          questions: currentQuizQuestions,
        };

        if (quizCompleted) {
          // Show quiz results
          return (
            <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div
                  className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    quizScore >= (quizData.passingScore || 70)
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {quizScore >= (quizData.passingScore || 70) ? (
                    <CheckCircle size={48} className="text-green-600" />
                  ) : (
                    <XIcon size={48} className="text-red-600" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {quizScore >= (quizData.passingScore || 70)
                    ? "Quiz Passed!"
                    : "Quiz Failed"}
                </h3>
                <p className="text-gray-600 mb-4">Your score: {quizScore}%</p>
                <div className="w-full max-w-xs mx-auto bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      quizScore >= (quizData.passingScore || 70)
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                    style={{ width: `${quizScore}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Passing score: {quizData.passingScore || 70}%
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
                >
                  Review Quiz
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Continue to Next Lesson
                </button>
              </div>
            </div>
          );
        } else if (quizStarted && quizData.questions.length > 0) {
          // Show active quiz with questions
          const currentQuestion = quizData.questions[currentQuestionIndex];
          return (
            <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 p-6">
              {/* Quiz header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">
                  Question {currentQuestionIndex + 1} of{" "}
                  {quizData.questions.length}
                </h3>
                {quizData.timeLimit && (
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span>Time remaining: {quizData.timeLimit} min</span>
                  </div>
                )}
              </div>

              {/* Question */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-700 mb-4">
                  {currentQuestion.text}
                </h4>
                <div className="space-y-3">
                  {currentQuestion.options &&
                    currentQuestion.options.map((option) => (
                      <div
                        key={option.id}
                        onClick={() =>
                          handleAnswerSelect(currentQuestion.id, option.id)
                        }
                        className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${
                          selectedAnswers[currentQuestion.id] === option.id
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                              selectedAnswers[currentQuestion.id] === option.id
                                ? "bg-red-600 border-transparent"
                                : "border border-gray-400"
                            }`}
                          >
                            {selectedAnswers[currentQuestion.id] ===
                              option.id && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span>{option.text}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <div>
                  {currentQuestionIndex > 0 && (
                    <button
                      onClick={goToPrevQuestion}
                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                </div>
                <div>
                  {currentQuestionIndex < quizData.questions.length - 1 ? (
                    <button
                      onClick={goToNextQuestion}
                      className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-8">
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Progress</span>
                  <span>
                    {Math.round(
                      ((currentQuestionIndex + 1) / quizData.questions.length) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) /
                          quizData.questions.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        } else if (quizStarted && quizData.questions.length === 0) {
          // No questions case
          return (
            <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <HelpCircle size={32} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No Questions Available
              </h3>
              <p className="text-gray-500 mb-6">
                This quiz doesn't have any questions yet.
              </p>
              <button
                onClick={handleResetQuiz}
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Return to Quiz Info
              </button>
            </div>
          );
        } else {
          // Show quiz intro
          return (
            <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <HelpCircle size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Quiz</h3>
              </div>

              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Instructions
                </h4>
                <p className="text-gray-600">{quizData.instructions}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      Time Limit:{" "}
                      {quizData.timeLimit
                        ? `${quizData.timeLimit} minutes`
                        : "No time limit"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      Passing Score:{" "}
                      {quizData.passingScore
                        ? `${quizData.passingScore}%`
                        : "70%"}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <span>Number of questions: {quizData.questions.length}</span>
                </div>
              </div>

              <button
                onClick={handleStartQuiz}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Start Quiz
              </button>
            </div>
          );
        }
      }

      case "ASSIGNMENT":
        return (
          <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FileText size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Assignment
              </h3>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                Instructions
              </h4>
              <p className="text-gray-600">
                {currentAssignment?.instructions ||
                  "Complete this assignment to apply what you've learned."}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <ClockIcon className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Due Date: {currentAssignment?.dueDate || "No due date"}
                </span>
              </div>
              <div className="flex items-center">
                <UploadIcon className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Submission Type: File upload
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors">
                Submit Assignment
              </button>
              <button className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                Download Instructions
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full bg-gray-50 rounded-md p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <HelpCircle size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Content Unavailable
            </h3>
            <p className="text-gray-500">
              Please select a valid lesson from the menu
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Dynamic Content based on Type */}
      {renderContent()}

      {/* Lesson Content Info */}
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
          {activeContent?.title || data?.title || "Select a lesson to begin"}
        </h2>
        <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8">
          {contentType === "VIDEO"
            ? currentVideoDescription || data?.description
            : contentType === "QUIZ"
            ? currentQuiz?.instructions
            : contentType === "ASSIGNMENT"
            ? currentAssignment?.instructions
            : "Please select a lesson from the menu to start learning."}
        </p>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mt-6 sm:mt-8">
          <button className="flex items-center text-gray-600 hover:text-gray-900 w-full sm:w-auto justify-center">
            <ArrowLeft size={16} className="mr-1" />
            <span>Previous Lesson</span>
          </button>
          <button
            onClick={handleMarkComplete}
            disabled={markLessonCompleted.isPending}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-auto justify-center disabled:bg-red-400"
          >
            {markLessonCompleted.isPending ? (
              <span>Updating...</span>
            ) : (
              <>
                <CheckCircle size={16} className="mr-1" />
                <span>Mark Complete</span>
              </>
            )}
          </button>
          {!isLast && (
            <button
              className="flex items-center text-gray-600 hover:text-gray-900 w-full sm:w-auto justify-center"
              onClick={() => handleNext(navigate)}
            >
              <span>Next Lesson</span>
              <ArrowLeft size={16} className="ml-1 transform rotate-180" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const UploadIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);
