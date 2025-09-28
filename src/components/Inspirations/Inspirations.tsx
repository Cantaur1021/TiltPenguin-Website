"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** ---------------- data ---------------- */
type Game = {
  id: string;
  title: string;
  year?: string;
  platform?: string;
  cartColor?: string;    // top label color
  screen: string;        // TV screenshot
  teaser: string;
  note: string;
};

const GAMES: Game[] = [
  {
    id: "minecraft",
    title: "Minecraft",
    year: "2009",
    platform: "Everywhere",
    cartColor: "#78d957",
    screen: "/images/games/minecraft.jpg",
    teaser: "The spark. Flipped ‘play’ to ‘create’.",
    note:
      "Owned it on every device (even ones that cried). Kickstarted the whole ‘make things’ itch at 10.",
  },
  {
    id: "nitw",
    title: "Night in the Woods",
    year: "2017",
    platform: "PC/Console",
    cartColor: "#ff9bb3",
    screen: "/images/games/nitw.jpg",
    teaser: "Punk comfort. Put words to grief.",
    note:
      "During COVID, it locked me in a buzzing room of life. Cosmic underpayment at $20.",
  },
  {
    id: "gow",
    title: "God of War + Ragnarök",
    year: "2018–2022",
    platform: "PS",
    cartColor: "#9ad1ff",
    screen: "/images/games/gow.jpg",
    teaser: "Re-parenting with an axe.",
    note:
      "E3 2016 reveal lives rent-free. Took a character (and me) into adulthood.",
  },
  {
    id: "rdr2",
    title: "Red Dead Redemption 2",
    year: "2018",
    platform: "PS/Xbox/PC",
    cartColor: "#ffd36e",
    screen: "/images/games/rdr2.jpg",
    teaser: "Cowboys, but existential.",
    note:
      "Proved ‘games are art’ to my English teacher. Give devs flowers—and better hours.",
  },
];

/** ------------- helpers ------------- */
function useActiveStep(stepIds: string[]) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = stepIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        // choose the entry closest to the viewport center
        let best = { idx: 0, score: -Infinity };
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const rect = e.target.getBoundingClientRect();
          const center = window.innerHeight / 2;
          const dist = -Math.abs(rect.top + rect.height / 2 - center); // higher is better
          const idx = stepIds.indexOf(e.target.id);
          if (dist > best.score) best = { idx, score: dist };
        }
        if (best.score !== -Infinity) setActive(best.idx);
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [stepIds]);

  return [active, setActive] as const;
}

/** ------------- atoms (your vibe) ------------- */
function Frame({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={[
        "border-[5px] border-[var(--color-black)] bg-[var(--paper)] shadow-[8px_8px_0_rgba(0,0,0,0.85)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function LabelChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute right-2 top-2 rounded-sm border border-black/60 bg-[var(--paper)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-[2px_2px_0_rgba(0,0,0,0.7)]">
      {children}
    </span>
  );
}

/** ------------- main ------------- */
export default function GamesSNESScroller() {
  const stepIds = useMemo(() => GAMES.map((g) => `cart-step-${g.id}`), []);
  const [active, setActive] = useActiveStep(stepIds);

  return (
    <section className="w-full py-16 md:py-20 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <h2 className="mb-8 text-center text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
          GAMES THAT RAISED ME
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-[15px] gap-y-[19px]">
          {/* Sticky SNES + TV in the center (span 8, centered with empty cols) */}
          <div className="lg:col-span-8 lg:col-start-3">
            <div className="sticky top-10">
              {/* TV */}
              <Frame className="relative w-full overflow-hidden">
                <div className="relative aspect-[4/2.3] bg-black">
                  {/* scanlines overlay */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 mix-blend-screen opacity-40"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                      backgroundSize: "100% 3px",
                    }}
                  />
                  <AnimatePresence mode="wait">
                    {GAMES.map((g, i) =>
                      i === active ? (
                        <motion.div
                          key={g.id}
                          initial={{ opacity: 0, scale: 1.01 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.995 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={g.screen}
                            alt={g.title}
                            fill
                            className="object-cover"
                            priority
                          />
                        </motion.div>
                      ) : null
                    )}
                  </AnimatePresence>
                  <LabelChip>
                    {GAMES[active].year} • {GAMES[active].platform}
                  </LabelChip>
                </div>
                {/* TV bezel caption */}
                <div className="border-t-[5px] border-[var(--color-black)] p-3 flex items-center justify-between">
                  <div className="font-extrabold text-lg">{GAMES[active].title}</div>
                  <div className="text-xs uppercase opacity-70">TiltPenguin TV</div>
                </div>
              </Frame>

              {/* SNES console & slot area */}
              <motion.div
                className="mt-[19px]"
                initial={false}
                animate={{ rotate: [-0.3, 0, 0.3, 0], transition: { duration: 0.6 } }}
                key={`shake-${active}`}
              >
                <Frame className="relative p-6">
                  {/* console body */}
                  <div className="relative mx-auto max-w-[720px]">
                    <div className="h-40 bg-[var(--paper)] border-[4px] border-[var(--color-black)] rounded-md shadow-[6px_6px_0_rgba(0,0,0,0.75)]" />
                    {/* slot */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-[320px] h-[26px] bg-black/85 rounded-sm border-[3px] border-[var(--color-black)]" />
                    {/* buttons */}
                    <div className="absolute inset-x-0 bottom-4 flex justify-center gap-6">
                      <div className="h-9 w-16 rounded-sm border-[3px] border-[var(--color-black)] bg-[var(--paper)] shadow-[3px_3px_0_rgba(0,0,0,0.7)]" />
                      <div className="h-9 w-16 rounded-sm border-[3px] border-[var(--color-black)] bg-[var(--paper)] shadow-[3px_3px_0_rgba(0,0,0,0.7)]" />
                    </div>
                    {/* animated cartridge */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={GAMES[active].id}
                        initial={{ y: 120, rotate: 5, opacity: 0.9 }}
                        animate={{ y: -42, rotate: 0, opacity: 1 }}
                        exit={{ y: 160, rotate: -4, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 24 }}
                        className="absolute left-1/2 -translate-x-1/2 top-0"
                      >
                        <Cartridge game={GAMES[active]} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </Frame>
              </motion.div>

              {/* teaser box below console */}
              <Frame className="mt-[19px] p-5">
                <p className="text-sm md:text-base leading-snug">
                  {GAMES[active].teaser}
                </p>
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs font-semibold uppercase inline-block border-2 border-black px-3 py-1">
                    Read note
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed">{GAMES[active].note}</p>
                </details>
              </Frame>
            </div>
          </div>

          {/* Scroll steps (invisible on desktop if you want super minimal; here we show them as mini cards) */}
          <div className="lg:col-span-3 lg:col-start-10 lg:row-start-1">
            <div className="hidden lg:block sticky top-10">
              <div className="space-y-[19px]">
                {GAMES.map((g, i) => (
                  <button
                    key={g.id}
                    onClick={() =>
                      document.getElementById(`cart-step-${g.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
                    }
                    className={[
                      "w-full text-left",
                      i === active ? "opacity-100" : "opacity-70 hover:opacity-100",
                    ].join(" ")}
                  >
                    <Frame className="p-3">
                      <div className="text-xs uppercase tracking-wide opacity-70">Step {i + 1}</div>
                      <div className="font-extrabold">{g.title}</div>
                      <div className="text-xs opacity-70">{g.year} • {g.platform}</div>
                    </Frame>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* actual scroll triggers (mobile-visible) */}
          <div className="lg:col-span-12 mt-8">
            {GAMES.map((g) => (
              <div
                key={g.id}
                id={`cart-step-${g.id}`}
                className="min-h-[75vh] flex items-center justify-center"
              >
                <Frame className="w-full max-w-[680px] p-5">
                  <div className="flex items-center gap-4">
                    <div className="text-xs uppercase opacity-70">Scroll</div>
                    <div className="font-extrabold">{g.title}</div>
                    <div className="ml-auto text-xs opacity-70">{g.year}</div>
                  </div>
                  <p className="mt-2 text-sm">{g.teaser}</p>
                </Frame>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** ------------- cartridge subcomponent ------------- */
function Cartridge({ game }: { game: Game }) {
  const label = game.cartColor ?? "#e4e4e4";
  return (
    <div className="relative w-[360px]">
      {/* cart shell */}
      <div className="h-[150px] rounded-sm border-[5px] border-[var(--color-black)] bg-[var(--paper)] shadow-[6px_6px_0_rgba(0,0,0,0.8)]" />
      {/* top label */}
      <div
        className="absolute left-2 right-2 top-2 h-10 border-[3px] border-[var(--color-black)]"
        style={{ backgroundColor: label }}
      />
      {/* inner sticker */}
      <div className="absolute left-4 right-4 top-5 h-[78px] bg-[var(--paper)] border-[3px] border-[var(--color-black)] flex items-center px-3">
        <div className="text-sm leading-tight font-extrabold">
          {game.title}
          <div className="text-[10px] opacity-70">{game.year} • {game.platform}</div>
        </div>
      </div>
      {/* notches */}
      <div className="absolute bottom-2 left-2 right-2 h-3 bg-[var(--paper)] border-[3px] border-[var(--color-black)]" />
    </div>
  );
}
