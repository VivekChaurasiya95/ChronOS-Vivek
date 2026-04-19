import { Project, GSoCIdea, TeamMember, Stat, PhilosophyItem, ProcessStep } from './types';

export const PROJECTS: Project[] = [
  {
    id: '01',
    index: '01',
    title: 'AI Public Complaint Generator',
    description: 'An open-source platform that helps users generate structured public complaint drafts using AI, based on issue details, departments, and locations.',
    tech: ['Python', 'NLP', 'React', 'APIs'],
    github: 'https://github.com/chronallabs/complaint-gen',
    demo: 'https://demo.chronal.labs'
  },
  {
    id: '02',
    index: '02',
    title: 'RTI Application Generator',
    description: 'A tool that assists users in drafting properly structured RTI (Right to Information) applications through guided inputs and templates.',
    tech: ['Python', 'Templates', 'FastAPI'],
    github: 'https://github.com/chronallabs/rti-gen',
  },
  {
    id: '03',
    index: '03',
    title: 'Multilingual Civic Drafting',
    description: 'A system that enables complaint and RTI generation in English and local languages, focusing on scalable language architecture.',
    tech: ['NLP', 'Unicode', 'Localization', 'Python'],
    github: 'https://github.com/chronallabs/multilingual-civic',
  }
];

export const GSOC_IDEAS: GSoCIdea[] = [
  {
    id: 'idea-1',
    title: 'AI-Based Public Complaint System',
    difficulty: 'Intermediate',
    skills: ['Python', 'NLP', 'APIs'],
    description: 'Extend the complaint generator with improved prompt design, validation, and modular architecture.'
  },
  {
    id: 'idea-2',
    title: 'RTI Template Engine',
    difficulty: 'Intermediate',
    skills: ['Python', 'Document Systems'],
    description: 'Build a configurable template system for RTI drafts across departments.'
  },
  {
    id: 'idea-3',
    title: 'Multilingual Civic Platform',
    difficulty: 'Intermediate',
    skills: ['NLP', 'Localization', 'Python'],
    description: 'Design a scalable multilingual architecture for civic drafting tools.'
  }
];

export const PHILOSOPHY: PhilosophyItem[] = [
  { id: '01', title: 'Civic Impact', description: 'We focus on building tools that solve real-world governance and public access problems.' },
  { id: '02', title: 'Open Source First', description: 'We believe in transparency, collaboration, and community-driven development.' },
  { id: '03', title: 'Responsible AI', description: 'We design AI systems that are ethical, explainable, and accessible.' }
];

export const PROCESS: ProcessStep[] = [
  { id: 'ID', title: 'Identify', description: 'We identify gaps in civic systems and public access to information.' },
  { id: 'DS', title: 'Design', description: 'We design open, scalable, and user-centric solutions.' },
  { id: 'BL', title: 'Build', description: 'We develop AI-powered tools using open-source technologies.' },
  { id: 'DP', title: 'Deploy', description: 'We release tools publicly and ensure accessibility.' }
];

export const TEAM: TeamMember[] = [
  {
    name: 'Manan Chawla',
    role: 'Google Cloud Platform Engineer',
    bio: 'Open-source contributor and developer focused on civic technology and AI systems.',
    avatar: 'https://picsum.photos/seed/manan/400/400?grayscale'
  }
];

export const STATS: Stat[] = [
  { label: 'CONTRIBUTORS', value: '50+' },
  { label: 'PROJECTS', value: '12+' },
  { label: 'COMMITS', value: '600+' },
  { label: 'IMPACTED', value: '1k+' }
];