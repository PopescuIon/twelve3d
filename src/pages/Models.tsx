import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import modelRetro from '@/assets/model-retro.jpg';
import modelUnion from '@/assets/model-union.jpg';
import modelHome from '@/assets/model-home.jpg';

const Models = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const models = [
    { id: 1, name: 'Model Retro', image: modelRetro, category: 'classic', price80: 699, price100: 799 },
    { id: 2, name: 'Model Union', image: modelUnion, category: 'modern', price80: 699, price100: 799 },
    { id: 3, name: 'Model Retro Home', image: modelHome, category: 'custom', price80: 699, price100: 799 },
  ];

  const filteredModels = activeCategory === 'all'
    ? models
    : models.filter(model => model.category === activeCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: t('messageSent'),
        description: t('messageDescription'),
      });

      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: t('error'),
        description: t('errorDescription'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <form onSubmit={handleSubmit} className="space-y-4 fade-in">
                <div>
                  <Input
                    type="text"
                    placeholder={t('name')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder={t('email')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder={t('phone')}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder={t('message')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full min-h-[120px]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  {isSubmitting ? t('sending') : t('send')}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Models;
