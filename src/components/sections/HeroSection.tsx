import { ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaLink } from 'react-icons/fa';
import type { HomeSection, ContactSection, SocialLink } from '../../types';
import { Button } from '../common/Button';

interface HeroSectionProps {
  hero: HomeSection;
  contact: ContactSection;
}

export function HeroSection({ hero, contact }: HeroSectionProps) {
  
  const getSocialIcon = (link: SocialLink) => {
    if (link.iconUrl?.assetUrl) {
      return (
        <img
          src={link.iconUrl.assetUrl}
          alt={link.iconUrl.altText || `${link.platform} icon`}
          className="w-5 h-5 object-contain"
        />
      );
    }

    switch (link.platform.toLowerCase()) {
      case 'github': return <FaGithub className="w-5 h-5" />;
      case 'linkedin': return <FaLinkedin className="w-5 h-5" />;
      case 'x': 
      case 'twitter': return <FaTwitter className="w-5 h-5" />;
      default: return <FaLink className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative w-full max-w-7xl min-h-[calc(100vh-4rem)] mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-stretch justify-center md:justify-between gap-6 md:gap-12 lg:gap-16">

      {/* 2. Changed py-12 to pt-12 pb-4 md:py-0 to remove the massive invisible bottom margin on mobile */}
      <div className="flex-1 w-full md:w-[57%] flex flex-col justify-center items-center text-center md:items-start md:text-left space-y-6 z-10 pt-12 pb-4 md:py-0 mt-4 md:mt-0">
        
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

        {/* 3. Reduced top padding on social links slightly for mobile (pt-6 md:pt-8) */}
        <div className="flex items-center justify-center md:justify-start gap-6 pt-6 md:pt-8 text-tertiary">
          {hero.links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors p-2 -m-2 flex items-center justify-center translate-y-0 hover:-translate-y-1 transform duration-200"
              aria-label={link.platform}
            >
              {getSocialIcon(link)}
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
              {getSocialIcon(link)}
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
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}