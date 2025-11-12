import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Clock className="w-8 h-8" />
            <span>Twelve</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              to="/models"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/models') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('models')}
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/about') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('about')}
            </Link>
            <Link
              to="/companies"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/companies') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('companies')}
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/contact') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('contact')}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant={language === 'ro' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('ro')}
              className="min-w-[50px]"
            >
              RO
            </Button>
            <Button
              variant={language === 'ru' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('ru')}
              className="min-w-[50px]"
            >
              RU
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
