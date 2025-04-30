
export interface Candidate {
  id: string;
  name: string;
  matchScore: number;
  experienceYears: number;
  skills: Skill[];
  missingSkills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  isMatch: boolean;
  feedback: string[];
  resumeText?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  isRequired?: boolean;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  relevanceScore?: number; // 0-100
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  relevanceScore?: number; // 0-100
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export interface JobDescription {
  title: string;
  company: string;
  requiredSkills: string[];
  preferredSkills: string[];
  requiredExperience: number;
  responsibilities: string[];
}

export interface RecruiterPreferences {
  mustHaveSkills: string[];
  niceToHaveSkills: string[];
  minimumExperience: number;
  cultureFitNotes?: string;
  otherPreferences?: string[];
}

export interface AnalysisResults {
  candidates: Candidate[];
  jobDescription?: JobDescription;
  recruiterPreferences?: RecruiterPreferences;
}

export interface FileUploadStatus {
  id: string;
  name: string;
  type: 'resume' | 'jobDescription' | 'preferences';
  status: 'uploading' | 'complete' | 'error';
  error?: string;
}

export enum AnalysisState {
  INITIAL = 'initial',
  UPLOADING = 'uploading',
  ANALYZING = 'analyzing',
  COMPLETE = 'complete',
  ERROR = 'error'
}
