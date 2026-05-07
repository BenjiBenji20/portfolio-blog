import { useState } from 'react';
import { cn } from '../../utils/cn';
import type { SanityAsset } from '../../types';
import { LightBox } from './LightBox';
import { AssetRenderer } from '../assets/AssetRenderer';

export function Gallery({ images, className }: { images: SanityAsset[]; className?: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, 5); // Cap at 5
  const len = displayImages.length;
  const hasMore = images.length > 5;
  const remainingCount = images.length - 5;

  const AssetItem = ({ asset, index, className }: { asset: SanityAsset, index: number, className?: string }) => (
    <div 
      className={cn("relative overflow-hidden rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow group cursor-pointer", className)}
      onClick={() => setSelectedIndex(index)}
    >
      <AssetRenderer asset={asset} isThumbnail className="w-full h-full rounded-none" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none z-30" />
    </div>
  );

  const renderCollage = () => {
    if (len === 1) {
      return (
        <div className={cn("grid grid-cols-1 w-full h-[300px] sm:h-[400px] md:h-[500px] gap-2 md:gap-3", className)}>
           <AssetItem asset={displayImages[0]} index={0} />
        </div>
      );
    }
    
    if (len === 2) {
      return (
        <div className={cn("grid grid-cols-2 w-full h-[300px] sm:h-[400px] md:h-[500px] gap-2 md:gap-3", className)}>
           <AssetItem asset={displayImages[0]} index={0} />
           <AssetItem asset={displayImages[1]} index={1} />
        </div>
      );
    }

    if (len === 3) {
      return (
        <div className={cn("grid grid-cols-2 grid-rows-2 w-full h-[400px] sm:h-[500px] md:h-[600px] gap-2 md:gap-3", className)}>
           <AssetItem asset={displayImages[0]} index={0} className="row-span-2" />
           <AssetItem asset={displayImages[1]} index={1} />
           <AssetItem asset={displayImages[2]} index={2} />
        </div>
      );
    }

    if (len === 4) {
      return (
        <div className={cn("grid grid-cols-2 grid-rows-2 w-full h-[400px] sm:h-[500px] md:h-[600px] gap-2 md:gap-3", className)}>
           <AssetItem asset={displayImages[0]} index={0} />
           <AssetItem asset={displayImages[1]} index={1} />
           <AssetItem asset={displayImages[2]} index={2} />
           <AssetItem asset={displayImages[3]} index={3} />
        </div>
      );
    }

    // 5 items
    return (
      <div className={cn("grid grid-cols-6 grid-rows-2 w-full h-[400px] sm:h-[550px] md:h-[650px] gap-2 md:gap-3", className)}>
         <AssetItem asset={displayImages[0]} index={0} className="col-span-3" />
         <AssetItem asset={displayImages[1]} index={1} className="col-span-3" />
         <AssetItem asset={displayImages[2]} index={2} className="col-span-2" />
         <AssetItem asset={displayImages[3]} index={3} className="col-span-2" />
         
         {/* 5th item has overlay if more exist */}
         <div 
           className="relative col-span-2 overflow-hidden rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
           onClick={() => setSelectedIndex(4)}
         >
           <AssetRenderer asset={displayImages[4]} isThumbnail className="w-full h-full rounded-none" />
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none z-30" />
           {hasMore && (
             <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px] z-40 transition-colors group-hover:bg-black/70">
               <span className="text-white text-2xl sm:text-3xl md:text-4xl font-medium">+{remainingCount}</span>
             </div>
           )}
         </div>
      </div>
    );
  }

  return (
    <>
      {renderCollage()}

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
