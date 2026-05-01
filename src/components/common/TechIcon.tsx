import type { TechStackItem } from "../../types";

export function TechIcon({ item, className }: { item: TechStackItem; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 px-2 w-[110px] h-[110px] bg-transparent opacity-70 transition-all duration-300 hover:opacity-100 ${className || ''}`}>
      {item.icon?.assetUrl ? (
        <img src={item.icon.assetUrl} alt={item.icon.altText || `${item.name} icon`} className="w-12 h-12 object-contain drop-shadow-sm" />
      ) : (
        <div className="w-12 h-12 flex items-center justify-center bg-card rounded-xl font-bold text-xl text-accent shadow-sm">
          {item.name.substring(0, 2).toUpperCase()}
        </div>
      )}
      <span className="text-xs font-medium text-secondary truncate w-full text-center mt-1">{item.name}</span>
    </div>
  );
}
