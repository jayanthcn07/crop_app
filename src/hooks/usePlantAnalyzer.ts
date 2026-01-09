import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AnalysisResult {
  isLeaf: boolean;
  plantName: string | null;
  disease: string | null;
  confidence: number;
  description: string;
  symptoms: string[];
  preventiveMeasures: string[];
  treatments: string[];
  severity: "healthy" | "low" | "medium" | "high" | "critical";
}

export interface PlantAnalyzerHook {
  isAnalyzing: boolean;
  error: string | null;
  analyze: (imageSource: HTMLVideoElement | HTMLCanvasElement | string) => Promise<AnalysisResult | null>;
  saveToHistory: (result: AnalysisResult, imageUrl?: string) => Promise<void>;
}

export const usePlantAnalyzer = (): PlantAnalyzerHook => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (
    imageSource: HTMLVideoElement | HTMLCanvasElement | string
  ): Promise<AnalysisResult | null> => {
    setIsAnalyzing(true);
    setError(null);

    try {
      let imageBase64: string;
      
      if (typeof imageSource === 'string') {
        // Already a base64 string
        imageBase64 = imageSource;
      } else if (imageSource instanceof HTMLVideoElement) {
        const canvas = document.createElement('canvas');
        canvas.width = imageSource.videoWidth;
        canvas.height = imageSource.videoHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        ctx.drawImage(imageSource, 0, 0);
        imageBase64 = canvas.toDataURL('image/jpeg', 0.9);
      } else {
        imageBase64 = imageSource.toDataURL('image/jpeg', 0.9);
      }

      const { data, error: fnError } = await supabase.functions.invoke('analyze-plant', {
        body: { imageBase64 }
      });

      if (fnError) {
        throw new Error(fnError.message || 'Analysis failed');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      return data as AnalysisResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const saveToHistory = useCallback(async (result: AnalysisResult, imageUrl?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('User not logged in, skipping history save');
        return;
      }

      await supabase.from('detection_history').insert([{
        user_id: user.id,
        plant_name: result.plantName,
        disease: result.disease,
        confidence: result.confidence,
        severity: result.severity,
        image_url: imageUrl,
        result: JSON.parse(JSON.stringify(result))
      }]);
    } catch (err) {
      console.error('Error saving to history:', err);
    }
  }, []);

  return {
    isAnalyzing,
    error,
    analyze,
    saveToHistory
  };
};