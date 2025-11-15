import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import twelveInstructions1 from '@/assets/twelve-instructions-1.jpg';
import twelveInstructions2 from '@/assets/twelve-instructions-2.jpg';
import twelveAssembly from '@/assets/twelve-assembly.jpg';
import twelveInstalled from '@/assets/twelve-installed.jpg';
import twelvePackage from '@/assets/twelve-package.jpg';

interface TwelveSetCarouselProps {
  onImageClick: (imageSrc: string, imageAlt: string) => void;
}

const TwelveSetCarousel = ({ onImageClick }: TwelveSetCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: twelveInstructions1, alt: 'Twelve Instructions Page 1' },
    { src: twelveInstructions2, alt: 'Twelve Instructions Page 2' },
    { src: twelveAssembly, alt: 'Twelve Set Assembly' },
    { src: twelveInstalled, alt: 'Twelve Set Installed' },
    { src: twelvePackage, alt: 'Twelve Set Package' }
  ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden fade-in">
      <div className="relative aspect-square">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onImageClick(images[currentIndex].src, images[currentIndex].alt)}
        />
        
        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-primary w-6' : 'bg-background/60'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwelveSetCarousel;
