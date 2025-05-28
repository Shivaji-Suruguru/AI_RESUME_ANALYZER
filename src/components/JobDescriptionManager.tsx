
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Briefcase } from 'lucide-react';

const JobDescriptionManager: React.FC = () => {
  const [activeJobs, setActiveJobs] = useState([
    {
      id: 1,
      title: "Senior React Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      status: "Active",
      applicants: 23,
      requiredSkills: ["React", "TypeScript", "Node.js", "GraphQL"],
      preferredSkills: ["AWS", "Docker", "Jest"],
      experience: "3+ years",
      postedDate: "2024-01-10"
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      location: "New York",
      type: "Full-time",
      status: "Active",
      applicants: 15,
      requiredSkills: ["Figma", "UI/UX Design", "Prototyping"],
      preferredSkills: ["Adobe Creative Suite", "User Research"],
      experience: "2+ years",
      postedDate: "2024-01-08"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Job Descriptions</h2>
          <p className="text-resume-gray">Manage job postings and requirements</p>
        </div>
        <Button className="bg-resume-blue hover:bg-resume-darkBlue">
          <Plus className="h-4 w-4 mr-2" />
          Create New Job
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Jobs ({activeJobs.length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts (2)</TabsTrigger>
          <TabsTrigger value="closed">Closed (5)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {activeJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-resume-blue/10 p-2 rounded-lg">
                      <Briefcase className="h-5 w-5 text-resume-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">{job.department}</Badge>
                        <Badge variant="outline">{job.location}</Badge>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {job.requiredSkills.map((skill, index) => (
                        <Badge key={index} className="bg-resume-blue/10 text-resume-blue">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <h4 className="font-medium mb-2">Preferred Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.preferredSkills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Experience Required:</span>
                      <span className="text-sm">{job.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Applications:</span>
                      <span className="text-sm font-semibold text-resume-blue">{job.applicants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Posted Date:</span>
                      <span className="text-sm">{job.postedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge className="bg-green-100 text-green-800">{job.status}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="draft">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-resume-gray">No draft job descriptions</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="closed">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-resume-gray">No closed job descriptions</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobDescriptionManager;
