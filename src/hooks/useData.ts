import { useState, useEffect } from 'react';
import type { PortfolioMockData, ProjectSummary, ProjectBlogEntry, ProjectDeepDive, ProjectTechnology, ProjectImages } from '../types';
import mockDataJson from '../data/mockData.json';

const typedMockData = mockDataJson as unknown as PortfolioMockData;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Keep the original useData to avoid immediate breaking changes across unmigrated components (Home, About)
export function useData() {
  const [data, setData] = useState<PortfolioMockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        await delay(800);
        if (isMounted) {
          setData(typedMockData);
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
    return () => { isMounted = false; };
  }, []);

  return { data, isLoading, error };
}

// Progressive Offset Pagination Hook for Projects Listing
export function useProjectSummaries(offset: number = 0, limit: number = 2) {
  const [data, setData] = useState<ProjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    if (offset === 0) {
      setIsLoading(true);
      setData([]); // Reset on pure start
    } else {
      setIsFetchingMore(true);
    }

    const fetchData = async () => {
      try {
        await delay(800);
        if (isMounted) {
          const allSummaries = typedMockData.projectSummaries || [];
          const nextBatch = allSummaries.slice(offset, offset + limit);
          
          setData(prev => offset === 0 ? nextBatch : [...prev, ...nextBatch]);
          setHasMore(offset + limit < allSummaries.length);
          setIsLoading(false);
          setIsFetchingMore(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Error fetching summaries'));
          setIsLoading(false);
          setIsFetchingMore(false);
        }
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [offset, limit]);

  return { data, isLoading, isFetchingMore, hasMore, error };
}

// Isolated Detail Hook using ProjectId
export function useProjectDetails(projectId: string) {
  const [data, setData] = useState<{
    summary?: ProjectSummary;
    blogs: ProjectBlogEntry[];
    deepDives: ProjectDeepDive[];
    technologies: ProjectTechnology[];
    images: ProjectImages[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        await delay(800);
        if (isMounted) {
          // Normalize fetches by looking for elements holding that exact projectId
          const summary = typedMockData.projectSummaries?.find(p => p.id === projectId);
          const blogs = typedMockData.projectBlogs?.filter(p => p.projectId === projectId) || [];
          const deepDives = typedMockData.projectDeepDives?.filter(p => p.projectId === projectId) || [];
          const technologies = typedMockData.projectTechnologies?.filter(p => p.projectId === projectId) || [];
          const images = typedMockData.projectImages?.filter(p => p.projectId === projectId) || [];
          
          setData({ summary, blogs, deepDives, technologies, images });
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Error fetching project details'));
          setIsLoading(false);
        }
      }
    };

    if (projectId) {
      fetchData();
    }
    return () => { isMounted = false; };
  }, [projectId]);

  return { data, isLoading, error };
}

// Progressive Offset Pagination Hook for About Section "More about me"
export function useMoreAboutMe(offset: number = 0, limit: number = 4) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    if (offset === 0) {
      setIsLoading(true);
      setData([]); 
    } else {
      setIsFetchingMore(true);
    }

    const fetchData = async () => {
      try {
        await delay(800);
        if (isMounted) {
          const allAboutMe = typedMockData.about?.moreAboutMe || [];
          const nextBatch = allAboutMe.slice(offset, offset + limit);
          
          setData(prev => offset === 0 ? nextBatch : [...prev, ...nextBatch]);
          setHasMore(offset + limit < allAboutMe.length);
          setIsLoading(false);
          setIsFetchingMore(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Error fetching about section details'));
          setIsLoading(false);
          setIsFetchingMore(false);
        }
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [offset, limit]);

  return { data, isLoading, isFetchingMore, hasMore, error };
}
