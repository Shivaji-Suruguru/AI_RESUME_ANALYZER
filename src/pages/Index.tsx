
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  FileUploadStatus, 
  AnalysisResults, 
  AnalysisState, 
  Candidate 
} from '@/types';
import FileUpload from '@/components/FileUpload';
import LoadingState from '@/components/LoadingState';
import ResumeAnalysis from '@/components/ResumeAnalysis';
import RankingList from '@/components/RankingList';
import { analyzeResumes } from '@/services/resumeAnalyzer';
import { useToast } from '@/hooks/use-toast';
import { FileText, Briefcase, Brain, ChevronRight } from 'lucide-react';

const Index = () => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>(AnalysisState.INITIAL);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadStatus[]>([]);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const { toast } = useToast();

  // Effect to simulate progress updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (analysisState === AnalysisState.UPLOADING) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            setAnalysisState(AnalysisState.ANALYZING);
            setProgress(0);
            return 100;
          }
          return newProgress;
        });
      }, 300);
    } else if (analysisState === AnalysisState.ANALYZING) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setAnalysisState(AnalysisState.COMPLETE);
            return 100;
          }
          return newProgress;
        });
      }, 500);
    }
    
    return () => clearInterval(interval);
  }, [analysisState]);

  // Find the selected candidate from results
  const selectedCandidate = results?.candidates.find(c => c.id === selectedCandidateId);

  // Handle file uploads (resumes)
  const handleResumeUpload = (files: FileList) => {
    const newFiles = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(2),
      name: file.name,
      type: 'resume' as const,
      status: 'complete' as const,
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    toast({
      title: "Files uploaded",
      description: `${files.length} ${files.length === 1 ? 'file' : 'files'} uploaded successfully.`
    });
  };

  // Handle file uploads (job description)
  const handleJobDescriptionUpload = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      const newFile = {
        id: Math.random().toString(36).substring(2),
        name: file.name,
        type: 'jobDescription' as const,
        status: 'complete' as const,
      };
      
      // Replace any existing job description
      setUploadedFiles(prev => [
        ...prev.filter(f => f.type !== 'jobDescription'),
        newFile
      ]);
      
      toast({
        title: "Job description uploaded",
        description: `${file.name} uploaded successfully.`
      });
    }
  };

  // Handle file uploads (recruiter preferences)
  const handlePreferencesUpload = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      const newFile = {
        id: Math.random().toString(36).substring(2),
        name: file.name,
        type: 'preferences' as const,
        status: 'complete' as const,
      };
      
      // Replace any existing preferences
      setUploadedFiles(prev => [
        ...prev.filter(f => f.type !== 'preferences'),
        newFile
      ]);
      
      toast({
        title: "Recruiter preferences uploaded",
        description: `${file.name} uploaded successfully.`
      });
    }
  };

  // Start the analysis process
  const handleStartAnalysis = async () => {
    const resumeFiles = uploadedFiles.filter(file => file.type === 'resume');
    
    if (resumeFiles.length === 0) {
      toast({
        title: "No resumes uploaded",
        description: "Please upload at least one resume file.",
        variant: "destructive"
      });
      return;
    }
    
    setAnalysisState(AnalysisState.UPLOADING);
    setProgress(0);
    
    try {
      // In a real implementation, we would extract the actual files from uploadedFiles
      // For now, we'll use mock data
      const mockFiles = resumeFiles.map(() => new File([''], 'mock-file.pdf', { type: 'application/pdf' }));
      
      // Simulate the analysis process
      const results = await analyzeResumes(
        mockFiles,
        // Job description and preferences would also be passed here in a real implementation
      );
      
      setResults(results);
      
      // Set the first candidate as selected by default
      if (results.candidates.length > 0) {
        setSelectedCandidateId(results.candidates[0].id);
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisState(AnalysisState.ERROR);
      
      toast({
        title: "Analysis failed",
        description: "An error occurred during analysis. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Reset the application state
  const handleReset = () => {
    setAnalysisState(AnalysisState.INITIAL);
    setUploadedFiles([]);
    setResults(null);
    setSelectedCandidateId(null);
    setProgress(0);
  };

  // Render based on the current analysis state
  const renderContent = () => {
    switch (analysisState) {
      case AnalysisState.INITIAL:
        return (
          <div className="container mx-auto max-w-5xl py-10 px-4">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Resume Analyzer AI</h1>
              <p className="text-resume-gray max-w-2xl mx-auto">
                Upload resumes, job descriptions, and recruiter preferences to get AI-powered insights, 
                feedback, and rankings for your candidates.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <FileUpload
                title="Upload Resumes"
                description="Drag and drop resume files or click to browse"
                onFilesSelected={handleResumeUpload}
                uploadStatus={uploadedFiles.filter(file => file.type === 'resume')}
                multiple={true}
                maxFiles={5}
                acceptedFileTypes=".pdf,.docx,.txt"
              />
              
              <div className="grid gap-6">
                <FileUpload
                  title="Upload Job Description"
                  description="Add the job description document"
                  onFilesSelected={handleJobDescriptionUpload}
                  uploadStatus={uploadedFiles.filter(file => file.type === 'jobDescription')}
                  multiple={false}
                  acceptedFileTypes=".pdf,.docx,.txt"
                />
                
                <FileUpload
                  title="Upload Recruiter Preferences"
                  description="Add specific recruiter requirements"
                  onFilesSelected={handlePreferencesUpload}
                  uploadStatus={uploadedFiles.filter(file => file.type === 'preferences')}
                  multiple={false}
                  acceptedFileTypes=".pdf,.docx,.txt,.json"
                />
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={handleStartAnalysis} 
                disabled={uploadedFiles.filter(file => file.type === 'resume').length === 0}
                className="bg-resume-blue hover:bg-resume-darkBlue text-white px-6 py-2"
              >
                <Brain className="mr-2 h-5 w-5" />
                Start Analysis
              </Button>
            </div>
          </div>
        );
        
      case AnalysisState.UPLOADING:
      case AnalysisState.ANALYZING:
        return (
          <div className="container mx-auto py-16 px-4">
            <LoadingState 
              state={analysisState === AnalysisState.UPLOADING ? 'uploading' : 'analyzing'}
              progress={progress}
            />
          </div>
        );
        
      case AnalysisState.COMPLETE:
        if (!results || results.candidates.length === 0) {
          return (
            <div className="container mx-auto max-w-xl py-16 px-4 text-center">
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-2">No Results Found</h2>
                <p className="text-resume-gray mb-6">
                  No analysis results were generated. This could be due to issues with the uploaded files.
                </p>
                <Button onClick={handleReset}>Try Again</Button>
              </Card>
            </div>
          );
        }
        
        return (
          <div className="container mx-auto max-w-7xl py-10 px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Analysis Results</h2>
              <Button variant="outline" onClick={handleReset}>Analyze New Resumes</Button>
            </div>
            
            <div className="grid md:grid-cols-7 gap-6">
              <div className="md:col-span-2">
                <RankingList 
                  candidates={results.candidates} 
                  onSelectCandidate={setSelectedCandidateId}
                  selectedCandidateId={selectedCandidateId || undefined}
                />
              </div>
              
              <div className="md:col-span-5">
                {selectedCandidate ? (
                  <ResumeAnalysis candidate={selectedCandidate} />
                ) : (
                  <Card className="h-full flex items-center justify-center p-8 text-center">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Select a Candidate</h3>
                      <p className="text-resume-gray">
                        Select a candidate from the ranking list to view detailed analysis.
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        );
        
      case AnalysisState.ERROR:
        return (
          <div className="container mx-auto max-w-xl py-16 px-4 text-center">
            <Card className="p-8">
              <h2 className="text-xl font-semibold mb-2 text-resume-danger">Analysis Error</h2>
              <p className="text-resume-gray mb-6">
                An error occurred during the analysis process. Please try again or contact support if the issue persists.
              </p>
              <Button onClick={handleReset}>Try Again</Button>
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}
    </div>
  );
};

export default Index;
