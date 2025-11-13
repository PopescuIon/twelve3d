import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import contactBg from '@/assets/contact-bg.jpg';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast({
        title: t('error') || 'Eroare',
        description: t('errorDescription') || 'A apărut o eroare. Încearcă din nou mai târziu.',
        variant: 'destructive',
      });
      console.error('EmailJS error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-4">{t('contactPageTitle')}</h1>
          <p className="text-xl text-muted-foreground">{t('contactPageSubtitle')}</p>
        </div>

        {/* Contact Form with Background */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 fade-in">
          <img
            src={contactBg}
            alt="Contact background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto px-8 py-16">
            <h2 className="text-3xl font-bold text-center mb-8">{t('contactFormTitle')}</h2>
            <form ref={formRef} id="contact-form" onSubmit={handleSubmit} className="space-y-6 bg-background/90 backdrop-blur-md p-8 rounded-2xl shadow-xl">
              <input 
                type="text" 
                name="user_name" 
                placeholder={t('name')}
                required
                className="w-full px-4 py-3 rounded-md border border-input bg-background/80 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <input 
                type="email" 
                name="user_email" 
                placeholder={t('email')}
                required
                className="w-full px-4 py-3 rounded-md border border-input bg-background/80 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <input 
                type="tel" 
                name="user_phone" 
                placeholder={t('phone')}
                required
                className="w-full px-4 py-3 rounded-md border border-input bg-background/80 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <textarea 
                name="message" 
                placeholder={t('message')}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-md border border-input bg-background/80 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
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

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">{t('email')}</h3>
            <p className="text-muted-foreground">contact@twelve.md</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
              <Phone className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">{t('phone')}</h3>
            <p className="text-muted-foreground">+373 60 123 456</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
              <MapPin className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">{t('address')}</h3>
            <p className="text-muted-foreground">{t('addressText')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
