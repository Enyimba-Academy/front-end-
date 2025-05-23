import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  Lightbulb,
  Maximize,
  Pause,
  Play,
  Settings,
  BookOpen,
  FileText,
  HelpCircle,
  X as XIcon,
} from "lucide-react";
import { useGetEnrollmentById } from "@/hooks/useEnrollment.hook";
import { useParams, useNavigate } from "react-router-dom";
import { ImageUrl } from "@/api/api";

export default function VideoLessonPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetEnrollmentById(id);
  const enrollment = data;

  // Destructure course data if available
  const course = enrollment?.course || {};
  const sections = course?.sections || [];
  const courseTitle = course?.title || "Course";
  const courseImage =
    course?.image ||
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=400&width=600";

  // State for expanded sections and active content
  const [expandedSections, setExpandedSections] = useState({});
  const [activeContent, setActiveContent] = useState(null);
  const [noteText, setNoteText] = useState("");

  // Video player state
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  // New quiz state variables
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

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
    }
  }, [sections]);

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Handle content selection
  const handleContentSelect = (content) => {
    setActiveContent(content);
    // Reset video player state when changing content
    setIsPlaying(false);
    setCurrentTime(0);
    setProgress(0);
  };

  // Update video progress
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const videoDuration = videoRef.current.duration;

      setCurrentTime(current);
      setDuration(videoDuration);
      setProgress((current / videoDuration) * 100);
    }
  };

  // Handle video loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
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

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Get current content info
  const currentVideoUrl = activeContent?.video?.[0]?.url || "";
  const currentVideoDescription = activeContent?.video?.[0]?.description || "";
  const contentType = activeContent?.type || "";
  const currentQuiz = activeContent?.quiz?.[0];
  const currentQuizQuestions = currentQuiz?.questions || [];
  const currentAssignment = activeContent?.assignment?.[0];

  // Helper function to get content type icon
  const getContentTypeIcon = (type) => {
    switch (type) {
      case "VIDEO":
        return <Play size={14} className="mr-2" />;
      case "QUIZ":
        return <HelpCircle size={14} className="mr-2" />;
      case "ASSIGNMENT":
        return <FileText size={14} className="mr-2" />;
      case "MATERIAL":
        return <BookOpen size={14} className="mr-2" />;
      default:
        return (
          <div className="w-3.5 h-3.5 rounded-full border border-gray-300 mr-2"></div>
        );
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(`/courses/${course.id}`);
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

  // Render content based on type
  const renderContent = () => {
    switch (contentType) {
      case "VIDEO":
        return (
          <div className="relative w-full">
            <div className="relative bg-black aspect-video">
              {currentVideoUrl ? (
                <video
                  ref={videoRef}
                  src={`${ImageUrl}${currentVideoUrl}`}
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
                <div className="flex-1 mx-2 h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button>
                    <Settings size={14} className="sm:size-4" />
                  </button>
                  <button>
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
                <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
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
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="mr-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-sm md:text-base font-medium text-gray-900 truncate">
            {courseTitle}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-red-600 text-sm font-medium">
            <Download size={16} className="mr-1" />
            <span className="hidden sm:inline">Resources</span>
          </button>
          <button className="flex items-center text-gray-600 text-sm font-medium">
            <span className="hidden sm:inline">Help</span>
          </button>
          <div className="relative">
            <button className="flex items-center text-gray-600 text-sm font-medium">
              <Edit size={16} className="mr-1" />
              <span className="hidden sm:inline">Notes</span>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-white text-xs flex items-center justify-center">
                2
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left Sidebar - Course Navigation */}
        <div className="hidden lg:block w-64 border-r border-gray-200 overflow-y-auto bg-white">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search lessons..."
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <svg
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Course Sections (Modules) */}
          {sections.map((section, sectionIndex) => (
            <div key={section.id} className="border-t border-gray-200">
              <button
                onClick={() => toggleSection(section.id)}
                className={`flex items-center justify-between w-full px-4 py-3 text-left ${
                  activeContent &&
                  section.contents.some(
                    (content) => content.id === activeContent.id
                  )
                    ? "bg-red-50"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full ${
                      sectionIndex === 0
                        ? "bg-green-500"
                        : activeContent &&
                          section.contents.some(
                            (content) => content.id === activeContent.id
                          )
                        ? "bg-red-500"
                        : "bg-gray-300"
                    } flex items-center justify-center mr-2`}
                  >
                    {sectionIndex === 0 ? (
                      <span className="text-white text-xs font-bold">
                        {sectionIndex + 1}
                      </span>
                    ) : (
                      <span className="text-white text-xs font-bold">
                        {sectionIndex + 1}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      activeContent &&
                      section.contents.some((c) => c.id === activeContent.id)
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {section.title}
                  </span>
                </div>
                {expandedSections[section.id] ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {/* Section Contents */}
              {expandedSections[section.id] && (
                <div className="pl-11 pr-4 pb-2">
                  <ul className="space-y-2">
                    {section.contents.map((content) => (
                      <li
                        key={content.id}
                        onClick={() => handleContentSelect(content)}
                        className={`flex items-center text-sm cursor-pointer ${
                          activeContent && activeContent.id === content.id
                            ? "text-red-600 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {activeContent && activeContent.id === content.id
                          ? getContentTypeIcon(content.type)
                          : getContentTypeIcon(content.type)}
                        <span>{content.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Fallback if no sections */}
          {sections.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No content available
            </div>
          )}
        </div>

        {/* Center - Content Display */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Dynamic Content based on Type */}
          {renderContent()}

          {/* Lesson Content Info */}
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              {activeContent?.title || "Select a lesson to begin"}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8">
              {contentType === "VIDEO"
                ? currentVideoDescription
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
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-auto justify-center">
                <CheckCircle size={16} className="mr-1" />
                <span>Mark Complete</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900 w-full sm:w-auto justify-center">
                <span>Next Lesson</span>
                <ArrowLeft size={16} className="ml-1 transform rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Notes and Resources */}
        <div className="hidden xl:block w-72 border-l border-gray-200 overflow-y-auto bg-gray-50">
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Lesson Notes</h3>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Take notes..."
              className="w-full h-40 p-3 border border-gray-300 rounded-md text-sm resize-none"
            ></textarea>
            <button className="mt-2 flex items-center text-red-600 text-sm font-medium">
              <Download size={14} className="mr-1" />
              <span>Export Notes</span>
            </button>
          </div>

          <div className="border-t border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <Download size={14} className="mr-2" />
                  <span>Course Materials</span>
                </a>
              </li>
              {activeContent?.material?.map((material) => (
                <li key={material.id}>
                  <a
                    href={material.url}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={14} className="mr-2" />
                    <span>{material.title || "Download Material"}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-3">Pro Tips</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-md">
              <div className="flex">
                <Lightbulb
                  size={16}
                  className="text-yellow-500 mr-2 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-gray-700">
                  Click on different lessons in the sidebar to switch between
                  course content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons needed for UI
const ClockIcon = ({ className }) => (
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
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CalendarIcon = ({ className }) => (
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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

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
