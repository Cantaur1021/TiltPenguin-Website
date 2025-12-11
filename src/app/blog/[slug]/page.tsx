// app/devlogs/[slug]/page.tsx
import { sanityClient } from "@/lib/sanity.client";
import { allDevlogsQuery, singleDevlogQuery } from "@/lib/queries";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import DevlogDetailClient from "./DevlogDetailClient";

export const revalidate = 60;

type CloudinaryMedia = {
  publicId?: string;
  resourceType?: "image" | "video";
  format?: string;
  alt?: string;
  caption?: string;
};

type Devlog = {
  _id: string;
  title: string;
  slug: string;
  content: any;
  project?: string;
  publishedAt?: string;
  coverImage?: CloudinaryMedia;
};

// For static generation
export async function generateStaticParams() {
  const devlogs: Devlog[] = await sanityClient.fetch(allDevlogsQuery);
  return devlogs.map((devlog) => ({
    slug: devlog.slug,
  }));
}

async function getDevlog(slug: string): Promise<Devlog | null> {
  const devlog = await sanityClient.fetch(singleDevlogQuery, { slug });
  return devlog;
}

type Props = {
  params: { slug: string };
};

export default async function DevlogPage({ params }: Props) {
  const devlog = await getDevlog(params.slug);

  const coverUrl = devlog?.coverImage
    ? buildCloudinaryUrl(devlog.coverImage, { width: 1200 })
    : "";

  const formattedDate = devlog?.publishedAt
    ? new Date(devlog.publishedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <DevlogDetailClient
      devlog={devlog}
      coverUrl={coverUrl}
      formattedDate={formattedDate}
    />
  );
}
