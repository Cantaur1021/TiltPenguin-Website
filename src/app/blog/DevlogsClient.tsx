// app/blog/DevlogsClient.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { buildCloudinaryUrl } from "@/lib/cloudinary";

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

// Animation variants matching the project's style
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotate: -3,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function DevlogsClient({ devlogs }: { devlogs: Devlog[] }) {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(to_bottom,#c2eee1_25%,#fefaef_100%)]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Grid overlay with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="pointer-events-none absolute inset-0
                   bg-[linear-gradient(0deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]
                   [background-size:40px_40px]"
      />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-4 py-12 md:py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header section */}
        <div className="mb-10 md:mb-14 text-center">
          <motion.div variants={itemVariants}>
            <Link
              href="/"
              className="inline-block mb-8 text-sm font-bold text-black/60 hover:text-black transition-colors uppercase tracking-wide"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              ← Back to home
            </Link>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            whileHover={{
              rotate: [-1, 1, -1],
              scale: 1.02,
              transition: {
                rotate: {
                  duration: 0.3,
                  ease: "easeInOut",
                  repeat: 0,
                },
                scale: {
                  duration: 0.2,
                },
              },
            }}
            className="text-center leading-[0.9] tracking-[0.05em]
                       text-[var(--color-yellow)]
                       [text-shadow:3px_3px_0_#000,4px_4px_0_#000]
                       text-[clamp(2.5rem,10vw,5rem)] lg:text-[clamp(3rem,12vw,7rem)]
                       cursor-default select-none mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            DEVLOG
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg font-bold text-black max-w-md mx-auto"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Thoughts, progress, bugs, and tiny victories from the project.
          </motion.p>
        </div>

        {devlogs.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="border-[4px] border-black bg-[#eeece4] shadow-[6px_6px_0_var(--color-black)] p-8 text-center"
          >
            <p
              className="text-black font-bold"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              No devlogs yet. Go write your first one in Sanity Studio. 🐧
            </p>
          </motion.div>
        )}

        {/* Devlog cards grid */}
        <motion.ul
          className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          {devlogs.map((devlog, index) => {
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
              <motion.li
                key={devlog._id}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  rotate: [0, -1, 1, 0],
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                className="group border-[4px] border-black bg-[#eeece4] overflow-hidden
                           shadow-[6px_6px_0_var(--color-black)]
                           hover:shadow-[8px_8px_0_var(--color-black)]
                           transition-shadow duration-200 ease-out"
              >
                <Link href={`/blog/${devlog.slug}`} className="block">
                  {coverUrl && (
                    <div className="aspect-video w-full bg-black/10 border-b-[4px] border-black overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverUrl}
                        alt={devlog.coverImage?.alt || devlog.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-5 md:p-6">
                    {/* Project tag and date */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {devlog.project && (
                        <span
                          className="inline-block bg-[var(--color-yellow)] border-[2px] border-black px-2 py-0.5
                                     text-xs font-bold uppercase tracking-wide text-black
                                     shadow-[2px_2px_0_var(--color-black)]"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {devlog.project}
                        </span>
                      )}
                      {formattedDate && (
                        <span
                          className="text-xs font-bold text-black/60 uppercase tracking-wide"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {formattedDate}
                        </span>
                      )}
                    </div>

                    <h2
                      className="text-2xl md:text-3xl uppercase leading-tight tracking-wide text-black mb-2
                                 group-hover:text-[var(--color-yellow)] group-hover:[text-shadow:1px_1px_0_#000]
                                 transition-all duration-200"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {devlog.title}
                    </h2>

                    {devlog.excerpt && (
                      <p
                        className="text-sm font-semibold text-black/80 line-clamp-3 leading-relaxed"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {devlog.excerpt}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-2">
                      <span
                        className="text-sm font-bold uppercase tracking-wider text-black
                                   group-hover:translate-x-1 transition-transform duration-200"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        Read devlog →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </main>
  );
}
