import { ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaLink } from 'react-icons/fa';
import type { HomeSection, ContactSection } from '../../types';
import { Button } from '../common/Button';

interface HeroSectionProps {
  hero: HomeSection;
  contact: ContactSection;
}

export function HeroSection({ hero, contact }: HeroSectionProps) {
  
  // Helper to resolve generic icon out of platform name
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return <FaGithub className="w-5 h-5" />;
      case 'linkedin': return <FaLinkedin className="w-5 h-5" />;
      case 'x': 
      case 'twitter': return <FaTwitter className="w-5 h-5" />;
      default: return <FaLink className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative w-full max-w-7xl min-h-[calc(100vh-4rem)] mx-auto px-6 lg:px-8 flex flex-col-reverse md:flex-row items-stretch justify-between gap-12 lg:gap-16">

      <div className="flex-1 w-full md:w-[57%] flex flex-col justify-center items-center text-center md:items-start md:text-left space-y-6 z-10 py-12 md:py-0 mt-4 md:mt-0">
        
        {/* Name, Role, Tagline Order */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
            {hero.name}
          </h1>
          <div className="text-xl md:text-2xl font-semibold text-accent tracking-wide">
            {hero.role}
          </div>
        </div>

        {/* Tagline */}
        <p className="max-w-2xl text-lg md:text-xl text-secondary leading-relaxed font-light">
          {hero.tagline}
        </p>

        <div className="flex flex-row flex-wrap justify-center md:justify-start items-center gap-3 sm:gap-4 pt-4 w-full">
          <Button size="lg" className="group whitespace-nowrap h-10 px-3 text-sm sm:h-12 sm:px-6 md:px-8 sm:text-base md:text-lg flex-1 sm:flex-none">
            View Projects
            <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" asChild className="whitespace-nowrap h-10 px-3 text-sm sm:h-12 sm:px-6 md:px-8 sm:text-base md:text-lg flex-1 sm:flex-none">
            <a href={`mailto:${contact.email}`} className="inline-flex items-center justify-center">
              <Mail className="mr-1.5 sm:mr-2 w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              Email Me
            </a>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center md:justify-start gap-6 pt-8 text-tertiary">
          {hero.links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors p-2 -m-2 flex items-center justify-center translate-y-0 hover:-translate-y-1 transform duration-200"
              aria-label={link.platform}
            >
              {getSocialIcon(link.platform)}
            </a>
          ))}
          {contact.otherLinks?.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors p-2 -m-2 flex items-center justify-center translate-y-0 hover:-translate-y-1 transform duration-200"
              aria-label={link.platform}
            >
              {getSocialIcon(link.platform)}
            </a>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-[43.8%] relative z-10 shrink-0 aspect-square md:aspect-auto">
        <div className="relative w-full h-full group">
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-accent/20 blur-3xl scale-90 group-hover:bg-accent/30 transition-colors duration-700" />

          {/* 4. Changed image to absolute inset-0 to guarantee it strictly fills its parent container height. Ensured rounded-none is present. */}
          <img
            src={hero.selfPortrait.assetUrl}
            alt={hero.selfPortrait.altText}
            className="absolute inset-0 w-full h-full object-cover rounded-none bg-card transition-transform duration-500 group-hover:-translate-y-2"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}