import { useRef, useEffect, useCallback } from 'react';

interface UseAutoResizeReturn {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  adjustHeight: () => void;
}

/**
 * Custom hook for auto-resizing textarea based on content
 */
export function useAutoResize(
  minHeight: number = 120,
  maxHeight: number = 400
): UseAutoResizeReturn {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate new height
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, minHeight),
      maxHeight
    );
    
    textarea.style.height = `${newHeight}px`;
  }, [minHeight, maxHeight]);
  
  // Adjust height on initial render and when content changes
  useEffect(() => {
    adjustHeight();
  }, [adjustHeight]);
  
  return { textareaRef, adjustHeight };
}
