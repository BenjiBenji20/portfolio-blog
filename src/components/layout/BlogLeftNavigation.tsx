import { useState } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react'; // 1. Added Import
import type { ProjectSummary } from '../../types';
import { cn } from '../../utils/cn';

interface BlogLeftNavigationProps {
  projects: ProjectSummary[];
}

export function BlogLeftNavigation({ projects }: BlogLeftNavigationProps) {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const isPreview = location.pathname === '/blogs/preview' || location.pathname === '/blogs';

  const projectTabs = [
    { name: 'Blogs', path: `/blogs/${projectId}` },
    { name: 'Deep Dive', path: `/blogs/${projectId}/deepdive` },
    { name: 'Technologies', path: `/blogs/${projectId}/technology` },
    { name: 'Images', path: `/blogs/${projectId}/images` },
  ];

  return (
    <aside className="w-full flex flex-col space-y-8">
      {!isPreview && projectId && (
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Tabs</h3>
          <div className="flex flex-col space-y-1">
            <NavLink
              to="/blogs/preview"
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive || isPreview
                    ? "bg-zinc-800 text-accent"
                    : "text-secondary hover:text-primary hover:bg-zinc-800/50"
                )
              }
            >
              Preview
            </NavLink>
            {projectTabs.map((tab) => {
              return (
                <NavLink
                  key={tab.name}
                  to={tab.path}
                  end={tab.name === 'Blogs'}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                      isActive
                        ? "bg-card-hover text-accent shadow-sm"
                        : "text-secondary hover:text-primary hover:bg-card-hover/50"
                    )
                  }
                >
                  {tab.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}

      {/* Projects Navigation */}
      <div className="flex flex-col space-y-2">
        <button 
          onClick={() => setIsProjectsOpen(!isProjectsOpen)}
          className="flex items-center justify-between text-sm font-semibold text-primary uppercase tracking-wider mb-2 w-full text-left focus:outline-none group"
        >
          <span>Projects</span>
          <ChevronDown 
            className={cn(
              "w-4 h-4 text-tertiary transition-transform duration-300 group-hover:text-primary",
              isProjectsOpen ? "rotate-180" : "rotate-0"
            )} 
          />
        </button>
        {isProjectsOpen && (
          <div className="flex flex-col space-y-1 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {projects.map((project) => (
              <NavLink
                key={project.id}
                to={`/blogs/${project.id}`}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-card-hover text-accent font-semibold"
                      : "text-secondary hover:text-primary hover:bg-card-hover"
                  )
                }
              >
                {project.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}