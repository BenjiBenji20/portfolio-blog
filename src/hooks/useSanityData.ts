import { useState, useEffect } from 'react';
import type { PortfolioMockData } from '../types';
import mockDataJson from '../data/mockData.json';

type FetchParams = {
  type: 'global' | 'projects';
  limit?: number;
  cursor?: string | null;
};

export function useSanityData<T = PortfolioMockData>(params: FetchParams = { type: 'global' }) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate Sanity network delay logic for LCP constraints
        await new Promise(resolve => setTimeout(resolve, 800));

        if (!isMounted) return;

        if (params.type === 'global') {
          setData(mockDataJson as unknown as T);
        } else if (params.type === 'projects') {
          const allProjects = mockDataJson.projectSummaries;
          const startIndex = params.cursor 
            ? allProjects.findIndex((p: any) => p.id === params.cursor) + 1 
            : 0;
            
          const limit = params.limit || 2;
          const paginatedProjects = allProjects.slice(startIndex, startIndex + limit);
          
          const hasMore = startIndex + limit < allProjects.length;
          setNextCursor(hasMore ? paginatedProjects[paginatedProjects.length - 1].id : null);
          
          setData({ projectSummaries: paginatedProjects } as unknown as T);
        }

        setIsLoading(false);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Sanity Fetch Error'));
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, [params.type, params.limit, params.cursor]);

  return { data, isLoading, error, nextCursor };
}
