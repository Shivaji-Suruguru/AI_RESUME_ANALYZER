import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Users, CheckCircle, Clock, Zap } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import RealtimeResumeAnalytics from '@/components/RealtimeResumeAnalytics';
import { FileUploadStatus } from '@/types';

const DashboardOverview: React.FC = () => {
  const [uploadStatus, setUploadStatus] = React.useState<FileUploadStatus[]>([]);
  const [jobRequirements, setJobRequirements] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const handleFilesSelected = (files: FileList) => {
    const newFiles: FileUploadStatus[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      status: 'uploading' as const,
      type: 'resume' as const
    }));

    setUploadStatus(prev => [...prev, ...newFiles]);

    // Simulate upload process
    newFiles.forEach((file, index) => {
      setTimeout(() => {
        setUploadStatus(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'complete' as const }
              : f
          )
        );
      }, 2000 + (index * 500));
    });

    console.log('Selected files for analysis:', files);
  };

  const handleStartAnalysis = () => {
    if (uploadStatus.length === 0) {
      alert('Please upload resumes first');
      return;
    }
    
    if (!jobRequirements.trim()) {
      alert('Please add job requirements');
      return;
    }

    setIsAnalyzing(true);
    console.log('Starting AI analysis with job requirements:', jobRequirements);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      console.log('Analysis completed');
      // Here you would typically navigate to results or update the UI
    }, 5000);
  };

  const completedUploads = uploadStatus.filter(f => f.status === 'complete').length;

  const stats = [
    {
      title: "Total Resumes",
      value: "156",
      icon: FileText,
      change: "+12%",
      color: "text-resume-blue"
    },
    {
      title: "Qualified Candidates",
      value: "89",
      icon: CheckCircle,
      change: "+8%",
      color: "text-resume-success"
    },
    {
      title: "Pending Review",
      value: "23",
      icon: Clock,
      change: "-5%",
      color: "text-resume-warning"
    },
    {
      title: "Active Jobs",
      value: "7",
      icon: Users,
      change: "+2%",
      color: "text-resume-blue"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-resume-gray">Monitor your recruitment analytics and candidate pipeline</p>
      </div>
      
      {/* Resume Upload Section */}
      <div className="bg-gradient-to-r from-resume-blue/5 to-resume-success/5 rounded-lg p-6 border border-resume-blue/20">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">AI Resume Analysis</h3>
          <p className="text-resume-gray">Upload hundreds of resumes to analyze them with AI and find the best candidates</p>
        </div>
        <FileUpload
          onFilesSelected={handleFilesSelected}
          uploadStatus={uploadStatus}
          title="Upload Resumes for AI Analysis"
          description="Drag and drop your resume files here or click to browse. Supports bulk uploads for efficient processing."
          acceptedFileTypes=".pdf,.docx,.txt"
          multiple={true}
          maxFiles={100}
        />
      </div>

      {/* Job Requirements Section */}
      <Card>
        <CardHeader>
          <CardTitle>Job Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="job-requirements">Describe your ideal candidate and job requirements</Label>
            <Textarea
              id="job-requirements"
              placeholder="Enter job requirements, required skills, experience level, qualifications, and any other criteria you want the AI to consider when analyzing resumes..."
              value={jobRequirements}
              onChange={(e) => setJobRequirements(e.target.value)}
              className="min-h-[120px] mt-2"
            />
          </div>
          <Button 
            onClick={handleStartAnalysis}
            disabled={isAnalyzing || uploadStatus.length === 0}
            className="w-full bg-resume-blue hover:bg-resume-blue/90"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Zap className="mr-2 h-4 w-4 animate-pulse" />
                Analyzing Resumes...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Start AI Analysis ({uploadStatus.filter(f => f.status === 'complete').length} resumes)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Real-time Analytics Section */}
      {(isAnalyzing || completedUploads > 0) && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Live Analysis Results</h3>
          <RealtimeResumeAnalytics 
            isAnalyzing={isAnalyzing} 
            uploadedCount={completedUploads}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-resume-success' : 'text-resume-danger'}>
                  {stat.change}
                </span>
                {" "}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New resume analyzed", candidate: "John Smith", time: "2 minutes ago" },
                { action: "Job description updated", job: "Senior Developer", time: "1 hour ago" },
                { action: "Candidate matched", candidate: "Sarah Wilson", time: "3 hours ago" },
                { action: "Interview scheduled", candidate: "Mike Johnson", time: "5 hours ago" }
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-resume-gray">
                      {activity.candidate || activity.job}
                    </p>
                  </div>
                  <span className="text-xs text-resume-gray">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Skills in Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { skill: "React", count: 45, percentage: 90 },
                { skill: "Python", count: 38, percentage: 76 },
                { skill: "TypeScript", count: 32, percentage: 64 },
                { skill: "Node.js", count: 28, percentage: 56 },
                { skill: "AWS", count: 25, percentage: 50 }
              ].map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{skill.skill}</span>
                    <span className="text-resume-gray">{skill.count} resumes</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill bg-resume-blue" 
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
