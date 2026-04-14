import { useState, useRef, useEffect } from 'react';
import { MarkdownText } from './MarkdownText';
import { cn } from '../../utils/cn';

interface ReadMoreMarkdownProps {
  content: string;
  maxHeight?: number; // Maximum height in pixels before truncating
  className?: string;
}

export function ReadMoreMarkdown({ content, maxHeight = 160, className }: ReadMoreMarkdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Check if the scroll height exceeds the max height
      if (contentRef.current.scrollHeight > maxHeight) {
        setNeedsTruncation(true);
      } else {
        setNeedsTruncation(false);
      }
    }
  }, [content, maxHeight]);

  return (
    <div className={cn("relative w-full", className)}>
      <div 
        ref={contentRef}
        className={cn(
          "w-full overflow-hidden transition-all duration-300",
          !isExpanded && needsTruncation ? "relative" : ""
        )}
        style={{ maxHeight: !isExpanded && needsTruncation ? `${maxHeight}px` : undefined }}
      >
        <MarkdownText content={content} />
      </div>
      
      {!isExpanded && needsTruncation && (
        <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none bg-gradient-to-t from-background to-transparent" />
      )}
      
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors focus:outline-none"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
