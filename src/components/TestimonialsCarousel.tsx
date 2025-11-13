import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from './ui/button';

const TestimonialsCarousel = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    { id: 1, key: 'testimonial1' },
    { id: 2, key: 'testimonial2' },
    { id: 3, key: 'testimonial3' },
    { id: 4, key: 'testimonial4' },
    { id: 5, key: 'testimonial5' },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 fade-in">
          {t('happyCustomers')}
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-background rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
            <Quote className="absolute top-4 left-4 w-12 h-12 text-primary opacity-20" />
            
            <div className="relative z-10 min-h-[200px] flex items-center">
              <p className="text-lg md:text-xl text-foreground leading-relaxed text-center fade-in">
                {t(testimonials[currentIndex].key)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-primary w-8' : 'bg-muted'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
