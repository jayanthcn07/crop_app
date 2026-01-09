import { Disease } from '@/data/diseases';
import { AlertTriangle, CheckCircle2, Info, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface DiseaseCardProps {
  disease: Disease;
  delay?: number;
}

const DiseaseCard = ({ disease, delay = 0 }: DiseaseCardProps) => {
  const severityConfig = {
    low: { 
      color: 'text-success', 
      bg: 'bg-success/10', 
      icon: CheckCircle2, 
      label: 'Low' 
    },
    medium: { 
      color: 'text-warning', 
      bg: 'bg-warning/10', 
      icon: Info, 
      label: 'Medium' 
    },
    high: { 
      color: 'text-destructive', 
      bg: 'bg-destructive/10', 
      icon: AlertTriangle, 
      label: 'High' 
    },
  };

  const severity = severityConfig[disease.severity];
  const SeverityIcon = severity.icon;

  return (
    <Link 
      to={`/diseases/${disease.id}`}
      className="group glass-card p-5 rounded-xl shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in block"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
          {disease.name}
        </h3>
        <span className={cn(
          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
          severity.bg, severity.color
        )}>
          <SeverityIcon className="w-3 h-3" />
          {severity.label}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {disease.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {disease.affectedCrops.slice(0, 3).map((crop, index) => (
            <span 
              key={index}
              className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs"
            >
              {crop}
            </span>
          ))}
          {disease.affectedCrops.length > 3 && (
            <span className="px-2 py-0.5 bg-secondary text-muted-foreground rounded text-xs">
              +{disease.affectedCrops.length - 3}
            </span>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
};

export default DiseaseCard;
