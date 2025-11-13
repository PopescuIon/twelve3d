import { useLanguage } from '@/contexts/LanguageContext';
import { Palette, Wrench, CheckCircle } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-4">{t('aboutPageTitle')}</h1>
          <p className="text-xl text-muted-foreground">{t('aboutPageSubtitle')}</p>
        </div>

        {/* Our Story */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="fade-in pr-8">
              <h2 className="text-4xl font-bold mb-6">{t('ourStory')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('ourStoryText')}
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden fade-in">
              <img
                src="/src/assets/about-clocks.png"
                alt="Twelve clocks"
                className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* How We Create */}
        <section className="py-20 bg-secondary rounded-3xl">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 fade-in">
              {t('howWeCreate')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center fade-in">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Palette className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('step1Title')}</h3>
                <p className="text-muted-foreground">{t('step1Text')}</p>
              </div>
              <div className="text-center fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wrench className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('step2Title')}</h3>
                <p className="text-muted-foreground">{t('step2Text')}</p>
              </div>
              <div className="text-center fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('step3Title')}</h3>
                <p className="text-muted-foreground">{t('step3Text')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
