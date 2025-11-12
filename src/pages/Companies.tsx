import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Ruler, Gift } from 'lucide-react';

const Companies = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-4">{t('companiesPageTitle')}</h1>
          <p className="text-xl text-muted-foreground">{t('companiesPageSubtitle')}</p>
        </div>

        {/* Examples Gallery */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
              'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
              'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800'
            ].map((img, idx) => (
              <div
                key={idx}
                className="relative h-80 rounded-2xl overflow-hidden fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <img
                  src={img}
                  alt={`Corporate example ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-secondary rounded-3xl mb-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 fade-in">
              {t('companiesBenefitsTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center fade-in">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('benefit1Title')}</h3>
                <p className="text-muted-foreground">{t('benefit1Text')}</p>
              </div>
              <div className="text-center fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Ruler className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('benefit2Title')}</h3>
                <p className="text-muted-foreground">{t('benefit2Text')}</p>
              </div>
              <div className="text-center fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('benefit3Title')}</h3>
                <p className="text-muted-foreground">{t('benefit3Text')}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center fade-in">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/contact">{t('requestQuote')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Companies;
