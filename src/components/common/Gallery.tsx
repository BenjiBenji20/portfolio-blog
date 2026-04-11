import { useState } from 'react';
import { cn } from '../../utils/cn';
import type { SanityImage } from '../../types';

export function Gallery({ images, className }: { images: SanityImage[]; className?: string }) {
  const [selectedImage, setSelectedImage] = useState<SanityImage | null>(null);

  const len = images.length;
  // Mathematical columns calculation to gracefully pack images
  const cols = len === 1 ? 1 : len <= 4 ? 2 : len <= 9 ? 3 : 4;
  const rows = Math.ceil(len / cols);

  return (
    <>
      <div 
        className={cn("grid gap-3 sm:gap-4 w-full h-[400px] sm:h-[500px] lg:h-[600px]", className)}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
        }}
      >
        {images.map((img, idx) => {
          // Distribute any extra empty grid cells to the first image for a perfect Bento layout
          const emptyCells = (cols * rows) - len;
          let colSpan = 1;
          
          if (idx === 0 && emptyCells > 0) {
            colSpan = Math.min(emptyCells + 1, cols);
          }

          return (
            <div 
              key={`${img.assetUrl}-${idx}`} 
              className={cn("relative overflow-hidden rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow group cursor-pointer")}
              style={{
                gridColumn: `span ${colSpan} / span ${colSpan}`,
              }}
              onClick={() => setSelectedImage(img)}
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center">
            <button 
              className="absolute top-4 right-4 md:-top-8 md:-right-8 text-white/70 hover:text-white p-2 transition-colors focus:outline-none rounded-full bg-black/50 md:bg-transparent"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <img 
              src={selectedImage.assetUrl} 
              alt={selectedImage.altText || 'Enlarged image'} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            />
            {selectedImage.altText && (
              <p className="absolute bottom-4 md:-bottom-10 text-center text-white/90 text-sm md:text-base w-full bg-black/50 md:bg-transparent py-2 rounded">
                {selectedImage.altText}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
