import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 w-full bg-[#F58835] text-white py-4 px-6 z-[9999] shadow-lg animate-fade-in"
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm sm:text-base text-center sm:text-left">
          Folosim cookie-uri pentru a îmbunătăți experiența pe site.{' '}
          <Link 
            to="/privacy" 
            className="underline hover:text-white/90 transition-colors font-medium"
          >
            Află mai multe
          </Link>
        </p>
        <button
          onClick={handleAccept}
          className="flex items-center gap-2 px-6 py-2 bg-white text-[#F58835] rounded-full font-medium hover:bg-white/95 hover:scale-105 transition-all duration-300 shadow-md whitespace-nowrap"
        >
          <Cookie className="w-4 h-4" />
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
