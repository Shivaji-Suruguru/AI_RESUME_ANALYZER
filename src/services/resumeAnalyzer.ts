
// This is a mock service that would be replaced with actual API calls 
// or local processing logic when integrating with Ollama and the deepseekr1 model

import { Candidate, JobDescription, RecruiterPreferences, AnalysisResults } from '@/types';

// Mock data for demonstration purposes
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Jane Smith',
    matchScore: 85,
    experienceYears: 5,
    skills: [
      { name: 'React', level: 90, isRequired: true },
      { name: 'TypeScript', level: 85, isRequired: true },
      { name: 'Node.js', level: 80, isRequired: false },
      { name: 'GraphQL', level: 75, isRequired: false },
      { name: 'AWS', level: 70, isRequired: false },
    ],
    missingSkills: [
      { name: 'Kubernetes', level: 0, isRequired: false }
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB',
        technologies: ['React', 'Node.js', 'MongoDB', 'Redux'],
        relevanceScore: 90
      },
      {
        name: 'Analytics Dashboard',
        description: 'Developed a real-time analytics dashboard for tracking user behavior',
        technologies: ['TypeScript', 'D3.js', 'Firebase'],
        relevanceScore: 75
      }
    ],
    experience: [
      {
        company: 'TechCorp Inc.',
        role: 'Senior Frontend Developer',
        duration: 'Jan 2020 - Present',
        description: 'Leading the frontend team in developing a SaaS platform',
        relevanceScore: 95
      },
      {
        company: 'WebSolutions LLC',
        role: 'Frontend Developer',
        duration: 'Mar 2018 - Dec 2019',
        description: 'Worked on multiple client projects using React and Angular',
        relevanceScore: 80
      }
    ],
    education: [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        year: '2018'
      }
    ],
    isMatch: true,
    feedback: [
      'Strong match for required technical skills',
      'Consider adding Kubernetes to your skillset',
      'Relevant project experience aligns well with job requirements'
    ]
  },
  {
    id: '2',
    name: 'John Doe',
    matchScore: 65,
    experienceYears: 3,
    skills: [
      { name: 'React', level: 80, isRequired: true },
      { name: 'JavaScript', level: 85, isRequired: false },
      { name: 'CSS', level: 90, isRequired: false },
    ],
    missingSkills: [
      { name: 'TypeScript', level: 0, isRequired: true },
      { name: 'GraphQL', level: 0, isRequired: false },
      { name: 'AWS', level: 0, isRequired: false },
    ],
    projects: [
      {
        name: 'Social Media App',
        description: 'Built a social media app with React and Firebase',
        technologies: ['React', 'Firebase', 'CSS'],
        relevanceScore: 70
      }
    ],
    experience: [
      {
        company: 'StartupXYZ',
        role: 'Frontend Developer',
        duration: 'Jun 2020 - Present',
        description: 'Developing user interfaces for web applications',
        relevanceScore: 75
      }
    ],
    education: [
      {
        institution: 'City College',
        degree: 'Bachelor of Arts',
        field: 'Web Development',
        year: '2020'
      }
    ],
    isMatch: false,
    feedback: [
      'Missing key required skill: TypeScript',
      'Consider gaining experience with GraphQL and AWS',
      'Projects show good React experience, but more complex projects would be beneficial'
    ]
  },
  {
    id: '3',
    name: 'Alex Johnson',
    matchScore: 92,
    experienceYears: 7,
    skills: [
      { name: 'React', level: 95, isRequired: true },
      { name: 'TypeScript', level: 90, isRequired: true },
      { name: 'Node.js', level: 88, isRequired: false },
      { name: 'GraphQL', level: 92, isRequired: false },
      { name: 'AWS', level: 85, isRequired: false },
      { name: 'Kubernetes', level: 80, isRequired: false }
    ],
    missingSkills: [],
    projects: [
      {
        name: 'Enterprise CRM',
        description: 'Led development of an enterprise CRM system using React and GraphQL',
        technologies: ['React', 'TypeScript', 'GraphQL', 'AWS'],
        relevanceScore: 98
      },
      {
        name: 'Microservice Architecture',
        description: 'Redesigned monolithic application into microservices',
        technologies: ['Node.js', 'Docker', 'Kubernetes', 'AWS'],
        relevanceScore: 90
      }
    ],
    experience: [
      {
        company: 'Enterprise Solutions Inc.',
        role: 'Lead Developer',
        duration: 'Mar 2019 - Present',
        description: 'Leading a team of 8 developers building enterprise solutions',
        relevanceScore: 95
      },
      {
        company: 'Tech Innovators',
        role: 'Senior Developer',
        duration: 'Jan 2016 - Feb 2019',
        description: 'Developed complex web applications using React and Node.js',
        relevanceScore: 90
      }
    ],
    education: [
      {
        institution: 'Tech University',
        degree: 'Master of Science',
        field: 'Software Engineering',
        year: '2016'
      },
      {
        institution: 'State College',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        year: '2014'
      }
    ],
    isMatch: true,
    feedback: [
      'Exceptional match across all required skills',
      'Strong experience in leadership roles',
      'Project experience directly relevant to job requirements'
    ]
  }
];

const mockJobDescription: JobDescription = {
  title: 'Senior Frontend Developer',
  company: 'TechCorp Inc.',
  requiredSkills: ['React', 'TypeScript'],
  preferredSkills: ['GraphQL', 'AWS', 'Node.js', 'Kubernetes'],
  requiredExperience: 3,
  responsibilities: [
    'Develop and maintain frontend applications using React and TypeScript',
    'Collaborate with backend developers to integrate APIs',
    'Optimize applications for maximum speed and scalability',
    'Design and implement new features and functionality'
  ]
};

const mockRecruiterPreferences: RecruiterPreferences = {
  mustHaveSkills: ['React', 'TypeScript'],
  niceToHaveSkills: ['GraphQL', 'AWS', 'Kubernetes'],
  minimumExperience: 3,
  cultureFitNotes: 'Looking for a team player with good communication skills',
  otherPreferences: ['Experience in agile environment', 'Problem-solving mindset']
};

// Simulated API functions
export const analyzeResumes = async (
  resumeFiles: File[],
  jobDescription?: File,
  recruiterPreferences?: File
): Promise<AnalysisResults> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // In a real implementation, this would:
      // 1. Extract text from PDFs
      // 2. Call the Ollama API with deepseekr1 model
      // 3. Process the results
      
      const results: AnalysisResults = {
        candidates: mockCandidates,
        jobDescription: mockJobDescription,
        recruiterPreferences: mockRecruiterPreferences
      };
      
      resolve(results);
    }, 3000); // Simulate 3 second processing time
  });
};

// This function would be implemented to call the Ollama API with the deepseekr1 model
export const processWithOllama = async (
  prompt: string,
  modelName: string = 'deepseekr1:1.5b'
): Promise<string> => {
  // In a real implementation, this would make a fetch request to your Ollama API
  // Example:
  /*
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: modelName,
      prompt: prompt,
      stream: false,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to process with Ollama');
  }
  
  const data = await response.json();
  return data.response;
  */
  
  // For now, return a mock response
  return "Mock Ollama API response";
};

// Helper function that would extract text from PDF files using a PDF library
export const extractTextFromPdf = async (file: File): Promise<string> => {
  // In a real implementation, you would use a PDF extraction library
  // Example with pdf.js:
  /*
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument(arrayBuffer).promise;
  let text = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => 'str' in item ? item.str : '').join(' ');
  }
  
  return text;
  */
  
  // For now, return a mock text
  return `Mock extracted text from ${file.name}`;
};
