import { useLanguage } from '@/contexts/LanguageContext';
import { Palette, Wrench, CheckCircle, Mail, Phone } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import packagingImage from '@/assets/packaging.jpg';

const About = () => {
  const { t } = useLanguage();

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
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
