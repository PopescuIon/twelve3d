import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import heroImage from '@/assets/hero-family.jpg';
import aboutImage from '@/assets/about-clocks.png';
import modelRetro from '@/assets/model-retro.jpg';
import modelUnion from '@/assets/model-union.jpg';
import modelHome from '@/assets/model-home.jpg';
import packagingImage from '@/assets/packaging.jpg';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            {t('heroTitle')}
          </h1>
          <p className="text-2xl md:text-4xl mb-8 text-white drop-shadow-lg">
            {t('heroSubtitle')}
          </p>
          <Button asChild size="lg" className="rounded-full text-lg px-8 shadow-xl hover:shadow-2xl">
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
          <div className="text-center mb-12 fade-in max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('aboutBrandTitle')}</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
              {t('aboutBrandText')}
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t('aboutBrandText2')}
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden max-w-5xl mx-auto fade-in">
            <img
              src={aboutImage}
              alt="Twelve Clocks Models"
              className="w-full h-auto"
            />
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
              { img: modelRetro, name: 'Model Retro', id: 'retro' },
              { img: modelUnion, name: 'Model Union', id: 'union' },
              { img: modelHome, name: 'Model Retro Home', id: 'home' }
            ].map((model, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden fade-in cursor-pointer bg-background shadow-lg"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={model.img}
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{model.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">80 cm</span>
                    <span className="text-primary font-bold text-lg">699 lei</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-muted-foreground">1 m</span>
                    <span className="text-primary font-bold text-lg">799 lei</span>
                  </div>
                </div>
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

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Contact CTA Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={packagingImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 text-center fade-in relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('contactCtaTitle')}</h2>
          <Button asChild size="lg" className="rounded-full text-lg px-8">
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
