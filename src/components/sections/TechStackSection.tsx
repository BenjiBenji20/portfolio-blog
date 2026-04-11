import type { TechStackItem } from "../../types";
import { Marquee } from "../common/Marquee";
import { TechIcon } from "../common/TechIcon";

export function TechStackSection({ items }: { items: TechStackItem[] }) {
  // If we have many items, split them into two rows for a dense, visually appealing marquee
  const midpoint = Math.ceil(items.length / 2);
  const firstRow = items.length > 8 ? items.slice(0, midpoint) : items;
  const secondRow = items.length > 8 ? items.slice(midpoint) : [];

  return (
    <section id="tech" className="w-full bg-card py-6 md:py-10 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <Marquee pauseOnHover className="[--duration:60s]">
          {firstRow.map((item, idx) => (
            <TechIcon key={`${item.name}-${idx}`} item={item} />
          ))}
        </Marquee>
        
        {secondRow.length > 0 && (
          <Marquee reverse pauseOnHover className="[--duration:50s] mt-4">
            {secondRow.map((item, idx) => (
              <TechIcon key={`${item.name}-${idx}`} item={item} />
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}
