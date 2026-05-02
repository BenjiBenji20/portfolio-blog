import { useState, useEffect } from 'react';
import { client } from '../lib/sanityClient';
import mockData from '../data/mockData.json';

type FetchParams = {
  type: 'global'; // We only support global here now, projects has its own hook
};

// This GROQ query fetches all singleton documents and uses projections to securely map Sanity's internal image formats to your universal `assetUrl` string, maintaining 100% type compatibility.
const globalQuery = `{
  "brand": *[_type == "brand"][0]{
    ...,
    image{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) }
  },
  "hero": *[_type == "home"][0]{
    ...,
    selfPortrait{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) },
    links[]{ ..., iconUrl{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) } }
  },
  "about": *[_type == "about"][0]{
    ...,
    images[]{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) }
  },
  "techStacks": *[_type == "techStack"]{
    ...,
    icon{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) }
  },
  "contact": *[_type == "contact"][0]{
    ...,
    socials[]{ ..., iconUrl{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) } }
  },
  "blogPreview": *[_type == "blogPreview"][0]{
    ...,
    profilePhoto{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) },
    carousel[]{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) },
    profileDetails->{
      ...,
      selfPortrait{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) },
      links[]{ ..., iconUrl{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) } }
    }
  },
  "projectSummaries": *[_type == "project"] | order(datetime desc) {
    ...,
    "id": slug.current,
    thumbnail{ ..., "assetUrl": coalesce(assetUrl, imageFile.asset->url) }
  }
}`;

export function useSanityData<T = any>(params: FetchParams = { type: 'global' }) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (params.type === 'global') {
          const result = await client.fetch(globalQuery);
          if (isMounted) {
            // Fallback logic
            const mergedData = {
              brand: result.brand ?? mockData.brand,
              hero: result.hero ?? mockData.hero,
              about: result.about ?? mockData.about,
              techStacks: result.techStacks?.length > 0 ? result.techStacks : mockData.techStacks,
              contact: result.contact ?? mockData.contact,
              blogPreview: result.blogPreview ?? mockData.blogPreview,
              projectSummaries: result.projectSummaries?.length > 0 ? result.projectSummaries : mockData.projectSummaries,
            };
            setData(mergedData as T);
          }
        }

        if (isMounted) setIsLoading(false);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Sanity Fetch Error'));
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, [params.type]);

  return { data, isLoading, error };
}
