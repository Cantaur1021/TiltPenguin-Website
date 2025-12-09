// app/devlogs/[slug]/page.tsx
import { sanityClient } from "@/lib/sanity.client";
import { allDevlogsQuery, singleDevlogQuery } from "@/lib/queries";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

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

  if (!devlog) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p>Devlog not found.</p>
        <Link href="/devlogs" className="text-blue-400">
          Back to devlogs
        </Link>
      </main>
    );
  }

  const coverUrl = devlog.coverImage
    ? buildCloudinaryUrl(devlog.coverImage, { width: 1200 })
    : "";

  const formattedDate = devlog.publishedAt
    ? new Date(devlog.publishedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/devlogs"
        className="text-xs text-gray-400 hover:text-gray-200"
      >
        ← Back to devlogs
      </Link>

      <article className="mt-4">
        <h1 className="text-3xl font-bold mb-2">{devlog.title}</h1>

        <div className="text-xs text-gray-400 mb-6 flex gap-2">
          {devlog.project && <span>{devlog.project}</span>}
          {devlog.project && formattedDate && <span>•</span>}
          {formattedDate && <span>{formattedDate}</span>}
        </div>

        {coverUrl && (
          <div className="mb-6 overflow-hidden rounded-xl border border-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl}
              alt={devlog.coverImage?.alt || devlog.title}
              className="w-full object-cover"
            />
            {devlog.coverImage?.caption && (
              <p className="text-xs text-gray-400 px-3 py-2">
                {devlog.coverImage.caption}
              </p>
            )}
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <PortableText
            value={devlog.content}
            components={{
              types: {
                cloudinaryImageBlock: ({ value }) => {
                  const url = buildCloudinaryUrl(value.media, { width: 1200 });
                  if (!url) return null;
                  return (
                    <figure className="my-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={value.media?.alt || ""}
                        className={
                          value.fullWidth ? "w-full" : "w-full md:w-3/4"
                        }
                      />
                      {value.media?.caption && (
                        <figcaption className="text-xs text-gray-400 mt-2">
                          {value.media.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                },
                cloudinaryVideoBlock: ({ value }) => {
                  const url = buildCloudinaryUrl(
                    { ...value.media, resourceType: "video" },
                    { width: 1200 }
                  );
                  if (!url) return null;
                  return (
                    <div className="my-6">
                      <video
                        src={url}
                        controls
                        autoPlay={value.autoplay}
                        loop={value.loop}
                        muted={value.muted}
                        className="w-full rounded-lg border border-gray-800"
                      />
                      {value.media?.caption && (
                        <p className="text-xs text-gray-400 mt-2">
                          {value.media.caption}
                        </p>
                      )}
                    </div>
                  );
                },
              },
            }}
          />
        </div>
      </article>
    </main>
  );
}
