// src/components/Blog/BlogSection.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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

// Card component matching the site's neo-brutalist style
function BlogCard({
  devlog,
  index,
  coverUrl,
}: {
  devlog: Devlog;
  index: number;
  coverUrl: string;
}) {
  const formattedDate = devlog.publishedAt
    ? new Date(devlog.publishedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  // Alternating rotations for that zany feel
  const rotations = [-2, 1.5, -1, 2, -1.5];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      whileHover={{
        rotate: 0,
        scale: 1.03,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="group"
    >
      <Link href={`/blog/${devlog.slug}`} className="block h-full">
        <div
          className="h-full border-[3px] sm:border-[4px] border-black bg-[#eeece4]
                     shadow-[4px_4px_0_var(--color-black)] sm:shadow-[6px_6px_0_var(--color-black)]
                     hover:shadow-[6px_6px_0_var(--color-black)] sm:hover:shadow-[8px_8px_0_var(--color-black)]
                     transition-shadow duration-200 overflow-hidden"
        >
          {/* Cover Image */}
          {coverUrl && (
            <div className="aspect-video w-full bg-black/10 border-b-[3px] sm:border-b-[4px] border-black overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverUrl}
                alt={devlog.coverImage?.alt || devlog.title}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          )}

          <div className="p-3 sm:p-4 md:p-5">
            {/* Project tag and date */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
              {devlog.project && (
                <span
                  className="inline-block bg-[var(--color-yellow)] border-[2px] border-black px-2 py-0.5
                             text-[10px] sm:text-xs font-bold uppercase tracking-wide text-black
                             shadow-[2px_2px_0_var(--color-black)]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {devlog.project}
                </span>
              )}
              {formattedDate && (
                <span
                  className="text-[10px] sm:text-xs font-bold text-black/60 uppercase tracking-wide"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {formattedDate}
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              className="text-lg sm:text-xl md:text-2xl uppercase leading-tight tracking-wide text-black mb-2
                         group-hover:text-[var(--color-yellow)] group-hover:[text-shadow:1px_1px_0_#000]
                         transition-all duration-200"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {devlog.title}
            </h3>

            {/* Excerpt */}
            {devlog.excerpt && (
              <p
                className="text-xs sm:text-sm font-semibold text-black/70 line-clamp-2 leading-relaxed mb-3"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {devlog.excerpt}
              </p>
            )}

            {/* Read more */}
            <span
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black
                         group-hover:translate-x-1 transition-transform duration-200 inline-block"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogSection() {
  const [devlogs, setDevlogs] = useState<Devlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDevlogs() {
      try {
        // Fetch from our API route to avoid CORS issues
        const response = await fetch("/api/devlogs");
        if (!response.ok) {
          throw new Error("Failed to fetch devlogs");
        }
        const data = await response.json();
        setDevlogs(data || []);
      } catch (error) {
        console.error("Error fetching devlogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDevlogs();
  }, []);

  // Show max 3 blogs on the homepage
  const displayedBlogs = devlogs.slice(0, 3);

  // Don't render during loading or if no blogs
  if (loading) {
    return (
      <section
        id="devlog"
        className="relative z-10 bg-[#5BB5A2] border-b-[5px] sm:border-b-8 border-black overflow-hidden"
      >
        <div className="px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-20 max-w-6xl mx-auto text-center">
          <motion.div
            className="w-12 h-12 mx-auto border-[4px] border-black border-t-[var(--color-yellow)] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </section>
    );
  }

  if (devlogs.length === 0) {
    return null; // Don't show section if no blogs
  }

  return (
    <section
      id="devlog"
      className="relative z-10 bg-[#5BB5A2] border-b-[5px] sm:border-b-8 border-black overflow-hidden"
    >
      {/* Grid overlay like other sections */}
      <div
        className="pointer-events-none absolute inset-0
                   bg-[linear-gradient(0deg,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)]
                   [background-size:40px_40px]"
      />

      {/* Decorative elements - floating shapes */}
      <motion.div
        className="absolute top-10 left-[5%] w-12 h-12 sm:w-16 sm:h-16 bg-[var(--color-yellow)] border-[3px] border-black rotate-12
                   shadow-[3px_3px_0_var(--color-black)]"
        animate={{ y: [0, -10, 0], rotate: [12, 15, 12] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-[8%] w-8 h-8 sm:w-12 sm:h-12 bg-[#FFE3E3] border-[3px] border-black -rotate-6
                   shadow-[3px_3px_0_var(--color-black)]"
        animate={{ y: [0, 8, 0], rotate: [-6, -10, -6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-[3%] w-6 h-6 sm:w-10 sm:h-10 bg-[#eeece4] border-[3px] border-black rotate-45
                   shadow-[2px_2px_0_var(--color-black)]"
        animate={{ y: [0, -6, 0], rotate: [45, 50, 45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-20 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-center leading-[0.85] tracking-[0.04em]
                       text-[#eeece4]
                       [text-shadow:3px_3px_0_var(--color-black),4px_4px_0_var(--color-black)]
                       text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]
                       mb-3 sm:mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            DEVLOG
          </motion.h2>
          <p
            className="text-sm sm:text-base md:text-lg font-bold text-black/90 max-w-md mx-auto"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Thoughts, bugs, tiny victories, and the chaos in between.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {displayedBlogs.map((devlog, index) => {
            const coverUrl = devlog.coverImage?.publicId
              ? buildCloudinaryUrl(devlog.coverImage, { width: 600 })
              : "";

            return (
              <BlogCard
                key={devlog._id}
                devlog={devlog}
                index={index}
                coverUrl={coverUrl}
              />
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          className="mt-8 sm:mt-10 md:mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link href="/blog">
            <motion.button
              className="inline-block px-6 sm:px-8 py-3 sm:py-4
                         bg-[var(--color-yellow)] border-[3px] sm:border-[4px] border-black
                         text-lg sm:text-xl md:text-2xl uppercase tracking-wide text-black font-bold
                         shadow-[4px_4px_0_var(--color-black)] sm:shadow-[6px_6px_0_var(--color-black)]
                         hover:shadow-[6px_6px_0_var(--color-black)] sm:hover:shadow-[8px_8px_0_var(--color-black)]
                         hover:-translate-x-[2px] hover:-translate-y-[2px]
                         active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--color-black)]
                         transition-all duration-200"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              whileHover={{ rotate: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Devlogs →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Inline cloudinary helper to avoid client/server import issues
function buildCloudinaryUrl(
  media: {
    publicId?: string;
    resourceType?: "image" | "video";
    format?: string;
  },
  options?: { width?: number }
) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!media?.publicId || !cloudName) return "";

  const resourceType = media.resourceType || "image";
  const format = media.format || "webp";

  const transformations = [];
  if (options?.width) {
    transformations.push(`w_${options.width}`);
  }
  transformations.push("q_auto", "f_auto");

  const transformString = transformations.length
    ? transformations.join(",")
    : "";

  return [
    `https://res.cloudinary.com/${cloudName}/${resourceType}/upload`,
    transformString,
    `${media.publicId}.${format}`,
  ]
    .filter(Boolean)
    .join("/");
}
