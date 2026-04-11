import { Skeleton } from "../common/Skeleton";

export function HeroSkeleton() {
  return (
    <section className="relative w-full max-w-7xl min-h-[calc(100vh-4rem)] mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-stretch justify-center md:justify-between gap-6 md:gap-12 lg:gap-16">
      
      {/* Matched left column classes: removed mobile flex-1, updated padding to py-6 md:py-0 */}
      <div className="w-full md:w-[57%] md:flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left space-y-6 z-10 py-6 md:py-0">
        
        {/* Name & Role */}
        <div className="space-y-4 w-full flex flex-col items-center md:items-start">
          <Skeleton className="h-12 md:h-16 lg:h-20 w-3/4 md:w-full lg:w-4/5" /> {/* Name */}
          <Skeleton className="h-8 md:h-10 w-48 md:w-64" /> {/* Role */}
        </div>

        {/* Tagline */}
        <div className="w-full flex flex-col items-center md:items-start">
          <Skeleton className="h-24 w-full max-w-2xl" /> 
        </div>

        {/* Buttons Skeleton */}
        <div className="flex flex-row flex-wrap justify-center md:justify-start items-center gap-3 sm:gap-4 pt-4 w-full">
          <Skeleton className="h-10 sm:h-12 flex-1 sm:flex-none sm:w-40 rounded-md" />
          <Skeleton className="h-10 sm:h-12 flex-1 sm:flex-none sm:w-36 rounded-md" />
        </div>

        {/* Social Links Skeleton (Matched pt-6 md:pt-8) */}
        <div className="flex items-center justify-center md:justify-start gap-6 pt-6 md:pt-8 w-full">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Right Column (43.8%) - Full Height */}
      <div className="w-full md:w-[43.8%] relative z-10 shrink-0 aspect-square md:aspect-auto">
        <div className="relative w-full h-full">
          <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        </div>
      </div>
    </section>
  );
}