import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useCopy } from '@/hooks/useCopy';

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function CopyButton({ text, className = '', size = 'md' }: CopyButtonProps) {
  const { copied, copy } = useCopy(2000);
  
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const buttonSize = size === 'sm' ? 'p-1.5' : 'p-2';
  
  return (
    <motion.button
      onClick={() => copy(text)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${buttonSize} rounded-pf-sm
        text-pf-text-secondary hover:text-pf-text-primary
        hover:bg-pf-bg-tertiary
        transition-colors duration-150
        ${className}
      `}
      title="Copy to clipboard"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className={`${iconSize} text-pf-accent`} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Copy className={iconSize} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
