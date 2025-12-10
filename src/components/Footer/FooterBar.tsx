"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../Button";
import { motion } from "framer-motion";

export default function FooterBar() {
  const [titleHover, setTitleHover] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    setClickCount((prev) => prev + 1);
    // Add your actual button logic here
    console.log("Judge button clicked!");
  };

  return (
    <footer className="bg-[#F4B905] border-t-[3px] sm:border-t-4 border-black py-3 sm:py-4 sticky bottom-0 z-0">
      <div className="mx-auto max-w flex flex-col items-center">
        {/* === SVG TEXT GOES HERE === */}
        <div className="w-full px-2 sm:px-4 md:px-8 overflow-hidden">
          <h1
            className="
                mt-1 
                leading-[0.82]
                [text-shadow:2px_2px_0_var(--color-black),3px_3px_0_var(--color-black)] sm:[text-shadow:3px_3px_0_var(--color-black),4px_4px_0_var(--color-black)]
                text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[14.75rem]
                w-full
                text-center
                tracking-[0.04em] sm:tracking-[0.08em] md:tracking-[0.12em] lg:tracking-[0.18em]
                [@media(min-width:1024px)]:tracking-[0.22em]
                [@media(min-width:1280px)]:tracking-[0.28em]
                cursor-default select-none
              "
            style={{
              color: "#EEECE4",
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "calc((100vw - 11ch) / 10)", // Dynamic spacing based on viewport
            }}
            onMouseEnter={() => setTitleHover(true)}
            onMouseLeave={() => setTitleHover(false)}
          >
            {"TILTPENGUIN".split("").map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 50, rotate: -10 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08, // Stagger each letter by 0.08s
                  ease: [0.25, 0.1, 0.25, 1],
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{
                  y: -10,
                  rotate: [-5, 5, -5, 0],
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* === Button with animation === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{
            y: -2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Button bgColor="#EEECE4" onClick={handleButtonClick}>
            {clickCount === 0 && "JUDGE ME AND MY SKILLS"}
            {clickCount === 1 && "GO ON, JUDGE ME"}
            {clickCount === 2 && "STILL JUDGING?"}
            {clickCount === 3 && "JUDGMENT INTENSIFIES"}
            {clickCount > 3 && "OK THAT'S ENOUGH"}
          </Button>
        </motion.div>

        {/* === Fun messages based on clicks === */}
        {clickCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 bg-[#EEECE4] border-2 border-black px-3 py-1 shadow-[3px_3px_0_#000] z-20"
          >
            <p
              className="text-xs font-bold text-black"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {clickCount === 1 && "JUDGMENT PENDING..."}
              {clickCount === 2 && "STILL PROCESSING..."}
              {clickCount === 3 && "ERROR 404: SKILLS NOT FOUND"}
              {clickCount === 4 && "JUST KIDDING, THEY'RE AWESOME"}
              {clickCount > 4 && "🐧"}
            </p>
          </motion.div>
        )}

        {/* === Copyright with subtle animation === */}
        <motion.p
          className="mt-4 sm:mt-6 text-center text-[10px] sm:text-xs font-semibold text-black/70 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            color: "#000",
            transition: { duration: 0.2 },
          }}
        >
          © 2025 TiltPenguin
          {clickCount > 10 && " • You really like clicking, don't you?"}
        </motion.p>

        {/* === Easter egg penguin that walks across screen === */}
        {clickCount >= 5 && (
          <motion.div
            className="fixed bottom-0 left-0 text-4xl z-30 pointer-events-none"
            initial={{ x: -50 }}
            animate={{
              x: window.innerWidth + 50,
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              x: {
                duration: 10,
                ease: "linear",
              },
              rotate: {
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            🐧
          </motion.div>
        )}
      </div>
    </footer>
  );
}
