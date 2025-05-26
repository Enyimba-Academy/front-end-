import { Maximize, Pause, Play, Settings } from "lucide-react";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { ImageUrl } from "@/api/api";

const formatTime = (timeInSeconds) => {
  if (!timeInSeconds) return "--:--";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const VideoPlayer = ({ contentId, videoUrl, poster }) => {
  const {
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
  } = useVideoPlayer(contentId);

  return (
    <div className="relative w-full">
      <div ref={videoContainerRef} className="relative bg-black aspect-video">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={
              videoUrl.startsWith("/uploads")
                ? `${ImageUrl}${videoUrl}`
                : videoUrl
            }
            className="w-full h-full object-cover"
            poster={poster}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <img
            src={poster}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause size={24} className="text-white sm:size-8 md:size-10" />
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
              <button onClick={() => setShowSettings(!showSettings)}>
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
};
