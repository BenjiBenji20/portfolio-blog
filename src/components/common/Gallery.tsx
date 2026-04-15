import { useState } from 'react';
import { cn } from '../../utils/cn';
import type { SanityAsset } from '../../types';
import { LightBox, isYouTube, getYouTubeId } from './LightBox';

export function Gallery({ images, className }: { images: SanityAsset[]; className?: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const len = images.length;
  // Mathematical columns calculation to gracefully pack images
  const cols = len === 1 ? 1 : len <= 4 ? 2 : len <= 9 ? 3 : 4;
  const rows = Math.ceil(len / cols);

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
                {img.type === 'video' ? (
                  isYouTube(img.assetUrl) ? (
                    <>
                      <img 
                        src={`https://img.youtube.com/vi/${getYouTubeId(img.assetUrl)}/hqdefault.jpg`}
                        alt={img.altText || 'YouTube video thumbnail'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-[2px] border border-white/20 shadow-md transition-transform duration-500 group-hover:scale-110">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-[2px]" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <video 
                      src={img.assetUrl}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      muted
                      loop
                      playsInline
                    />
                  )
                ) : (
                  <img
                    src={img.assetUrl}
                    alt={img.altText || 'Gallery image'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
              </div>
            )
          })}
        </div>
      )}

      {/* Decoupled Lightbox Overlay */}
      {selectedIndex !== null && (
        <LightBox 
          images={images}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          setSelectedIndex={setSelectedIndex}
        />
      )}
    </>
  );
}
