import { useState } from 'react';
import { cn } from '../../utils/cn';

export function ReadMoreText({ 
  text, 
  maxLength = 180, 
  className 
}: { 
  text: string; 
  maxLength?: number; 
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongText = text.length > maxLength;

  return (
    <div className={cn("text-secondary leading-relaxed font-light", className)}>
      <p>
        {isExpanded || !isLongText ? text : `${text.slice(0, maxLength)}...`}
        {isLongText && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 font-medium text-accent hover:text-primary transition-colors focus:outline-none"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>
    </div>
  );
}
