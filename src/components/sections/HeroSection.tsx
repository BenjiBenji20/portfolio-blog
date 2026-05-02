import { ArrowRight, Mail } from 'lucide-react';
import { SocialIcon } from '../common/SocialIcon';
import type { HomeSection } from '../../types';
import { Button } from '../common/Button';

interface HeroSectionProps {
  hero: HomeSection;
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="relative w-full max-w-7xl min-h-[calc(100vh-4rem)] mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-stretch justify-center md:justify-between gap-6 md:gap-12 lg:gap-16">

      <div className="w-full md:w-[57%] md:flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left space-y-6 z-10 py-6 md:py-0">
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
            {hero.name}
          </h1>
          <div className="text-xl md:text-2xl font-semibold text-accent tracking-wide">
            {hero.role}
          </div>
        </div>

        <p className="max-w-2xl text-lg md:text-xl text-secondary leading-relaxed font-light">
          {hero.tagline}
        </p>

        <div className="flex flex-row flex-wrap justify-center md:justify-start items-center gap-3 sm:gap-4 pt-4 w-full">
          <Button size="lg" className="group whitespace-nowrap h-10 text-sm sm:h-12 px-0 w-auto sm:text-base md:text-lg flex-1 sm:flex-none" asChild>
            <a href="#projects" className="inline-flex items-center justify-center px-3 sm:px-6 md:px-8 w-full h-full">
              View Projects
              <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="whitespace-nowrap h-10 text-sm sm:h-12 px-0 w-auto sm:text-base md:text-lg flex-1 sm:flex-none text-current border-current border-opacity-50">
            <a href="#contact" className="inline-flex items-center justify-center px-3 sm:px-6 md:px-8 w-full h-full">
              <Mail className="mr-1.5 sm:mr-2 w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              Email Me
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-6 pt-6 md:pt-8 text-tertiary">
          {hero.links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors p-2 -m-2 flex items-center justify-center translate-y-0 hover:-translate-y-1 transform duration-200"
              aria-label={link.platform}
            >
              <SocialIcon link={link} className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-[43.8%] relative z-10 shrink-0 aspect-square md:aspect-auto">
        <div className="relative w-full h-full group">
          <div className="absolute inset-0 bg-accent/20 blur-3xl scale-90 group-hover:bg-accent/30 transition-colors duration-700" />
          <img
            src={hero.selfPortrait.assetUrl}
            alt={hero.selfPortrait.altText}
            className="absolute inset-0 w-full h-full object-cover rounded-none bg-card transition-transform duration-500 group-hover:-translate-y-2"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}