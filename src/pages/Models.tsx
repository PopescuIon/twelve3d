import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import ImageModal from '@/components/ImageModal';
import contactBg from '@/assets/contact-bg.jpg';

// Import all model images
import modelRetroCustom from '@/assets/model-retro-custom.jpg';
import modelUnionCustom from '@/assets/model-union-custom.jpg';
import modelHomeCustom from '@/assets/model-home-custom.jpg';
import modelNumbers from '@/assets/model-numbers.jpg';
import modelRetrotech from '@/assets/model-retrotech.jpg';
import modelRoman from '@/assets/model-roman.jpg';
import modelMinimalist from '@/assets/model-minimalist.jpg';
import modelCoffe from '@/assets/model-coffe.jpg';
import modelCreative from '@/assets/model-creative.jpg';
import modelMusic from '@/assets/model-music.jpg';
import modelOglinda from '@/assets/model-oglinda.jpg';
import modelHomeclock from '@/assets/model-homeclock.jpg';
import modelHomesweet from '@/assets/model-homesweet.jpg';

// Import corporate images
import corporate1 from '@/assets/corporate-1.jpg';
import corporate2 from '@/assets/corporate-2.jpg';
import corporate3 from '@/assets/corporate-3.jpg';
import corporate4 from '@/assets/corporate-4.jpg';

const Models = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'models' | 'corporate'>('models');

  const models = [
    { id: 1, name: 'Model Retro', image: modelRetroCustom, price80: 799, price100: 899 },
    { id: 2, name: 'Model Union', image: modelUnionCustom, price80: 699, price100: 799 },
    { id: 3, name: 'Model Retro Home', image: modelHomeCustom, price80: 799, price100: 899 },
    { id: 4, name: 'Model Numbers', image: modelNumbers, price80: 799, price100: 899 },
    { id: 5, name: 'Model RetroTech', image: modelRetrotech, price80: 699, price100: 799 },
    { id: 6, name: 'Model Roman', image: modelRoman, price80: 799, price100: 899 },
    { id: 7, name: 'Model Minimalist', image: modelMinimalist, price80: 699, price100: 799 },
    { id: 8, name: 'Model Coffe', image: modelCoffe, price80: 799, price100: 899 },
    { id: 9, name: 'Model Creative', image: modelCreative, price80: 699, price100: 799 },
    { id: 10, name: 'Model Music', image: modelMusic, price80: 799, price100: 899 },
    { id: 11, name: 'Ceas pe Oglindă', image: modelOglinda, price60: 1949 },
    { id: 12, name: 'Home + Ceas', image: modelHomeclock, width150: 1850 },
    { id: 13, name: 'Home Sweet Home', image: modelHomesweet, length200: 2500 },
  ];

  const corporateModels = [
    { id: 1, name: 'Alto Garage', image: corporate1 },
    { id: 2, name: 'Dental Centre', image: corporate2 },
    { id: 3, name: 'Instituție Privată', image: corporate3 },
    { id: 4, name: 'Stomatology', image: corporate4 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formRef.current) return;
      
      await emailjs.sendForm(
        'service_twelve',
        'template_ilqjnou',
        formRef.current,
        'qnNq8OVcXOQrbk9AO'
      );

      toast({
        title: t('messageSent'),
        description: t('messageDescription'),
        duration: 4000,
      });

      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: t('error'),
        description: t('errorDescription') || 'A apărut o eroare. Încearcă din nou mai târziu.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (image: string, name: string) => {
    setModalImage({ src: image, alt: name });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const ContactForm = () => (
    <section id="contact" className="mt-24 py-12 px-4 md:px-8 rounded-2xl fade-in">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('modelsContactTitle')}</h2>
        <div className="space-y-6 mb-8 text-center">
          <a href="mailto:twelve.clock@yahoo.com" className="flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors">
            <Mail className="h-5 w-5" />
            <span>twelve.clock@yahoo.com</span>
          </a>
          <a href="tel:+37360592006" className="flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors">
            <Phone className="h-5 w-5" />
            <span>+373 60 592 006</span>
          </a>
        </div>
        
        <div 
          className="relative rounded-2xl p-8 backdrop-blur-md bg-background/85"
          style={{
            backgroundImage: `url(${contactBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="from_name"
                placeholder={t('yourName') || 'Numele tău'}
                required
                className="w-full px-4 py-3 rounded-lg bg-background/90 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                name="user_email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-lg bg-background/90 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                name="user_phone"
                placeholder={t('phone') || 'Telefon'}
                className="w-full px-4 py-3 rounded-lg bg-background/90 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                name="message"
                placeholder={t('message') || 'Mesaj'}
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg bg-background/90 border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('sending') || 'Se trimite...' : t('sendMessage') || 'Trimite mesajul'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl font-bold mb-4">{t('modelsPageTitle')}</h1>
          <p className="text-xl text-muted-foreground">{t('modelsPageSubtitle')}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 fade-in">
          <Button
            variant={activeTab === 'models' ? 'default' : 'outline'}
            onClick={() => setActiveTab('models')}
            className="rounded-full px-8"
          >
            {t('models')}
          </Button>
          <Button
            variant={activeTab === 'corporate' ? 'default' : 'outline'}
            onClick={() => setActiveTab('corporate')}
            className="rounded-full px-8"
          >
            {t('corporateClocks') || 'Ceasuri Corporate'}
          </Button>
        </div>

        {/* Models Tab */}
        {activeTab === 'models' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {models.map((model, idx) => (
                <div
                  key={model.id}
                  className="group rounded-2xl overflow-hidden fade-in cursor-pointer bg-background shadow-lg hover:shadow-xl transition-shadow"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onClick={() => openModal(model.image, model.name)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{model.name}</h3>
                    <div className="space-y-2">
                      {model.price80 && (
                        <>
                          <div className="flex justify-between items-center text-muted-foreground">
                            <span>Ø 80 cm</span>
                            <span className="text-primary font-semibold">{model.price80} lei</span>
                          </div>
                          <div className="flex justify-between items-center text-muted-foreground">
                            <span>Ø 1 m</span>
                            <span className="text-primary font-semibold">{model.price100} lei</span>
                          </div>
                        </>
                      )}
                      {model.price60 && (
                        <div className="flex justify-between items-center text-muted-foreground">
                          <span>Ø 60 cm</span>
                          <span className="text-primary font-semibold">{model.price60} lei</span>
                        </div>
                      )}
                      {model.width150 && (
                        <div className="flex justify-between items-center text-muted-foreground">
                          <span>lățime 1.50 m</span>
                          <span className="text-primary font-semibold">{model.width150} lei</span>
                        </div>
                      )}
                      {model.length200 && (
                        <div className="flex justify-between items-center text-muted-foreground">
                          <span>lungime 2 m</span>
                          <span className="text-primary font-semibold">{model.length200} lei</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ContactForm />
          </>
        )}

        {/* Corporate Tab */}
        {activeTab === 'corporate' && (
          <>
            <div className="text-center mb-12 fade-in max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">Ceasuri personalizate pentru companii</h2>
              <p className="text-xl text-muted-foreground">Logo-ul companiei tale, integrat într-un ceas unic, premium și realizat manual.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {corporateModels.map((model, idx) => (
                <div
                  key={model.id}
                  className="group rounded-2xl overflow-hidden fade-in cursor-pointer bg-background shadow-lg hover:shadow-xl transition-shadow"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onClick={() => openModal(model.image, model.name)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-center">{model.name}</h3>
                  </div>
                </div>
              ))}
            </div>
            <ContactForm />
          </>
        )}
      </div>

      <ImageModal
        isOpen={modalImage !== null}
        imageSrc={modalImage?.src || ''}
        imageAlt={modalImage?.alt || ''}
        onClose={closeModal}
      />
    </div>
  );
};

export default Models;
