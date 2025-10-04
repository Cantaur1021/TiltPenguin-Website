// app/components/GamesThatRaisedMe.tsx
"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

// Types
type Game = {
  key: string;
  title: string;
  body: string;
  cartridgeSrc: string; // e.g., "/cartridges/minecraft.svg"
};

// ---- PLACEHOLDER DATA (replace cartridgeSrc with your real SVGs) ----
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

// Tweak these to fit your console art
const CONSOLE = {
  src: "/console.svg", // your console SVG
  // Cartridge slot position relative to the console wrapper.
  // Adjust width/height/left/top so the cartridge sits perfectly in the slot.
  slot: { width: 320, height: 180, left: 0, top: -20 }, // px relative to center; tweak freely
};

export default function GamesThatRaisedMe() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll progress across the entire track (N-1 transitions)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const sections = GAMES.length;
  const [raw, setRaw] = useState(0); // 0..(sections-1)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // tiny epsilon so we never hit an exact 1
    const val = v * (sections - 1 - 1e-6);
    setRaw(val < 0 ? 0 : val > sections - 1 ? sections - 1 : val);
  });

  // Which two cartridges are transitioning right now
  const baseIndex = Math.floor(raw);
  const t = raw - baseIndex; // 0..1 within the current transition

  const currentIdx = Math.min(baseIndex, sections - 1);
  const nextIdx = Math.min(baseIndex + 1, sections - 1);

  // Which text is shown (switch halfway for a snappy feel)
  const activeTextIdx = t < 0.5 ? currentIdx : nextIdx;

  return (
    <section id="games-that-raised-me" className="relative w-full">
      {/* The scroll track defines how long the user scrolls.
          Height = (#games) * 100vh gives one full-screen step per cartridge */}
      <div ref={trackRef} style={{ height: `${sections * 100}vh` }}>
        {/* Sticky stage */}
        <div className="sticky top-0 h-screen w-full bg-[rgb(162,122,188)]/60">
          <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-between px-4 py-6">
            {/* Header */}
            <h2 className="mt-2 select-none text-center font-black uppercase leading-none tracking-tight text-[#EBD9F7] drop-shadow-[0_2px_0_rgba(0,0,0,0.25)]"
                style={{ fontSize: "clamp(40px,10vw,120px)" }}>
              Games That Raised Me
            </h2>

            {/* Text box (content swaps) */}
            <div className="relative w-full max-w-4xl">
              <div className="mx-auto rounded-xl border-4 border-black bg-[#f7f5ef] p-5 shadow-[12px_12px_0_#000] md:p-7">
                {/* Intro line above the dynamic text */}
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-700">
                  TiltPenguin wouldn’t exist without these:
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={GAMES[activeTextIdx].key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <h3 className="mb-2 font-extrabold uppercase tracking-tight text-neutral-900"
                        style={{ fontSize: "clamp(18px,3.5vw,28px)" }}>
                      {GAMES[activeTextIdx].title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-neutral-800 md:text-base">
                      {GAMES[activeTextIdx].body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Console + Cartridges */}
            <div className="relative mt-6 w-full max-w-3xl">
              {/* Console base (static) */}
              <div className="relative mx-auto w-full">
                <img
                  src={CONSOLE.src}
                  alt="Game console"
                  className="mx-auto block w-full select-none"
                  draggable={false}
                />

                {/* Cartridge slot overlay */}
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2"
                  style={{
                    width: CONSOLE.slot.width,
                    height: CONSOLE.slot.height,
                    marginTop: CONSOLE.slot.top,
                    marginLeft: CONSOLE.slot.left,
                  }}
                >
                  {/* Outgoing (current) cartridge: slides left & slightly downscale */}
                  <motion.img
                    key={`cur-${GAMES[currentIdx].key}`}
                    src={GAMES[currentIdx].cartridgeSrc}
                    alt={GAMES[currentIdx].title}
                    className="absolute inset-0 m-auto h-full w-auto select-none drop-shadow"
                    draggable={false}
                    style={{ transformOrigin: "50% 50%" }}
                    animate={{
                      x: t * -220,
                      scale: 1 - t * 0.06,
                      opacity: t < 0.9 ? 1 : 1 - (t - 0.9) / 0.1, // fade at the very end
                    }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0 }}
                  />

                  {/* Incoming (next) cartridge: zooms in from right */}
                  {nextIdx !== currentIdx && (
                    <motion.img
                      key={`next-${GAMES[nextIdx].key}`}
                      src={GAMES[nextIdx].cartridgeSrc}
                      alt={GAMES[nextIdx].title}
                      className="absolute inset-0 m-auto h-full w-auto select-none drop-shadow"
                      draggable={false}
                      style={{ transformOrigin: "50% 50%" }}
                      initial={false}
                      animate={{
                        x: (1 - t) * 220 - 220, // start right, settle to 0
                        scale: 0.94 + t * 0.06,
                        opacity: 0.2 + t * 0.8,
                      }}
                      transition={{ type: "tween", ease: "easeOut", duration: 0 }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Spacer to keep sticky content vertically balanced */}
            <div className="h-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
