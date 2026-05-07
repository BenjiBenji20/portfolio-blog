import { cn } from '../../utils/cn';

interface SanityVideoPlayerProps {
  url: string;
  alt?: string;
  isThumbnail?: boolean;
  className?: string;
}

export function SanityVideoPlayer({ url, isThumbnail = false, className }: SanityVideoPlayerProps) {
  if (isThumbnail) {
    return (
      <div className={cn("relative w-full h-full overflow-hidden bg-black flex items-center justify-center group", className)}>
        {/* We use a dark background for Sanity video thumbnails */}
        <video 
          src={url}
          className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
          <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-[2px] border border-white/20 shadow-md">
             <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-[2px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full bg-black flex items-center justify-center rounded-sm overflow-hidden", className)}>
      <video 
        src={url}
        className="w-full h-full object-contain shadow-2xl pointer-events-auto"
        controls
        autoPlay
        playsInline
      />
    </div>
  );
}
