
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, Filter, Download, Eye } from 'lucide-react';

const CandidateListView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior React Developer",
      matchScore: 95,
      experience: "5 years",
      skills: ["React", "TypeScript", "Node.js"],
      status: "Qualified",
      uploadDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Full Stack Developer",
      matchScore: 88,
      experience: "3 years",
      skills: ["Vue.js", "Python", "PostgreSQL"],
      status: "Under Review",
      uploadDate: "2024-01-14"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Frontend Developer",
      matchScore: 72,
      experience: "2 years",
      skills: ["Angular", "JavaScript", "CSS"],
      status: "Needs Improvement",
      uploadDate: "2024-01-13"
    },
    {
      id: 4,
      name: "David Kim",
      position: "Backend Developer",
      matchScore: 85,
      experience: "4 years",
      skills: ["Java", "Spring", "MySQL"],
      status: "Qualified",
      uploadDate: "2024-01-12"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Qualified': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Needs Improvement': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Resume Management</h2>
          <p className="text-resume-gray">Manage and review candidate resumes</p>
        </div>
        <Button className="bg-resume-blue hover:bg-resume-darkBlue">
          <Download className="h-4 w-4 mr-2" />
          Export List
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Candidate List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Top Skills</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>{candidate.position}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${getMatchScoreColor(candidate.matchScore)}`}>
                      {candidate.matchScore}%
                    </span>
                  </TableCell>
                  <TableCell>{candidate.experience}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {candidate.skills.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{candidate.uploadDate}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateListView;
