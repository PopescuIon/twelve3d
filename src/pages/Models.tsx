import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Models = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const models = [
    { id: 1, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600', category: 'classic' },
    { id: 2, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600', category: 'modern' },
    { id: 3, image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600', category: 'custom' },
    { id: 4, image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=600', category: 'classic' },
    { id: 5, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600', category: 'modern' },
    { id: 6, image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600', category: 'custom' },
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
              className="group relative h-96 rounded-2xl overflow-hidden fade-in cursor-pointer"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <img
                src={model.image}
                alt={`Model ${model.id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold">Model {model.id}</h3>
                  <p className="text-sm">{t(model.category)}</p>
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
