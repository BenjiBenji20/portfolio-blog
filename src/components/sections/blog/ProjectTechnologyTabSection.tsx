import { useState, useEffect } from 'react';
import { useProjectTechnologies } from '../../../hooks/useData';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { ReadMoreMarkdown } from '../../common/ReadMoreMarkdown';
import { MarkdownText } from '../../common/MarkdownText';

interface ProjectTechnologyTabSectionProps {
  projectId: string;
  projectTitle: string;
}

const ITEMS_PER_PAGE = 3;

export function ProjectTechnologyTabSection({ projectId, projectTitle }: ProjectTechnologyTabSectionProps) {
  const [offset, setOffset] = useState(0);
  const { data: entries, isLoading, isFetchingMore, hasMore } = useProjectTechnologies(projectId, offset, ITEMS_PER_PAGE);
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
        <p className="text-secondary text-sm">No technologies documented for this project.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-12">
      {entries.map((techPhase, idx) => (
        <section key={idx} className="flex flex-col space-y-6">
          <header className="flex flex-col space-y-2 border-b border-border pb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
              {techPhase.title || projectTitle}
            </h2>
            {techPhase.description && (
              <div className="w-full mt-2">
                <ReadMoreMarkdown content={techPhase.description} maxHeight={250} />
              </div>
            )}
          </header>

          {techPhase.techStacks && techPhase.techStacks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
              {techPhase.techStacks.map((stack, sIdx) => (
                <div key={sIdx} className="border border-border rounded-xl p-5 bg-card shadow-sm flex flex-col space-y-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-primary capitalize tracking-wide">
                    {stack.type.replace('-', ' ')}
                  </h3>
                  
                  {stack.assets && stack.assets.length > 0 && (
                    <div className="flex flex-row flex-wrap gap-4 items-center">
                      {stack.assets.map((asset, aIdx) => (
                        <div key={aIdx} className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-transparent rounded flex items-center justify-center pointer-events-none">
                           <img 
                             src={asset.assetUrl} 
                             alt={asset.altText || 'Tech Icon'} 
                             className="w-full h-full object-contain" 
                           />
                        </div>
                      ))}
                    </div>
                  )}

                  {stack.description && (
                    <details className="group mt-2 border-t border-border pt-3">
                      <summary className="cursor-pointer text-sm font-medium text-accent hover:text-accent-hover transition-colors select-none flex items-center justify-between">
                        <span>View Details</span>
                        <span className="text-secondary group-open:rotate-180 transition-transform duration-200">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </summary>
                      <div className="pt-3 text-left w-full animate-in fade-in slide-in-from-top-1 duration-200">
                        <MarkdownText content={stack.description} />
                      </div>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {hasMore && (
         <div ref={targetRef} className="w-full py-8 flex justify-center">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
         </div>
      )}
    </div>
  );
}