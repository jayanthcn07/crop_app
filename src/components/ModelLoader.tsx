import { useEffect } from 'react';
import { Brain, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ModelLoaderProps {
  isLoading: boolean;
  progress: number;
  isReady: boolean;
  error: string | null;
  onLoadModel: () => void;
}

const ModelLoader = ({ isLoading, progress, isReady, error, onLoadModel }: ModelLoaderProps) => {
  if (isReady) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-success/10 border border-success/30 rounded-xl">
        <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
          <Check className="w-5 h-5 text-success" />
        </div>
        <div>
          <p className="font-semibold text-success">AI Model Ready</p>
          <p className="text-xs text-muted-foreground">Ready to detect plant diseases</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-destructive/10 border border-destructive/30 rounded-xl">
        <p className="text-destructive font-medium text-center">{error}</p>
        <Button onClick={onLoadModel} variant="destructive">
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 glass-card rounded-xl">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Brain className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <svg className="absolute inset-0 w-16 h-16 -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeDasharray={`${progress * 1.76} 176`}
              className="transition-all duration-300"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground">Loading AI Model</p>
          <p className="text-sm text-muted-foreground">{progress}% complete</p>
        </div>
        <div className="w-full max-w-xs h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full gradient-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center max-w-xs">
          Downloading plant disease detection model. This may take a moment on first load.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-8 glass-card rounded-xl text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
        <Brain className="w-10 h-10 text-primary" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-foreground mb-2">Load AI Detection Model</h3>
        <p className="text-muted-foreground text-sm max-w-md">
          The AI model will be downloaded to your browser for real-time plant disease detection. 
          This only needs to happen once per session.
        </p>
      </div>
      <Button onClick={onLoadModel} variant="hero" size="lg">
        <Brain className="w-5 h-5 mr-2" />
        Initialize AI Model
      </Button>
    </div>
  );
};

export default ModelLoader;
