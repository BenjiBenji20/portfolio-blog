import { useEffect, useCallback } from 'react';
import type { SanityAsset } from '../../types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LightBoxProps {
  images: SanityAsset[];
  selectedIndex: number;
  onClose: () => void;
  setSelectedIndex: (idx: number) => void;
}

export function LightBox({ images, selectedIndex, onClose, setSelectedIndex }: LightBoxProps) {
  const activeAsset = images[selectedIndex];

  const handlePrevious = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  }, [selectedIndex, images.length, setSelectedIndex]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  }, [selectedIndex, images.length, setSelectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious, onClose]);

  if (!activeAsset) return null;

  const hasDescription = !!activeAsset.description;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Banner Control */}
      <button
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white p-2 transition-colors focus:outline-none rounded-full bg-black/50 md:bg-white/10 z-50 hover:bg-white/20"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Frame Container simulating Teams UI: Split View Left Stage / Right Drawer */}
      <div 
        className={cn(
          "w-full h-full pt-16 pb-24 md:pb-32 px-2 md:px-12 flex flex-col lg:flex-row transition-all duration-300",
          hasDescription ? "lg:pr-[320px]" : ""
        )}
      >
        {/* Main Center Stage */}
        <div className="flex-1 w-full h-full relative flex items-center justify-center min-h-0 bg-transparent">
          
          {/* Navigation Controls Overlay */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 md:p-3 transition-colors focus:outline-none rounded-full hover:bg-white/10 z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 md:p-3 transition-colors focus:outline-none rounded-full hover:bg-white/10 z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
              </button>
            </>
          )}

          {/* Bound Internal Element */}
          <div className="w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {activeAsset.type === 'video' ? (
               <video 
                  src={activeAsset.assetUrl}
                  className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm pointer-events-auto"
                  controls
                  autoPlay
                  playsInline
               />
            ) : (
               <img
                  src={activeAsset.assetUrl}
                  alt={activeAsset.altText || 'Enlarged Lightbox view'}
                  className="max-w-full max-h-[85vh] object-contain shadow-2xl pointer-events-auto select-none rounded-sm"
               />
            )}
          </div>
        </div>

        {/* Right Info Drawer (Only if description exists) */}
        {hasDescription && (
          <div 
            className="w-full lg:w-80 shrink-0 flex flex-col p-6 lg:fixed right-0 top-0 bottom-0 lg:border-l border-zinc-800 lg:bg-[#0f1012] bg-black/50 lg:backdrop-blur-none backdrop-blur-md z-40 overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
             <h3 className="text-xl font-semibold text-zinc-100 mb-6 hidden lg:block mt-12">Details</h3>
             
             <div className="space-y-4">
               {activeAsset.altText && (
                 <div className="text-sm font-medium text-zinc-300 hidden lg:block">
                    {activeAsset.altText}
                 </div>
               )}
               <p className="text-zinc-400 text-sm md:text-base leading-relaxed text-center lg:text-left">
                  {activeAsset.description}
               </p>
             </div>
          </div>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-0 right-0 w-full flex justify-center z-50 px-4 pointer-events-auto">
          <div 
            className="flex flex-row items-center gap-2 md:gap-3 overflow-x-auto max-w-full py-2 scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((asset, idx) => (
               <button
                 key={`${asset.assetUrl}-${idx}`}
                 className={cn(
                   "relative w-12 h-12 md:w-16 md:h-16 shrink-0 rounded overflow-hidden transition-all duration-300 border-2",
                   idx === selectedIndex 
                    ? "border-accent scale-110 opacity-100 shadow-[0_0_12px_rgba(6,182,212,0.5)]" 
                    : "border-transparent opacity-50 hover:opacity-100 hover:scale-105"
                 )}
                 onClick={() => setSelectedIndex(idx)}
               >
                 {asset.type === 'video' ? (
                   <video src={asset.assetUrl} className="w-full h-full object-cover pointer-events-none" />
                 ) : (
                   <img src={asset.assetUrl} alt="Thumbnail view" className="w-full h-full object-cover pointer-events-none" />
                 )}
               </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
