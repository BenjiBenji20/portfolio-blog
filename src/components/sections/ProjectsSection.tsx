import { useState } from 'react';
import type { ProjectSummary } from '../../types';
import { ProjectCard } from '../common/ProjectCard';
import { ChevronDown } from 'lucide-react';
import { useProjectSummaries } from '../../hooks/useData';
import { ProjectsSkeleton } from './skeleton/ProjectsSkeleton';

export function ProjectsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [offset, setOffset] = useState(0);

  const { data: fetchedProjects, isLoading, isFetchingMore, hasMore, error } = useProjectSummaries(offset, 4);

  if (isLoading && offset === 0) {
    return <ProjectsSkeleton />;
  }

  if (error) return <div className="text-red-500 py-12 text-center">Failed to load projects: {error.message}</div>;

  const projects = fetchedProjects || [];
  if (projects.length === 0) return null;

  const initialProjects = projects.slice(0, 2);
  const moreProjects = projects.slice(2);

  const handleToggle = () => {
    if (!isExpanded) {
      setIsExpanded(true); // Always expand first if collapsed
    } else if (hasMore) {
      setOffset(prev => prev + 4); // Fetch next batch if expanded and has more content
    } else {
      setIsExpanded(false); // Collapse if expanded and no more data
    }
  };

  const buttonLabel = (!isExpanded || hasMore) ? 'More projects' : 'Show less';
  const showButton = moreProjects.length > 0 || hasMore; // Only show if we hold hidden elements or have more to fetch

  return (
    <section id="projects" className="w-full bg-card/30 py-12 lg:py-16 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col gap-8 lg:gap-12">
        <div className="w-full flex flex-col text-left space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">Projects</h2>
        </div>

        <div className="w-full flex flex-col space-y-16 lg:space-y-20">
          {initialProjects.map((project: ProjectSummary) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Collapsible Expanded List */}
        <div className={`w-full grid transition-all duration-700 ease-in-out ${isExpanded && moreProjects.length > 0 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 invisible'}`}>
          <div className="overflow-hidden flex flex-col space-y-16 lg:space-y-20">
            <div className="pt-4 flex flex-col space-y-16 lg:space-y-20">
              {moreProjects.map((project: ProjectSummary) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>

        {/* Center Toggle Button */}
        {showButton && (
          <div className="w-full flex justify-center py-4 mt-4">
            <button
              onClick={handleToggle}
              disabled={isFetchingMore}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-accent bg-transparent text-accent hover:bg-accent hover:text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 group disabled:opacity-50 disabled:cursor-not-allowed"
              aria-expanded={isExpanded}
            >
              <span>{isFetchingMore ? 'Loading...' : buttonLabel}</span>
              {!isFetchingMore && (
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${(!isExpanded || hasMore) ? 'group-hover:translate-y-0.5' : 'rotate-180'}`} />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
