import { Project, GSoCIdea, TeamMember, Stat, PhilosophyItem, ProcessStep } from './types';

export interface ExtendedProject extends Project {
  category: 'Flagship Systems' | 'Civic Tools' | 'Experimental Projects';
  status: 'Active' | 'In Progress' | 'Experimental';
}

export const RESEARCH_DOMAINS = [
  'AI_GOVERNANCE',
  'RTI_SYSTEMS',
  'CIVIC_DATA',
  'NLP_TOOLS',
  'OPEN_INFRASTRUCTURE',
  'PUBLIC_FINANCE',
  'POLICY_SIMULATION',
  'AUTONOMOUS_GOVERNANCE'
];

export const PROJECTS: ExtendedProject[] = [
  {
    id: '01',
    index: '01',
    title: 'AI Public Complaint & RTI Generator',
    description: 'A comprehensive framework leveraging Natural Language Processing to automate the generation of formal public complaints and Right to Information requests.',
    tech: ['Python', 'NLP', 'Prompt Engineering', 'Civic Stack'],
    github: 'https://github.com/ChronalLabs/AI-Powered-Public-Complaint-and-RTI-Generator',
    category: 'Flagship Systems',
    status: 'Active'
  },
  {
    id: '02',
    index: '02',
    title: 'RTI Application Generator',
    description: 'Specialized modular tool for structuring legal information requests. Focuses on document precision and procedural compliance for public information transparency.',
    tech: ['Python', 'Document Logic', 'Automation'],
    github: 'https://github.com/ChronalLabs/RTI-APPLICATION-GENERATOR',
    category: 'Civic Tools',
    status: 'Active'
  },
  {
    id: '03',
    index: '03',
    title: 'Civic Expense Tracker',
    description: 'A financial transparency utility designed to track and categorize civic expenditures, bringing data-driven clarity to public budget management.',
    tech: ['React', 'Data Visualization', 'Civic Finance'],
    github: 'https://github.com/ChronalLabs/AI-Powered-Public-Complaint-and-RTI-Generator/tree/master/Expense%20Tracker',
    category: 'Experimental Projects',
    status: 'Active'
  },
  {
    id: '04',
    index: '04',
    title: 'Agro Vision',
    description: 'An AI-powered agritech solution for intelligent crop prediction, disease detection, and sustainable farm management.',
    tech: ['Python', 'Machine Learning', 'Computer Vision'],
    github: 'https://github.com/ChronalLabs/ChronOS/tree/master/Agro%20Vision',
    category: 'Experimental Projects',
    status: 'Experimental'
  },
  {
    id: '05',
    index: '05',
    title: 'Blood Connect',
    description: 'A centralized platform connecting active blood donors with individuals and hospitals in emergency need, optimizing inventory.',
    tech: ['Web Tech', 'Database', 'Real-time Routing'],
    github: 'https://github.com/ChronalLabs/ChronOS/tree/master/Blood%20Connect',
    category: 'Experimental Projects',
    status: 'Experimental'
  },
  {
    id: '06',
    index: '06',
    title: 'CIVISM',
    description: 'An integrated civic engagement platform aimed at fostering active citizen participation and streamlining public issue tracking.',
    tech: ['Civic Engine', 'Web Development', 'Community'],
    github: 'https://github.com/ChronalLabs/ChronOS/tree/master/CIVISM',
    category: 'Experimental Projects',
    status: 'Experimental'
  },
  {
    id: '07',
    index: '07',
    title: 'EcoTrack',
    description: 'Personal Carbon Footprint Intelligence System. Tracks and analyzes individual environmental impact to encourage sustainable habits.',
    tech: ['Python', 'Data Analytics', 'EcoTech'],
    github: 'https://github.com/ChronalLabs/ChronOS/tree/master/EcoTrack%20%E2%80%93%20Personal%20Carbon%20Footprint%20Intelligence%20System%20Using%20Python',
    category: 'Experimental Projects',
    status: 'Experimental'
  },
  {
    id: '08',
    index: '08',
    title: 'EduGuard',
    description: 'A dedicated School Grievance & Feedback System designed for educational institutions to effectively manage student and parent feedback.',
    tech: ['System Design', 'Web Technologies', 'Education'],
    github: 'https://github.com/ChronalLabs/ChronOS/tree/master/EduGuard%20%E2%80%93%20School%20Grievance%20%26%20Feedback%20System',
    category: 'Experimental Projects',
    status: 'Experimental'
  },
  {
    id: '09',
    index: '09',
    title: 'Fix Civic',
    description: 'A robust public infrastructure reporting tool that allows citizens to flag and track local civic issues for faster administrative resolution.',
    tech: ['Civic Automation', 'Map Integration'],
    github: 'https://github.com/ChronalLabs/ChronOS/tree/master/Fix%20Civic',
    category: 'Experimental Projects',
    status: 'Experimental'
  },
  {
    id: '10',
    index: '10',
    title: 'Green Atlas',
    description: 'An environmental mapping platform focused on monitoring green coverage, biodiversity hotspots, and analyzing geospatial ecological data.',
    tech: ['GIS', 'Python', 'Data Visualization'],
    github: 'https://github.com/ChronalLabs/ChronOS/tree/master/GreenAtlas',
    category: 'Experimental Projects',
    status: 'Experimental'
  },
  {
    id: '11',
    index: '11',
    title: 'Skillflare',
    description: 'A skill development and assessment platform providing tailored learning trajectories, verified resources, and interactive competency tracking.',
    tech: ['EdTech', 'React', 'Analytics'],
    github: 'https://github.com/ChronalLabs/ChronOS/tree/master/Skillflare',
    category: 'Experimental Projects',
    status: 'Experimental'
  },
  {
    id: '12',
    index: '12',
    title: 'Mantessa',
    description: 'An advanced studying and learning management system designed to optimize student workflows and overall academic productivity.',
    tech: ['Web App', 'Productivity'],
    github: 'https://github.com/arin-gupta06/StudyOS_Vivek-Arin_Version',
    category: 'Experimental Projects',
    status: 'Experimental'
  }
];

export const PHILOSOPHY: PhilosophyItem[] = [
  { id: '01', title: 'Civic Impact', description: 'We focus on building tools that solve real-world governance and public access problems.' },
  { id: '02', title: 'Open Source First', description: 'We believe in transparency, collaboration, and community-driven development.' },
  { id: '03', title: 'Responsible AI', description: 'We design AI systems that are ethical, explainable, and accessible.' }
];

export const TEAM: TeamMember[] = [
  { 
    name: 'MANAN CHAWLA', 
    role: 'Mentor & Organization Owner', 
    bio: 'Open-source contributor and developer focused on civic technology and AI systems.',
    avatar: 'https://github.com/Manan-Chawla.png' 
  }
];

export interface Contributor {
  id: string;
  name: string;
  role: string;
  linkedin: string;
  github?: string;
}

export const CONTRIBUTORS: Contributor[] = [
  {
    id: '01',
    name: 'Anurag Mishra',
    role: 'Contributor',
    linkedin: 'https://www.linkedin.com/in/anuragmishra5159/',
  },
  {
    id: '02',
    name: 'Ananya Sharma',
    role: 'Contributor',
    linkedin: 'https://www.linkedin.com/in/ananya-sharma-dev/',
    github: 'https://github.com/ananyascodes'
  },
  {
    id: '03',
    name: 'Ananya Tiwari',
    role: 'Contributor',
    linkedin: 'https://www.linkedin.com/in/ananya-tiwari-devs/',
    github: 'https://github.com/Ananya3107'
  },
  {
    id: '04',
    name: 'Arin Gupta',
    role: 'Contributor',
    linkedin: 'https://www.linkedin.com/in/arin-gupta-2b94b032a',
    github: 'https://github.com/arin-gupta06'
  },
  {
    id: '05',
    name: 'Krish Dargar',
    role: 'Contributor',
    linkedin: 'https://www.linkedin.com/in/krish-dargar-101774324/',
    github: 'https://github.com/KD2303'
  },
  {
    id: '06',
    name: 'Yogesh Sanodiya',
    role: 'Contributor',
    linkedin: 'https://www.linkedin.com/in/yogesh-sanodiya-8a2816298/',
    github: 'https://github.com/yogeshsanodiya59-web'
  }
];

export const STATS: Stat[] = [
  { label: 'CONTRIBUTORS', value: '50+' },
  { label: 'PROJECTS', value: '12+' },
  { label: 'COMMITS', value: '600+' },
  { label: 'LANGUAGES', value: '6+' }
];