import type { Framework, PromptSession } from '@/types';
import { generateStructuredPrompt, detectFramework } from './frameworks';

/**
 * Simulates API call to transform prompt
 * In production, this would call an actual LLM API
 */
export async function forgePrompt(
  rawPrompt: string,
  framework: Framework
): Promise<PromptSession> {
  // Simulate network delay (800-1500ms)
  const delay = 800 + Math.random() * 700;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Generate structured result
  const result = generateStructuredPrompt(rawPrompt, framework);
  const actualFramework = framework === 'AUTO' ? detectFramework(rawPrompt) : framework;
  
  return {
    id: generateId(),
    rawPrompt,
    framework: actualFramework,
    result,
    timestamp: Date.now(),
  };
}

/**
 * Generates a unique ID for sessions
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Formats the structured prompt as raw text for copying
 */
export function formatRawPrompt(session: PromptSession): string {
  const lines: string[] = [
    `Framework: ${session.framework}`,
    '',
    ...session.result.map(section => 
      `${section.label}:\n${section.content}`
    ),
  ];
  
  return lines.join('\n\n');
}
