import { motion, AnimatePresence } from 'framer-motion';
import type { PromptSession } from '@/types';
import { HistoryItem } from './HistoryItem';
import { PanelLeft, PanelRight, Trash2, History } from 'lucide-react';

interface HistorySidebarProps {
  sessions: PromptSession[];
  onSelect: (session: PromptSession) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function HistorySidebar({
  sessions,
  onSelect,
  onClear,
  isOpen,
  onToggle,
}: HistorySidebarProps) {
  return (
    <>
      {/* Toggle button (visible when sidebar is closed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            onClick={onToggle}
            className="fixed left-4 top-20 z-40 p-2 rounded-pf bg-pf-bg-secondary border border-pf-border text-pf-text-secondary hover:text-pf-text-primary hover:border-pf-border-hover transition-all duration-200"
            title="Show history"
          >
            <PanelRight className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 top-16 bottom-0 z-40 bg-pf-bg-secondary border-r border-pf-border overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-pf-border">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-pf-accent" />
                  <h3 className="font-space font-semibold text-sm text-pf-text-primary">
                    History
                  </h3>
                  <span className="text-xs text-pf-text-tertiary">
                    ({sessions.length})
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {sessions.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClear}
                      className="p-1.5 rounded-pf-sm text-pf-text-tertiary hover:text-red-400 hover:bg-red-400/10 transition-colors duration-150"
                      title="Clear history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onToggle}
                    className="p-1.5 rounded-pf-sm text-pf-text-tertiary hover:text-pf-text-primary hover:bg-pf-bg-tertiary transition-colors duration-150"
                    title="Hide history"
                  >
                    <PanelLeft className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {sessions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-32 text-center">
                    <History className="w-8 h-8 text-pf-text-tertiary mb-2" />
                    <p className="font-inter text-sm text-pf-text-secondary">
                      No history yet
                    </p>
                    <p className="font-inter text-xs text-pf-text-tertiary mt-1">
                      Your forged prompts will appear here
                    </p>
                  </div>
                ) : (
                  sessions.map((session) => (
                    <HistoryItem
                      key={session.id}
                      session={session}
                      onClick={() => onSelect(session)}
                    />
                  ))
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
