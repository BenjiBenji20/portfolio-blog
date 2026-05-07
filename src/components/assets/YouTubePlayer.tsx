import { cn } from '../../utils/cn';
import { getYouTubeId } from '../../utils/video';

interface YouTubePlayerProps {
  url: string;
  alt?: string;
  isThumbnail?: boolean;
  className?: string;
}

export function YouTubePlayer({ url, alt, isThumbnail = false, className }: YouTubePlayerProps) {
  const videoId = getYouTubeId(url);
  
  if (!videoId) return null;

  if (isThumbnail) {
    return (
      <div className={cn("relative w-full h-full overflow-hidden bg-black flex items-center justify-center group", className)}>
        {/* Blurred Background Layer for Zero-Crop Policy */}
        <div 
          className="absolute inset-0 w-full h-full opacity-50 scale-110"
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)'
          }}
        />
        <img 
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={alt || 'YouTube video thumbnail'}
          className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          loading="lazy"
        />
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
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        className="w-full h-full object-contain pointer-events-auto"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={alt || 'YouTube Video'}
      />
    </div>
  );
}
