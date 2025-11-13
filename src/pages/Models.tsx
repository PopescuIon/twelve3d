import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import modelRetro from '@/assets/model-retro.jpg';
import modelUnion from '@/assets/model-union.jpg';
import modelHome from '@/assets/model-home.jpg';

const Models = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const models = [
    { id: 1, name: 'Model Retro', image: modelRetro, category: 'classic', price80: 699, price100: 799 },
    { id: 2, name: 'Model Union', image: modelUnion, category: 'modern', price80: 699, price100: 799 },
    { id: 3, name: 'Model Retro Home', image: modelHome, category: 'custom', price80: 699, price100: 799 },
  ];

  const filteredModels = activeCategory === 'all'
    ? models
    : models.filter(model => model.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl font-bold mb-4">{t('modelsPageTitle')}</h1>
          <p className="text-xl text-muted-foreground">{t('modelsPageSubtitle')}</p>
        </div>

        <div className="flex justify-center gap-4 mb-12 fade-in flex-wrap">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('all')}
            className="rounded-full"
          >
            {t('viewAllModels')}
          </Button>
          <Button
            variant={activeCategory === 'classic' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('classic')}
            className="rounded-full"
          >
            {t('classic')}
          </Button>
          <Button
            variant={activeCategory === 'modern' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('modern')}
            className="rounded-full"
          >
            {t('modern')}
          </Button>
          <Button
            variant={activeCategory === 'custom' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('custom')}
            className="rounded-full"
          >
            {t('custom')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map((model, idx) => (
            <div
              key={model.id}
              className="group rounded-2xl overflow-hidden fade-in cursor-pointer bg-background shadow-lg"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{model.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t(model.category)}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">80 cm</span>
                  <span className="text-primary font-bold text-lg">{model.price80} lei</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">1 m</span>
                  <span className="text-primary font-bold text-lg">{model.price100} lei</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Models;
