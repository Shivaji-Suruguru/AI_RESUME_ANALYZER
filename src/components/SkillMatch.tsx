
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Skill } from '@/types';
import { Progress } from '@/components/ui/progress';

interface SkillMatchProps {
  matchedSkills: Skill[];
  missingSkills: Skill[];
  showMissing?: boolean;
}

const SkillMatch: React.FC<SkillMatchProps> = ({ 
  matchedSkills, 
  missingSkills,
  showMissing = true
}) => {
  // Sort skills by level (highest first)
  const sortedMatchedSkills = [...matchedSkills].sort((a, b) => b.level - a.level);
  
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-sm">Matched Skills</h4>
          <span className="text-xs text-resume-blue font-medium">
            {matchedSkills.length} skills
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sortedMatchedSkills.length > 0 ? (
            sortedMatchedSkills.map((skill, index) => (
              <div key={index} className="skill-tag skill-tag-matched">
                <CheckCircle className="w-3 h-3 mr-1" />
                {skill.name}
                {skill.isRequired && (
                  <span className="ml-1 inline-block w-2 h-2 bg-resume-blue rounded-full"></span>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-resume-gray">No matched skills found</p>
          )}
        </div>
      </div>
      
      {showMissing && missingSkills.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm">Missing Skills</h4>
            <span className="text-xs text-resume-gray font-medium">
              {missingSkills.length} skills
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <div key={index} className="skill-tag skill-tag-missing">
                <XCircle className="w-3 h-3 mr-1" />
                {skill.name}
                {skill.isRequired && (
                  <span className="ml-1 inline-block w-2 h-2 bg-resume-danger rounded-full"></span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {matchedSkills.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium text-sm">Top Skills Proficiency</h4>
          </div>
          <div className="space-y-3">
            {sortedMatchedSkills.slice(0, 5).map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium">{skill.name}</span>
                  <span className="text-xs text-resume-gray">{skill.level}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: getColorForLevel(skill.level)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function getColorForLevel(level: number): string {
  if (level >= 80) return '#10b981'; // Green for high levels
  if (level >= 50) return '#3b82f6'; // Blue for medium levels
  return '#f59e0b'; // Orange for lower levels
}

export default SkillMatch;
