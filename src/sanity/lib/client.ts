import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '', // Use default if undefined
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01', // Adjust to your needs
  token: process.env.SANITY_API_TOKEN || '', // Only for server-side use
  useCdn: false, // False for live updates
});