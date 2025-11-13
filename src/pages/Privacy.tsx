import { useLanguage } from '@/contexts/LanguageContext';

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="fade-in">
          <h1 className="text-5xl font-bold mb-8">{t('privacyTitle')}</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p className="text-xl leading-relaxed">
              {t('privacyIntro')}
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              {t('privacySection1Title')}
            </h2>
            <p className="leading-relaxed">{t('privacySection1Text')}</p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              {t('privacySection2Title')}
            </h2>
            <p className="leading-relaxed">{t('privacySection2Text')}</p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              {t('privacySection3Title')}
            </h2>
            <p className="leading-relaxed">{t('privacySection3Text')}</p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              {t('privacySection4Title')}
            </h2>
            <p className="leading-relaxed">{t('privacySection4Text')}</p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              {t('privacySection5Title')}
            </h2>
            <p className="leading-relaxed">{t('privacySection5Text')}</p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              {t('privacySection6Title')}
            </h2>
            <p className="leading-relaxed">{t('privacySection6Text')}</p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              {t('privacySection7Title')}
            </h2>
            <p className="leading-relaxed">{t('privacySection7Text')}</p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              {t('privacySection8Title')}
            </h2>
            <p className="leading-relaxed">{t('privacySection8Text')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
