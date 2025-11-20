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

  const handleSectionClick = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleHomeClick = () => {
    setIsOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handlePageNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
    // Scroll to top will be handled by the page component
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <button onClick={handleHomeClick} className="flex items-center cursor-pointer">
            <img src={logo} alt="Twelve" className="h-10 md:h-12 w-auto" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button
              onClick={handleHomeClick}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('home')}
            </button>
            <Link
              to="/models"
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                isActive('/models') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('models')}
            </Link>
            <button
              onClick={() => handleSectionClick('twelve-set')}
              className="text-sm font-medium transition-colors hover:text-primary text-foreground"
            >
              {t('twelveSet')}
            </button>
            <button
              onClick={() => handleSectionClick('testimonials')}
              className="text-sm font-medium transition-colors hover:text-primary text-foreground"
            >
              {t('testimonials')}
            </button>
            <Link
              to="/corporate"
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                isActive('/corporate') ? 'text-primary' : 'text-foreground'
              }`}
            >
              {t('corporateClocks')}
            </Link>
            <button
              onClick={() => handleSectionClick('about')}
              className="text-sm font-medium transition-colors hover:text-primary text-foreground"
            >
              {t('about')}
            </button>
            <button
              onClick={() => handleSectionClick('contact')}
              className="text-sm font-medium transition-colors hover:text-primary text-foreground"
            >
              {t('contact')}
            </button>
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
                <button
                  onClick={handleHomeClick}
                  className={`text-lg font-medium transition-colors hover:text-primary text-left ${
                    isActive('/') ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {t('home')}
                </button>
                <Link
                  to="/models"
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-primary cursor-pointer ${
                    isActive('/models') ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {t('models')}
                </Link>
                <button
                  onClick={() => handleSectionClick('twelve-set')}
                  className="text-lg font-medium transition-colors hover:text-primary text-foreground text-left"
                >
                  {t('twelveSet')}
                </button>
                <button
                  onClick={() => handleSectionClick('testimonials')}
                  className="text-lg font-medium transition-colors hover:text-primary text-foreground text-left"
                >
                  {t('testimonials')}
                </button>
                <Link
                  to="/corporate"
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-primary cursor-pointer ${
                    isActive('/corporate') ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {t('corporateClocks')}
                </Link>
                <button
                  onClick={() => handleSectionClick('about')}
                  className="text-lg font-medium transition-colors hover:text-primary text-foreground text-left"
                >
                  {t('about')}
                </button>
                <button
                  onClick={() => handleSectionClick('contact')}
                  className="text-lg font-medium transition-colors hover:text-primary text-foreground text-left"
                >
                  {t('contact')}
                </button>

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
