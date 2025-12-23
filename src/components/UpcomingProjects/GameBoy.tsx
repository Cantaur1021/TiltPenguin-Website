// components/GameBoy.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  screenImage?: string;
};

export default function GameBoy({
  project,
  className = "",
  isCenter = false,
  onInteraction,
}: {
  project: Project;
  className?: string;
  isCenter?: boolean;
  onInteraction?: () => void;
}) {
  const [buttonPresses, setButtonPresses] = useState({
    up: 0,
    down: 0,
    left: 0,
    right: 0,
    a: 0,
    b: 0,
  });
  const [screenGlitch, setScreenGlitch] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);

  const handleButtonPress = (button: keyof typeof buttonPresses) => {
    setButtonPresses((prev) => ({ ...prev, [button]: prev[button] + 1 }));
    onInteraction?.();

    // Konami code detection
    const konamiCode = [
      "up",
      "up",
      "down",
      "down",
      "left",
      "right",
      "left",
      "right",
      "b",
      "a",
    ];
    const newProgress = [...konamiProgress, button].slice(-10);
    setKonamiProgress(newProgress);

    if (newProgress.join(",") === konamiCode.join(",")) {
      setScreenGlitch(true);
      setTimeout(() => setScreenGlitch(false), 1000);
      setKonamiProgress([]);
    }

    // Random glitch on too many presses
    const totalPresses = Object.values(buttonPresses).reduce(
      (a, b) => a + b,
      0
    );
    if (totalPresses > 20 && Math.random() < 0.1) {
      setScreenGlitch(true);
      setTimeout(() => setScreenGlitch(false), 300);
    }
  };

  return (
    <motion.div
      className={[
        "inline-block mx-auto origin-center",
        "scale-[0.78] sm:scale-[0.82] md:scale-[0.86] lg:scale-[0.9] xl:scale-[0.94] 2xl:scale-[0.98]",
        className,
      ].join(" ")}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      animate={
        isCenter
          ? {
              y: [0, -5, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
          : {}
      }
    >
      <article
        className={[
          "relative w-[364px] h-[587px]",
          "bg-white border-[6px] border-black rounded-none rounded-br-[54px]",
          "shadow-[12px_12px_0_#000] p-5",
          "transition-all duration-200",
          isCenter ? "hover:shadow-[14px_14px_0_#000]" : "",
        ].join(" ")}
      >
        {/* Screen — black border + strong drop shadow */}
        <motion.div
          className="relative w-full h-[270px] bg-[#63DB7E] rounded-none rounded-br-[26px] border-[6px] border-black shadow-[10px_10px_0_#000] overflow-hidden"
          animate={
            screenGlitch
              ? {
                  x: [0, -2, 2, -2, 0],
                  filter: [
                    "hue-rotate(0deg)",
                    "hue-rotate(90deg)",
                    "hue-rotate(-90deg)",
                    "hue-rotate(0deg)",
                  ],
                }
              : {}
          }
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 text-center text-black tracking-[0.08em] text-[18px] font-extrabold"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {screenGlitch ? "ERROR 404: FUN NOT FOUND" : project.title}
          </div>

          {project.screenImage && !screenGlitch && (
            <Image
              src={project.screenImage}
              alt=""
              fill
              className="object-contain max-h-[85%] max-w-[94%] m-auto"
              style={{ position: "absolute", inset: 0 }}
              sizes="(max-width: 364px) 100vw, 364px"
              priority
            />
          )}

          {screenGlitch && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-6xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                🐧
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Controls */}
        <div className="mt-8 grid grid-cols-[1fr_auto] gap-x-6">
          {/* D-pad */}
          <div className="relative w-[128px] h-[128px]">
            {/* Up/Down */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[36px] h-full">
              <button
                className="absolute top-0 w-full h-[46px] bg-[#9B9B9B] border-[6px] border-black rounded-t-[8px] shadow-[6px_6px_0_#000]
                           transition-[transform,box-shadow] duration-100
                           hover:bg-[#B5B5B5] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_#000]
                           active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
                onClick={() => handleButtonPress("up")}
              />
              <button
                className="absolute bottom-0 w-full h-[46px] bg-[#9B9B9B] border-[6px] border-black rounded-b-[8px] shadow-[6px_6px_0_#000]
                           transition-[transform,box-shadow] duration-100
                           hover:bg-[#B5B5B5] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_#000]
                           active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
                onClick={() => handleButtonPress("down")}
              />
            </div>

            {/* Left/Right */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[36px] w-full">
              <button
                className="absolute left-0 h-full w-[46px] bg-[#9B9B9B] border-[6px] border-black rounded-l-[8px] shadow-[6px_6px_0_#000]
                           transition-[transform,box-shadow] duration-100
                           hover:bg-[#B5B5B5] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_#000]
                           active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
                onClick={() => handleButtonPress("left")}
              />
              <button
                className="absolute right-0 h-full w-[46px] bg-[#9B9B9B] border-[6px] border-black rounded-r-[8px] shadow-[6px_6px_0_#000]
                           transition-[transform,box-shadow] duration-100
                           hover:bg-[#B5B5B5] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_#000]
                           active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
                onClick={() => handleButtonPress("right")}
              />
            </div>

            {/* Center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] bg-[#9B9B9B] border-[6px] border-black rounded-[8px] shadow-[6px_6px_0_#000] pointer-events-none" />
          </div>

          {/* A/B buttons */}
          <div className="relative w-[150px] h-[125px]">
            <button
              className="absolute right-2 top-0 w-[56px] h-[56px] rounded-full bg-[#E46E6E] border-[6px] border-black
                         transition-[background-color] duration-100
                         hover:bg-[#F08080] active:bg-[#F08080]
                         flex items-center justify-center font-bold text-xl"
              style={{
                boxShadow: "6px 6px 0 #000",
                transform: "translate(0, 0)",
                transition: "transform 0.1s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "6px 6px 0 #000";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform =
                  "translate(6px, 6px) scale(0.92)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "6px 6px 0 #000";
              }}
              onClick={() => handleButtonPress("a")}
            >
              A
            </button>
            <button
              className="absolute right-[70px] top-[36px] w-[56px] h-[56px] rounded-full bg-[#E46E6E] border-[6px] border-black
                         transition-[background-color] duration-100
                         hover:bg-[#F08080] active:bg-[#F08080]
                         flex items-center justify-center font-bold text-xl"
              style={{
                boxShadow: "6px 6px 0 #000",
                transform: "translate(0, 0)",
                transition: "transform 0.1s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "6px 6px 0 #000";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform =
                  "translate(6px, 6px) scale(0.92)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "6px 6px 0 #000";
              }}
              onClick={() => handleButtonPress("b")}
            >
              B
            </button>
          </div>
        </div>

        {/* Button press counter */}
        {Object.values(buttonPresses).reduce((a, b) => a + b, 0) > 5 && (
          <motion.div
            className="absolute top-2 right-2 bg-yellow-300 border-2 border-black px-2 py-1 text-xs font-bold"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            PRESSES: {Object.values(buttonPresses).reduce((a, b) => a + b, 0)}
          </motion.div>
        )}

        {/* CTA button */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8">
          <button
            type="button"
            className="
              px-6 py-2 rounded-full uppercase
              bg-[#FFC700] text-black border-[3px] border-black
              tracking-[0.1em] text-[12px]
              transition-[background-color] duration-100
            "
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              boxShadow: "6px 6px 0 #000",
              transform: "translate(0, 0)",
              transition: "transform 0.1s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translate(-2px, -2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "6px 6px 0 #000";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform =
                "translate(6px, 6px) scale(0.95)";
              e.currentTarget.style.boxShadow = "none";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translate(-2px, -2px)";
              e.currentTarget.style.boxShadow = "6px 6px 0 #000";
            }}
            onClick={() => {
              onInteraction?.();
              console.log("View Source clicked for:", project.title);
            }}
          >
            View Source
          </button>
        </div>
      </article>
    </motion.div>
  );
}
