// components/UpcomingProjectsSection.tsx
'use client';

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameBoy from "./GameBoy";

type Project = { id: string; title: string; screenImage?: string };

const projects: Project[] = [
  { id: "p1", title: "ORDER FROM BELOW", screenImage: "/screens/order-1.png" },
  { id: "p2", title: "ORDER FROM BELOW", screenImage: "/screens/order-2.png" },
  { id: "p3", title: "ORDER FROM BELOW", screenImage: "/screens/order-3.png" },
];

const mod = (n: number, m: number) => ((n % m) + m) % m;

const UpcomingProjectsSection: React.FC = () => {
  const total = projects.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const [offset, setOffset] = useState(420);
  useEffect(() => {
    const calc = () => setOffset(window.innerWidth < 1024 ? 360 : 420);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const goNext = useCallback(() => { setDir(1); setIndex(i => mod(i + 1, total)); }, [total]);
  const goPrev = useCallback(() => { setDir(-1); setIndex(i => mod(i - 1, total)); }, [total]);

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
      map[p.id] = d === 0 ? "center" : d === 1 ? "right" : d === total - 1 ? "left" : "hidden";
    });
    return map;
  }, [index, total]);

  const targetFor = (slot: Slot) => {
    switch (slot) {
      case "center": return { x: 0, y: 0, scale: 1, zIndex: 3, opacity: 1, pointerEvents: "auto" as const };
      case "left":   return { x: -offset, y: 24, scale: 0.9, zIndex: 2, opacity: 1, pointerEvents: "none" as const };
      case "right":  return { x:  offset, y: 24, scale: 0.9, zIndex: 2, opacity: 1, pointerEvents: "none" as const };
      default:       return { x: dir === 1 ? offset * 2 : -offset * 2, y: 24, scale: 0.85, zIndex: 1, opacity: 0, pointerEvents: "none" as const };
    }
  };

  const spring = { type: "spring" as const, stiffness: 520, damping: 40, mass: 0.9 };

  return (
    <section
      className="relative w-full overflow-hidden border-y-[5px] border-black"
      style={{ backgroundColor: "#5C93E7" }}
      aria-live="polite"
    >
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ===== DESKTOP/TABLET EDGE ARROWS (at true screen edges) ===== */}
      <button
        aria-label="Previous project"
        onClick={goPrev}
        className="hidden sm:flex group absolute left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30
                   w-14 h-24 rounded-full bg-[#C2EEE1] border-[5px] border-black shadow-[8px_8px_0_#000]
                   items-center justify-center"
      >
        <span className="text-black text-3xl group-active:translate-x-[-2px]">←</span>
      </button>
      <button
        aria-label="Next project"
        onClick={goNext}
        className="hidden sm:flex group absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30
                   w-14 h-24 rounded-full bg-[#C2EEE1] border-[5px] border-black shadow-[8px_8px_0_#000]
                   items-center justify-center"
      >
        <span className="text-black text-3xl group-active:translate-x-[2px]">→</span>
      </button>
      {/* ============================================================ */}

      {/* title */}
      <div className="relative z-10">
        <h2
          className="mt-4 mb-0 md:mb-2 text-center leading-[0.8] tracking-[0.05em]
                     [text-shadow:4px_4px_0_var(--color-black),5px_5px_0_var(--color-black),6px_6px_0_var(--color-black)]
                     text-[3.2rem] md:text-[6rem] lg:text-[9.4375rem]"
          style={{ color: "#C2EEE1", fontFamily: "'Bebas Neue', sans-serif" }}
        >
          UPCOMING PROJECTS
        </h2>
      </div>

      {/* stage wrapper */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pt-8 md:pt-12 pb-8 md:pb-20">
        {/* desktop/tablet: 3-card animated carousel */}
        <div className="relative mx-auto hidden sm:block w-full max-w-[900px] h-[660px]">
          {projects.map((p) => {
            const slot = slots[p.id];
            const t = targetFor(slot);
            return (
              <motion.div
                key={p.id}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={t}
                transition={spring}
                style={{ zIndex: t.zIndex, pointerEvents: t.pointerEvents as any }}
              >
                <GameBoy project={p} />
              </motion.div>
            );
          })}
        </div>

        {/* mobile: single card + buttons below (unchanged) */}
        <div className="sm:hidden">
          <div className="relative mx-auto w-full max-w-[460px] min-h-[600px] grid place-items-center">
            <AnimatePresence custom={dir} initial={false} mode="wait">
              <motion.div
                key={projects[index].id}
                custom={dir}
                initial={{ x: dir === 1 ? 160 : -160, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir === 1 ? -160 : 160, opacity: 0 }}
                transition={spring}
                className="flex justify-center"
              >
                <GameBoy project={projects[index]} />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6">
              <button
                aria-label="Previous project"
                onClick={goPrev}
                className="group w-16 h-24 rounded-full bg-[#C2EEE1] border-[5px] border-black shadow-[8px_8px_0_#000] grid place-items-center"
              >
                <span className="text-black text-3xl group-active:translate-x-[-1px]">←</span>
              </button>
              <button
                aria-label="Next project"
                onClick={goNext}
                className="group w-16 h-24 rounded-full bg-[#C2EEE1] border-[5px] border-black shadow-[8px_8px_0_#000] grid place-items-center"
              >
                <span className="text-black text-3xl group-active:translate-x-[1px]">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingProjectsSection;
