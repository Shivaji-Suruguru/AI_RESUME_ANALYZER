
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Star,
  Brain,
  CheckCircle,
  AlertCircle 
} from 'lucide-react';

interface RealtimeData {
  totalResumes: number;
  analyzedResumes: number;
  averageScore: number;
  topSkills: { name: string; count: number; percentage: number }[];
  recentAnalysis: {
    candidateName: string;
    score: number;
    status: 'excellent' | 'good' | 'average' | 'needs_improvement';
    timestamp: string;
  }[];
  scoreDistribution: {
    excellent: number; // 80-100
    good: number; // 60-79
    average: number; // 40-59
    poor: number; // 0-39
  };
}

interface RealtimeResumeAnalyticsProps {
  isAnalyzing: boolean;
  uploadedCount: number;
}

const RealtimeResumeAnalytics: React.FC<RealtimeResumeAnalyticsProps> = ({ 
  isAnalyzing, 
  uploadedCount 
}) => {
  const [data, setData] = useState<RealtimeData>({
    totalResumes: 0,
    analyzedResumes: 0,
    averageScore: 0,
    topSkills: [],
    recentAnalysis: [],
    scoreDistribution: { excellent: 0, good: 0, average: 0, poor: 0 }
  });

  // Simulate real-time data updates during analysis
  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      setData(prev => {
        const newAnalyzedCount = Math.min(prev.analyzedResumes + 1, uploadedCount);
        const progress = newAnalyzedCount / uploadedCount;
        
        // Generate realistic data
        const mockSkills = [
          'React', 'JavaScript', 'Python', 'Node.js', 'TypeScript', 
          'AWS', 'Docker', 'SQL', 'Git', 'Java'
        ];
        
        const topSkills = mockSkills.slice(0, 5).map((skill, index) => ({
          name: skill,
          count: Math.floor(newAnalyzedCount * (0.8 - index * 0.1)),
          percentage: Math.floor((0.8 - index * 0.1) * 100)
        }));

        // Generate score distribution
        const excellent = Math.floor(newAnalyzedCount * 0.25);
        const good = Math.floor(newAnalyzedCount * 0.35);
        const average = Math.floor(newAnalyzedCount * 0.25);
        const poor = newAnalyzedCount - excellent - good - average;

        const averageScore = Math.floor(65 + progress * 10);

        // Add new analysis result
        const newResult = {
          candidateName: `Candidate ${newAnalyzedCount}`,
          score: Math.floor(Math.random() * 40) + 60,
          status: (Math.random() > 0.3 ? 'good' : 'excellent') as 'excellent' | 'good',
          timestamp: new Date().toLocaleTimeString()
        };

        return {
          totalResumes: uploadedCount,
          analyzedResumes: newAnalyzedCount,
          averageScore,
          topSkills,
          recentAnalysis: [newResult, ...prev.recentAnalysis.slice(0, 4)],
          scoreDistribution: { excellent, good, average, poor }
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnalyzing, uploadedCount]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'needs_improvement': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <Star className="h-4 w-4" />;
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'average': return <Clock className="h-4 w-4" />;
      case 'needs_improvement': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (data.totalResumes === 0) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
            <Users className="h-4 w-4 text-resume-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalResumes}</div>
            <p className="text-xs text-muted-foreground">Uploaded for analysis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analyzed</CardTitle>
            <Brain className="h-4 w-4 text-resume-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.analyzedResumes}</div>
            <Progress 
              value={(data.analyzedResumes / data.totalResumes) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Trophy className="h-4 w-4 text-resume-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Looking good
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Matches</CardTitle>
            <CheckCircle className="h-4 w-4 text-resume-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.scoreDistribution.excellent}</div>
            <p className="text-xs text-muted-foreground">80%+ match score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Skills Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topSkills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-resume-gray">{skill.count} candidates</span>
                  </div>
                  <Progress value={skill.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recentAnalysis.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-resume-lightGray/30 rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <div>
                      <p className="text-sm font-medium">{result.candidateName}</p>
                      <p className="text-xs text-resume-gray">{result.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {result.score}%
                    </Badge>
                    <Badge className={getStatusColor(result.status)}>
                      {result.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {data.analyzedResumes > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{data.scoreDistribution.excellent}</div>
                <p className="text-xs text-resume-gray">Excellent (80-100%)</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{data.scoreDistribution.good}</div>
                <p className="text-xs text-resume-gray">Good (60-79%)</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{data.scoreDistribution.average}</div>
                <p className="text-xs text-resume-gray">Average (40-59%)</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{data.scoreDistribution.poor}</div>
                <p className="text-xs text-resume-gray">Poor (0-39%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RealtimeResumeAnalytics;
