import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSanityData } from '../hooks/useSanityData';
import { NavigationHeader } from '../components/layout/NavigationHeader';
import { Footer } from '../components/layout/Footer';
import { GlobalLoader } from '../components/layout/GlobalLoader';
import { BlogLeftNavigation } from '../components/layout/BlogLeftNavigation';
import { PreviewTabSection } from '../components/sections/blog/PreviewTabSection';
import { ProjectBlogTabSection } from '../components/sections/blog/ProjectBlogTabSection';
import { Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';

export function ProjectBlog() {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const { data, isLoading, error } = useSanityData({ type: 'global' });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsMobileNavOpen(false); // Close mobile nav when location changes
  }, [location.pathname]);

  const isPreview = location.pathname === '/blogs/preview' || location.pathname === '/blogs';

  const activeProject = !isPreview && projectId && data?.projectBlogs ? data.projectBlogs[projectId] : null;

  const getCurrentTabName = () => {
    if (isPreview) return "Preview";
    const path = location.pathname;
    if (path.endsWith('/deepdive')) return "Deep Dive";
    if (path.endsWith('/documentation')) return "Documentation";
    if (path.endsWith('/technology')) return "Technologies";
    if (path.endsWith('/images')) return "Images";
    return "Blogs";
  };

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
        document.title = `${data.brand.portfolioBrandName} | Blogs | ${getCurrentTabName()}`;
      }
    }
  }, [data, location.pathname]); // Updates when data loads or path changes

  const renderMainContent = () => {
    if (isPreview && data?.blogPreview) {
      return <PreviewTabSection data={data.blogPreview} />;
    }

    if (!activeProject) {
      return (
        <div className="flex h-[50vh] items-center justify-center border border-dashed border-border rounded-lg p-8 bg-card">
          <p className="text-secondary text-lg text-center">
            Details for this project are not available yet.
          </p>
        </div>
      );
    }

    // TODO: separate TAB components
    const path = location.pathname;
    if (path.endsWith('/deepdive')) {
      return (
        <div className="w-full">
          <h2 className="text-3xl font-bold text-primary mb-6 border-b border-border pb-4">Deep Dive</h2>
          <p className="text-secondary">{activeProject.deepDive.description}</p>
        </div>
      );
    }
    if (path.endsWith('/documentation')) {
       return <h2 className="text-3xl font-bold text-primary mb-6">Documentation</h2>;
    }
    if (path.endsWith('/technology')) {
       return <h2 className="text-3xl font-bold text-primary mb-6">Technologies</h2>;
    }
    if (path.endsWith('/images')) {
       return <h2 className="text-3xl font-bold text-primary mb-6">Images</h2>;
    }

    return <ProjectBlogTabSection entries={activeProject.projectBlogs} />;
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-red-500">
        <p>Failed to load data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-primary">
      <GlobalLoader isLoading={isLoading} />
      <NavigationHeader brand={data?.brand} />

      {/* Mobile Top Bar */}
      {!isLoading && data && (
        <div className="md:hidden sticky top-16 z-40 w-full bg-background px-6 py-3 flex items-center shadow-sm">
          <button 
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="mr-3 p-1.5 text-primary hover:bg-card rounded-md transition-colors focus:outline-none border border-border"
            aria-label="Toggle mobile blog navigation"
          >
            {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="font-semibold text-primary">{getCurrentTabName()}</span>
        </div>
      )}

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-6 md:py-12 transition-all pb-16">
        {isLoading ? (
          <div className="w-full flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data ? (
          <div className="flex flex-col md:grid md:grid-cols-[1fr_4fr] gap-8 lg:gap-12">
            {/* 20% Left Navigation */}
            <div className={cn(
               "w-full flex-shrink-0 md:sticky md:top-32 h-fit pb-12 md:pb-0",
               isMobileNavOpen ? "block" : "hidden md:block"
            )}>
              <BlogLeftNavigation projects={data.projectSummaries} />
            </div>

            {/* 80% Center Main Content */}
            <div className={cn(
              "w-full min-w-0 flex-col",
              isMobileNavOpen ? "hidden md:flex" : "flex"
            )}>
              {renderMainContent()}
            </div>
          </div>
        ) : null}
      </main>

      <Footer brand={data?.brand} />
    </div>
  );
}
