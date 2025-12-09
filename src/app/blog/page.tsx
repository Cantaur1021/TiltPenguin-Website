// app/devlogs/page.tsx
import { sanityClient } from "@/lib/sanity.client";
import { allDevlogsQuery } from "@/lib/queries";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";

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

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Devlog</h1>
      <p className="text-sm text-gray-500 mb-8">
        Thoughts, progress, bugs, and tiny victories from the project.
      </p>

      {devlogs.length === 0 && (
        <p className="text-gray-500 text-sm">
          No devlogs yet. Go write your first one in Sanity Studio.
        </p>
      )}

      <ul className="space-y-8">
        {devlogs.map((devlog) => {
          const coverUrl = devlog.coverImage
            ? buildCloudinaryUrl(devlog.coverImage, { width: 900 })
            : "";

          const formattedDate = devlog.publishedAt
            ? new Date(devlog.publishedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : null;

          return (
            <li
              key={devlog._id}
              className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-500 transition"
            >
              {coverUrl && (
                <div className="aspect-video w-full bg-black/40">
                  {/* Use next/image if you like */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverUrl}
                    alt={devlog.coverImage?.alt || devlog.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  {devlog.project && (
                    <span className="uppercase tracking-wide">
                      {devlog.project}
                    </span>
                  )}
                  {devlog.project && formattedDate && <span>•</span>}
                  {formattedDate && <span>{formattedDate}</span>}
                </div>

                <h2 className="text-xl font-semibold mb-2">
                  <Link
                    href={`/blog/${devlog.slug}`}
                    className="hover:underline"
                  >
                    {devlog.title}
                  </Link>
                </h2>

                {devlog.excerpt && (
                  <p className="text-sm text-gray-300 line-clamp-3">
                    {devlog.excerpt}
                  </p>
                )}

                <div className="mt-4">
                  <Link
                    href={`/blog/${devlog.slug}`}
                    className="text-sm font-medium text-blue-400 hover:text-blue-300"
                  >
                    Read devlog
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
