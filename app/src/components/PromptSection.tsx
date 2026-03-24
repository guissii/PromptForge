import { motion } from 'framer-motion';
import type { PromptSection as PromptSectionType } from '@/types';
import { CopyButton } from './CopyButton';

interface PromptSectionProps {
  section: PromptSectionType;
  index: number;
}

export function PromptSection({ section, index }: PromptSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative p-4 bg-pf-bg-tertiary/50 border border-pf-border rounded-pf hover:border-pf-border-hover transition-colors duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-space font-semibold text-sm text-pf-accent uppercase tracking-wider">
          {section.label}
        </h4>
        <CopyButton text={section.content} size="sm" />
      </div>
      
      {/* Content */}
      <div className="pf-code text-pf-text-primary whitespace-pre-wrap">
        {section.content}
      </div>
    </motion.div>
  );
}
