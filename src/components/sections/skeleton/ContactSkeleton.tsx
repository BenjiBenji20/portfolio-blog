export function ContactSkeleton() {
  return (
    <section id="contact" className="w-full bg-background py-24 flex items-center justify-center border-t border-border/10 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col md:flex-row gap-16 lg:gap-24">
        
        {/* Left Column Skeleton */}
        <div className="w-full md:w-5/12 flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="w-64 h-12 bg-border/40 rounded-lg" />
            <div className="w-full h-8 bg-border/40 rounded-lg" />
            <div className="w-3/4 h-8 bg-border/40 rounded-lg" />
          </div>
          
          <div className="w-full flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-border/40" />
            <div className="w-48 h-4 bg-border/40 rounded" />
            <div className="flex-1 h-px bg-border/40" />
          </div>
          
          <div className="flex flex-col space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-border/40" />
                <div className="w-32 h-6 rounded bg-border/40" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="w-full md:w-7/12 flex flex-col space-y-6">
          <div className="w-32 h-6 bg-border/40 rounded mb-2" />
          
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-10 rounded-full bg-border/40" />
            ))}
          </div>

          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <div className="w-24 h-5 bg-border/40 rounded" />
              <div className="w-full h-12 bg-border/40 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="w-32 h-5 bg-border/40 rounded" />
              <div className="w-full h-12 bg-border/40 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="w-48 h-5 bg-border/40 rounded" />
              <div className="w-full h-12 bg-border/40 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="w-24 h-5 bg-border/40 rounded" />
              <div className="w-full h-32 bg-border/40 rounded-lg" />
            </div>
            
            <div className="w-full h-12 bg-border/40 rounded-lg mt-4" />
          </div>
        </div>
        
      </div>
    </section>
  );
}
