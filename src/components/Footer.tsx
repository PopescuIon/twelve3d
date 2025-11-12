import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
              <Clock className="w-8 h-8" />
              <span>Twelve</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Twelve – {t('footerTagline')}
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              {t('home')}
            </Link>
            <Link to="/models" className="text-sm hover:text-primary transition-colors">
              {t('models')}
            </Link>
            <Link to="/about" className="text-sm hover:text-primary transition-colors">
              {t('about')}
            </Link>
            <Link to="/companies" className="text-sm hover:text-primary transition-colors">
              {t('companies')}
            </Link>
            <Link to="/contact" className="text-sm hover:text-primary transition-colors">
              {t('contact')}
            </Link>
          </nav>

          <div>
            <h3 className="text-sm font-semibold mb-4">{t('followUs')}</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Twelve. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
