import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Leaf, 
  Shield, 
  Pill, 
  Activity,
  TrendingUp,
  Info,
  Sprout
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AnalysisResult } from '@/hooks/usePlantAnalyzer';

interface AdvancedDiseaseResultProps {
  result: AnalysisResult;
  capturedImage: string;
}

const severityConfig = {
  healthy: { color: 'bg-success text-success-foreground', icon: CheckCircle2, label: 'Healthy' },
  low: { color: 'bg-primary/20 text-primary', icon: Info, label: 'Low Risk' },
  medium: { color: 'bg-warning/20 text-warning', icon: AlertTriangle, label: 'Medium Risk' },
  high: { color: 'bg-destructive/20 text-destructive', icon: AlertTriangle, label: 'High Risk' },
  critical: { color: 'bg-destructive text-destructive-foreground', icon: XCircle, label: 'Critical' },
};

const AdvancedDiseaseResult = ({ result, capturedImage }: AdvancedDiseaseResultProps) => {
  const severity = severityConfig[result.severity];
  const SeverityIcon = severity.icon;
  const confidencePercent = Math.round(result.confidence * 100);

  if (!result.isLeaf) {
    return (
      <Card className="border-destructive/50 bg-destructive/5 animate-fade-in">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-xl text-destructive">Invalid Image</CardTitle>
              <p className="text-sm text-muted-foreground">Not a plant leaf detected</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please capture a clear image of a plant leaf for accurate disease detection.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="overflow-hidden">
        <div className={`h-2 ${result.severity === 'healthy' ? 'bg-success' : result.severity === 'critical' ? 'bg-destructive' : 'bg-warning'}`} />
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <img src={capturedImage} alt="Analyzed leaf" className="w-24 h-24 rounded-xl object-cover border border-border shadow-md" />
            <div className="flex-1">
              {result.plantName && (
                <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/30">
                  <Sprout className="w-3 h-3 mr-1" />
                  {result.plantName}
                </Badge>
              )}
              <div className="flex items-center gap-2 mb-2">
                <Badge className={severity.color}>
                  <SeverityIcon className="w-3 h-3 mr-1" />
                  {severity.label}
                </Badge>
                <Badge variant="outline" className="font-mono">{confidencePercent}%</Badge>
              </div>
              <CardTitle className="text-2xl">{result.disease || 'Healthy Plant'}</CardTitle>
              <p className="text-muted-foreground mt-1 text-sm line-clamp-2">{result.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={confidencePercent} className="h-2" />
        </CardContent>
      </Card>

      {result.symptoms.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-warning" />
              Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.symptoms.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-warning mt-1.5" />
                  {s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Prevention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.preventiveMeasures.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                  {m}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Pill className="w-5 h-5 text-success" />
              Treatment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.treatments.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-success mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedDiseaseResult;
