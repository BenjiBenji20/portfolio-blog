import { useState, useEffect } from 'react';
import type { ProjectSummary, ProjectBlogEntry, ProjectDeepDive, ProjectTechnology, ProjectImages } from '../types';
import { client } from '../lib/sanityClient';
import mockData from '../data/mockData.json';

// Progressive Offset Pagination Hook for Projects Listing
// GROQ uses [$offset...$end] for native efficient database slicing

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
        const query = `*[_type == "project"] | order(datetime desc) [$start...$end] {
          ...,
          "id": slug.current,
          image{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) }
        }`;
        
        // We fetch limit + 1 to easily determine if there is a next page
        const result = await client.fetch(query, {
          start: offset,
          end: offset + limit + 1
        });

        if (isMounted) {
          const items = result?.length > 0 ? result : mockData.projectSummaries;
          const hasNextPage = items.length > limit;
          const currentBatch = hasNextPage ? items.slice(0, limit) : items;
          
          setData(prev => offset === 0 ? currentBatch : [...prev, ...currentBatch]);
          setHasMore(hasNextPage);
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
    technologies: ProjectTechnology[];
    images: ProjectImages[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const query = `{
          "summary": *[_type == "project" && slug.current == $id][0] {
            ..., "id": slug.current, image{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) }
          },
          "technologies": *[_type == "projectTechnology" && project->slug.current == $id] {
            ..., "projectId": project->slug.current
          },
          "images": *[_type == "projectImages" && project->slug.current == $id] {
            ..., "projectId": project->slug.current, image{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) }
          }
        }`;

        const result = await client.fetch(query, { id: projectId });

        if (isMounted) {
          let mergedData = result;
          const mockProject = mockData.projectSummaries.find(p => p.id === projectId);
          const mockTechs = mockData.projectTechnologies.filter(t => t.projectId === projectId);
          const mockImgs = mockData.projectImages.filter(i => i.projectId === projectId);
          
          if (!result?.summary && mockProject) {
            mergedData = {
              summary: mockProject,
              technologies: mockTechs,
              images: mockImgs
            };
          } else if (result?.summary) {
            mergedData = {
              summary: result.summary,
              technologies: result.technologies?.length > 0 ? result.technologies : mockTechs,
              images: result.images?.length > 0 ? result.images : mockImgs
            };
          }
          
          setData(mergedData);
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
        // Fetch only the sliced portion of the moreAboutMe array inside the singleton about document
        const query = `*[_type == "about"][0].moreAboutMe[$start...$end] {
          ..., images[]{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) }
        }`;

        const result = await client.fetch(query, {
          start: offset,
          end: offset + limit + 1
        });

        if (isMounted) {
          const items = result?.length > 0 ? result : (mockData.about.moreAboutMe || []);
          const hasNextPage = items.length > limit;
          const currentBatch = hasNextPage ? items.slice(0, limit) : items;

          setData(prev => offset === 0 ? currentBatch : [...prev, ...currentBatch]);
          setHasMore(hasNextPage);
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

// Progressive Offset Pagination Hook for Project Blogs
export function useProjectBlogs(projectId: string, offset: number = 0, limit: number = 3) {
  const [data, setData] = useState<ProjectBlogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!projectId) return;
    
    if (offset === 0) {
      setIsLoading(true);
      setData([]); 
    } else {
      setIsFetchingMore(true);
    }

    const fetchData = async () => {
      try {
        const query = `*[_type == "projectBlogEntry" && project->slug.current == $id] | order(datetime desc) [$start...$end] {
          ...,
          "projectId": project->slug.current,
          coverImage{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) }
        }`;

        const result = await client.fetch(query, {
          id: projectId,
          start: offset,
          end: offset + limit + 1
        });

        if (isMounted) {
          const items = result?.length > 0 ? result : mockData.projectBlogs.filter(b => b.projectId === projectId);
          const hasNextPage = items.length > limit;
          const currentBatch = hasNextPage ? items.slice(0, limit) : items;

          setData(prev => offset === 0 ? currentBatch : [...prev, ...currentBatch]);
          setHasMore(hasNextPage);
          setIsLoading(false);
          setIsFetchingMore(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Error fetching project blogs'));
          setIsLoading(false);
          setIsFetchingMore(false);
        }
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [projectId, offset, limit]);

  return { data, isLoading, isFetchingMore, hasMore, error };
}

// Progressive Offset Pagination Hook for Project Deep Dives
export function useProjectDeepDives(projectId: string, offset: number = 0, limit: number = 3) {
  const [data, setData] = useState<ProjectDeepDive[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!projectId) return;
    
    if (offset === 0) {
      setIsLoading(true);
      setData([]); 
    } else {
      setIsFetchingMore(true);
    }

    const fetchData = async () => {
      try {
        const query = `*[_type == "projectDeepDive" && project->slug.current == $id] | order(order asc) [$start...$end] {
          ..., "projectId": project->slug.current, image{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) }
        }`;

        const result = await client.fetch(query, {
          id: projectId,
          start: offset,
          end: offset + limit + 1
        });

        if (isMounted) {
          const items = result?.length > 0 ? result : mockData.projectDeepDives.filter(d => d.projectId === projectId);
          const hasNextPage = items.length > limit;
          const currentBatch = hasNextPage ? items.slice(0, limit) : items;

          setData(prev => offset === 0 ? currentBatch : [...prev, ...currentBatch]);
          setHasMore(hasNextPage);
          setIsLoading(false);
          setIsFetchingMore(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Error fetching deep dives'));
          setIsLoading(false);
          setIsFetchingMore(false);
        }
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [projectId, offset, limit]);

  return { data, isLoading, isFetchingMore, hasMore, error };
}
