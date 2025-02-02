import { createClient } from '@sanity/client';

// Initialize Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,  // Ensure this is set in your .env file
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,       // Ensure this is set as well
  apiVersion: '2023-05-03',  // Make sure you are using a valid API version
  token: process.env.SANITY_API_TOKEN, // If needed for private access
  useCdn: false,  // Disable CDN for webhooks
});

export default client;
