// lib/sanity.client.ts
import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-12-09", // or your chosen date
  useCdn: true, // true for faster public reads
});
