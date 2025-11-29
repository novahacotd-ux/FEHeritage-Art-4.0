import { useEffect } from 'react';

/**
 * useKeyboardShortcuts - Custom hook for handling keyboard shortcuts
 * 
 * @param {Object} shortcuts - Object mapping keys to handler functions
 * @param {boolean} [enabled=true] - Whether shortcuts are enabled
 * @param {boolean} [ignoreInputs=true] - Whether to ignore shortcuts when input/textarea is focused
 * 
 * @example
 * useKeyboardShortcuts({
 *   ' ': () => setIsPlaying(!isPlaying),  // Space bar
 *   'f': toggleFullscreen,                 // F key
 *   'Escape': handleClose,                 // Escape key
 *   'ArrowLeft': () => seek(-10),          // Left arrow
 *   'ArrowRight': () => seek(10),          // Right arrow
 * });
 */
function useKeyboardShortcuts(shortcuts, enabled = true, ignoreInputs = true) {
  useEffect(() => {
    if (!enabled || !shortcuts) {
      return;
    }

    const handleKeyPress = (event) => {
      // Ignore shortcuts when typing in input/textarea/contenteditable
      if (ignoreInputs) {
        const target = event.target;
        const isTyping =
          target.matches('input, textarea, [contenteditable="true"]') ||
          target.isContentEditable;

        if (isTyping) {
          return;
        }
      }

      // Get the key from the event
      const key = event.key;

      // Check if this key has a handler
      if (shortcuts[key]) {
        event.preventDefault();
        shortcuts[key](event);
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [shortcuts, enabled, ignoreInputs]);
}

export default useKeyboardShortcuts;
