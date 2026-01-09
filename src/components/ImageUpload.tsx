import { useRef, useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (imageBase64: string) => void;
  isAnalyzing: boolean;
}

const ImageUpload = ({ onImageSelect, isAnalyzing }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleAnalyze = () => {
    if (previewUrl) {
      onImageSelect(previewUrl);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative aspect-video bg-secondary rounded-2xl overflow-hidden shadow-card transition-all duration-300",
          isDragging && "ring-2 ring-primary ring-offset-2 ring-offset-background",
          !previewUrl && "border-2 border-dashed border-muted-foreground/30"
        )}
      >
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Uploaded leaf"
              className="w-full h-full object-contain bg-secondary"
            />
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 p-2 bg-foreground/80 text-background rounded-full hover:bg-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            {isAnalyzing && (
              <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-primary/30 rounded-full" />
                    <div className="absolute inset-0 w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                  <span className="text-primary-foreground font-medium bg-primary/90 px-4 py-2 rounded-full">
                    Analyzing...
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 hover:bg-muted/50 transition-colors"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Upload className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground mb-1">
                Drop your image here or click to upload
              </p>
              <p className="text-sm text-muted-foreground">
                Supports JPG, PNG, WebP • Max 10MB
              </p>
            </div>
          </button>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          size="lg"
        >
          <ImageIcon className="w-5 h-5 mr-2" />
          Choose Image
        </Button>
        
        {previewUrl && (
          <Button
            onClick={handleAnalyze}
            variant="hero"
            size="lg"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
            ) : (
              <Sparkles className="w-5 h-5 mr-2" />
            )}
            {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;