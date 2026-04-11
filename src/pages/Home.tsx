import { useEffect } from 'react';
import { useData } from '../hooks/useData';
import { HeroSection } from '../components/sections/HeroSection';
import { HeroSkeleton } from '../components/sections/HeroSkeleton';
import { NavigationHeader } from '../components/layout/NavigationHeader';
import { Footer } from '../components/layout/Footer';
import { TechStackSection } from '../components/sections/TechStackSection';
import { TechStackSkeleton } from '../components/sections/TechStackSkeleton';

export function Home() {
  const { data, isLoading, error } = useData();

  useEffect(() => {
    if (data?.brand) {

      // Update Favicon
      if (data.brand.image?.assetUrl) {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = data.brand.image.assetUrl;
      }
      
      // Update Title
      if (data.brand.portfolioBrandName) {
        document.title = data.brand.portfolioBrandName;
      }
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-primary">
      <NavigationHeader brand={data?.brand} />
      
      <main className="flex-1 flex flex-col w-full">
        {isLoading ? (
          <div className="w-full flex flex-col">
            <HeroSkeleton />
            <TechStackSkeleton />
          </div>
        ) : error ? (
          <section className="w-full max-w-7xl mx-auto px-6 py-24 text-center text-red-500">
            <p>Failed to load data: {error.message}</p>
          </section>
        ) : data ? (
          <>
            {/* Home Section */}
            <div id="home">
              <HeroSection hero={data.hero} contact={data.contact} />
            </div>

            {/* Tech Stacks Section */}
            <TechStackSection items={data.techStacks} />

            {/* TODO: SEPARATE THE SECTIONS INTO DIFFERENT COMPONENTS */}
            {/* About Section - bg-card is lighter (#18181b) than bg-background in dark mode */}
            <section id="about" className="w-full min-h-screen bg-background flex flex-col items-center justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">About Section</h2>
            </section>

            {/* Projects Section */}
            <section id="projects" className="w-full min-h-screen bg-card flex flex-col items-center justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">Projects Section</h2>
            </section>

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
