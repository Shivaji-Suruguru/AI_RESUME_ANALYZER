
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, ArrowUp } from 'lucide-react';

interface FeedbackCardProps {
  isMatch: boolean;
  feedback: string[];
  matchScore: number;
  onViewDetails?: () => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ 
  isMatch, 
  feedback, 
  matchScore,
  onViewDetails
}) => {
  return (
    <Card className="p-6 h-full">
      <div className="flex items-center mb-4">
        {isMatch ? (
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <CheckCircle2 className="h-6 w-6 text-resume-success" />
          </div>
        ) : (
          <div className="bg-amber-100 p-2 rounded-full mr-3">
            <AlertCircle className="h-6 w-6 text-resume-warning" />
          </div>
        )}
        
        <div>
          <h3 className="font-semibold">
            {isMatch ? "Profile Match" : "Improvement Needed"}
          </h3>
          <p className="text-sm text-resume-gray">
            {isMatch 
              ? "This resume meets or exceeds the requirements" 
              : "This resume doesn't fully meet the requirements yet"}
          </p>
        </div>
      </div>
      
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Match Score</span>
          <span className={`text-sm font-medium ${
            matchScore >= 70 ? 'text-resume-success' : 
            matchScore >= 50 ? 'text-resume-warning' : 
            'text-resume-danger'
          }`}>
            {matchScore}%
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${matchScore}%`,
              backgroundColor: 
                matchScore >= 70 ? '#10b981' : 
                matchScore >= 50 ? '#f59e0b' : 
                '#ef4444'
            }}
          />
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <h4 className="font-medium">Feedback & Suggestions:</h4>
        <ul className="space-y-2">
          {feedback.map((item, index) => (
            <li key={index} className="text-sm flex items-start">
              <ArrowUp className="h-4 w-4 text-resume-blue mr-2 mt-0.5 rotate-45" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {onViewDetails && (
        <button 
          onClick={onViewDetails}
          className="text-sm text-resume-blue hover:text-resume-darkBlue font-medium"
        >
          View detailed analysis →
        </button>
      )}
    </Card>
  );
};

export default FeedbackCard;
