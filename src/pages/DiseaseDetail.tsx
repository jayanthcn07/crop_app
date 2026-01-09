import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle2, Info, Shield, Pill, Bug, Leaf } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { diseaseDatabase } from '@/data/diseases';
import { cn } from '@/lib/utils';

const DiseaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const disease = id ? diseaseDatabase[id] : null;

  if (!disease) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Disease Not Found</h1>
            <Link to="/diseases">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Library
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const severityConfig = {
    low: { color: 'text-success', bg: 'bg-success/10', icon: CheckCircle2, label: 'Low Risk' },
    medium: { color: 'text-warning', bg: 'bg-warning/10', icon: Info, label: 'Moderate Risk' },
    high: { color: 'text-destructive', bg: 'bg-destructive/10', icon: AlertTriangle, label: 'High Risk' },
  };

  const severity = severityConfig[disease.severity];
  const SeverityIcon = severity.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link to="/diseases" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Disease Library
          </Link>

          {/* Header */}
          <div className="glass-card p-8 rounded-2xl shadow-card mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold mb-3",
                  severity.bg, severity.color
                )}>
                  <SeverityIcon className="w-4 h-4" />
                  {severity.label}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{disease.name}</h1>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{disease.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Symptoms */}
            {disease.symptoms.length > 0 && disease.id !== 'healthy' && (
              <div className="glass-card p-6 rounded-xl shadow-card">
                <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
                  <Bug className="w-5 h-5 text-warning" />
                  Symptoms
                </h2>
                <ul className="space-y-3">
                  {disease.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Causes */}
            {disease.causes.length > 0 && (
              <div className="glass-card p-6 rounded-xl shadow-card">
                <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Causes
                </h2>
                <ul className="space-y-3">
                  {disease.causes.map((cause, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Preventive Measures */}
            <div className="glass-card p-6 rounded-xl shadow-card">
              <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
                <Shield className="w-5 h-5 text-primary" />
                Preventive Measures
              </h2>
              <ul className="space-y-3">
                {disease.preventiveMeasures.map((measure, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {measure}
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatments */}
            {disease.treatments.length > 0 && (
              <div className="glass-card p-6 rounded-xl shadow-card">
                <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
                  <Pill className="w-5 h-5 text-info" />
                  Treatment Options
                </h2>
                <ul className="space-y-3">
                  {disease.treatments.map((treatment, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground bg-info/5 p-3 rounded-lg border border-info/20">
                      <span className="w-6 h-6 rounded-full bg-info/20 text-info flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      {treatment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Affected Crops */}
          <div className="glass-card p-6 rounded-xl shadow-card mt-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <Leaf className="w-5 h-5 text-accent" />
              Commonly Affected Crops
            </h2>
            <div className="flex flex-wrap gap-2">
              {disease.affectedCrops.map((crop, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-accent/10 text-accent rounded-full font-medium"
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link to="/detect">
              <Button variant="hero" size="lg">
                Detect This Disease
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiseaseDetail;
