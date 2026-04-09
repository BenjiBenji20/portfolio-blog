import { useState, useEffect } from 'react';
import type { PortfolioMockData } from '../types';
import mockDataJson from '../data/mockData.json';

// In Phase 1, we use this hook to simulate an async fetch from an API (e.g., Sanity in Phase 2)
// This ensures our components are built to handle loading states
export function useData() {
  const [data, setData] = useState<PortfolioMockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Type assertion to ensure json matches our interface
        if (isMounted) {
          setData(mockDataJson as PortfolioMockData);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An error occurred while fetching data'));
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
