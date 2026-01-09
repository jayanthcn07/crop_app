import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Sun, Droplets, Thermometer, AlertTriangle, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import { plantDatabase } from '@/data/plants';
import { diseaseDatabase } from '@/data/diseases';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const careLevelConfig = {
  easy: { color: 'text-success', bg: 'bg-success/10', label: 'Easy Care' },
  moderate: { color: 'text-warning', bg: 'bg-warning/10', label: 'Moderate Care' },
  advanced: { color: 'text-destructive', bg: 'bg-destructive/10', label: 'Advanced Care' },
};

const PlantDetail = () => {
  const { id } = useParams();
  const plant = plantDatabase[id || ''];

  if (!plant) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Plant Not Found</h1>
            <Link to="/library" className="text-primary hover:underline">
              ← Back to Library
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const careLevel = careLevelConfig[plant.careLevel];
  const linkedDiseases = plant.commonDiseases
    .map(dId => diseaseDatabase[dId])
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link 
            to="/library" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Link>

          <div className="glass-card p-6 rounded-2xl shadow-card mb-6 animate-fade-in">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-bold text-foreground">{plant.name}</h1>
                  <Badge className={cn(careLevel.bg, careLevel.color, "border-0")}>
                    {careLevel.label}
                  </Badge>
                </div>
                <p className="text-muted-foreground italic">{plant.scientificName}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Family: {plant.family} • Origin: {plant.origin}
                </p>
              </div>
            </div>

            <p className="text-foreground leading-relaxed">{plant.description}</p>
          </div>

          <Card className="mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-warning" />
                Growing Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <Sun className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Light</p>
                    <p className="text-sm text-muted-foreground">{plant.growingConditions.light}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <Droplets className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Water</p>
                    <p className="text-sm text-muted-foreground">{plant.growingConditions.water}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <Leaf className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Soil</p>
                    <p className="text-sm text-muted-foreground">{plant.growingConditions.soil}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <Thermometer className="w-5 h-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Temperature</p>
                    <p className="text-sm text-muted-foreground">{plant.growingConditions.temperature}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Common Diseases
              </CardTitle>
            </CardHeader>
            <CardContent>
              {linkedDiseases.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-3">
                  {linkedDiseases.map((disease) => (
                    <Link
                      key={disease.id}
                      to={`/diseases/${disease.id}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                    >
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {disease.name}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {disease.severity} severity
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No common diseases documented.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PlantDetail;
