import { useState } from 'react';
import { Search, Filter, Leaf, Bug } from 'lucide-react';
import Header from '@/components/Header';
import DiseaseCard from '@/components/DiseaseCard';
import PlantCard from '@/components/PlantCard';
import { diseaseDatabase } from '@/data/diseases';
import { plantDatabase } from '@/data/plants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const Diseases = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [selectedCareLevel, setSelectedCareLevel] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('diseases');
  
  const diseases = Object.values(diseaseDatabase).filter(d => d.id !== 'unknown');
  const plants = Object.values(plantDatabase);
  
  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = 
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.affectedCrops.some(crop => 
        crop.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesSeverity = !selectedSeverity || disease.severity === selectedSeverity;
    
    return matchesSearch && matchesSeverity;
  });

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = 
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.family.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCareLevel = !selectedCareLevel || plant.careLevel === selectedCareLevel;
    
    return matchesSearch && matchesCareLevel;
  });

  const severityFilters = [
    { value: null, label: t('library.all') },
    { value: 'low', label: t('severity.low') },
    { value: 'medium', label: t('severity.medium') },
    { value: 'high', label: t('severity.high') },
  ];

  const careLevelFilters = [
    { value: null, label: t('library.all') },
    { value: 'easy', label: t('care.easy') },
    { value: 'moderate', label: t('care.moderate') },
    { value: 'advanced', label: t('care.advanced') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('library.title')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('library.subtitle')}
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
              <TabsTrigger value="diseases" className="flex items-center gap-2 text-base">
                <Bug className="w-4 h-4" />
                {t('library.diseases')} ({diseases.length})
              </TabsTrigger>
              <TabsTrigger value="plants" className="flex items-center gap-2 text-base">
                <Leaf className="w-4 h-4" />
                {t('library.plants')} ({plants.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="diseases" className="mt-6">
              {/* Search and Filters for Diseases */}
              <div className="glass-card p-4 rounded-xl shadow-card mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={t('library.search')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-5 h-5 text-muted-foreground" />
                    {severityFilters.map(({ value, label }) => (
                      <Button
                        key={label}
                        variant={selectedSeverity === value ? 'default' : 'secondary'}
                        size="sm"
                        onClick={() => setSelectedSeverity(value)}
                        className={cn(
                          "transition-all",
                          selectedSeverity === value && "shadow-soft"
                        )}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredDiseases.length} of {diseases.length} {t('library.diseases').toLowerCase()}
              </p>

              {filteredDiseases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDiseases.map((disease, index) => (
                    <DiseaseCard 
                      key={disease.id} 
                      disease={disease}
                      delay={index * 50}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t('library.no.results')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('library.no.results.desc')}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="plants" className="mt-6">
              {/* Search and Filters for Plants */}
              <div className="glass-card p-4 rounded-xl shadow-card mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={t('library.search')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-5 h-5 text-muted-foreground" />
                    {careLevelFilters.map(({ value, label }) => (
                      <Button
                        key={label}
                        variant={selectedCareLevel === value ? 'default' : 'secondary'}
                        size="sm"
                        onClick={() => setSelectedCareLevel(value)}
                        className={cn(
                          "transition-all",
                          selectedCareLevel === value && "shadow-soft"
                        )}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredPlants.length} of {plants.length} {t('library.plants').toLowerCase()}
              </p>

              {filteredPlants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPlants.map((plant, index) => (
                    <PlantCard 
                      key={plant.id} 
                      plant={plant}
                      delay={index * 50}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                    <Leaf className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t('library.no.results')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('library.no.results.desc')}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Diseases;
