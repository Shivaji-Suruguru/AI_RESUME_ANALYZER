
import React from 'react';
import { Card } from '@/components/ui/card';
import { Loader2, FileText, Brain } from 'lucide-react';

interface LoadingStateProps {
  state: 'uploading' | 'analyzing';
  progress?: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ state, progress = 0 }) => {
  const steps = [
    { id: 'upload', title: 'Uploading files', icon: FileText, completed: state !== 'uploading' },
    { id: 'analyze', title: 'Analyzing resumes', icon: Brain, completed: false }
  ];
  
  const currentStepIndex = state === 'uploading' ? 0 : 1;
  
  return (
    <Card className="p-8 max-w-lg mx-auto text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 text-resume-blue animate-spin" />
          <svg
            className="absolute inset-0"
            viewBox="0 0 100 100"
            width="48"
            height="48"
          >
            <circle
              className="text-resume-blue/20"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            <circle
              className="text-resume-blue"
              strokeWidth="8"
              strokeDasharray={264}
              strokeDashoffset={264 - (progress / 100) * 264}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
          </svg>
        </div>
        
        <h3 className="text-xl font-semibold mt-4">
          {state === 'uploading' ? 'Uploading Files' : 'Analyzing Resumes'}
        </h3>
        
        <p className="text-resume-gray max-w-xs">
          {state === 'uploading' 
            ? 'Uploading your files. This should only take a moment.' 
            : 'Our AI is analyzing resumes against job requirements. This may take a minute.'}
        </p>
        
        <div className="w-full max-w-xs mt-6">
          <div className="progress-bar">
            <div 
              className="progress-bar-fill bg-resume-blue animate-pulse"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-resume-gray mt-2">{progress}% Complete</p>
        </div>
        
        <div className="w-full max-w-xs mt-8">
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isActive = index === currentStepIndex;
              const StepIcon = step.icon;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`rounded-full p-2 mr-3 ${
                    step.completed 
                      ? 'bg-resume-blue/10 text-resume-blue' 
                      : isActive 
                        ? 'bg-resume-blue/10 text-resume-blue' 
                        : 'bg-resume-gray/10 text-resume-gray'
                  }`}>
                    {step.completed ? (
                      <StepIcon className="h-5 w-5" />
                    ) : isActive ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium ${
                      step.completed 
                        ? 'text-resume-blue'
                        : isActive 
                          ? 'text-foreground' 
                          : 'text-resume-gray'
                    }`}>
                      {step.title}
                    </p>
                    {step.completed && (
                      <p className="text-xs text-resume-success">Completed</p>
                    )}
                    {isActive && (
                      <p className="text-xs text-resume-blue animate-pulse-opacity">In progress...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LoadingState;
