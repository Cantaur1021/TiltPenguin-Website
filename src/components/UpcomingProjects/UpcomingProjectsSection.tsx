// components/UpcomingProjectsSection.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameBoy from "./GameBoy";

type Project = { id: string; title: string; screenImage?: string };

const projects: Project[] = [
  {
    id: "p1",
    title: "This Website",
    screenImage: "/screens/this-website.png",
  },
  { id: "p2", title: "Myself", screenImage: "/screens/myself.png" },
  { id: "p3", title: "Secrets", screenImage: "/screens/question-mark.png" },
];

const mod = (n: number, m: number) => ((n % m) + m) % m;

const UpcomingProjectsSection: React.FC = () => {
  const total = projects.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [autoRotate, setAutoRotate] = useState(true);

  // Tighter side spacing (closer cards)
  const [offset, setOffset] = useState(320);
  useEffect(() => {
    const calc = () => setOffset(window.innerWidth < 1024 ? 260 : 320);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setDir(1);
      setIndex((i) => mod(i + 1, total));
    }, 4000);
    return () => clearInterval(timer);
  }, [autoRotate, total]);

  const goNext = useCallback(() => {
    setAutoRotate(false);
    setDir(1);
    setIndex((i) => mod(i + 1, total));
    // Resume auto-rotate after manual interaction
    setTimeout(() => setAutoRotate(true), 10000);
  }, [total]);

  const goPrev = useCallback(() => {
    setAutoRotate(false);
    setDir(-1);
    setIndex((i) => mod(i - 1, total));
    setTimeout(() => setAutoRotate(true), 10000);
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  type Slot = "left" | "center" | "right" | "hidden";
  const slots: Record<string, Slot> = useMemo(() => {
    const map: Record<string, Slot> = {};
    projects.forEach((p, i) => {
      const d = mod(i - index, total);
      map[p.id] =
        d === 0
          ? "center"
          : d === 1
            ? "right"
            : d === total - 1
              ? "left"
              : "hidden";
    });
    return map;
  }, [index, total]);

  // Slightly lower side cards, smaller scale; hidden uses same y
  const targetFor = (slot: Slot) => {
    const spacing = 50; // tiny gap in px
    switch (slot) {
      case "center":
        return {
          x: 0,
          y: 0,
          scale: 1,
          zIndex: 3,
          opacity: 1,
          rotate: 0,
          pointerEvents: "auto" as const,
        };
      case "left":
        return {
          x: -offset - spacing,
          y: 10,
          scale: 0.88,
          zIndex: 2,
          opacity: 1,
          rotate: -5,
          pointerEvents: "none" as const,
        };
      case "right":
        return {
          x: offset + spacing,
          y: 10,
          scale: 0.88,
          zIndex: 2,
          opacity: 1,
          rotate: 5,
          pointerEvents: "none" as const,
        };
      default:
        return {
          x: dir === 1 ? offset * 2 : -offset * 2,
          y: 10,
          scale: 0.85,
          zIndex: 1,
          opacity: 0,
          rotate: dir === 1 ? 10 : -10,
          pointerEvents: "none" as const,
        };
    }
  };

  const spring = {
    type: "spring" as const,
    stiffness: 520,
    damping: 40,
    mass: 0.9,
  };

  return (
    <section
      className="relative w-full overflow-hidden border-y-[5px] border-black z-10"
      style={{ backgroundColor: "#5C93E7" }}
      aria-live="polite"
    >
      {/* stronger, tighter grid with animation */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      {/* ===== DESKTOP/TABLET EDGE ARROWS (pinned to screen edges) ===== */}
      <motion.button
        aria-label="Previous project"
        onClick={goPrev}
        className="hidden sm:flex group absolute left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30
                   w-12 h-20 md:w-14 md:h-24 rounded-full bg-[#C2EEE1] border-[5px] border-black shadow-[8px_8px_0_#000]
                   items-center justify-center transition-all duration-200
                   hover:shadow-[10px_10px_0_#000] hover:scale-105"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-black text-2xl md:text-3xl group-active:translate-x-[-2px]">
          ←
        </span>
      </motion.button>
      <motion.button
        aria-label="Next project"
        onClick={goNext}
        className="hidden sm:flex group absolute right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30
                   w-12 h-20 md:w-14 md:h-24 rounded-full bg-[#C2EEE1] border-[5px] border-black shadow-[8px_8px_0_#000]
                   items-center justify-center transition-all duration-200
                   hover:shadow-[10px_10px_0_#000] hover:scale-105"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-black text-2xl md:text-3xl group-active:translate-x-[2px]">
          →
        </span>
      </motion.button>
      {/* ============================================================ */}

      {/* title with animation */}
      <div className="relative z-10">
        <motion.h2
          className="mt-3 mb-1 md:mb-2 text-center leading-[0.82] tracking-[0.02em] sm:tracking-[0.04em]
                     [text-shadow:2px_2px_0_var(--color-black),3px_3px_0_var(--color-black)] sm:[text-shadow:3px_3px_0_var(--color-black),4px_4px_0_var(--color-black)]
                     text-[1.8rem] sm:text-[2.75rem] md:text-[4.75rem] lg:text-[7.75rem] px-2"
          style={{ color: "#C2EEE1", fontFamily: "'Bebas Neue', sans-serif" }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{
            scale: 1.02,
            rotate: [-0.5, 0.5, 0],
            transition: { duration: 0.3 },
          }}
        >
          THINGS I AM WORKING ON
        </motion.h2>
      </div>

      {/* stage wrapper (shorter, denser) */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-2 sm:px-4 md:px-6 pt-2 sm:pt-3 md:pt-5 pb-4 sm:pb-6 md:pb-10">
        {/* desktop/tablet: 3-card animated carousel (shorter & narrower) */}
        <motion.div
          className="relative mx-auto hidden sm:block w-full max-w-[820px] h-[560px]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {projects.map((p) => {
            const slot = slots[p.id];
            const t = targetFor(slot);
            return (
              <motion.div
                key={p.id}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={t}
                transition={spring}
                style={{
                  zIndex: (t as any).zIndex,
                  pointerEvents: (t as any).pointerEvents,
                }}
              >
                <GameBoy
                  project={p}
                  isCenter={slot === "center"}
                  onInteraction={() => setAutoRotate(false)}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* mobile: single card (shorter) */}
        <div className="sm:hidden">
          <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[400px] min-h-[420px] sm:min-h-[500px] flex flex-col items-center justify-start pt-0">
            <AnimatePresence custom={dir} initial={false} mode="wait">
              <motion.div
                key={projects[index].id}
                custom={dir}
                initial={{
                  x: dir === 1 ? 160 : -160,
                  opacity: 0,
                  rotate: dir === 1 ? 10 : -10,
                }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                exit={{
                  x: dir === 1 ? -160 : 160,
                  opacity: 0,
                  rotate: dir === 1 ? -10 : 10,
                }}
                transition={spring}
                className="flex justify-center"
              >
                <GameBoy
                  project={projects[index]}
                  isCenter={true}
                  onInteraction={() => setAutoRotate(false)}
                />
              </motion.div>
            </AnimatePresence>
            {/* buttons: moved further down */}
            <motion.div
              className="mt-3 sm:mt-4 flex items-center justify-center gap-4 sm:gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                aria-label="Previous project"
                onClick={goPrev}
                className="group w-12 h-16 sm:w-14 sm:h-20 rounded-full bg-[#C2EEE1] border-[3px] sm:border-[5px] border-black shadow-[4px_4px_0_#000] sm:shadow-[8px_8px_0_#000] grid place-items-center"
                whileHover={{ scale: 1.05, boxShadow: "10px 10px 0 #000" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-black text-xl sm:text-2xl group-active:translate-x-[-1px]">
                  ←
                </span>
              </motion.button>
              <motion.button
                aria-label="Next project"
                onClick={goNext}
                className="group w-12 h-16 sm:w-14 sm:h-20 rounded-full bg-[#C2EEE1] border-[3px] sm:border-[5px] border-black shadow-[4px_4px_0_#000] sm:shadow-[8px_8px_0_#000] grid place-items-center"
                whileHover={{ scale: 1.05, boxShadow: "10px 10px 0 #000" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-black text-xl sm:text-2xl group-active:translate-x-[1px]">
                  →
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingProjectsSection;
