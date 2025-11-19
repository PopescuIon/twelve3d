import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '@/assets/logo.png';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageNavigationClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, sectionId: string) => {
    e.preventDefault();
    navigate(path);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <a href="/" onClick={handleHomeClick} className="flex items-center">
            <img src={logo} alt="Twelve" className="h-10 md:h-12 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a
              href="/"
              onClick={handleHomeClick}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('home')}
            </a>
            <a
              href="/models"
              onClick={(e) => handlePageNavigationClick(e, '/models', 'models-collection')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/models') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('models')}
            </a>
            <a
              href="#twelve-set"
              onClick={(e) => handleSectionClick(e, 'twelve-set')}
              className="text-sm font-medium transition-colors hover:text-primary text-foreground"
            >
              {t('twelveSet')}
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleSectionClick(e, 'testimonials')}
              className="text-sm font-medium transition-colors hover:text-primary text-foreground"
            >
              {t('testimonials')}
            </a>
            <a
              href="/corporate"
              onClick={(e) => handlePageNavigationClick(e, '/corporate', 'corporate-clocks')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/corporate') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('corporateClocks')}
            </a>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/about') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('about')}
            </Link>
            <a
              href="#contact"
              onClick={(e) => handleSectionClick(e, 'contact')}
              className="text-sm font-medium transition-colors hover:text-primary text-foreground"
            >
              {t('contact')}
            </a>
          </nav>

          {/* Desktop Language & Phone */}
          <div className="hidden lg:flex items-center gap-3">
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
            <a 
              href="tel:+37360592006" 
              className="hidden xl:flex px-4 py-2 bg-[#F58835] text-white rounded-full text-sm font-medium hover:bg-[#F58835]/90 transition-colors"
            >
              +373 60 592 006
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                <a
                  href="/"
                  onClick={(e) => {
                    handleHomeClick(e);
                    setIsOpen(false);
                  }}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    isActive('/') ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {t('home')}
                </a>
                <a
                  href="/models"
                  onClick={(e) => {
                    handlePageNavigationClick(e, '/models', 'models-collection');
                    setIsOpen(false);
                  }}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    isActive('/models') ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {t('models')}
                </a>
                <a
                  href="#twelve-set"
                  onClick={(e) => {
                    handleSectionClick(e, 'twelve-set');
                    setIsOpen(false);
                  }}
                  className="text-lg font-medium transition-colors hover:text-primary text-foreground"
                >
                  Setul Twelve
                </a>
                <a
                  href="#testimonials"
                  onClick={(e) => {
                    handleSectionClick(e, 'testimonials');
                    setIsOpen(false);
                  }}
                  className="text-lg font-medium transition-colors hover:text-primary text-foreground"
                >
                  Recenzii
                </a>
                <a
                  href="/corporate"
                  onClick={(e) => {
                    handlePageNavigationClick(e, '/corporate', 'corporate-clocks');
                    setIsOpen(false);
                  }}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    isActive('/corporate') ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {t('corporateClocks')}
                </a>
                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    isActive('/about') ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {t('about')}
                </Link>
                <a
                  href="#contact"
                  onClick={(e) => {
                    handleSectionClick(e, 'contact');
                    setIsOpen(false);
                  }}
                  className="text-lg font-medium transition-colors hover:text-primary text-foreground"
                >
                  {t('contact')}
                </a>

                <div className="flex gap-3 mt-4 pt-6 border-t border-border">
                  <Button
                    variant={language === 'ro' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLanguage('ro')}
                    className="flex-1"
                  >
                    RO
                  </Button>
                  <Button
                    variant={language === 'ru' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLanguage('ru')}
                    className="flex-1"
                  >
                    RU
                  </Button>
                </div>

                <a 
                  href="tel:+37360592006" 
                  className="w-full text-center px-4 py-3 bg-[#F58835] text-white rounded-full text-base font-medium hover:bg-[#F58835]/90 transition-colors mt-4"
                >
                  +373 60 592 006
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
