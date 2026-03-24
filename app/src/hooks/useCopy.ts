import { useState, useCallback } from 'react';

interface UseCopyReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
}

/**
 * Custom hook for clipboard copy with success feedback
 */
export function useCopy(timeout: number = 2000): UseCopyReturn {
  const [copied, setCopied] = useState(false);
  
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, timeout);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopied(false);
    }
  }, [timeout]);
  
  return { copied, copy };
}
