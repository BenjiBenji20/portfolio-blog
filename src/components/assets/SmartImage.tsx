import { cn } from '../../utils/cn';

interface SmartImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export function SmartImage({ src, alt, className }: SmartImageProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-black flex items-center justify-center group", className)}>
      {/* Blurred Background Layer for Zero-Crop Policy */}
      <div 
        className="absolute inset-0 w-full h-full opacity-50 scale-110"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)'
        }}
      />
      {/* Foreground Image Layer */}
      <img
        src={src}
        alt={alt || 'Image asset'}
        className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 pointer-events-none"
        loading="lazy"
      />
    </div>
  );
}
