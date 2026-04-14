import { useState, useEffect } from 'react';
import type { SanityAsset } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PreviewCarouselProps {
  assets: SanityAsset[];
  className?: string; // used to set height/aspect-ratio
}

export function PreviewCarousel({ assets, className }: PreviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!assets || assets.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === assets.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [assets]);

  if (!assets || assets.length === 0) {
    return <div className={cn("w-full bg-zinc-900", className)} />;
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? assets.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === assets.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={cn("relative w-full overflow-hidden bg-black group", className)}>
      <div 
        className="flex h-full w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {assets.map((asset, index) => (
          <div key={index} className="min-w-full h-full flex items-center justify-center p-0">
            {asset.type === 'video' ? (
              <video 
                src={asset.assetUrl} 
                controls 
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <img 
                src={asset.assetUrl} 
                alt={asset.altText || 'Carousel Item'} 
                className="max-h-full max-w-full object-contain"
              />
            )}
          </div>
        ))}
      </div>

      {assets.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {assets.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  currentIndex === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
