import { useState, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { SanityImage } from '../../types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export function Gallery({ images, className }: { images: SanityImage[]; className?: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrevious = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  }, [selectedIndex, images.length]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  }, [selectedIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') {
        setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
      }
      if (e.key === 'ArrowRight') {
        setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);

  const len = images.length;
  // Mathematical columns calculation to gracefully pack images
  const cols = len === 1 ? 1 : len <= 4 ? 2 : len <= 9 ? 3 : 4;
  const rows = Math.ceil(len / cols);

  const activeImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      {images && images.length > 0 && (
        <div 
          className={cn("grid gap-3 sm:gap-4 w-full h-[400px] sm:h-[500px] lg:h-[600px]", className)}
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
          }}
        >
          {images.map((img, idx) => {
            const emptyCells = (cols * rows) - len;
            let colSpan = 1;
            
            if (idx === 0 && emptyCells > 0) {
              colSpan = Math.min(emptyCells + 1, cols);
            }

            return (
              <div 
                key={`${img.assetUrl}-${idx}`} 
                className={cn("relative overflow-hidden rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow group cursor-pointer")}
                style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
                onClick={() => setSelectedIndex(idx)}
              >
                <img 
                  src={img.assetUrl} 
                  alt={img.altText || 'Gallery image'} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
              </div>
            )
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center">
            
            <button 
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white p-2 transition-colors focus:outline-none rounded-full bg-black/50 md:bg-white/10 z-50 hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Left Nav */}
            {images.length > 1 && (
              <button 
                onClick={handlePrevious}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 md:p-4 transition-colors focus:outline-none rounded-full bg-black/50 md:bg-white/10 hover:bg-white/20 z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            )}

            <img 
              src={activeImage.assetUrl} 
              alt={activeImage.altText || 'Enlarged image'} 
              className="max-w-full max-h-[85vh] object-contain shadow-2xl pointer-events-auto select-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Right Nav */}
            {images.length > 1 && (
              <button 
                onClick={handleNext}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 md:p-4 transition-colors focus:outline-none rounded-full bg-black/50 md:bg-white/10 hover:bg-white/20 z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            )}

            {activeImage.altText && (
              <p className="absolute bottom-4 md:bottom-8 text-center text-white/90 text-sm md:text-base w-full bg-black/50 md:bg-transparent py-2 rounded pointer-events-none select-none">
                {activeImage.altText}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
