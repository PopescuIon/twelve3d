import { useLanguage } from '@/contexts/LanguageContext';
import { Palette, Wrench, CheckCircle, Mail, Phone } from 'lucide-react';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import packagingImage from '@/assets/packaging.jpg';
import { z } from 'zod';

const About = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchema = z.object({
    user_name: z.string().trim().min(1, 'Numele este obligatoriu').max(100, 'Numele trebuie să aibă maxim 100 caractere'),
    user_email: z.string().trim().email('Email invalid').max(255, 'Email-ul trebuie să aibă maxim 255 caractere'),
    user_phone: z.string().trim().min(1, 'Telefonul este obligatoriu').max(20, 'Telefonul trebuie să aibă maxim 20 caractere'),
    message: z.string().trim().min(1, 'Mesajul este obligatoriu').max(1000, 'Mesajul trebuie să aibă maxim 1000 caractere'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formRef.current) return;
      
      const formData = new FormData(formRef.current);
      const data = {
        user_name: (formData.get('user_name') as string) || '',
        user_email: (formData.get('user_email') as string) || '',
        user_phone: (formData.get('user_phone') as string) || '',
        message: (formData.get('message') as string) || '',
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

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16 fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 px-4">{t('aboutPageTitle')}</h1>
          <p className="text-base md:text-xl text-muted-foreground px-4">{t('aboutPageSubtitle')}</p>
        </div>

        {/* Our Story */}
        <section className="mb-12 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="fade-in md:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">{t('ourStory')}</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {t('ourStoryText')}
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden fade-in">
              <img
                src={packagingImage}
                alt="Twelve packaging"
                className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* How We Create */}
        <section className="py-12 md:py-20 bg-secondary rounded-2xl md:rounded-3xl">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 fade-in">
              {t('howWeCreate')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center fade-in">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <Palette className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{t('step1Title')}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{t('step1Text')}</p>
              </div>
              <div className="text-center fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <Wrench className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{t('step2Title')}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{t('step2Text')}</p>
              </div>
              <div className="text-center fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{t('step3Title')}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{t('step3Text')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-20 py-16 bg-background rounded-2xl shadow-lg">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 fade-in">
              {t('modelsContactTitle')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
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
        </section>
      </div>
    </div>
  );
};

export default About;
