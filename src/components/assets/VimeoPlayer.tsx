import { cn } from '../../utils/cn';
import { getVimeoId } from '../../utils/video';

interface VimeoPlayerProps {
  url: string;
  alt?: string;
  isThumbnail?: boolean;
  className?: string;
}

export function VimeoPlayer({ url, alt, isThumbnail = false, className }: VimeoPlayerProps) {
  const videoId = getVimeoId(url);
  
  if (!videoId) return null;

  if (isThumbnail) {
    // For Vimeo thumbnails without an API call, we render a sleek dark gradient + play icon.
    return (
      <div className={cn("relative w-full h-full overflow-hidden bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center group", className)}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-[2px] border border-white/20 shadow-md transition-transform duration-500 group-hover:scale-110">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-[2px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full bg-black flex items-center justify-center rounded-sm overflow-hidden", className)}>
      <iframe 
        src={`https://player.vimeo.com/video/${videoId}?autoplay=1`}
        className="w-full h-full object-contain pointer-events-auto"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={alt || 'Vimeo Video'}
      />
    </div>
  );
}
