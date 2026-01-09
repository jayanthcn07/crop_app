import { Plant } from '@/data/plants';
import { Leaf, Droplets, Sun, Thermometer, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface PlantCardProps {
  plant: Plant;
  delay?: number;
}

const careLevelConfig = {
  easy: { 
    color: 'text-success', 
    bg: 'bg-success/10', 
    label: 'Easy' 
  },
  moderate: { 
    color: 'text-warning', 
    bg: 'bg-warning/10', 
    label: 'Moderate' 
  },
  advanced: { 
    color: 'text-destructive', 
    bg: 'bg-destructive/10', 
    label: 'Advanced' 
  },
};

const PlantCard = ({ plant, delay = 0 }: PlantCardProps) => {
  const careLevel = careLevelConfig[plant.careLevel];

  return (
    <Link 
      to={`/plants/${plant.id}`}
      className="group glass-card p-5 rounded-xl shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in block"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
              {plant.name}
            </h3>
            <p className="text-xs text-muted-foreground italic">{plant.scientificName}</p>
          </div>
        </div>
        <span className={cn(
          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
          careLevel.bg, careLevel.color
        )}>
          {careLevel.label}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {plant.description}
      </p>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sun className="w-3.5 h-3.5 text-warning" />
          <span className="truncate">{plant.growingConditions.light.split(' ')[0]}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Droplets className="w-3.5 h-3.5 text-primary" />
          <span className="truncate">{plant.growingConditions.water.split(',')[0]}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {plant.commonDiseases.slice(0, 2).map((disease, index) => (
            <span 
              key={index}
              className="px-2 py-0.5 bg-destructive/10 text-destructive rounded text-xs"
            >
              {disease.replace(/_/g, ' ')}
            </span>
          ))}
          {plant.commonDiseases.length > 2 && (
            <span className="px-2 py-0.5 bg-secondary text-muted-foreground rounded text-xs">
              +{plant.commonDiseases.length - 2}
            </span>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
};

export default PlantCard;
