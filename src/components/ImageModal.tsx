import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

const ImageModal = ({ isOpen, imageSrc, imageAlt, onClose }: ImageModalProps) => {
  const [zoom, setZoom] = useState(1);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      setZoom(1);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in"
      onClick={handleBackdropClick}
    >
      <button
        onClick={() => {
          onClose();
          setZoom(1);
        }}
        className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="flex gap-4 absolute top-4 left-4">
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="p-2 rounded-full bg-background/80 hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-6 w-6" />
        </button>
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="p-2 rounded-full bg-background/80 hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-6 w-6" />
        </button>
      </div>

      <div className="max-w-5xl max-h-[90vh] overflow-auto">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto object-contain transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
    </div>
  );
};

export default ImageModal;
