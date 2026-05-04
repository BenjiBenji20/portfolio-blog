export function ProjectsSkeleton() {
  return (
    <section id="projects" className="w-full min-h-screen bg-card/30 py-12 lg:py-16 flex items-center justify-center border-t border-border/10 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col gap-8 lg:gap-12">
        
        {/* Section Header */}
        <div className="w-full flex flex-col text-left space-y-4">
          <div className="w-64 h-16 bg-border/50 rounded-lg" />
        </div>

        {/* Initial Viewable List */}
        <div className="w-full flex flex-col space-y-24">
          {Array(2).fill(0).map((_, idx) => (
            <div key={idx} className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 pt-8 first:pt-0">
              {/* Left Column (Texts & Actions) */}
              <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-left">
                <div className="space-y-4">
                  <div className="w-3/4 h-10 bg-border/50 rounded-lg" />
                  <div className="w-full h-24 bg-border/50 rounded-lg" />
                </div>
                <div className="flex flex-row flex-wrap justify-start items-center gap-3 sm:gap-4 w-full pt-2">
                  <div className="w-32 h-12 bg-border/50 rounded-lg" />
                  <div className="w-12 h-12 bg-border/50 rounded-lg" />
                </div>
              </div>
              
              {/* Right Column (Image) */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <div className="w-full h-[250px] sm:h-[350px] lg:h-[400px] bg-border/50 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
