import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-background/90 backdrop-blur-md p-8 rounded-2xl shadow-xl">
              <div>
                <Label htmlFor="user_name" className="text-foreground">{t('name')}</Label>
                <Input
                  id="user_name"
                  name="user_name"
                  required
                  className="mt-2 bg-background/80"
                />
              </div>
              <div>
                <Label htmlFor="user_email" className="text-foreground">{t('email')}</Label>
                <Input
                  id="user_email"
                  name="user_email"
                  type="email"
                  required
                  className="mt-2 bg-background/80"
                />
              </div>
              <div>
                <Label htmlFor="user_phone" className="text-foreground">{t('phone')}</Label>
                <Input
                  id="user_phone"
                  name="user_phone"
                  type="tel"
                  required
                  className="mt-2 bg-background/80"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-foreground">{t('message')}</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-2 bg-background/80"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {isSubmitting ? t('sending') : t('send')}
              </Button>
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
