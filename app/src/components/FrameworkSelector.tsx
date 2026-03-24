import { motion } from 'framer-motion';
import { FRAMEWORKS } from '@/types';
import type { Framework } from '@/types';

interface FrameworkSelectorProps {
  value: Framework;
  onChange: (framework: Framework) => void;
  disabled?: boolean;
}

const frameworks: Framework[] = ['AUTO', 'COSTAR', 'RISEN', 'RACE', 'RTF', 'APE'];

export function FrameworkSelector({ value, onChange, disabled = false }: FrameworkSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {frameworks.map((fw) => {
        const config = FRAMEWORKS[fw];
        const isActive = value === fw;
        
        return (
          <button
            key={fw}
            onClick={() => !disabled && onChange(fw)}
            disabled={disabled}
            className={`
              relative px-4 py-2 rounded-full font-space text-xs font-semibold uppercase tracking-wider
              transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              ${isActive 
                ? 'text-pf-bg-primary' 
                : 'text-pf-text-secondary hover:text-pf-text-primary border border-pf-border hover:border-pf-border-hover'
              }
            `}
            style={{
              backgroundColor: isActive ? config.color : 'transparent',
            }}
          >
            {/* Animated background for active state */}
            {isActive && (
              <motion.div
                layoutId="activeFramework"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: config.color }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Label */}
            <span className="relative z-10">{config.name}</span>
            
            {/* Tooltip on hover */}
            {!isActive && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-pf-bg-secondary border border-pf-border rounded text-[10px] font-inter text-pf-text-secondary whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100">
                {config.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
