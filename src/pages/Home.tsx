import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-3xl md:text-5xl font-light mb-6 text-primary">
            {t('heroSubtitle')}
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('heroDescription')}
          </p>
          <Button asChild size="lg" className="rounded-full text-lg px-8">
            <Link to="/models">
              {t('viewModels')}
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Brand Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-6">{t('aboutBrandTitle')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('aboutBrandText')}
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800"
                alt="Craftsmanship"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Models Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 fade-in">
            {t('popularModelsTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600',
              'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600',
              'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600'
            ].map((img, idx) => (
              <div
                key={idx}
                className="group relative h-96 rounded-2xl overflow-hidden fade-in cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <img
                  src={img}
                  alt={`Model ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
          <div className="text-center fade-in">
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/models">
                {t('viewAllModels')}
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center fade-in">
          <h2 className="text-4xl font-bold mb-6">{t('contactCtaTitle')}</h2>
          <Button asChild size="lg" variant="secondary" className="rounded-full">
            <Link to="/contact">
              {t('contactCtaButton')}
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
