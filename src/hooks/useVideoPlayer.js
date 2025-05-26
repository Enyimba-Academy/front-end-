import { useState, useRef, useCallback, useEffect } from "react";

export const useVideoPlayer = (contentId) => {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [savedProgress, setSavedProgress] = useState(0);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const videoDuration = videoRef.current.duration;

      setCurrentTime(current);
      setDuration(videoDuration);
      setProgress((current / videoDuration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      setDuration(videoDuration);

      const storedTimeValue = localStorage.getItem(
        `video-progress-${contentId}`
      );
      if (storedTimeValue) {
        const parsedStoredTime = parseFloat(storedTimeValue);
        if (!isNaN(parsedStoredTime) && parsedStoredTime > 0) {
          setSavedProgress((parsedStoredTime / videoDuration) * 100);
        }
      }
    }
  };

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

  const handlePlaybackRateChange = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSettings(false);
    }
  };

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

  useEffect(() => {
    if (videoRef.current && contentId) {
      const savedTime = localStorage.getItem(`video-progress-${contentId}`);
      if (savedTime) {
        const parsedTime = parseFloat(savedTime);
        if (!isNaN(parsedTime) && parsedTime > 0) {
          videoRef.current.currentTime = parsedTime;
          setCurrentTime(parsedTime);

          if (videoRef.current.duration) {
            setSavedProgress((parsedTime / videoRef.current.duration) * 100);
          } else {
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
  }, [contentId]);

  useEffect(() => {
    const saveVideoPosition = () => {
      if (videoRef.current && contentId) {
        localStorage.setItem(
          `video-progress-${contentId}`,
          videoRef.current.currentTime.toString()
        );
      }
    };

    window.addEventListener("beforeunload", saveVideoPosition);
    if (videoRef.current) {
      videoRef.current.addEventListener("pause", saveVideoPosition);
    }

    return () => {
      window.removeEventListener("beforeunload", saveVideoPosition);
      if (videoRef.current) {
        videoRef.current.removeEventListener("pause", saveVideoPosition);
      }
    };
  }, [contentId]);

  return {
    videoRef,
    videoContainerRef,
    isPlaying,
    setIsPlaying,
    currentTime,
    duration,
    progress,
    showSettings,
    playbackRate,
    savedProgress,
    togglePlay,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleProgressBarClick,
    handlePlaybackRateChange,
    toggleFullscreen,
    setShowSettings,
  };
};
