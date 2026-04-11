import { useEffect } from 'react';
import { useSanityData } from '../hooks/useSanityData';
import { HeroSection } from '../components/sections/HeroSection';
import { HeroSkeleton } from '../components/sections/HeroSkeleton';
import { NavigationHeader } from '../components/layout/NavigationHeader';
import { Footer } from '../components/layout/Footer';
import { TechStackSection } from '../components/sections/TechStackSection';
import { TechStackSkeleton } from '../components/sections/TechStackSkeleton';
import { AboutSection } from '../components/sections/AboutSection';
import { AboutSkeleton } from '../components/sections/AboutSkeleton';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ProjectsSkeleton } from '../components/sections/ProjectsSkeleton';
import { GlobalLoader } from '../components/layout/GlobalLoader';

export function Home() {
  const { data, isLoading, error } = useSanityData({ type: 'global' });

  useEffect(() => {
    if (data?.brand) {
      if (data.brand.image?.assetUrl) {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = data.brand.image.assetUrl;
      }
      if (data.brand.portfolioBrandName) {
        document.title = data.brand.portfolioBrandName;
      }
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-primary">
      <GlobalLoader isLoading={isLoading} />
      <NavigationHeader brand={data?.brand} />
      
      <main className="flex-1 flex flex-col w-full">
        {isLoading ? (
          <div className="w-full flex flex-col">
            <HeroSkeleton />
            <TechStackSkeleton />
            <AboutSkeleton />
            <ProjectsSkeleton />
          </div>
        ) : error ? (
          <section className="w-full max-w-7xl mx-auto px-6 py-24 text-center text-red-500">
            <p>Failed to load data: {error.message}</p>
          </section>
        ) : data ? (
          <>
            <div id="home">
              <HeroSection hero={data.hero} contact={data.contact} />
            </div>
            <TechStackSection items={data.techStacks} />
            <AboutSection about={data.about} />
            <ProjectsSection />

            {/* Contact Section */}
            <section id="contact" className="w-full min-h-[70vh] bg-background flex flex-col items-center justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">Contact Section</h2>
            </section>
          </>
        ) : null}
      </main>

      <Footer brand={data?.brand} />
    </div>
  );
}
