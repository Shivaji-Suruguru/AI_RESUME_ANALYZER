
import React, { useState, useRef } from 'react';
import { Upload, FileText, File, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileUploadStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFilesSelected: (files: FileList) => void;
  uploadStatus: FileUploadStatus[];
  title: string;
  description: string;
  acceptedFileTypes?: string;
  multiple?: boolean;
  maxFiles?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  uploadStatus,
  title,
  description,
  acceptedFileTypes = ".pdf,.docx,.txt",
  multiple = false,
  maxFiles = 5
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload up to ${maxFiles} files at once.`,
        variant: "destructive"
      });
      return;
    }

    const validFiles = Array.from(e.dataTransfer.files).filter(file => {
      const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
      return acceptedFileTypes.includes(fileExt);
    });

    if (validFiles.length !== e.dataTransfer.files.length) {
      toast({
        title: "Invalid file type",
        description: `Only ${acceptedFileTypes} files are accepted.`,
        variant: "destructive"
      });
    }

    if (validFiles.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length > maxFiles) {
        toast({
          title: "Too many files",
          description: `You can only upload up to ${maxFiles} files at once.`,
          variant: "destructive"
        });
        return;
      }
      onFilesSelected(e.target.files);
    }
  };

  const handleRemoveFile = (id: string) => {
    // This would typically call a function passed from the parent component
    console.log("Remove file:", id);
    // onRemoveFile(id);
  };

  return (
    <Card className="p-6">
      <div 
        className={`border-2 rounded-lg p-8 text-center ${
          isDragging ? 'drag-active border-resume-blue bg-resume-blue/5' : 'border-dashed border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mx-auto mb-4 bg-resume-blue/10 rounded-full p-3 w-16 h-16 flex items-center justify-center">
          <Upload className="h-8 w-8 text-resume-blue" />
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-500 mb-4">{description}</p>
        
        <Button 
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="border-resume-blue text-resume-blue hover:bg-resume-blue/10"
        >
          Select Files
        </Button>
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileInputChange}
          accept={acceptedFileTypes}
          multiple={multiple}
        />
        
        <p className="text-xs text-gray-400 mt-3">
          Supported formats: {acceptedFileTypes.split(',').join(', ')}
        </p>
      </div>
      
      {uploadStatus.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Uploaded files</p>
          <div className="space-y-2">
            {uploadStatus.map((file) => (
              <div key={file.id} className="file-item">
                {file.type === 'resume' ? (
                  <FileText className="h-5 w-5 text-resume-blue mr-2" />
                ) : (
                  <File className="h-5 w-5 text-resume-blue mr-2" />
                )}
                <span className="text-sm flex-1 truncate">{file.name}</span>
                
                {file.status === 'uploading' ? (
                  <Loader2 className="h-5 w-5 animate-spin text-resume-blue" />
                ) : file.status === 'error' ? (
                  <span className="text-xs text-resume-danger">{file.error}</span>
                ) : (
                  <button 
                    onClick={() => handleRemoveFile(file.id)}
                    className="text-gray-400 hover:text-resume-danger"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default FileUpload;
