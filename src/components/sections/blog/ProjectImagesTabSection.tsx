import { useState, useEffect, useMemo } from 'react';
import type { ProjectImages } from '../../../types';
import { Gallery } from '../../common/Gallery';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { ReadMoreMarkdown } from '../../common/ReadMoreMarkdown';

interface ProjectImagesTabSectionProps {
  entries: ProjectImages[];
}

const ITEMS_PER_PAGE = 3;

export function ProjectImagesTabSection({ entries }: ProjectImagesTabSectionProps) {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  // Reset display count when entries change (e.g. project switch)
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [entries]);

  useEffect(() => {
    if (isIntersecting && displayCount < entries.length) {
      // Simulate network latency for lazy loading
      const timer = setTimeout(() => {
        setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, entries.length));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isIntersecting, displayCount, entries.length]);

  const displayedEntries = useMemo(() => {
    return [...entries].slice(0, displayCount);
  }, [entries, displayCount]);

  if (!entries || entries.length === 0) {
    return (
      <div className="w-full flex h-64 items-center justify-center border border-dashed border-border bg-card rounded-lg">
        <p className="text-secondary text-sm">No images documented for this project.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-8">
      {displayedEntries.map((entry, idx) => {
        // Filter out videos according to requirements
        const validAssets = entry.contents?.filter(asset => asset.type !== 'video') || [];

        // If no images exist after filtering, we can optionally skip or just render the text
        if (validAssets.length === 0 && !entry.description) {
           return null; 
        }

        return (
          <article key={idx} className="flex flex-col space-y-4 border border-border rounded-xl p-5 sm:p-7 bg-card shadow-sm hover:shadow-md transition-shadow">
            <header className="flex flex-col space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                {entry.title}
              </h2>
            </header>

            {validAssets.length > 0 && (
              <div className="w-full py-2">
                <Gallery images={validAssets} className="h-[250px] sm:h-[350px] lg:h-[450px]" />
              </div>
            )}

            {entry.description && (
              <div className="w-full">
                <ReadMoreMarkdown content={entry.description} maxHeight={250} />
              </div>
            )}
          </article>
        )
      })}

      {/* Lazy loading anchor */}
      {displayCount < entries.length && (
        <div ref={targetRef} className="w-full py-8 flex justify-center">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
