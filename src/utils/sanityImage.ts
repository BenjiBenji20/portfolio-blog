import type { SanityAsset } from '../types';

/**
 * Scalable Asset Optimizer simulating @sanity/image-url
 * Wraps asset URLs to ensure dimensional boundary fetching & WebP execution.
 */
export function urlFor(source: SanityAsset) {
  return {
    width: (w: number) => ({
      height: (h: number) => ({
        format: (f: string) => ({
          url: () => `${source.assetUrl}&w=${w}&h=${h}&fm=${f}` // Using Unsplash params structure
        }),
        url: () => `${source.assetUrl}&w=${w}&h=${h}`
      }),
      format: (f: string) => ({
        url: () => `${source.assetUrl}&w=${w}&fm=${f}`
      }),
      url: () => `${source.assetUrl}&w=${w}`
    }),
    url: () => source.assetUrl
  };
}
