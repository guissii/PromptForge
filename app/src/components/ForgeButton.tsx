import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ForgeButtonProps {
  loading?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function ForgeButton({ loading = false, onClick, disabled = false }: ForgeButtonProps) {
  const isDisabled = disabled || loading;
  
  return (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.15 }}
      className={`
        w-full sm:w-auto min-w-[200px] h-[52px] px-8
        flex items-center justify-center gap-3
        bg-pf-accent text-pf-bg-primary
        font-space font-semibold text-sm
        rounded-pf-sm
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:brightness-110
      `}
    >
      {loading ? (
        <>
          <span className="font-space">Forging</span>
          <div className="loading-dots">
            <span />
            <span />
            <span />
          </div>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          <span className="font-space">FORGE PROMPT</span>
        </>
      )}
    </motion.button>
  );
}
