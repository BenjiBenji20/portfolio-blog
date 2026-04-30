import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// Ensure we have fallback values for development/build safety
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-04-30';

// In production / Cloudflare edge environments, useCdn should ideally be true for cached fast responses.
// We parse the string from Vite env to an actual boolean.
const useCdn = import.meta.env.VITE_SANITY_USE_CDN === 'true';

export const client = createClient({
    projectId,
    dataset,
    useCdn,
    apiVersion,
    // Cloudflare Workers & Pages natively support the standard fetch API, 
    // so no polyfills or custom fetch implementations are needed here.
})

// Configure the Sanity Image Builder which is standard for extracting optimized image URLs
const builder = createImageUrlBuilder(client);

/**
 * Helper function to resolve Sanity Image references into actual web URLs
 * Usage: urlFor(source).url()
 */
export function urlFor(source: any) {
    return builder.image(source);
}