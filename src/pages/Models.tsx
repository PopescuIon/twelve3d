import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import ImageModal from '@/components/ImageModal';
import contactBg from '@/assets/contact-bg.jpg';
import { z } from 'zod';

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
import corporate1 from '@/assets/corporate-5.jpg';
import corporate2 from '@/assets/corporate-6.jpg';
import corporate3 from '@/assets/corporate-7.jpg';
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

  const contactSchema = z.object({
    from_name: z.string().trim().min(1, 'Numele este obligatoriu').max(100, 'Numele trebuie să aibă maxim 100 caractere'),
    from_email: z.string().trim().email('Email invalid').max(255, 'Email-ul trebuie să aibă maxim 255 caractere'),
    from_phone: z.string().trim().min(1, 'Telefonul este obligatoriu').max(20, 'Telefonul trebuie să aibă maxim 20 caractere'),
    message: z.string().trim().min(1, 'Mesajul este obligatoriu').max(1000, 'Mesajul trebuie să aibă maxim 1000 caractere'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formRef.current) return;
      
      const formData = new FormData(formRef.current);
      const data = {
        from_name: formData.get('from_name') as string,
        from_email: formData.get('from_email') as string,
        from_phone: formData.get('from_phone') as string,
        message: formData.get('message') as string,
      };

      const result = contactSchema.safeParse(data);
      if (!result.success) {
        const firstError = result.error.errors[0];
        toast({
          title: 'Eroare validare',
          description: firstError.message,
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }
      
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
    <section id="contact" className="py-20 bg-background mt-12">
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
              <form ref={formRef} id="contact-form" onSubmit={handleSubmit} className="space-y-4 fade-in">
                <input 
                  type="text" 
                  name="user_name" 
                  placeholder={t('name')}
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <input 
                  type="email" 
                  name="user_email" 
                  placeholder={t('email')}
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <input 
                  type="tel" 
                  name="user_phone" 
                  placeholder={t('phone')}
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <textarea 
                  name="message" 
                  placeholder={t('message')}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none min-h-[120px]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('sending') : t('send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div id="models-collection" className="min-h-screen pt-24 pb-12">
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
