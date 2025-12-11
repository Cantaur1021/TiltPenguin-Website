// app/devlogs/page.tsx
import { sanityClient } from "@/lib/sanity.client";
import { allDevlogsQuery } from "@/lib/queries";
import DevlogsClient from "./DevlogsClient";

export const revalidate = 60; // seconds, for ISR

type Devlog = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  project?: string;
  publishedAt?: string;
  coverImage?: {
    publicId?: string;
    resourceType?: "image" | "video";
    format?: string;
    alt?: string;
  };
};

async function getDevlogs(): Promise<Devlog[]> {
  const devlogs = await sanityClient.fetch(allDevlogsQuery);
  return devlogs;
}

export default async function DevlogsPage() {
  const devlogs = await getDevlogs();
  return <DevlogsClient devlogs={devlogs} />;
}
