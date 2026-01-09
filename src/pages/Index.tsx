import { Link } from 'react-router-dom';
import { 
  Camera, 
  Shield, 
  Zap, 
  Database, 
  Leaf,
  ArrowRight,
  Play,
  Sparkles,
  Target,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Camera,
      title: t('features.instant.title'),
      description: t('features.instant.desc')
    },
    {
      icon: Target,
      title: '98% ' + t('stats.accuracy'),
      description: 'Our advanced AI model is trained on extensive plant disease datasets for highly accurate detection.'
    },
    {
      icon: Shield,
      title: t('features.recommendations.title'),
      description: t('features.recommendations.desc')
    },
    {
      icon: Database,
      title: t('features.comprehensive.title'),
      description: t('features.comprehensive.desc')
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get disease analysis results in seconds with detailed symptoms and treatment plans.'
    },
    {
      icon: Leaf,
      title: 'Plant Identification',
      description: 'Automatically identifies the plant species along with any diseases detected.'
    }
  ];

  const stats = [
    { value: '98%', label: t('stats.accuracy'), icon: Target },
    { value: '20+', label: t('stats.diseases'), icon: Database },
    { value: '<3s', label: 'Detection Time', icon: Clock },
    { value: '50+', label: t('stats.crops'), icon: Leaf }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 py-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-fade-in border border-primary/20">
                <Sparkles className="w-4 h-4 animate-pulse" />
                Advanced Plant Health Analysis
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                {t('hero.title').split(' ').slice(0, -2).join(' ')}{' '}
                <span className="text-gradient">{t('hero.title').split(' ').slice(-2).join(' ')}</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
                {t('hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <Link to="/detect">
                  <Button variant="hero" size="xl" className="group">
                    <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {t('hero.cta')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/diseases">
                  <Button variant="outline" size="xl" className="group">
                    <Database className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {t('hero.secondary')}
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 relative animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 gradient-primary rounded-3xl blur-3xl opacity-20 animate-pulse" />
                <div className="relative glass-card rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-500">
                  <div className="aspect-square rounded-2xl bg-secondary/50 flex items-center justify-center mb-6 overflow-hidden relative">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Leaf className="w-32 h-32 text-primary/30 animate-float" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-dashed animate-spin" style={{ animationDuration: '15s' }} />
                        <div className="absolute w-16 h-16 rounded-full border-2 border-accent/30 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
                      </div>
                      {/* Scan line effect */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scan-line" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-primary/20 rounded-full w-3/4 animate-pulse" />
                    <div className="h-3 bg-primary/10 rounded-full w-1/2 animate-pulse" style={{ animationDelay: '200ms' }} />
                    <div className="flex gap-2 mt-4">
                      <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-medium animate-scale-in">{t('severity.healthy')}</span>
                      <span className="px-3 py-1 bg-warning/20 text-warning rounded-full text-xs font-medium animate-scale-in" style={{ animationDelay: '100ms' }}>98% Confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-y border-border bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-background/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-soft group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4 animate-fade-in">
              <TrendingUp className="w-4 h-4" />
              {t('features.title')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Why Choose CropGuard?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="gradient-primary rounded-3xl p-8 md:p-12 text-center shadow-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-gradient" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4 animate-fade-in">
                {t('cta.title')}
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
                {t('cta.subtitle')}
              </p>
              <Link to="/detect">
                <Button 
                  size="xl" 
                  className="bg-background text-primary hover:bg-background/90 shadow-lg animate-fade-in group"
                  style={{ animationDelay: '200ms' }}
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {t('cta.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">CropGuard</span>
              <span className="text-muted-foreground text-sm">• {t('footer.tagline')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
