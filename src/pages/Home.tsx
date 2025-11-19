import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import TwelveSetCarousel from '@/components/TwelveSetCarousel';
import ImageModal from '@/components/ImageModal';
import { ContactForm } from '@/components/ContactForm';
import { useState } from 'react';
import heroImage from '@/assets/hero-family.jpg';
import aboutImage from '@/assets/about-clocks.png';
import modelRetro from '@/assets/model-retro.jpg';
import modelUnion from '@/assets/model-union.jpg';
import modelHome from '@/assets/model-home.jpg';
import packagingImage from '@/assets/packaging.jpg';
import twelveSetImage from '@/assets/twelve-set.jpg';
import contactBg from '@/assets/contact-bg.jpg';

const Home = () => {
  const { t } = useLanguage();
  const [modalImage, setModalImage] = useState('');
  const [modalImageAlt, setModalImageAlt] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (imageSrc: string, imageAlt: string) => {
    setModalImage(imageSrc);
    setModalImageAlt(imageAlt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg">
            Fiecare clipă acasă
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-6 md:mb-8 text-white drop-shadow-lg px-4">
            devine mai frumoasă cu ceasurile Twelve
          </p>
          <Button asChild size="lg" className="rounded-full text-base md:text-lg px-6 md:px-8 shadow-xl hover:shadow-2xl">
            <Link to="/models">
              Alege-ți ceasul preferat
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Brand Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto fade-in">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t('aboutBrandTitle')}</h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                {t('aboutBrandText')}
              </p>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                {t('aboutBrandText2')}
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden fade-in">
              <img
                src={packagingImage}
                alt="Twelve Clocks"
                className="w-full h-auto max-w-md mx-auto"
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
              { img: modelRetro, name: 'Model Retro', id: 'retro' },
              { img: modelUnion, name: 'Model Union', id: 'union' },
              { img: modelHome, name: 'Model Retro Home', id: 'home' }
            ].map((model, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden fade-in cursor-pointer bg-background shadow-lg"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div 
                  className="aspect-square overflow-hidden cursor-pointer"
                  onClick={() => openModal(model.img, model.name)}
                >
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
            <Button asChild size="lg" className="rounded-full bg-[#F58835] hover:bg-[#F58835]/90 text-white">
              <Link to="/models">
                {t('viewAllModels')}
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Twelve Set Section */}
      <section id="twelve-set" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto fade-in">
            <div className="order-2 md:order-1">
              <TwelveSetCarousel onImageClick={openModal} />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold">{t('twelveSetTitle')}</h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t('twelveSetText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="testimonials">
        <TestimonialsCarousel />
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-5xl mx-auto py-16 rounded-2xl shadow-lg border border-border/50 relative overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${contactBg})` }}
            >
              <div className="absolute inset-0 backdrop-blur-sm bg-background/85"></div>
            </div>
            <div className="relative z-10">
            <h2 className="text-4xl font-bold text-center mb-3 fade-in">
              {t('contactCtaTitle')}
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12 fade-in">
              {t('modelsContactTitle')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 items-start px-8">
              {/* Contact Info */}
              <div className="space-y-8 fade-in">
                <div>
                  <h3 className="text-xl font-semibold mb-6">{t('getInTouch')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 group">
                      <Mail className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
                      <a href="mailto:twelve.ceasuri.perete@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        twelve.ceasuri.perete@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <Phone className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
                      <a href="tel:+373605920006" className="text-muted-foreground hover:text-primary transition-colors">
                        +373 605 92 006
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm />
            </div>
            </div>
          </div>
        </div>
      </section>

      <ImageModal 
        isOpen={isModalOpen}
        imageSrc={modalImage}
        imageAlt={modalImageAlt}
        onClose={closeModal}
      />
    </div>
  );
};

export default Home;
