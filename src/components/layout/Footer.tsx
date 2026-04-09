import type { PortfolioBrandIcon } from "../../types";

interface FooterProps {
  brand?: PortfolioBrandIcon;
}

export function Footer({ brand }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card py-8 mt-auto">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 font-bold tracking-tight text-primary opacity-80 hover:opacity-100 transition-opacity">
          {brand?.image && (
            <img 
              src={brand.image.assetUrl} 
              alt={brand.image.altText} 
              className="w-5 h-5 object-cover rounded opacity-80"
            />
          )}
          <span>{brand?.portfolioBrandName || 'Portfolio'}</span>
        </div>

        <p className="text-sm text-secondary">
          &copy; {currentYear} {brand?.portfolioBrandName || 'All rights reserved.'}. Built with React & Tailwind.
        </p>

      </div>
    </footer>
  );
}
