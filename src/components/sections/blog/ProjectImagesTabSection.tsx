import { useState, useEffect } from 'react';
import { useProjectImages } from '../../../hooks/useData';
import { Gallery } from '../../common/Gallery';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { ReadMoreMarkdown } from '../../common/ReadMoreMarkdown';

interface ProjectImagesTabSectionProps {
  projectId: string;
}

const ITEMS_PER_PAGE = 3;

export function ProjectImagesTabSection({ projectId }: ProjectImagesTabSectionProps) {
  const [offset, setOffset] = useState(0);
  const { data: entries, isLoading, isFetchingMore, hasMore } = useProjectImages(projectId, offset, ITEMS_PER_PAGE);
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    setOffset(0);
  }, [projectId]);

  const currentEntryCount = entries?.length || 0;

  useEffect(() => {
    // STRICT CIRCUIT BREAKER
    const hasLoadedCurrentBatch = currentEntryCount >= offset + ITEMS_PER_PAGE;

    if (isIntersecting && hasMore && !isFetchingMore && hasLoadedCurrentBatch) {
      setOffset(currentEntryCount);
    }
  }, [isIntersecting, hasMore, isFetchingMore, offset, currentEntryCount]);

  if (isLoading && offset === 0) {
    return (
      <div className="w-full flex h-64 items-center justify-center border border-dashed border-border bg-card rounded-lg">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="w-full flex h-64 items-center justify-center border border-dashed border-border bg-card rounded-lg">
        <p className="text-secondary text-sm">No images documented for this project.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-8">
      {entries.map((entry, idx) => {
        const validAssets = entry.contents?.filter(asset => asset.type !== 'video') || [];

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

      {hasMore && (
        <div ref={targetRef} className="w-full py-8 flex justify-center">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}