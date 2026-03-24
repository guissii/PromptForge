import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import type { PromptSession } from '@/types';
import { FrameworkBadge } from './FrameworkBadge';
import { PromptSection } from './PromptSection';
import { CopyButton } from './CopyButton';
import { formatRawPrompt } from '@/utils/mockApi';

interface PromptResultProps {
  session: PromptSession;
  onRetry: () => void;
}

export function PromptResult({ session, onRetry }: PromptResultProps) {
  const rawText = formatRawPrompt(session);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="pf-card p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-inter text-sm text-pf-text-secondary">
            Framework used:
          </span>
          <FrameworkBadge framework={session.framework} />
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <CopyButton text={rawText} />
          <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-pf-sm text-pf-text-secondary hover:text-pf-text-primary hover:bg-pf-bg-tertiary transition-colors duration-150"
            title="Retry"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      
      {/* Sections */}
      <div className="space-y-4">
        {session.result.map((section, index) => (
          <PromptSection
            key={`${section.label}-${index}`}
            section={section}
            index={index}
          />
        ))}
      </div>
      
      {/* Footer actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-pf-border">
        <div className="flex items-center gap-2">
          <CopyButton text={rawText} />
          <span className="font-inter text-sm text-pf-text-secondary">
            Copy all sections
          </span>
        </div>
        
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 rounded-pf-sm border border-pf-border text-pf-text-secondary hover:text-pf-text-primary hover:border-pf-border-hover hover:bg-pf-bg-tertiary transition-all duration-150"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="font-space text-sm">Retry</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
