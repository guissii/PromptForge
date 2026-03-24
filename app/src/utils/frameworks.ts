import type { Framework, PromptSection } from '@/types';

/**
 * Detects the most suitable framework based on prompt content
 */
export function detectFramework(prompt: string): Framework {
  const lowerPrompt = prompt.toLowerCase();
  
  // Process-oriented keywords suggest RISEN
  const processKeywords = ['step', 'process', 'how to', 'guide', 'walkthrough', 'tutorial', 'instructions'];
  if (processKeywords.some(kw => lowerPrompt.includes(kw))) {
    return 'RISEN';
  }
  
  // Simple direct requests suggest RTF
  const simpleKeywords = ['write', 'create', 'generate', 'make', 'build'];
  const isSimple = simpleKeywords.some(kw => lowerPrompt.includes(kw)) && prompt.split(' ').length < 20;
  if (isSimple) {
    return 'RTF';
  }
  
  // Goal-focused suggests APE
  const goalKeywords = ['achieve', 'goal', 'outcome', 'result', 'improve', 'optimize', 'increase'];
  if (goalKeywords.some(kw => lowerPrompt.includes(kw))) {
    return 'APE';
  }
  
  // Action-focused suggests RACE
  const actionKeywords = ['analyze', 'review', 'evaluate', 'assess', 'compare'];
  if (actionKeywords.some(kw => lowerPrompt.includes(kw))) {
    return 'RACE';
  }
  
  // Default to COSTAR for comprehensive needs
  return 'COSTAR';
}

/**
 * Generates structured prompt sections based on framework and raw prompt
 */
export function generateStructuredPrompt(
  rawPrompt: string,
  framework: Framework
): PromptSection[] {
  const detectedFramework = framework === 'AUTO' ? detectFramework(rawPrompt) : framework;
  
  switch (detectedFramework) {
    case 'COSTAR':
      return generateCOSTAR(rawPrompt);
    case 'RISEN':
      return generateRISEN(rawPrompt);
    case 'RACE':
      return generateRACE(rawPrompt);
    case 'RTF':
      return generateRTF(rawPrompt);
    case 'APE':
      return generateAPE(rawPrompt);
    default:
      return generateCOSTAR(rawPrompt);
  }
}

function generateCOSTAR(rawPrompt: string): PromptSection[] {
  return [
    {
      label: 'Context',
      content: `You are an expert assistant helping with the following request. The user needs professional output that is clear, actionable, and well-structured.`,
    },
    {
      label: 'Objective',
      content: rawPrompt,
    },
    {
      label: 'Style',
      content: 'Professional and concise. Use clear headings, bullet points where appropriate, and maintain a helpful tone throughout.',
    },
    {
      label: 'Tone',
      content: 'Confident yet approachable. Balance expertise with accessibility.',
    },
    {
      label: 'Audience',
      content: 'A knowledgeable professional seeking practical, actionable guidance.',
    },
    {
      label: 'Response',
      content: 'Provide a structured response with clear sections. Include examples where relevant and end with a brief summary or next steps.',
    },
  ];
}

function generateRISEN(rawPrompt: string): PromptSection[] {
  return [
    {
      label: 'Role',
      content: 'You are an expert consultant and guide with deep knowledge of best practices and proven methodologies.',
    },
    {
      label: 'Input',
      content: rawPrompt,
    },
    {
      label: 'Steps',
      content: `1. Analyze the requirements and identify key objectives
2. Break down the solution into logical phases
3. Provide detailed instructions for each phase
4. Include checkpoints and validation criteria
5. Summarize the complete process`,
    },
    {
      label: 'Expectation',
      content: 'A comprehensive, step-by-step guide that can be followed to achieve the desired outcome successfully.',
    },
    {
      label: 'Narrowing',
      content: 'Focus on practical, actionable steps. Avoid theoretical discussions. Prioritize clarity over comprehensiveness.',
    },
  ];
}

function generateRACE(rawPrompt: string): PromptSection[] {
  return [
    {
      label: 'Role',
      content: 'You are an expert analyst and advisor with specialized knowledge in this domain.',
    },
    {
      label: 'Action',
      content: rawPrompt,
    },
    {
      label: 'Context',
      content: 'The user needs a thorough analysis that considers multiple perspectives and provides actionable insights.',
    },
    {
      label: 'Expectation',
      content: 'Deliver a well-reasoned response with clear recommendations. Include rationale for your suggestions and highlight any trade-offs or considerations.',
    },
  ];
}

function generateRTF(rawPrompt: string): PromptSection[] {
  return [
    {
      label: 'Role',
      content: 'You are a skilled professional with expertise in delivering high-quality, structured content.',
    },
    {
      label: 'Task',
      content: rawPrompt,
    },
    {
      label: 'Format',
      content: 'Provide the response in a clean, structured format with appropriate headings and sections. Use markdown formatting for readability.',
    },
  ];
}

function generateAPE(rawPrompt: string): PromptSection[] {
  return [
    {
      label: 'Action',
      content: rawPrompt,
    },
    {
      label: 'Purpose',
      content: 'To achieve a clear, measurable outcome that addresses the stated need effectively and efficiently.',
    },
    {
      label: 'Expectation',
      content: 'A focused response that directly addresses the goal. Include specific metrics or criteria for success where applicable, and provide clear next steps.',
    },
  ];
}
