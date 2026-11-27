import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { isBlackFridayPromoActive, msUntilPromoExpiration } from '@/lib/promo-banner';

interface PromoBannerProps {
  onHeightChange?: (height: number) => void;
}

const PromoBanner = ({ onHeightChange }: PromoBannerProps) => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(() => isBlackFridayPromoActive());
  const [isDismissed, setIsDismissed] = useState(false);

  const isVisible = isActive && !isDismissed;

  useEffect(() => {
    if (!isVisible) return;
    const remaining = msUntilPromoExpiration();
    if (remaining === null) return;
    const timer = window.setTimeout(() => {
      setIsActive(isBlackFridayPromoActive());
    }, remaining + 50);
    return () => window.clearTimeout(timer);
  }, [isVisible]);

  useLayoutEffect(() => {
    if (!isVisible) {
      onHeightChange?.(0);
      return;
    }
    const node = bannerRef.current;
    if (!node) return;

    const reportHeight = () => {
      onHeightChange?.(Math.ceil(node.getBoundingClientRect().height));
    };

    reportHeight();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(reportHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, onHeightChange]);

  if (!isVisible) return null;

  const handleOfferClick = () => {
    if (location.pathname === '/models') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/models');
    }
  };

  return (
    <div
      ref={bannerRef}
      role="region"
      aria-label="Black Friday"
      data-testid="promo-banner"
      className="relative w-full bg-promo text-promo-foreground border-b border-promo-border px-8 sm:px-10 py-1.5"
    >
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-center text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
          <p className="text-[11px] sm:text-xs font-semibold tracking-tight leading-snug">
            <span className="text-promo-accent font-extrabold tracking-wide mr-1.5">
              {t('promoBadge')}
            </span>
            <span>{t('promoMessage')}</span>
          </p>
          <button
            type="button"
            onClick={handleOfferClick}
            className="inline-flex items-center justify-center rounded-full bg-promo-accent text-promo-accent-foreground hover:bg-promo-accent/90 active:scale-95 transition-all font-bold text-[11px] sm:text-xs px-3 py-0.5 leading-tight whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t('promoCta')}
          </button>
        </div>
        <p className="text-[10px] sm:text-[11px] leading-tight text-promo-muted mt-0.5">
          {t('promoPeriod')}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setIsDismissed(true)}
        aria-label={t('promoClose')}
        className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-promo-muted hover:text-promo-foreground transition-colors cursor-pointer"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export default PromoBanner;