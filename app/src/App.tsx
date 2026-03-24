import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { PromptInput } from '@/components/PromptInput';
import { FrameworkSelector } from '@/components/FrameworkSelector';
import { ForgeButton } from '@/components/ForgeButton';
import { PromptResult } from '@/components/PromptResult';
import { HistorySidebar } from '@/components/HistorySidebar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { forgePrompt } from '@/utils/mockApi';
import type { Framework, PromptSession } from '@/types';
import './App.css';

const MAX_HISTORY = 10;

function App() {
  // Input state
  const [inputValue, setInputValue] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<Framework>('AUTO');
  const [isLoading, setIsLoading] = useState(false);
  
  // Result state
  const [currentResult, setCurrentResult] = useState<PromptSession | null>(null);
  
  // History state (persisted)
  const [history, setHistory] = useLocalStorage<PromptSession[]>('promptforge-history', []);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  
  // Handle forge action
  const handleForge = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;
    
    setIsLoading(true);
    
    try {
      const result = await forgePrompt(inputValue.trim(), selectedFramework);
      setCurrentResult(result);
      
      // Add to history
      setHistory(prev => {
        const newHistory = [result, ...prev].slice(0, MAX_HISTORY);
        return newHistory;
      });
    } catch (error) {
      console.error('Failed to forge prompt:', error);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, selectedFramework, isLoading, setHistory]);
  
  // Handle history item selection
  const handleHistorySelect = useCallback((session: PromptSession) => {
    setInputValue(session.rawPrompt);
    setSelectedFramework(session.framework);
    setCurrentResult(session);
  }, []);
  
  // Handle clear history
  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);
  
  // Handle retry
  const handleRetry = useCallback(() => {
    if (inputValue.trim()) {
      handleForge();
    }
  }, [inputValue, handleForge]);
  
  return (
    <div className="min-h-screen bg-pf-bg-primary">
      <Header />
      
      {/* History Sidebar */}
      <HistorySidebar
        sessions={history}
        onSelect={handleHistorySelect}
        onClear={handleClearHistory}
        isOpen={isHistoryOpen}
        onToggle={() => setIsHistoryOpen(!isHistoryOpen)}
      />
      
      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isHistoryOpen ? 'ml-0 md:ml-[280px]' : 'ml-0'
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="font-space font-bold text-4xl sm:text-5xl text-pf-text-primary mb-4 tracking-tight">
              Your prompt.
              <span className="text-pf-accent"> Engineered.</span>
            </h1>
            <p className="font-inter text-lg text-pf-text-secondary max-w-xl mx-auto">
              Transform simple ideas into professional, structured prompts using proven frameworks.
            </p>
          </motion.section>
          
          {/* Input Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="space-y-6"
          >
            {/* Textarea */}
            <PromptInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleForge}
              disabled={isLoading}
            />
            
            {/* Framework Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <label className="block font-inter text-xs text-pf-text-tertiary uppercase tracking-wider mb-2">
                  Framework
                </label>
                <FrameworkSelector
                  value={selectedFramework}
                  onChange={setSelectedFramework}
                  disabled={isLoading}
                />
              </div>
              
              {/* Forge Button */}
              <div className="sm:self-end">
                <ForgeButton
                  loading={isLoading}
                  onClick={handleForge}
                  disabled={!inputValue.trim()}
                />
              </div>
            </div>
          </motion.section>
          
          {/* Output Section */}
          <AnimatePresence mode="wait">
            {currentResult && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12"
              >
                <PromptResult
                  session={currentResult}
                  onRetry={handleRetry}
                />
              </motion.section>
            )}
          </AnimatePresence>
          
          {/* About Section */}
          <motion.section
            id="about"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-24 pt-12 border-t border-pf-border"
          >
            <h2 className="font-space font-bold text-2xl text-pf-text-primary mb-6">
              About PromptForge
            </h2>
            <div className="space-y-4 text-pf-text-secondary font-inter">
              <p>
                PromptForge helps you transform simple, unstructured prompts into professional, 
                framework-based prompts that get better results from AI models.
              </p>
              <p>
                Built for developers, content creators, and AI power users who understand that 
                the quality of your prompt directly impacts the quality of your output.
              </p>
              
              <h3 className="font-space font-semibold text-lg text-pf-text-primary mt-8 mb-4">
                Supported Frameworks
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="pf-card p-4">
                  <h4 className="font-space font-semibold text-sm text-framework-costar mb-2">COSTAR</h4>
                  <p className="text-sm">Context, Objective, Style, Tone, Audience, Response — comprehensive structure for complex tasks.</p>
                </div>
                <div className="pf-card p-4">
                  <h4 className="font-space font-semibold text-sm text-framework-risen mb-2">RISEN</h4>
                  <p className="text-sm">Role, Input, Steps, Expectation, Narrowing — perfect for process-oriented tasks.</p>
                </div>
                <div className="pf-card p-4">
                  <h4 className="font-space font-semibold text-sm text-framework-race mb-2">RACE</h4>
                  <p className="text-sm">Role, Action, Context, Expectation — action-focused and concise.</p>
                </div>
                <div className="pf-card p-4">
                  <h4 className="font-space font-semibold text-sm text-framework-rtf mb-2">RTF</h4>
                  <p className="text-sm">Role, Task, Format — simple and direct for quick outputs.</p>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-pf-border text-center">
            <p className="font-inter text-sm text-pf-text-tertiary">
              Built with precision. Designed for developers.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
