import { useState, useEffect, useCallback } from 'react';

/**
 * useFullscreen - Custom hook for managing fullscreen mode
 * 
 * @param {React.RefObject} elementRef - Ref to the element to make fullscreen
 * @returns {Object} - Fullscreen state and controls
 * 
 * @example
 * const videoRef = useRef(null);
 * const { isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen } = useFullscreen(videoRef);
 * 
 * <div ref={videoRef}>
 *   <button onClick={toggleFullscreen}>
 *     {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
 *   </button>
 * </div>
 */
function useFullscreen(elementRef) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if fullscreen API is available
  const isFullscreenAvailable =
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled;

  // Enter fullscreen
  const enterFullscreen = useCallback(() => {
    if (!elementRef?.current || !isFullscreenAvailable) {
      return;
    }

    const element = elementRef.current;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { // Safari
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }
  }, [elementRef, isFullscreenAvailable]);

  // Exit fullscreen
  const exitFullscreen = useCallback(() => {
    if (!isFullscreenAvailable) {
      return;
    }

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // Safari
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }, [isFullscreenAvailable]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      setIsFullscreen(!!fullscreenElement);
    };

    // Add event listeners for all browsers
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isFullscreenAvailable
  };
}

export default useFullscreen;
