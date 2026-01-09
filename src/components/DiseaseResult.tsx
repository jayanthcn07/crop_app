import { Disease } from '@/data/diseases';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Shield, 
  Pill, 
  Bug,
  Leaf,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiseaseResultProps {
  disease: Disease;
  confidence: number;
  capturedImage?: string;
}

const DiseaseResult = ({ disease, confidence, capturedImage }: DiseaseResultProps) => {
  const severityConfig = {
    low: { 
      color: 'text-success', 
      bg: 'bg-success/10', 
      border: 'border-success/30',
      icon: CheckCircle2, 
      label: 'Low Risk' 
    },
    medium: { 
      color: 'text-warning', 
      bg: 'bg-warning/10', 
      border: 'border-warning/30',
      icon: Info, 
      label: 'Moderate Risk' 
    },
    high: { 
      color: 'text-destructive', 
      bg: 'bg-destructive/10', 
      border: 'border-destructive/30',
      icon: AlertTriangle, 
      label: 'High Risk' 
    },
  };

  const severity = severityConfig[disease.severity];
  const SeverityIcon = severity.icon;
  const isHealthy = disease.id === 'healthy';

  return (
    <div className="w-full animate-fade-in">
      <div className={cn(
        "glass-card p-6 rounded-2xl shadow-card",
        isHealthy ? "border-success/30" : severity.border
      )}>
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          {capturedImage && (
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-soft">
              <img 
                src={capturedImage} 
                alt="Captured plant" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                severity.bg, severity.color
              )}>
                <SeverityIcon className="w-3.5 h-3.5" />
                {severity.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {Math.round(confidence * 100)}% confidence
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-1">{disease.name}</h2>
            <p className="text-muted-foreground text-sm">{disease.description}</p>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Detection Confidence
            </span>
            <span className="font-semibold text-foreground">{Math.round(confidence * 100)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isHealthy ? "bg-success" : "gradient-primary"
              )}
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
        </div>

        {/* Symptoms */}
        {disease.symptoms.length > 0 && !isHealthy && (
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-3">
              <Bug className="w-5 h-5 text-warning" />
              Symptoms
            </h3>
            <ul className="grid gap-2">
              {disease.symptoms.map((symptom, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Preventive Measures */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-3">
            <Shield className="w-5 h-5 text-primary" />
            Preventive Measures
          </h3>
          <ul className="grid gap-2">
            {disease.preventiveMeasures.map((measure, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg"
              >
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                {measure}
              </li>
            ))}
          </ul>
        </div>

        {/* Treatments */}
        {disease.treatments.length > 0 && (
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-3">
              <Pill className="w-5 h-5 text-info" />
              Treatment Options
            </h3>
            <ul className="grid gap-2">
              {disease.treatments.map((treatment, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 text-sm text-muted-foreground bg-info/5 p-3 rounded-lg border border-info/20"
                >
                  <span className="w-5 h-5 rounded-full bg-info/20 text-info flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  {treatment}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Affected Crops */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-3">
            <Leaf className="w-5 h-5 text-accent" />
            Commonly Affected Crops
          </h3>
          <div className="flex flex-wrap gap-2">
            {disease.affectedCrops.map((crop, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium"
              >
                {crop}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseResult;
