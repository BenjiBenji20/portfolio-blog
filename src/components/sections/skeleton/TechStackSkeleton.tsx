import { Marquee } from "../../common/Marquee";

export function TechStackSkeleton() {
  return (
    <section id="tech" className="w-full bg-card py-6 md:py-10 flex flex-col items-center justify-center overflow-hidden animate-pulse border-b border-border/10">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <Marquee className="[--duration:60s]">
          {Array(8).fill(0).map((_, i) => (
            <div key={`sk1-${i}`} className="flex flex-col items-center justify-center gap-2 px-2 w-[110px] h-[110px] bg-transparent">
              <div className="w-12 h-12 rounded-xl bg-border/40"></div>
              <div className="w-14 h-3 rounded bg-border/40 mt-1"></div>
            </div>
          ))}
        </Marquee>

        <Marquee reverse className="[--duration:50s] mt-2">
          {Array(8).fill(0).map((_, i) => (
            <div key={`sk2-${i}`} className="flex flex-col items-center justify-center gap-2 px-2 w-[110px] h-[110px] bg-transparent">
              <div className="w-12 h-12 rounded-xl bg-border/40"></div>
              <div className="w-14 h-3 rounded bg-border/40 mt-1"></div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
