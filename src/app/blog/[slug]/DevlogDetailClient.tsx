// app/blog/[slug]/DevlogDetailClient.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { buildCloudinaryUrl } from "@/lib/cloudinary";

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

// Animation variants matching the project's style
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

type Props = {
  devlog: Devlog | null;
  coverUrl: string;
  formattedDate: string | null;
};

export default function DevlogDetailClient({
  devlog,
  coverUrl,
  formattedDate,
}: Props) {
  if (!devlog) {
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
          className="relative z-10 mx-auto max-w-3xl px-4 py-16 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={cardVariants}
            className="border-[4px] border-black bg-[#eeece4] shadow-[6px_6px_0_var(--color-black)] p-8"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl uppercase tracking-wide text-black mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Devlog not found 🐧
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-black font-bold mb-6"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              This devlog seems to have wandered off into the void.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                href="/blog"
                className="inline-block bg-[var(--color-yellow)] border-[3px] border-black px-6 py-3
                           text-lg font-bold uppercase tracking-wide text-black
                           shadow-[4px_4px_0_var(--color-black)]
                           hover:shadow-[6px_6px_0_var(--color-black)]
                           hover:-translate-x-[2px] hover:-translate-y-[2px]
                           transition-all duration-200"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                ← Back to devlogs
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    );
  }

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
        className="relative z-10 mx-auto max-w-4xl px-4 py-8 md:py-12 lg:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back link */}
        <motion.div variants={itemVariants}>
          <Link
            href="/blog"
            className="inline-block mb-8 text-sm font-bold text-black/60 hover:text-black transition-colors uppercase tracking-wide"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            ← Back to devlogs
          </Link>
        </motion.div>

        <article>
          {/* Header card */}
          <motion.header
            variants={cardVariants}
            whileHover={{
              y: -2,
              transition: { duration: 0.2 },
            }}
            className="border-[4px] border-black bg-[#eeece4] shadow-[6px_6px_0_var(--color-black)] hover:shadow-[8px_8px_0_var(--color-black)] transition-shadow duration-200 mb-8"
          >
            {/* Cover image */}
            {coverUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="border-b-[4px] border-black overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverUrl}
                  alt={devlog.coverImage?.alt || devlog.title}
                  className="w-full object-cover max-h-[500px]"
                />
                {devlog.coverImage?.caption && (
                  <p
                    className="text-xs font-semibold text-black/60 px-4 py-2 bg-[#eeece4] border-t-[2px] border-black"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {devlog.coverImage.caption}
                  </p>
                )}
              </motion.div>
            )}

            {/* Title and meta */}
            <div className="p-6 md:p-8">
              {/* Project tag and date */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-4 flex-wrap"
              >
                {devlog.project && (
                  <span
                    className="inline-block bg-[var(--color-yellow)] border-[2px] border-black px-3 py-1
                               text-sm font-bold uppercase tracking-wide text-black
                               shadow-[2px_2px_0_var(--color-black)]"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {devlog.project}
                  </span>
                )}
                {formattedDate && (
                  <span
                    className="text-sm font-bold text-black/60 uppercase tracking-wide"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {formattedDate}
                  </span>
                )}
              </motion.div>

              <motion.h1
                variants={itemVariants}
                whileHover={{
                  rotate: [-0.5, 0.5, -0.5],
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                className="text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.95] tracking-wide text-black cursor-default"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  transformStyle: "preserve-3d",
                }}
              >
                {devlog.title}
              </motion.h1>
            </div>
          </motion.header>

          {/* Content area */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -2,
              transition: { duration: 0.2 },
            }}
            className="border-[4px] border-black bg-[#eeece4] shadow-[6px_6px_0_var(--color-black)] hover:shadow-[8px_8px_0_var(--color-black)] transition-shadow duration-200 p-6 md:p-8 lg:p-10"
          >
            <div
              className="prose prose-lg max-w-none
                         prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-black
                         prose-p:font-body prose-p:text-black prose-p:leading-relaxed prose-p:font-semibold
                         prose-a:text-black prose-a:underline prose-a:decoration-[var(--color-yellow)] prose-a:decoration-4 prose-a:underline-offset-2 hover:prose-a:bg-[var(--color-yellow)]
                         prose-strong:text-black prose-strong:font-bold
                         prose-ul:text-black prose-ol:text-black prose-li:text-black prose-li:font-semibold
                         prose-blockquote:border-l-[4px] prose-blockquote:border-black prose-blockquote:bg-[var(--color-yellow)] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:font-bold
                         prose-code:bg-black prose-code:text-[var(--color-yellow)] prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-code:font-bold
                         prose-pre:bg-black prose-pre:border-[3px] prose-pre:border-black prose-pre:shadow-[4px_4px_0_var(--color-yellow)]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <PortableText
                value={devlog.content}
                components={{
                  types: {
                    cloudinaryImageBlock: ({ value }) => {
                      const url = buildCloudinaryUrl(value.media, {
                        width: 1200,
                      });
                      if (!url) return null;
                      return (
                        <motion.figure
                          className="my-8 not-prose"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div
                            className={`border-[3px] border-black shadow-[4px_4px_0_var(--color-black)] overflow-hidden ${
                              value.fullWidth ? "w-full" : "w-full md:w-4/5"
                            }`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={url}
                              alt={value.media?.alt || ""}
                              className="w-full"
                            />
                          </div>
                          {value.media?.caption && (
                            <figcaption
                              className="text-sm font-bold text-black/60 mt-3"
                              style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              {value.media.caption}
                            </figcaption>
                          )}
                        </motion.figure>
                      );
                    },
                    cloudinaryVideoBlock: ({ value }) => {
                      const url = buildCloudinaryUrl(
                        { ...value.media, resourceType: "video" },
                        { width: 1200 }
                      );
                      if (!url) return null;
                      return (
                        <motion.div
                          className="my-8 not-prose"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="border-[3px] border-black shadow-[4px_4px_0_var(--color-black)] overflow-hidden">
                            <video
                              src={url}
                              controls
                              autoPlay={value.autoplay}
                              loop={value.loop}
                              muted={value.muted}
                              className="w-full"
                            />
                          </div>
                          {value.media?.caption && (
                            <p
                              className="text-sm font-bold text-black/60 mt-3"
                              style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              {value.media.caption}
                            </p>
                          )}
                        </motion.div>
                      );
                    },
                  },
                  block: {
                    h2: ({ children }) => (
                      <motion.h2
                        className="text-3xl md:text-4xl mt-10 mb-4"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4 }}
                      >
                        {children}
                      </motion.h2>
                    ),
                    h3: ({ children }) => (
                      <motion.h3
                        className="text-2xl md:text-3xl mt-8 mb-3"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4 }}
                      >
                        {children}
                      </motion.h3>
                    ),
                    h4: ({ children }) => (
                      <motion.h4
                        className="text-xl md:text-2xl mt-6 mb-2"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4 }}
                      >
                        {children}
                      </motion.h4>
                    ),
                  },
                }}
              />
            </div>
          </motion.div>

          {/* Footer navigation */}
          <motion.div variants={itemVariants} className="mt-8 text-center">
            <motion.div
              whileHover={{
                y: -2,
                transition: { duration: 0.2 },
              }}
              whileTap={{ y: 0 }}
              className="inline-block"
            >
              <Link
                href="/blog"
                className="inline-block bg-[var(--color-yellow)] border-[3px] border-black px-6 py-3
                           text-lg font-bold uppercase tracking-wide text-black
                           shadow-[4px_4px_0_var(--color-black)]
                           hover:shadow-[6px_6px_0_var(--color-black)]
                           hover:-translate-x-[2px] hover:-translate-y-[2px]
                           transition-all duration-200"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                ← More devlogs
              </Link>
            </motion.div>
          </motion.div>
        </article>
      </motion.div>
    </main>
  );
}
