import { useState } from 'react';
import type { AboutSection as AboutSectionType } from '../../types';
import { ReadMoreText } from '../common/ReadMoreText';
import { Gallery } from '../common/Gallery';
import { ChevronDown } from 'lucide-react';
import { useMoreAboutMe } from '../../hooks/useData';

export function AboutSection({ about }: { about: AboutSectionType }) {
  const [isMoreAboutMeOpen, setIsMoreAboutMeOpen] = useState(false);
  const [offset, setOffset] = useState(0);

  const { data: fetchedAboutMe, isLoading, isFetchingMore, hasMore, error } = useMoreAboutMe(offset, 1);

  const handleToggle = () => {
    if (!isMoreAboutMeOpen) {
      setIsMoreAboutMeOpen(true);
    } else if (hasMore) {
      setOffset(prev => prev + 1);
    } else {
      setIsMoreAboutMeOpen(false);
    }
  };

  const moreAboutMeEntries = fetchedAboutMe || [];
  const buttonLabel = (!isMoreAboutMeOpen || hasMore) ? 'More about me' : 'Show less';
  const showButton = moreAboutMeEntries.length > 0 || hasMore;

  return (
    <section id="about" className="w-full min-h-screen bg-background py-24 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center gap-12 lg:gap-16">
        
        {/* Main 2-Column Grid */}
        <div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          
          {/* Left Column (Texts) */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:[&::-webkit-scrollbar]:hidden pb-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">About me</h2>
              <ReadMoreText text={about.mainDescription} maxLength={500} className="text-lg" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {about.personalInformation.map((info, idx) => (
                <div key={idx} className="flex flex-col space-y-1 bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-sm font-medium text-tertiary uppercase tracking-wider">{info.label}</span>
                  <span className="text-base font-semibold text-primary">{info.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Images) */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-12">
            {about.images && about.images.length > 0 && (
              <div className="w-full">
                <Gallery images={about.images} />
              </div>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && <div className="text-red-500 text-center">Failed to load more about me parts</div>}
        
        {isLoading && offset === 0 && <div className="text-secondary animate-pulse py-8">Loading more about me...</div>}

        {/* Expanded Content with Smooth Grid Transition */}
        <div className={`w-full grid transition-all duration-500 ease-in-out ${isMoreAboutMeOpen && moreAboutMeEntries.length > 0 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden flex flex-col space-y-16">
            {moreAboutMeEntries.map((section, idx) => (
              <div key={idx} className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-16 pt-8 mt-4">
                
                {/* Expanded Left: Texts */}
                <div className="w-full lg:w-1/2 flex flex-col space-y-4">
                  <h3 className="text-2xl font-bold text-primary">{section.headerTitle}</h3>
                  {section.description && (
                    <p className="text-secondary leading-relaxed font-light">{section.description}</p>
                  )}
                  {section.items && section.items.length > 0 && (
                    <ul className="list-disc list-inside text-secondary space-y-2 font-light marker:text-accent mt-4 bg-card rounded-xl p-6 shadow-sm">
                      {section.items.map((item: string, idxx: number) => (
                        <li key={idxx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Expanded Right: Images */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  {section.images && section.images.length > 0 && (
                    <Gallery images={section.images} />
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Center Toggle Button */}
        {showButton && !isLoading && !error && (
          <div className="w-full flex justify-center py-4 relative z-10">
            <button 
              type="button"
              onClick={handleToggle}
              disabled={isFetchingMore}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-accent bg-transparent text-accent hover:bg-accent hover:text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 group disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
              aria-expanded={isMoreAboutMeOpen}
            >
              <span>{isFetchingMore ? 'Loading...' : buttonLabel}</span>
              {!isFetchingMore && (
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${(!isMoreAboutMeOpen || hasMore) ? 'group-hover:translate-y-0.5' : 'rotate-180'}`} />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
