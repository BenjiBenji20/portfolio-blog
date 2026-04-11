import { useState } from 'react';
import type { ProjectSummary } from '../../types';
import { ProjectCard } from '../common/ProjectCard';
import { ChevronDown } from 'lucide-react';
import { useSanityData } from '../../hooks/useSanityData';
import { ProjectsSkeleton } from './ProjectsSkeleton';

export function ProjectsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { data, isLoading, error } = useSanityData({ type: 'projects', limit: 100 });
  
  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (error) return <div className="text-red-500 py-12 text-center">Failed to load projects: {error.message}</div>;

  const projects = data?.projectSummaries || [];
  if (projects.length === 0) return null;

  const initialProjects = projects.slice(0, 2);
  const moreProjects = projects.slice(2);

  return (
    <section id="projects" className="w-full bg-card/30 py-16 lg:py-20 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col gap-8 lg:gap-12">
        <div className="w-full flex flex-col text-left space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">Projects</h2>
        </div>

        <div className="w-full flex flex-col space-y-16 lg:space-y-20">
          {initialProjects.map((project: ProjectSummary) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Center Toggle Button */}
        {moreProjects.length > 0 && (
          <div className="w-full flex justify-center py-4 mt-4">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-accent bg-transparent text-accent hover:bg-accent hover:text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 group"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? 'Show less' : 'More projects'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
            </button>
          </div>
        )}

        {/* Collapsible Expanded List */}
        {moreProjects.length > 0 && (
          <div className={`w-full grid transition-all duration-700 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 invisible'}`}>
            <div className="overflow-hidden flex flex-col space-y-16 lg:space-y-20">
              <div className="pt-4 flex flex-col space-y-16 lg:space-y-20">
                {moreProjects.map((project: ProjectSummary) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
