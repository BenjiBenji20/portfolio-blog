import { useEffect, useState } from 'react';

export function GlobalLoader({ isLoading }: { isLoading: boolean }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress(0);
      const timer = setInterval(() => {
        setProgress(p => {
          if (p >= 90) return p;
          return p + Math.random() * 15;
        });
      }, 150);
      return () => clearInterval(timer);
    } else {
      setProgress(100);
      const hideTimer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(hideTimer);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-transparent pointer-events-none">
       <div 
         className="h-full bg-accent transition-all duration-300 ease-out"
         style={{ width: `${progress}%` }}
       />
    </div>
  );
}
