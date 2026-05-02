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
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 lg:gap-x-16 items-start">
      
      {/* Title */}
      <div className="order-1 lg:col-start-1 lg:row-start-1 flex justify-between items-center w-full gap-4">
        <h3 className="text-2xl md:text-3xl font-bold text-primary tracking-tight break-words">
          {project.title}
        </h3>
      </div>

      {/* Image */}
      <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-3 w-full flex flex-col mt-2 lg:mt-0">
        {project.thumbnail && (
          <div className="w-full shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <Gallery images={[project.thumbnail]} className="!h-[200px] sm:!h-[250px] lg:!h-[320px]" />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="order-3 lg:col-start-1 lg:row-start-3 flex flex-row items-center gap-3 sm:gap-4 w-full pt-2">
        <Button size="lg" className="flex-1 group h-10 px-4 text-sm sm:h-12 sm:px-6 md:px-8 sm:text-base md:text-lg" asChild>
          <Link to={`/blogs/${project.id}/deepdive`} className="inline-flex items-center justify-center w-full">
            <span>Read Blogs</span>
            <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        
        {project.repositoryLink && (
          <Button size="lg" variant="outline" className="flex-1 h-10 px-4 text-sm sm:h-12 sm:px-6 md:px-8 sm:text-base md:text-lg text-current" asChild>
            <a href={project.repositoryLink} target="_blank" rel="noreferrer" aria-label="View repository" title="view repository" className="inline-flex items-center justify-center w-full">
              <FaGithub className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5 text-current shrink-0" />
              <span>Repository</span>
            </a>
          </Button>
        )}
      </div>

      {/* Description */}
      <div className="order-4 lg:col-start-1 lg:row-start-2">
        <div className="text-lg md:text-xl text-secondary leading-relaxed font-light">
          <ReadMoreText 
            text={project.shortDescription}
            maxLength={200}
            className="text-lg md:text-xl text-secondary leading-relaxed font-light"
          />
        </div>
      </div>

    </div>
  );
}
