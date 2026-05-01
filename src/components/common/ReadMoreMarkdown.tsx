import { useState, useRef, useEffect } from 'react';
import { MarkdownText } from './MarkdownText';
import { cn } from '../../utils/cn';

interface ReadMoreMarkdownProps {
  content: string;
  maxHeight?: number;
  className?: string;
}

export function ReadMoreMarkdown({ content, maxHeight = 160, className }: ReadMoreMarkdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (contentRef.current.scrollHeight > maxHeight) {
        setNeedsTruncation(true);
      } else {
        setNeedsTruncation(false);
      }
    }
  }, [content, maxHeight]);

  return (
    <div className={cn("w-full flex flex-col items-start", className)}>
      
      <div className="relative w-full">
        <div 
          ref={contentRef}
          className="w-full overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ 
            maxHeight: !isExpanded && needsTruncation ? `${maxHeight}px` : undefined,
            // This is the magic CSS Mask that fades the content itself
            WebkitMaskImage: !isExpanded && needsTruncation 
              ? 'linear-gradient(to bottom, black 60%, transparent 100%)' 
              : undefined,
            maskImage: !isExpanded && needsTruncation 
              ? 'linear-gradient(to bottom, black 60%, transparent 100%)' 
              : undefined
          }}
        >
          <MarkdownText content={content} />
        </div>
        
        {/* Notice we completely removed the absolute gradient overlay div! */}
      </div>
      
      {needsTruncation && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors focus:outline-none relative z-50 cursor-pointer pointer-events-auto"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
      
    </div>
  );
}