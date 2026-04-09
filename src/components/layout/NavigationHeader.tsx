import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import type { PortfolioBrandIcon } from "../../types";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useMemo } from "react";

interface NavigationHeaderProps {
  brand?: PortfolioBrandIcon;
}

export function NavigationHeader({ brand }: NavigationHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sectionIds = useMemo(() => ['home', 'about', 'projects', 'tech', 'contact'], []);
  const activeSection = useActiveSection(sectionIds, brand?.portfolioBrandName);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'tech', label: 'Tech Stacks' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-2 font-bold tracking-tight text-primary">
          {brand?.image && (
            <img 
              src={brand.image.assetUrl} 
              alt={brand.image.altText} 
              className="w-6 h-6 object-cover rounded"
            />
          )}
          <span>{brand?.portfolioBrandName || 'Portfolio'}</span>
        </div>
        
        <nav className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`transition-colors pb-1 border-b-2 ${
                  activeSection === link.id
                    ? 'text-primary border-accent'
                    : 'text-secondary hover:text-primary border-transparent'
                }`}
              >
                {link.label}
              </a>
            ))}
            {/* Active state for Blogs as requested with border */}
            <a href="/blogs" className="text-accent hover:text-accent-hover transition-colors font-semibold border border-accent/50 hover:border-accent rounded-full px-4 py-1.5 ml-2">Blogs</a>
          </div>
          <ThemeToggle />
          
          {/* Mobile menu toggle */}
          <button 
             className="md:hidden p-2 -mr-2 text-primary hover:bg-card rounded-md transition-colors"
             onClick={() => setIsOpen(!isOpen)}
             aria-label="Toggle menu"
          >
             {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background px-6 py-6 flex flex-col gap-6 text-base font-medium shadow-lg z-50">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsOpen(false)}
                className={`transition-colors w-fit ${
                  activeSection === link.id
                    ? 'text-primary border-b-2 border-accent pb-1'
                    : 'text-secondary hover:text-primary pb-1 border-b-2 border-transparent'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="/blogs" onClick={() => setIsOpen(false)} className="text-accent hover:text-accent-hover transition-colors font-semibold mt-2 border border-accent/50 hover:border-accent inline-block text-center rounded-full px-4 py-3">Blogs</a>
        </div>
      )}
    </header>
  );
}
