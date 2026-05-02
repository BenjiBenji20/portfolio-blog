import { ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { ProjectSummary } from '../../types';
import { Button } from './Button';
import { Gallery } from './Gallery';
import { ReadMoreText } from './ReadMoreText';

interface ProjectCardProps {
  project: ProjectSummary;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="w-full flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
      
      {/* Left Column (Texts & Actions) */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-left">
        <div className="space-y-4">
          <div className="flex justify-between items-center w-full gap-4">
            <h3 className="text-2xl md:text-3xl font-bold text-primary tracking-tight break-words">
              {project.title}
            </h3>
          </div>
          <p className="text-lg md:text-xl text-secondary leading-relaxed font-light">
            <ReadMoreText 
              text={project.shortDescription}
              maxLength={250}
              className="text-lg md:text-xl text-secondary leading-relaxed font-light"
            />
          </p>
        </div>

        <div className="flex flex-row flex-wrap justify-start items-center gap-3 sm:gap-4 w-full pt-2">
          <Button size="lg" className="group h-10 px-4 text-sm sm:h-12 sm:px-6 md:px-8 sm:text-base md:text-lg w-auto" asChild>
            <Link to={`/blogs/${project.id}/deepdive`} className="inline-flex items-center justify-center">
              <span>Learn more</span>
              <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          {project.repositoryLink && (
            <Button size="lg" variant="outline" className="h-10 w-10 sm:h-12 sm:w-12 px-0 flex items-center justify-center text-current relative" asChild>
              <a href={project.repositoryLink} target="_blank" rel="noreferrer" aria-label="View repository" title="view repository">
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 text-current" />
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Right Column (Image with Lightbox) */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {project.thumbnail && (
          <div className="w-full shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <Gallery images={[project.thumbnail]} className="!h-[200px] sm:!h-[250px] lg:!h-[320px]" />
          </div>
        )}
      </div>

    </div>
  );
}
