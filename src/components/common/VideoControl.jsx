import React from 'react'

export default function VideoControl() {
  return (
    <div className="bg-gradient-to-t from-black/95 to-transparent absolute bottom-0 left-0 right-0 p-4">
      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={lecture.durationSeconds || 2700}
          value={currentTime}
          onChange={(e) => setCurrentTime(parseInt(e.target.value))}
          className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-600"
          style={{
            background: `linear-gradient(to right, rgb(245 158 11) 0%, rgb(245 158 11) ${(currentTime / (lecture.durationSeconds || 2700)) * 100}%, rgb(75 85 99) ${(currentTime / (lecture.durationSeconds || 2700)) * 100}%, rgb(75 85 99) 100%)`
          }}
          aria-label="Video progress"
        />
        <div className="flex justify-between text-xs text-gray-300 mt-1.5">
          <span className="font-medium">{formatTime(currentTime)}</span>
          <span className="font-medium">{lecture.duration || formatTime(lecture.durationSeconds || 2700)}</span>
        </div>
      </div>

      {/* Control Buttons Row */}
      <div className="flex items-center justify-between gap-2">
        {/* Left Controls */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:text-amber-400 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Volume Control */}
          <div className="flex items-center space-x-2 group">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-amber-400 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : volume < 50 ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseInt(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-0 group-hover:w-20 transition-all duration-300 h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-amber-500"
              aria-label="Volume"
            />
            <span className="text-white text-sm font-medium w-0 group-hover:w-10 overflow-hidden transition-all duration-300">
              {isMuted ? 0 : volume}%
            </span>
          </div>

          {/* Time Display */}
          <span className="text-white text-sm font-medium hidden sm:inline">
            {formatTime(currentTime)} / {lecture.duration || formatTime(lecture.durationSeconds || 2700)}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Playback Speed */}
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
            className="bg-white/10 text-black text-xs md:text-sm rounded px-1.5 md:px-2 py-1 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500 hover:bg-brown/20 transition-colors"
            aria-label="Playback speed"
          >
            <option value="0.25">0.25x</option>
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">Bình thường</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="1.75">1.75x</option>
            <option value="2">2x</option>
          </select>

          {/* Quality Selector */}
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="bg-white/10 text-white text-xs md:text-sm rounded px-1.5 md:px-2 py-1 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500 hover:bg-white/20 transition-colors hidden sm:inline"
            aria-label="Video quality"
          >
            <option value="360p">360p</option>
            <option value="720p">720p HD</option>
            <option value="1080p">1080p Full HD</option>
          </select>

          {/* Subtitles Toggle */}
          {lecture.hasSubtitles && (
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={`p-1.5 md:p-2 rounded transition-colors ${showSubtitles ? 'bg-amber-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              aria-label="Toggle subtitles"
              aria-pressed={showSubtitles}
              title="Phụ đề (C)"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-amber-400 transition-colors p-1.5 md:p-2"
            aria-label="Toggle fullscreen"
            title="Toàn màn hình (F)"
          >
            {isFullscreen ? (
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 4a1 1 0 00-1 1v3a1 1 0 01-2 0V5a3 3 0 013-3h3a1 1 0 010 2H5zm10 0a1 1 0 011 1v3a1 1 0 102 0V5a3 3 0 00-3-3h-3a1 1 0 100 2h3zm0 10a1 1 0 01-1 1h-3a1 1 0 100 2h3a3 3 0 003-3v-3a1 1 0 10-2 0v3zm-10 0a1 1 0 001-1v-3a1 1 0 10-2 0v3a3 3 0 003 3h3a1 1 0 100-2H5z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="mt-2 text-xs text-gray-400 text-center hidden md:block">
        <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-300">Space</kbd> Phát/Tạm dừng •
        <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-300 ml-1">←→</kbd> Tua •
        <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-300 ml-1">↑↓</kbd> Âm lượng •
        <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-300 ml-1">F</kbd> Toàn màn hình •
        <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-300 ml-1">M</kbd> Tắt tiếng •
        <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-300 ml-1">C</kbd> Phụ đề
      </div>
    </div>
  )
}
