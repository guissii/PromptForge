import { motion } from 'framer-motion';
import { FRAMEWORKS } from '@/types';
import type { PromptSession } from '@/types';
import { Clock } from 'lucide-react';

interface HistoryItemProps {
  session: PromptSession;
  onClick: () => void;
}

export function HistoryItem({ session, onClick }: HistoryItemProps) {
  const config = FRAMEWORKS[session.framework];
  
  // Format timestamp
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Truncate prompt
  const truncatePrompt = (prompt: string, maxLength: number = 60): string => {
    if (prompt.length <= maxLength) return prompt;
    return prompt.slice(0, maxLength).trim() + '...';
  };
  
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.15 }}
      className="w-full text-left p-3 rounded-pf bg-pf-bg-tertiary/50 border border-pf-border hover:border-pf-border-hover hover:bg-pf-bg-tertiary transition-all duration-200 group"
    >
      {/* Framework badge */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-[10px] font-space font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{
            color: config.color,
            backgroundColor: `${config.color}20`,
          }}
        >
          {config.name}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-pf-text-tertiary">
          <Clock className="w-3 h-3" />
          {formatTime(session.timestamp)}
        </span>
      </div>
      
      {/* Prompt preview */}
      <p className="font-jetbrains text-xs text-pf-text-secondary line-clamp-2 group-hover:text-pf-text-primary transition-colors">
        {truncatePrompt(session.rawPrompt)}
      </p>
    </motion.button>
  );
}
