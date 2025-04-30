
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, GraduationCap, Code, Award, LineChart } from 'lucide-react';
import { Candidate } from '@/types';
import SkillMatch from './SkillMatch';
import FeedbackCard from './FeedbackCard';

interface ResumeAnalysisProps {
  candidate: Candidate;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ candidate }) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Candidate Profile</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{candidate.name}</h3>
                  <p className="text-resume-gray">{candidate.experienceYears} Years of Experience</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  candidate.matchScore >= 70 ? 'bg-green-100 text-resume-success' : 
                  candidate.matchScore >= 50 ? 'bg-amber-100 text-resume-warning' : 
                  'bg-red-100 text-resume-danger'
                }`}>
                  {candidate.matchScore}% Match
                </div>
              </div>
            </div>
              
            <Tabs defaultValue="skills">
              <TabsList className="mb-4">
                <TabsTrigger value="skills" className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>Skills</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>Experience</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-1">
                  <Code className="h-4 w-4" />
                  <span>Projects</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span>Education</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills" className="p-1">
                <SkillMatch 
                  matchedSkills={candidate.skills} 
                  missingSkills={candidate.missingSkills} 
                />
              </TabsContent>
              
              <TabsContent value="experience">
                <div className="space-y-4">
                  {candidate.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-resume-blue pl-4 pb-4">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{exp.role}</h4>
                        <span className="text-sm text-resume-gray">{exp.duration}</span>
                      </div>
                      <p className="text-sm font-medium text-resume-blue mb-1">{exp.company}</p>
                      <p className="text-sm text-resume-gray">{exp.description}</p>
                      
                      {exp.relevanceScore !== undefined && (
                        <div className="mt-2 flex items-center">
                          <span className="text-xs text-resume-gray mr-2">Relevance:</span>
                          <div className="progress-bar w-32">
                            <div 
                              className="progress-bar-fill" 
                              style={{ 
                                width: `${exp.relevanceScore}%`,
                                backgroundColor: exp.relevanceScore >= 70 ? '#10b981' : '#3b82f6'
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="projects">
                <div className="space-y-4">
                  {candidate.projects.map((project, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-resume-gray mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-0.5 bg-resume-lightGray rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {project.relevanceScore !== undefined && (
                        <div className="mt-2 flex items-center">
                          <span className="text-xs text-resume-gray mr-2">Relevance:</span>
                          <div className="progress-bar w-32">
                            <div 
                              className="progress-bar-fill" 
                              style={{ 
                                width: `${project.relevanceScore}%`,
                                backgroundColor: project.relevanceScore >= 70 ? '#10b981' : '#3b82f6'
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="education">
                <div className="space-y-4">
                  {candidate.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-resume-blue pl-4 pb-4">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <span className="text-sm text-resume-gray">{edu.year}</span>
                      </div>
                      <p className="text-sm font-medium">{edu.field}</p>
                      <p className="text-sm text-resume-gray">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div>
          <FeedbackCard 
            isMatch={candidate.isMatch}
            feedback={candidate.feedback}
            matchScore={candidate.matchScore}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysis;
