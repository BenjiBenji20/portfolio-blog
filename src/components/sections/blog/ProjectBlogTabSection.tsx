import { useState, useEffect } from 'react';
import { Gallery } from '../../common/Gallery';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { FaGithub } from 'react-icons/fa';
import { ReadMoreMarkdown } from '../../common/ReadMoreMarkdown';
import { useProjectBlogs } from '../../../hooks/useData';

interface ProjectBlogTabSectionProps {
  projectId: string;
}

const ITEMS_PER_PAGE = 3;

export function ProjectBlogTabSection({ projectId }: ProjectBlogTabSectionProps) {
  const [offset, setOffset] = useState(0);
  const { data: entries, isLoading, isFetchingMore, hasMore } = useProjectBlogs(projectId, offset, ITEMS_PER_PAGE);
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
        <p className="text-secondary text-sm">No blog entries found for this project.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-8">
      {entries.map((entry) => (
        <article key={entry.id} className="flex flex-col space-y-4 border border-border rounded-xl p-5 sm:p-7 bg-card shadow-sm hover:shadow-md transition-shadow">
          <header className="flex flex-col space-y-2">
            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              {entry.title}
            </h2>
            <time dateTime={entry.datetime} className="text-sm font-medium text-tertiary">
              {new Date(entry.datetime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </header>

          {entry.assets && entry.assets.length > 0 && (
            <div className="w-full py-2">
              <Gallery images={entry.assets} className="h-[250px] sm:h-[350px] lg:h-[450px]" />
            </div>
          )}

          <div className="prose-container w-full max-w-none">
            <ReadMoreMarkdown content={entry.description} maxHeight={200} />
          </div>

          {entry.commitLink && (
            <div className="pt-2">
              <a 
                href={entry.commitLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors rounded hover:bg-card-hover/50 px-2 py-1 -ml-2"
              >
                <FaGithub size={16} />
                <span>View Commit</span>
              </a>
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
