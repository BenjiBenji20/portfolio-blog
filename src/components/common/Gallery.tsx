import { useState } from 'react';
import { cn } from '../../utils/cn';
import type { SanityAsset } from '../../types';
import { LightBox } from './LightBox';

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
