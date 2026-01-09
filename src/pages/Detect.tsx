import { useState, useCallback } from 'react';
import { Camera, History, Trash2, Sparkles, Zap, Upload } from 'lucide-react';
import Header from '@/components/Header';
import CameraView from '@/components/CameraView';
import ImageUpload from '@/components/ImageUpload';
import AdvancedDiseaseResult from '@/components/AdvancedDiseaseResult';
import { Button } from '@/components/ui/button';
import { usePlantAnalyzer, AnalysisResult } from '@/hooks/usePlantAnalyzer';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

interface DetectionResult {
  id: string;
  result: AnalysisResult;
  timestamp: Date;
  capturedImage: string;
}

const Detect = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { isAnalyzing, error, analyze, saveToHistory } = usePlantAnalyzer();
  
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null);
  const [history, setHistory] = useState<DetectionResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [inputMode, setInputMode] = useState<'camera' | 'upload'>('camera');

  const handleCapture = useCallback(async (video: HTMLVideoElement) => {
    try {
      // Capture image from video
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(video, 0, 0);
      const capturedImage = canvas.toDataURL('image/jpeg', 0.9);

      // Analyze the image with AI
      const result = await analyze(video);
      
      if (result) {
        const detection: DetectionResult = {
          id: Date.now().toString(),
          result,
          timestamp: new Date(),
          capturedImage
        };
        
        setCurrentResult(detection);
        setHistory(prev => [detection, ...prev].slice(0, 10));
        saveToHistory(result, capturedImage);
        
        if (!result.isLeaf) {
          toast({
            title: "Invalid Image",
            description: "Please capture a plant leaf for disease detection.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Analysis Complete",
            description: result.disease 
              ? `Detected: ${result.disease} (${Math.round(result.confidence * 100)}% confidence)`
              : `Plant appears healthy (${Math.round(result.confidence * 100)}% confidence)`,
          });
        }
      }
    } catch (err) {
      console.error('Analysis error:', err);
      toast({
        title: "Analysis Failed",
        description: error || "Unable to analyze the image. Please try again.",
        variant: "destructive"
      });
    }
  }, [analyze, toast, error, saveToHistory]);

  const handleImageUpload = useCallback(async (imageBase64: string) => {
    try {
      const result = await analyze(imageBase64);
      
      if (result) {
        const detection: DetectionResult = {
          id: Date.now().toString(),
          result,
          timestamp: new Date(),
          capturedImage: imageBase64
        };
        
        setCurrentResult(detection);
        setHistory(prev => [detection, ...prev].slice(0, 10));
        saveToHistory(result, imageBase64);
        
        if (!result.isLeaf) {
          toast({
            title: "Invalid Image",
            description: "Please upload an image of a plant leaf for disease detection.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Analysis Complete",
            description: result.disease 
              ? `Detected: ${result.disease} on ${result.plantName} (${Math.round(result.confidence * 100)}% confidence)`
              : `${result.plantName} appears healthy (${Math.round(result.confidence * 100)}% confidence)`,
          });
        }
      }
    } catch (err) {
      console.error('Analysis error:', err);
      toast({
        title: "Analysis Failed",
        description: error || "Unable to analyze the image. Please try again.",
        variant: "destructive"
      });
    }
  }, [analyze, toast, error, saveToHistory]);

  const clearHistory = () => {
    setHistory([]);
    toast({
      title: "History Cleared",
      description: "All previous detections have been removed.",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'healthy': return 'bg-success/20 text-success';
      case 'low': return 'bg-primary/20 text-primary';
      case 'medium': return 'bg-warning/20 text-warning';
      case 'high': case 'critical': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered Analysis • 98%+ {t('stats.accuracy')}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('detect.title')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('detect.subtitle')}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Camera Section */}
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl shadow-card">
                <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as 'camera' | 'upload')}>
                  <div className="flex items-center justify-between mb-4">
                    <TabsList>
                      <TabsTrigger value="camera" className="gap-2">
                        <Camera className="w-4 h-4" />
                        {t('detect.camera')}
                      </TabsTrigger>
                      <TabsTrigger value="upload" className="gap-2">
                        <Upload className="w-4 h-4" />
                        {t('detect.upload')}
                      </TabsTrigger>
                    </TabsList>
                    <Badge variant="outline" className="gap-1.5">
                      <Zap className="w-3 h-3 text-success" />
                      AI Ready
                    </Badge>
                  </div>
                  
                  <TabsContent value="camera">
                    <CameraView 
                      onCapture={handleCapture} 
                      isAnalyzing={isAnalyzing}
                    />
                  </TabsContent>
                  
                  <TabsContent value="upload">
                    <ImageUpload
                      onImageSelect={handleImageUpload}
                      isAnalyzing={isAnalyzing}
                    />
                  </TabsContent>
                </Tabs>
                
                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    {inputMode === 'camera' 
                      ? t('detect.instructions')
                      : t('detect.upload.desc')}
                  </p>
                </div>
              </div>

              {/* History Section */}
              {history.length > 0 && (
                <div className="glass-card p-6 rounded-2xl shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <History className="w-5 h-5 text-primary" />
                      {t('features.history.title')}
                    </h2>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowHistory(!showHistory)}
                      >
                        {showHistory ? 'Hide' : 'Show'} ({history.length})
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={clearHistory}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {showHistory && (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {history.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setCurrentResult(item)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left border ${
                            currentResult?.id === item.id 
                              ? 'bg-primary/10 border-primary/30' 
                              : 'bg-secondary/50 border-transparent hover:bg-secondary'
                          }`}
                        >
                          <img 
                            src={item.capturedImage} 
                            alt="Detection" 
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground truncate">
                                {item.result.isLeaf 
                                  ? (item.result.disease || t('severity.healthy'))
                                  : 'Invalid Image'
                                }
                              </p>
                              <Badge className={`text-xs ${getSeverityColor(item.result.severity)}`}>
                                {Math.round(item.result.confidence * 100)}%
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {item.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Results Section */}
            <div>
              {currentResult ? (
                <AdvancedDiseaseResult 
                  result={currentResult.result}
                  capturedImage={currentResult.capturedImage}
                />
              ) : (
                <div className="glass-card p-12 rounded-2xl shadow-card text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Ready to Analyze
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                    {t('detect.instructions')}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-left max-w-sm mx-auto">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs font-medium text-foreground">{t('stats.diseases')}</p>
                      <p className="text-xs text-muted-foreground">15+</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs font-medium text-foreground">{t('stats.accuracy')}</p>
                      <p className="text-xs text-muted-foreground">98%+</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs font-medium text-foreground">Analysis Time</p>
                      <p className="text-xs text-muted-foreground">~2 seconds</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs font-medium text-foreground">Leaf Validation</p>
                      <p className="text-xs text-muted-foreground">Auto-detect</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detect;
