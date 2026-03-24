export type Framework = 'AUTO' | 'COSTAR' | 'RISEN' | 'RACE' | 'RTF' | 'APE';

export interface PromptSection {
  label: string;
  content: string;
}

export interface PromptSession {
  id: string;
  rawPrompt: string;
  framework: Framework;
  result: PromptSection[];
  timestamp: number;
}

export interface FrameworkConfig {
  id: Framework;
  name: string;
  description: string;
  sections: string[];
  color: string;
  borderColor: string;
}

export const FRAMEWORKS: Record<Framework, FrameworkConfig> = {
  AUTO: {
    id: 'AUTO',
    name: 'AUTO',
    description: 'Automatically selects the best framework',
    sections: [],
    color: '#9ca3af',
    borderColor: 'border-framework-auto',
  },
  COSTAR: {
    id: 'COSTAR',
    name: 'COSTAR',
    description: 'Context, Objective, Style, Tone, Audience, Response',
    sections: ['Context', 'Objective', 'Style', 'Tone', 'Audience', 'Response'],
    color: '#60a5fa',
    borderColor: 'border-framework-costar',
  },
  RISEN: {
    id: 'RISEN',
    name: 'RISEN',
    description: 'Role, Input, Steps, Expectation, Narrowing',
    sections: ['Role', 'Input', 'Steps', 'Expectation', 'Narrowing'],
    color: '#f472b6',
    borderColor: 'border-framework-risen',
  },
  RACE: {
    id: 'RACE',
    name: 'RACE',
    description: 'Role, Action, Context, Expectation',
    sections: ['Role', 'Action', 'Context', 'Expectation'],
    color: '#a78bfa',
    borderColor: 'border-framework-race',
  },
  RTF: {
    id: 'RTF',
    name: 'RTF',
    description: 'Role, Task, Format',
    sections: ['Role', 'Task', 'Format'],
    color: '#fbbf24',
    borderColor: 'border-framework-rtf',
  },
  APE: {
    id: 'APE',
    name: 'APE',
    description: 'Action, Purpose, Expectation',
    sections: ['Action', 'Purpose', 'Expectation'],
    color: '#34d399',
    borderColor: 'border-framework-ape',
  },
};
