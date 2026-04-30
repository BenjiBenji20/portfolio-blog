import { useState, useEffect } from 'react';
import { Gallery } from '../../common/Gallery';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { MarkdownText } from '../../common/MarkdownText';
import { useProjectDeepDives } from '../../../hooks/useData';

interface ProjectDeepDiveTabSectionProps {
  projectId: string;
  projectTitle: string;
}

const ITEMS_PER_PAGE = 3;

export function ProjectDeepDiveTabSection({ projectId, projectTitle }: ProjectDeepDiveTabSectionProps) {
  const [offset, setOffset] = useState(0);
  const { data: entries, isLoading, isFetchingMore, hasMore } = useProjectDeepDives(projectId, offset, ITEMS_PER_PAGE);
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  // Reset offset when project changes
  useEffect(() => {
    setOffset(0);
  }, [projectId]);

  useEffect(() => {
    if (isIntersecting && hasMore && !isFetchingMore) {
      setOffset(prev => prev + ITEMS_PER_PAGE);
    }
  }, [isIntersecting, hasMore, isFetchingMore]);

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
        <p className="text-secondary text-sm">No deep dives found for this project.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-8">
      {entries.map((entry, idx) => (
        <article key={`${entry.title}-${idx}`} className="flex flex-col space-y-4 border border-border rounded-xl p-5 sm:p-7 bg-card shadow-sm hover:shadow-md transition-shadow">
          <header className="flex flex-col space-y-2">
            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              {entry.title}
            </h2>
            
            {/* Repo and Live Site Links */}
            {(entry.repoLink || entry.liveSiteLink) && (
              <div className="flex items-center space-x-3 pt-1">
                {entry.repoLink && (
                  <a 
                    href={entry.repoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors rounded hover:bg-card-hover/50 px-2 py-1 -ml-2"
                  >
                    <FaGithub size={16} />
                    <span>Repository</span>
                  </a>
                )}
                {entry.liveSiteLink && (
                  <a 
                    href={entry.liveSiteLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors rounded hover:bg-card-hover/50 px-2 py-1"
                  >
                    <FaExternalLinkAlt size={13} />
                    <span>Live Site</span>
                  </a>
                )}
              </div>
            )}
          </header>

          {entry.assets && entry.assets.length > 0 && (
            <div className="w-full py-2">
              <Gallery images={entry.assets} className="h-[250px] sm:h-[350px] lg:h-[450px]" />
            </div>
          )}

          <div className="w-full">
            <MarkdownText content={entry.description} />
          </div>

          {entry.liveAPIDocumentation && (
            <div className="pt-4">
              <details className="group border border-border rounded-lg overflow-hidden bg-card transition-all duration-300">
                <summary className="bg-card-hover px-4 py-3 cursor-pointer flex items-center justify-between font-medium text-primary hover:text-accent transition-colors select-none">
                  <span>{projectTitle} Live API Documentation</span>
                  <span className="text-secondary group-open:rotate-180 transition-transform duration-200">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="w-full h-[50vh] min-h-[400px] border-t border-border bg-white relative">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  </div>
                  <iframe 
                    src={entry.liveAPIDocumentation} 
                    title={`${projectTitle} Live API Documentation`}
                    className="w-full h-full border-none relative z-10 bg-white"
                  />
                </div>
              </details>
            </div>
          )}
        </article>
      ))}

      {/* Lazy loading anchor */}
      {hasMore && (
        <div ref={targetRef} className="w-full py-8 flex justify-center">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
