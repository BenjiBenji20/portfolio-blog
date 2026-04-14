import { useState, useEffect, useMemo } from 'react';
import type { ProjectBlogEntry } from '../../../types';
import { Gallery } from '../../common/Gallery';
import { MarkdownText } from '../../common/MarkdownText';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { FaGithub } from 'react-icons/fa';

interface ProjectBlogTabSectionProps {
  entries: ProjectBlogEntry[];
}

const ITEMS_PER_PAGE = 3;

export function ProjectBlogTabSection({ entries }: ProjectBlogTabSectionProps) {
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
    return [...entries]
      .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
      .slice(0, displayCount);
  }, [entries, displayCount]);

  if (!entries || entries.length === 0) {
    return (
      <div className="w-full flex h-64 items-center justify-center border border-dashed border-zinc-800 rounded-lg">
        <p className="text-secondary text-sm">No blog entries found for this project.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-12">
      {displayedEntries.map((entry) => (
        <article key={entry.id} className="flex flex-col space-y-4">
          <header className="flex flex-col space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
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
              <Gallery images={entry.assets} />
            </div>
          )}

          <div className="prose-container w-full max-w-none">
            <MarkdownText content={entry.description} />
          </div>

          {entry.commitLink && (
            <div className="pt-2">
              <a 
                href={entry.commitLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors rounded hover:bg-zinc-800/50 px-2 py-1 -ml-2"
              >
                <FaGithub size={16} />
                <span>View Commit</span>
              </a>
            </div>
          )}

          {/* Separation between posts */}
          <hr className="border-t border-zinc-800/50 mt-8 mb-4 last:hidden" />
        </article>
      ))}

      {/* Lazy loading anchor */}
      {displayCount < entries.length && (
        <div ref={targetRef} className="w-full py-8 flex justify-center">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
