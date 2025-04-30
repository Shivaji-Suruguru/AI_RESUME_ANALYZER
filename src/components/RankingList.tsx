
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Candidate } from '@/types';
import { CheckCircle2, Trophy, ArrowUpDown } from 'lucide-react';

interface RankingListProps {
  candidates: Candidate[];
  onSelectCandidate: (candidateId: string) => void;
  selectedCandidateId?: string;
}

const RankingList: React.FC<RankingListProps> = ({ 
  candidates, 
  onSelectCandidate,
  selectedCandidateId 
}) => {
  // Sort candidates by match score (high to low)
  const sortedCandidates = [...candidates].sort((a, b) => b.matchScore - a.matchScore);
  
  return (
    <Card className="h-full overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-resume-blue" />
          <h3 className="font-semibold">Candidate Ranking</h3>
        </div>
        <div className="flex items-center text-xs text-resume-gray">
          <ArrowUpDown className="h-4 w-4 mr-1" />
          Sorted by match score
        </div>
      </div>
      
      <div className="overflow-y-auto max-h-[500px]">
        {sortedCandidates.map((candidate, index) => (
          <div 
            key={candidate.id}
            onClick={() => onSelectCandidate(candidate.id)}
            className={`p-4 border-b last:border-b-0 cursor-pointer transition-colors hover:bg-resume-lightGray/50 ${
              selectedCandidateId === candidate.id ? 'bg-resume-blue/5 border-l-4 border-l-resume-blue' : ''
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="bg-resume-blue/10 text-resume-blue w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <h4 className="font-medium">{candidate.name}</h4>
                {candidate.isMatch && (
                  <CheckCircle2 className="h-4 w-4 text-resume-success" />
                )}
              </div>
              
              <Badge variant={candidate.matchScore >= 70 ? "default" : "outline"}>
                {candidate.matchScore}% Match
              </Badge>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs text-resume-gray">{candidate.experienceYears} years experience</span>
              <span className="text-xs text-resume-gray">•</span>
              <span className="text-xs text-resume-gray">{candidate.skills.length} matched skills</span>
              {candidate.missingSkills.length > 0 && (
                <>
                  <span className="text-xs text-resume-gray">•</span>
                  <span className="text-xs text-resume-gray">{candidate.missingSkills.length} missing skills</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RankingList;
