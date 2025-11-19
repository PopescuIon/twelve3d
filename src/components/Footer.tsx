import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Facebook } from 'lucide-react';
import { FaTiktok, FaWhatsapp } from 'react-icons/fa';
import logo from '@/assets/logo.png';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src={logo} alt="Twelve" className="h-12 w-auto" />
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
            <Link to="/corporate" className="text-sm hover:text-primary transition-colors">
              Ceasuri Corporate
            </Link>
            <Link to="/#contact" className="text-sm hover:text-primary transition-colors">
              {t('contact')}
            </Link>
            <Link to="/privacy" className="text-sm hover:text-primary transition-colors">
              {t('privacy')}
            </Link>
          </nav>

          <div>
            <h3 className="text-sm font-semibold mb-4">{t('followUs')}</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/twelve_wall_clock/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:scale-110 hover:brightness-110 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/twelveclocks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:scale-110 hover:brightness-110 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@twelve.wall.clocks?_t=ZM-8wsF2NKJ7cW&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:scale-110 hover:brightness-110 transition-all duration-300"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/37360592006"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:scale-110 hover:brightness-110 transition-all duration-300"
              >
                <FaWhatsapp className="w-5 h-5" />
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
