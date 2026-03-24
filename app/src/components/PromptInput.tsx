import { useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { useAutoResize } from '@/hooks/useAutoResize';
import { Command } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const MAX_CHARS = 2000;

export function PromptInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Describe what you want to achieve...',
  disabled = false,
}: PromptInputProps) {
  const { textareaRef, adjustHeight } = useAutoResize(120, 400);
  
  // Adjust height when value changes
  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd/Ctrl + Enter to submit
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSubmit();
      }
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_CHARS) {
      onChange(newValue);
    }
  };
  
  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full min-h-[120px] max-h-[400px] p-4 pr-4 pb-10 bg-pf-bg-tertiary border border-pf-border rounded-pf font-jetbrains text-sm text-pf-text-primary placeholder:text-pf-text-tertiary resize-none focus-glow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      
      {/* Character counter */}
      <div className="absolute bottom-3 right-3 flex items-center gap-3">
        <span className={`text-xs font-inter ${
          value.length > MAX_CHARS * 0.9 ? 'text-pf-accent' : 'text-pf-text-tertiary'
        }`}>
          {value.length}/{MAX_CHARS}
        </span>
      </div>
      
      {/* Keyboard shortcut hint */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-pf-text-tertiary">
        <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 bg-pf-bg-secondary border border-pf-border rounded text-[10px] font-jetbrains">
          <Command className="w-3 h-3" />
          <span>+</span>
          <span>↵</span>
        </kbd>
        <span className="text-[10px] font-inter hidden sm:inline">to forge</span>
      </div>
    </div>
  );
}
