import { motion } from 'framer-motion';
import { Github, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-pf-bg-primary/80 backdrop-blur-md border-b border-pf-border"
    >
      <div className="h-full px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.15 }}
        >
          <Sparkles className="w-5 h-5 text-pf-accent transition-colors group-hover:text-pf-accent-dim" />
          <span className="font-space font-bold text-lg text-pf-text-primary">
            PromptForge
          </span>
        </motion.a>
        
        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <a
            href="#about"
            className="relative font-inter text-sm text-pf-text-secondary hover:text-pf-text-primary transition-colors group"
          >
            About
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-pf-accent transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-inter text-sm text-pf-text-secondary hover:text-pf-text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
