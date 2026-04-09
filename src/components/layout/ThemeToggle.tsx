import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../common/Button';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) as 'light' | 'dark' || 'dark'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-10 px-0"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-accent hover:text-accent-hover transition-colors" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-accent hover:text-accent-hover transition-colors" />
      )}
    </Button>
  );
}
