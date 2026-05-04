export function AboutSkeleton() {
  return (
    <section id="about" className="w-full min-h-screen bg-background py-24 pb-0 flex items-center justify-center animate-pulse">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center gap-12 lg:gap-16">
        
        {/* Main 2-Column Grid */}
        <div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          
          {/* Left Column */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-8">
            <div className="space-y-6">
              <div className="w-48 h-12 bg-border/50 rounded-lg"></div>
              <div className="w-full h-32 bg-border/50 rounded-lg"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col space-y-2 bg-card rounded-xl p-5 shadow-sm">
                  <div className="w-24 h-4 bg-border/50 rounded"></div>
                  <div className="w-32 h-6 bg-border/50 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-12">
            <div className="w-full">
              <div 
                className="grid gap-3 sm:gap-4 w-full h-[400px] sm:h-[500px] lg:h-[600px] grid-cols-1 sm:grid-cols-2"
                style={{ gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}
              >
                <div className="relative overflow-hidden rounded-xl bg-card shadow-sm sm:col-span-2">
                  <div className="w-full h-full bg-border/50"></div>
                </div>
                <div className="relative overflow-hidden rounded-xl bg-card shadow-sm col-span-1">
                  <div className="w-full h-full bg-border/50"></div>
                </div>
                <div className="relative overflow-hidden rounded-xl bg-card shadow-sm col-span-1">
                  <div className="w-full h-full bg-border/50"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Center Toggle Button */}
        <div className="w-full flex justify-center py-4">
          <div className="w-48 h-12 bg-border/50 rounded-full"></div>
        </div>

      </div>
    </section>
  );
}
