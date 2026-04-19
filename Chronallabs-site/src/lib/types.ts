export interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
}

export interface GSoCIdea {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Hard';
  skills: string[];
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface PhilosophyItem {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export enum GeometryType {
  SQUARE = 'square',
  CIRCLE = 'circle',
  TRIANGLE = 'triangle',
  LINE = 'line',
  DOTS = 'dots',
  WAVY = 'wavy',
  CHEVRON = 'chevron',
  STAIRCASE = 'staircase',
  CUBE = 'cube',
  CROSS = 'cross',
  DIAMOND = 'diamond',
  STRIPED_CIRCLE = 'striped_circle',
  SCHEMATIC = 'schematic'
}