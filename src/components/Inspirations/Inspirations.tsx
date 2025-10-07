// src/components/GamesThatRaisedMe.tsx
"use client";

import { useRef, useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

type Game = {
  key: string;
  title: string;
  body: string;
  cartridgeSrc: string;
};

const GAMES: Game[] = [
  {
    key: "minecraft",
    title: "Minecraft",
    cartridgeSrc: "/cartridges.svg",
    body:
      "I’ve owned this game on every device that could run it (and a few that really couldn’t) (shout out PSP homebrew). I’ve liked games before, but Minecraft is what truly kickstarted my love for creating worlds when I was 10 years old. I spent hours making pixel art of my favorite characters, building a 1:1 scale version of my old home before it was demolished, and binge-watching Stampy and Squid’s adventure maps, immediately trying (and failing) to recreate something similar because I was just a 10 year with the attention span of a goldfish. Minecraft changed everything for me. I hope something I create one day can do the same for a 10-year-old somewhere as this game did for me.",
  },
  {
    key: "nitw",
    title: "Night in the Woods",
    cartridgeSrc: "/cartridges.svg",
    body:
      "What Minecraft did for me as a child, Night in the Woods did for me as a man-child. Most of my personality (notice how I didn't say all) was adopted from this game. Every element—from the art to the music to the story to the characters to Possum Springs—hit at the exact right time. It was mid-COVID, I’d lost someone close, and this game put into words what I struggled with, but with so much style and punk it made me—an indoor degen—feel cool. It yanked me off a dangerous ledge and locked me in a room buzzing with life. $20 feels like a cosmic underpayment. (Shout out Revenant Hill.)",
  },
  {
    key: "gow",
    title: "God of War (2018) + Ragnarök",
    cartridgeSrc: "/cartridges.svg",
    body:
      "PlayStation’s 2016 E3 showcase is still king for me. Older, bearded Kratos; a gentler thunder; combat that flipped the series 180. Cory Barlog’s and Eric Williams’ masterpieces didn’t just reinvent a franchise; they redefined taking a character, a world, and an audience into adulthood. I’m glad I grew up with Kratos’s version of masculinity—flawed and striving—over alpha-podcaster posturing. I may not have muscles or a beard, but I am going bald and that’s totally a deliberate Kratos tribute and not genetics.",
  },
  {
    key: "rdr2",
    title: "Red Dead Redemption 2",
    cartridgeSrc: "/cartridges.svg",
    body:
      "Cowboys have never been more depressing. I once showed my English teacher the trailer—unsure what I wanted, maybe validation that games are legit storytelling. She loved it. The world feels lived-in, dripping with history and melancholy; truly 3D characters; an epic that spans a continent. The gameplay didn’t need to be revolutionary; the story’s immersion could only be done in a game. Rockstar deserves the flowers (and yeah, please treat your employees better).",
  },
  {
    key: "titanfall2",
    title: "Titanfall 2",
    cartridgeSrc: "/cartridges.svg",
    body:
      "“There's a point at 7,000 RPM… Who are you?” – Ben Affleck, *Cars*. (Yes, I know.) It’s pure momentum, inventive missions, and a campaign that never wastes your time. Underrated legend.",
  },
  {
    key: "skyrim",
    title: "Skyrim",
    cartridgeSrc: "/cartridges.svg",
    body:
      "What’s a favorites list without Skyrim and Minecraft? For me, Skyrim was company. I grew up with basically no friends; somehow a game designed around isolation brought me comfort. Not the power fantasy, but wandering the world, imagining past battles on mountain tops, following rivers to their source. It taught me games can be a place to feel less alone.",
  },
];

const CONSOLE = {
  src: "/console.svg",
  // Tune to pixel-lock the cartridge into your SVG slot
  slot: {
    width: 320,
    height: 180,
    offsetX: 165,
    offsetY: -100, // moved DOWN (less negative) to sit well below the text
  },
};

const SWAP_WINDOW = 0.22;
const VH_PER_STEP = 120;

export default function GamesThatRaisedMe() {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const steps = Math.max(1, GAMES.length - 1);
  const totalHeightVh = Math.max(VH_PER_STEP * steps, VH_PER_STEP);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end start"],
  });

  const [raw, setRaw] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const mapped = v * (GAMES.length - 1);
    const clamped = Math.min(Math.max(mapped, 0), GAMES.length - 1);
    setRaw(clamped);
  });

  const base = Math.floor(raw);
  const segT = raw - base;

  const swapStart = 1 - SWAP_WINDOW;
  const s = segT <= swapStart ? 0 : (segT - swapStart) / (SWAP_WINDOW || 1e-6);

  const clampIdx = (i: number) => Math.min(Math.max(i, 0), GAMES.length - 1);
  const currentIdx = clampIdx(base);
  const nextIdx = clampIdx(base + 1);

  const activeTextIdx = clampIdx(s < 0.6 ? currentIdx : nextIdx);
  const activeGame = GAMES[activeTextIdx] ?? GAMES[0];

  // slide distance for cartridge swap
  const SLIDE = useMemo(() => CONSOLE.slot.width * 0.9, []);

  return (
    <section id="games-that-raised-me" className="relative">
      <div ref={trackRef} style={{ height: `${totalHeightVh}vh` }} className="bg-[rgb(162,122,188)]">
        <div className="sticky top-0 h-[100svh] w-full bg-[rgb(162,122,188)]/60">
          <div
            className="
              mx-auto h-full max-w-[1200px]
              grid grid-rows-[auto_1fr_auto] items-center gap-6 md:gap-8
              px-4 py-4 md:py-6
            "
          >
            {/* Header */}
            <h2
              className="
                mt-1 mb-1 md:mb-2
                text-center leading-[0.82] tracking-[0.04em]
                [text-shadow:3px_3px_0_var(--color-black),4px_4px_0_var(--color-black)]
                text-[2.4rem] md:text-[4.2rem] lg:text-[7.2rem]
              "
              style={{ color: "#FFE3E3", fontFamily: "'Bebas Neue', sans-serif" }}
            >
              GAMES THAT RAISED ME
            </h2>

            {/* Text box (row 2) */}
            <div className="w-full min-h-0 relative z-20 ">
              <div
                className="mx-auto max-w-4xl rounded-xl border-4 border-black bg-[#f7f5ef] p-5 shadow-[12px_12px_0_#000] md:p-7
                  max-h-[48svh] overflow-auto"
              >
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                  TiltPenguin wouldn’t exist without these:
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeGame.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <h3
                      className="m-0 text-left text-[2.1rem] md:text-[2.4rem] lg:text-[2.65rem] leading-[1.05] uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {activeGame.title}
                    </h3>
                    <p className="m-0 text-sm leading-6.5 text-neutral-800" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {activeGame.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Console group (row 3) — smaller, centered, and well below the text */}
            <div className="relative z-10 w-full flex justify-center">
              {/* scale wrapper to shrink console + cartridge together */}
              <div
                className="relative"
                style={{
                  width: "min(700px, 100%)",
                  transform: "translateY(clamp(16px, 13vh, 90px)) scale(0.8)",
                  transformOrigin: "top center",
                }}
              >
                {/* CARTRIDGE LAYER */}
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2"
                  style={{
                    width: CONSOLE.slot.width,
                    height: CONSOLE.slot.height,
                    transform: `translate(-50%, -50%) translate(${CONSOLE.slot.offsetX}px, ${CONSOLE.slot.offsetY}px)`,
                  }}
                >
                  {/* Outgoing (current) */}
                  <motion.img
                    key={`cur-${GAMES[currentIdx].key}`}
                    src={GAMES[currentIdx].cartridgeSrc}
                    alt={GAMES[currentIdx].title}
                    className="absolute inset-0 m-auto h-full w-auto select-none"
                    draggable={false}
                    style={{ transformOrigin: "50% 50%" }}
                    animate={
                      prefersReduced
                        ? { x: 0, opacity: 1, scale: 1 }
                        : {
                            x: -SLIDE * s,
                            opacity: s < 0.9 ? 1 : 1 - (s - 0.9) / 0.1,
                            scale: 1 - s * 0.04,
                          }
                    }
                    transition={{ type: "tween", ease: "easeOut", duration: 0 }}
                  />

                  {/* Incoming (next) */}
                  {nextIdx !== currentIdx && (
                    <motion.img
                      key={`next-${GAMES[nextIdx].key}`}
                      src={GAMES[nextIdx].cartridgeSrc}
                      alt={GAMES[nextIdx].title}
                      className="absolute inset-0 m-auto h-full w-auto select-none"
                      draggable={false}
                      style={{ transformOrigin: "50% 50%" }}
                      initial={false}
                      animate={
                        prefersReduced
                          ? { x: 0, opacity: 1, scale: 1 }
                          : {
                              x: SLIDE * (1 - s),
                              opacity: s === 0 ? 0 : 0.2 + s * 0.8,
                              scale: 0.96 + s * 0.04,
                            }
                      }
                      transition={{ type: "tween", ease: "easeOut", duration: 0 }}
                    />
                  )}

                  {/* Slot glow */}
                  {!prefersReduced && (
                    <motion.div
                      className="absolute inset-0 rounded-md"
                      style={{
                        WebkitMaskImage:
                          "radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0.6))",
                        maskImage:
                          "radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0.6))",
                        background:
                          "radial-gradient(closest-side, rgba(255,255,255,0.6), rgba(255,255,255,0))",
                      }}
                      animate={{ opacity: s }}
                    />
                  )}
                </div>

                {/* CONSOLE IMAGE */}
                <motion.img
                  src={CONSOLE.src}
                  alt="Game console"
                  className="relative z-10 mx-auto block w-full select-none"
                  draggable={false}
                  style={{ maxHeight: "28svh" }} // smaller cap so plenty of breathing room
                  animate={
                    prefersReduced
                      ? { y: 0, scale: 1 }
                      : { y: -4 * s, scale: 1 + 0.01 * s }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

            <div className="h-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
