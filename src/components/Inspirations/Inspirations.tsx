// src/components/GamesThatRaisedMe.tsx
"use client";

import { useRef, useState, useMemo, useEffect } from "react";
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
      "I've owned this game on every device that could run it (and a few that really couldn't) (shout out PSP homebrew). I've liked games before, but Minecraft is what truly kickstarted my love for creating worlds when I was 10 years old. I spent hours making pixel art of my favorite characters, building a 1:1 scale version of my old home before it was demolished, and binge-watching Stampy and Squid's adventure maps, immediately trying (and failing) to recreate something similar because I was just a 10 year with the attention span of a goldfish. Minecraft changed everything for me. I hope something I create one day can do the same for a 10-year-old somewhere as this game did for me.",
  },
  {
    key: "nitw",
    title: "Night in the Woods",
    cartridgeSrc: "/cartridges.svg",
    body:
      "What Minecraft did for me as a child, Night in the Woods did for me as a man-child. Most of my personality (notice how I didn't say all) was adopted from this game. Every element—from the art to the music to the story to the characters to Possum Springs—hit at the exact right time. It was mid-COVID, I'd lost someone close, and this game put into words what I struggled with, but with so much style and punk it made me—an indoor degen—feel cool. It yanked me off a dangerous ledge and locked me in a room buzzing with life. $20 feels like a cosmic underpayment. (Shout out Revenant Hill.)",
  },
  {
    key: "gow",
    title: "God of War (2018) + Ragnarök",
    cartridgeSrc: "/cartridges.svg",
    body:
      "PlayStation's 2016 E3 showcase is still king for me. Older, bearded Kratos; a gentler thunder; combat that flipped the series 180. Cory Barlog's and Eric Williams' masterpieces didn't just reinvent a franchise; they redefined taking a character, a world, and an audience into adulthood. I'm glad I grew up with Kratos's version of masculinity—flawed and striving—over alpha-podcaster posturing. I may not have muscles or a beard, but I am going bald and that's totally a deliberate Kratos tribute and not genetics.",
  },
  {
    key: "rdr2",
    title: "Red Dead Redemption 2",
    cartridgeSrc: "/cartridges.svg",
    body:
      "Cowboys have never been more depressing. I once showed my English teacher the trailer—unsure what I wanted, maybe validation that games are legit storytelling. She loved it. The world feels lived-in, dripping with history and melancholy; truly 3D characters; an epic that spans a continent. The gameplay didn't need to be revolutionary; the story's immersion could only be done in a game. Rockstar deserves the flowers (and yeah, please treat your employees better).",
  },
  {
    key: "titanfall2",
    title: "Titanfall 2",
    cartridgeSrc: "/cartridges.svg",
    body:
      "\"There's a point at 7,000 RPM… Who are you?\" – Ben Affleck, *Cars*. (Yes, I know.) It's pure momentum, inventive missions, and a campaign that never wastes your time. Underrated legend.",
  },
  {
    key: "skyrim",
    title: "Skyrim",
    cartridgeSrc: "/cartridges.svg",
    body:
      "What's a favorites list without Skyrim and Minecraft? For me, Skyrim was company. I grew up with basically no friends; somehow a game designed around isolation brought me comfort. Not the power fantasy, but wandering the world, imagining past battles on mountain tops, following rivers to their source. It taught me games can be a place to feel less alone.",
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
  const [scrollHint, setScrollHint] = useState(true);
  const [cartridgeEject, setCartridgeEject] = useState(false);

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
    
    // Hide scroll hint after first scroll
    if (v > 0.01 && scrollHint) {
      setScrollHint(false);
    }
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

  // Trigger cartridge eject animation on game change
  useEffect(() => {
    if (s > 0.1 && s < 0.9) {
      setCartridgeEject(true);
    } else {
      setCartridgeEject(false);
    }
  }, [s]);

  // slide distance for cartridge swap
  const SLIDE = useMemo(() => CONSOLE.slot.width * 0.9, []);

  return (
    <section id="games-that-raised-me" className="relative z-10 bg-[rgb(162,122,188)] border-b-4">
      <div ref={trackRef} style={{ height: `${totalHeightVh}vh` }} className="bg-[rgb(162,122,188)] relative z-10">
        <div className="sticky top-0 h-[100svh] w-full bg-[rgb(162,122,188)]">
          <div
            className="
              mx-auto h-full max-w-[1200px]
              grid grid-rows-[auto_1fr_auto] items-center gap-6 md:gap-8
              px-4 py-2 md:py-4
            "
          >
            {/* Header with animation */}
            <motion.h2
              className="
                mb-1 md:mb-2
                text-center leading-[0.82] tracking-[0.04em]
                [text-shadow:3px_3px_0_var(--color-black),4px_4px_0_var(--color-black)]
                text-[2.4rem] md:text-[4.2rem] lg:text-[7.2rem]
              "
              style={{ color: "#FFE3E3", fontFamily: "'Bebas Neue', sans-serif" }}
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.02,
                rotate: [-0.5, 0.5, 0],
                transition: { duration: 0.3 }
              }}
            >
              GAMES THAT RAISED ME
            </motion.h2>

            {/* Scroll hint */}
            <AnimatePresence>
              {scrollHint && (
                <motion.div
                  className="absolute top-32 left-1/2 transform -translate-x-1/2 z-30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, 10, 0],
                    transition: {
                      y: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }
                  }}
                  exit={{ opacity: 0 }}
                >
                  <div className="bg-[#FFE3E3] border-2 border-black px-3 py-1 shadow-[3px_3px_0_#000]">
                    <p className="text-xs font-bold text-black" style={{ fontFamily: "Poppins, sans-serif" }}>
                      SCROLL TO SWAP CARTRIDGES ↓
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Text box (row 2) - with animations added */}
            <div className="w-full min-h-0 relative z-20 ">
              <motion.div
                className="mx-auto max-w-4xl rounded-xl border-4 border-black bg-[#f7f5ef] p-5 shadow-[12px_12px_0_#000] md:p-7
                  max-h-[48svh] overflow-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ boxShadow: "14px 14px 0 #000" }}
                style={{
                  transform: cartridgeEject ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                  TiltPenguin wouldn`&apos;t exist without these:
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeGame.key}
                    initial={{ opacity: 0, y: 8, rotate: -2 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: -8, rotate: 2 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <motion.h3
                      className="m-0 text-left text-[2.1rem] md:text-[2.4rem] lg:text-[2.65rem] leading-[1.05] uppercase"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      animate={cartridgeEject ? {
                        x: [0, -2, 2, 0],
                        transition: { duration: 0.2 }
                      } : {}}
                    >
                      {activeGame.title}
                    </motion.h3>
                    <p className="m-0 text-sm leading-6.5 text-neutral-800" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {activeGame.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                {/* Progress indicator */}
                <motion.div 
                  className="mt-4 flex gap-1 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {GAMES.map((_, index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-2 rounded-full border-2 border-black"
                      style={{
                        backgroundColor: index === activeTextIdx ? '#000' : 'transparent'
                      }}
                      animate={{
                        scale: index === activeTextIdx ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Console group (row 3) — smaller, centered, and well below the text */}
            <div className="relative z-10 w-full flex justify-center">
              {/* scale wrapper to shrink console + cartridge together - KEEPING ORIGINAL TRANSFORM */}
              <motion.div
                className="relative"
                style={{
                  width: "min(700px, 100%)",
                  transform: "translateY(clamp(16px, 13vh, 90px)) scale(0.8)",
                  transformOrigin: "top center",
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.4, duration: 0.6 }}
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
                  {/* Outgoing (current) with enhanced eject animation */}
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
                            y: cartridgeEject ? -20 * s : 0,
                            opacity: s < 0.9 ? 1 : 1 - (s - 0.9) / 0.1,
                            scale: 1 - s * 0.04,
                            rotate: cartridgeEject ? -15 * s : 0,
                          }
                    }
                    transition={{ type: "tween", ease: "easeOut", duration: 0 }}
                  />

                  {/* Incoming (next) with enhanced insert animation */}
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
                              y: cartridgeEject ? -20 * (1 - s) : 0,
                              opacity: s === 0 ? 0 : 0.2 + s * 0.8,
                              scale: 0.96 + s * 0.04,
                              rotate: cartridgeEject ? 15 * (1 - s) : 0,
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
                      animate={{ 
                        opacity: s,
                        scale: cartridgeEject ? [1, 1.1, 1] : 1
                      }}
                      transition={{
                        scale: {
                          duration: 0.3,
                          repeat: cartridgeEject ? Infinity : 0
                        }
                      }}
                    />
                  )}
                </div>

                {/* CONSOLE IMAGE with rumble effect */}
                <motion.img
                  src={CONSOLE.src}
                  alt="Game console"
                  className="relative z-10 mx-auto block w-full select-none"
                  draggable={false}
                  style={{ maxHeight: "28svh" }} // smaller cap so plenty of breathing room
                  animate={
                    prefersReduced
                      ? { y: 0, scale: 1 }
                      : { 
                          y: -4 * s, 
                          scale: 1 + 0.01 * s,
                          rotate: cartridgeEject ? [0, -0.5, 0.5, 0] : 0
                        }
                  }
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    rotate: {
                      duration: 0.2,
                      repeat: cartridgeEject ? 2 : 0
                    }
                  }}
                />
                
                {/* Sound effect text */}
                <AnimatePresence>
                  {cartridgeEject && (
                    <motion.div
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2"
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-2xl font-bold text-[#FFE3E3]" 
                         style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        *CLICK*
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="h-2" />
          </div>
        </div>
      </div>
    </section>
  );
}