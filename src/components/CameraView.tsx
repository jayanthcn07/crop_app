import { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, CameraOff, RefreshCw, SwitchCamera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CameraViewProps {
  onCapture: (video: HTMLVideoElement) => void;
  isAnalyzing: boolean;
  autoCapture?: boolean;
  captureInterval?: number;
}

const CameraView = ({ 
  onCapture, 
  isAnalyzing, 
  autoCapture = false,
  captureInterval = 3000 
}: CameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please ensure camera permissions are granted.');
      setIsStreaming(false);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const handleCapture = useCallback(() => {
    if (videoRef.current && isStreaming && !isAnalyzing) {
      onCapture(videoRef.current);
    }
  }, [isStreaming, isAnalyzing, onCapture]);

  const toggleCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  }, []);

  useEffect(() => {
    if (facingMode && isStreaming) {
      startCamera();
    }
  }, [facingMode]);

  useEffect(() => {
    if (autoCapture && isStreaming && !isAnalyzing) {
      intervalRef.current = setInterval(handleCapture, captureInterval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoCapture, isStreaming, isAnalyzing, captureInterval, handleCapture]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative aspect-video bg-secondary rounded-2xl overflow-hidden shadow-card">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={cn(
            "w-full h-full object-cover",
            !isStreaming && "hidden"
          )}
        />
        
        {!isStreaming && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <CameraOff className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center max-w-xs">
              {error || 'Camera is not active. Click below to start the camera.'}
            </p>
          </div>
        )}

        {isAnalyzing && isStreaming && (
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

        {isStreaming && (
          <>
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-foreground/80 text-background px-3 py-1.5 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
              LIVE
            </div>
            
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-primary rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-primary rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-primary rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-primary rounded-br-lg" />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        {!isStreaming ? (
          <Button onClick={startCamera} variant="hero" size="lg">
            <Camera className="w-5 h-5 mr-2" />
            Start Camera
          </Button>
        ) : (
          <>
            <Button onClick={stopCamera} variant="outline" size="lg">
              <CameraOff className="w-5 h-5 mr-2" />
              Stop
            </Button>
            <Button 
              onClick={handleCapture} 
              variant="hero" 
              size="lg"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Camera className="w-5 h-5 mr-2" />
              )}
              {isAnalyzing ? 'Analyzing...' : 'Capture & Analyze'}
            </Button>
            <Button onClick={toggleCamera} variant="secondary" size="icon">
              <SwitchCamera className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraView;
