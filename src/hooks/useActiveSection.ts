import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], brandName?: string) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || 'home');

  useEffect(() => {
    const handleScroll = () => {
      let current = activeSection;
      
      // Fallback: If scrolled to bottom, highlight the last section
      const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;

      if (isAtBottom) {
        current = sectionIds[sectionIds.length - 1];
      } else {
        for (const id of sectionIds) {
          const section = document.getElementById(id);
          if (section) {
            const rect = section.getBoundingClientRect();
            // 150px offset to account for sticky header and some breathing room
            if (rect.top <= 150) { 
              current = id;
            }
          }
        }
      }

      if (current !== activeSection) {
        setActiveSection(current);
        
        // Update URL hash without causing a page jump
        window.history.replaceState(null, '', `#${current}`);
        
        // Update Title
        const formattedTitle = current.charAt(0).toUpperCase() + current.slice(1);
        const baseTitle = brandName || 'Portfolio';
        if (current === 'home') {
          document.title = `${baseTitle} | Home`;
        } else {
          document.title = `${baseTitle} | ${formattedTitle}`;
        }
      }
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Initial check on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, activeSection, brandName]);

  return activeSection;
}
