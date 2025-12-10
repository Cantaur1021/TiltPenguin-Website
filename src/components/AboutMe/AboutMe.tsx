// components/AboutMeLocked.tsx
"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PAPER = "#F3F1EB";
const BG = "#E46E6E";

/* ---------------- Small bits ---------------- */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute right-2 top-2 z-10 rounded-sm border border-black/60 bg-[var(--paper)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-[2px_2px_0_rgba(0,0,0,0.7)]">
      {children}
    </span>
  );
}

function Card({
  title,
  center,
  children,
  className = "",
  delay = 0,
  hoverable = false,
}: {
  title?: string;
  center?: boolean;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  hoverable?: boolean;
}) {
  const [clicks, setClicks] = useState(0);

  return (
    <motion.div
      className={[
        "h-full w-full border-[3px] sm:border-[4px] lg:border-[5px] border-[var(--color-black)] bg-[var(--paper)]",
        "shadow-[4px_4px_0_var(--color-black)] sm:shadow-[6px_6px_0_var(--color-black)] lg:shadow-[8px_8px_0_var(--color-black)] p-3 sm:p-4 md:p-5 lg:p-6",
        "transition-shadow duration-200",
        hoverable
          ? "cursor-pointer hover:shadow-[6px_6px_0_var(--color-black)] sm:hover:shadow-[8px_8px_0_var(--color-black)] lg:hover:shadow-[10px_10px_0_var(--color-black)]"
          : "",
        className,
      ].join(" ")}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      onClick={hoverable ? () => setClicks((c) => c + 1) : undefined}
    >
      {title && (
        <h4
          className={[
            "mb-1 sm:mb-2 text-2xl sm:text-3xl lg:text-4xl uppercase leading-none tracking-wide",
            center ? "text-center" : "",
          ].join(" ")}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {title}
          {clicks > 3 && title === "WEAKNESS" && " (AND CLICKING THINGS)"}
        </h4>
      )}
      {children && (
        <p
          className={[
            center ? "text-center" : "",
            "m-0 text-sm sm:text-base leading-snug font-bold",
          ].join(" ")}
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {children}
        </p>
      )}
      {clicks > 0 && clicks <= 3 && hoverable && (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xs mt-2 text-center opacity-60"
        >
          {clicks === 1 && <>You found the click zone!</>}
          {clicks === 2 && <>Keep going&#8230;</>}
          {clicks === 3 && <>One more&#8230;</>}
        </motion.p>
      )}
    </motion.div>
  );
}

function ImageCard({
  src,
  alt,
  label,
  delay = 0,
  parallax = false,
}: {
  src: string;
  alt: string;
  label: string;
  delay?: number;
  parallax?: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [glitch, setGlitch] = useState(false);

  // Random glitch effect on hover
  const handleMouseEnter = () => {
    if (Math.random() < 0.3) {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }
  };

  return (
    <motion.div
      className="relative h-full w-full border-[3px] sm:border-[4px] lg:border-[5px] border-[var(--color-black)] shadow-[4px_4px_0_var(--color-black)] sm:shadow-[6px_6px_0_var(--color-black)] lg:shadow-[8px_8px_0_var(--color-black)] overflow-hidden bg-[var(--paper)]
                 transition-shadow duration-200 hover:shadow-[6px_6px_0_var(--color-black)] sm:hover:shadow-[8px_8px_0_var(--color-black)] lg:hover:shadow-[10px_10px_0_var(--color-black)]"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={handleMouseEnter}
      whileHover={{ scale: 1.01 }}
    >
      <Label>{label}</Label>
      <motion.div
        animate={
          glitch
            ? {
                x: [0, -2, 2, 0],
                filter: [
                  "hue-rotate(0deg)",
                  "hue-rotate(90deg)",
                  "hue-rotate(-90deg)",
                  "hue-rotate(0deg)",
                ],
              }
            : {}
        }
        transition={{ duration: 0.2 }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-all duration-500 ${imageLoaded ? "blur-0" : "blur-md"}`}
          onLoad={() => setImageLoaded(true)}
          priority={delay === 0}
        />
      </motion.div>
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--paper)]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-4xl"
          >
            {"\uD83D\uDC27"}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

/**
 * Aspect wrappers to preserve your Figma proportions while letting the
 * grid expand edge-to-edge. These match your original pixel boxes:
 *  - Wide block:   607 x 355  =&gt; aspect-[607/355]
 *  - Small cards:  296 x 251  =&gt; aspect-[296/251]
 *  - Tall image:   607 x 520  =&gt; aspect-[607/520]
 */
function Aspect({
  ratio,
  children,
  className = "",
}: {
  ratio: string;
  children: React.ReactNode;
  className?: string;
}) {
  // Using padding-bottom trick for aspect ratio since Tailwind's dynamic aspect-ratio might not work
  const [width, height] = ratio.split("/").map(Number);
  const paddingBottom = `${(height / width) * 100}%`;

  return (
    <div className={`relative w-full ${className}`} style={{ paddingBottom }}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

export default function AboutMeLocked() {
  const [secretCode, setSecretCode] = useState("");
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Easter egg: Type "TILT" to make everything tilt
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newCode = (secretCode + e.key).slice(-4).toUpperCase();
      setSecretCode(newCode);
      if (newCode === "TILT") {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 3000);
      }
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [secretCode]);

  return (
    <motion.section
      className="
        relative flex flex-col items-stretch
        border-t-[5px] border-b-[5px] border-[var(--color-black)]
        bg-[var(--color-yellow)]
        px-0 z-10
      "
      style={{ background: BG, ["--paper" as any]: PAPER }}
      animate={
        showEasterEgg
          ? {
              rotate: [0, -2, 2, -1, 1, 0],
              transition: { duration: 0.5, repeat: 2 },
            }
          : {}
      }
    >
      {/* Title */}
      <motion.h2
        className="
          mt-3 mb-1 md:mb-2
          text-center leading-[0.82] tracking-[0.02em] sm:tracking-[0.04em]
          [text-shadow:2px_2px_0_var(--color-black),3px_3px_0_var(--color-black)] sm:[text-shadow:3px_3px_0_var(--color-black),4px_4px_0_var(--color-black)]
          text-[2rem] sm:text-[2.75rem] md:text-[4.75rem] lg:text-[7.75rem] px-2
        "
        style={{ color: "#FFE3E3", fontFamily: "'Bebas Neue', sans-serif" }}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{
          scale: 1.02,
          rotate: [-0.5, 0.5, 0],
          transition: { duration: 0.3 },
        }}
      >
        ABOUT ME
      </motion.h2>

      {/* Easter egg notification */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
          >
            <div className="bg-[#FFC700] border-4 border-black px-4 py-2 shadow-[4px_4px_0_#000]">
              <p className="font-bold text-black">
                YOU FOUND THE TILT CODE! {"\uD83D\uDC27"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edge-to-edge grid with tight gaps (matches AboutSection) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 pb-4 sm:pb-6 px-2 sm:px-3 md:px-4">
        {/* LEFT COLUMN (stack) */}
        <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
          {/* Top-left (wide text) — 607x355 */}
          <Aspect ratio="607/355">
            <Card className="flex items-center justify-center" delay={0.1}>
              <motion.p
                className="m-0 text-center text-[1.2rem] sm:text-[1.5rem] md:text-[1.8rem] lg:text-[2.1rem] xl:text-[2.4rem] leading-[1.1] sm:leading-[1.05] uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                whileInView={{
                  transition: {
                    staggerChildren: 0.05,
                  },
                }}
              >
                Hi, I&apos;m Chinmay. I&apos;ve built games for brand events and
                companies, but TiltPenguin is where I get loose, get messy, and
                make the kind of odd little experiments I actually want to play.
              </motion.p>
            </Card>
          </Aspect>

          {/* Row of two small cards — 296x251 each */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            <Aspect ratio="296/251">
              <Card title="SUPERPOWER" center delay={0.2} hoverable>
                Turning barely baked ideas into barely playable demos.
              </Card>
            </Aspect>
            <Aspect ratio="296/251">
              <Card title="GOAL" center delay={0.3} hoverable>
                Games that surprise, delight and maybe confuse you (and me as
                well).
              </Card>
            </Aspect>
          </div>

          {/* Row of two small cards — 296x251 each */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            <Aspect ratio="296/251">
              <Card title="WEAKNESS" center delay={0.4} hoverable>
                Fixing bugs I accidentally start to like (they grow on me). And
                cookies.
              </Card>
            </Aspect>
            <Aspect ratio="296/251">
              <Card title="PHILOSOPHY" center delay={0.5} hoverable>
                If it&apos;s not fun to make, it won&apos;t be fun to play.
                Also, penguins make everything better.
              </Card>
            </Aspect>
          </div>

          {/* Bottom-left image — 607x355 */}
          <Aspect ratio="607/355">
            <ImageCard
              src="/images/about/bottom-left.webp"
              alt="Lab chaos"
              label="BARELY GROWN-UP ENGINEERING"
              delay={0.6}
            />
          </Aspect>
        </div>

        {/* RIGHT COLUMN (stack) */}
        <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
          {/* Top-right image — 607x355 */}
          <Aspect ratio="607/355">
            <ImageCard
              src="/images/about/top-right.webp"
              alt="Retro gaming setup"
              label="2007 KERALA // OUTDOOR GAMING SETUP"
              delay={0.2}
              parallax
            />
          </Aspect>

          {/* Middle-right (wide text) — 607x355 */}
          <Aspect ratio="607/355">
            <Card className="flex items-center justify-center" delay={0.4}>
              <p
                className="m-0 text-center text-[1.2rem] sm:text-[1.5rem] md:text-[1.8rem] lg:text-[2.1rem] xl:text-[2.4rem] leading-[1.1] sm:leading-[1.05] uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                When I&apos;m not wrangling code, I&apos;m usually breaking it
                on purpose just to see what happens. This site is literally just
                a museum of prototypes, mistakes and happy accidents (shout out
                Bob Ross).
              </p>
            </Card>
          </Aspect>

          {/* Bottom-right tall image — 607x520 */}
          <Aspect ratio="607/520">
            <ImageCard
              src="/images/about/bottom-right.webp"
              alt="Kerala street"
              label="KERALA MY SPAWN POINT"
              delay={0.6}
            />
          </Aspect>
        </div>
      </div>

      {/* Hidden hint */}
      <motion.div
        className="text-center pb-2 text-xs opacity-20 hover:opacity-60 transition-opacity"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        psst... try typing &quot;TILT&quot; anywhere on the page
      </motion.div>
    </motion.section>
  );
}
