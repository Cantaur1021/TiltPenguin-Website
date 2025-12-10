"use client";

import React from "react";
import { CardColumn } from "../CardColumn";
import { Button } from "../Button";
import { motion } from "framer-motion";

// If you're using Next.js, load fonts in your root layout with next/font/google
// and replace the inline style fontFamily usages below with the classes they expose.

const HeroSection: React.FC = () => {
  const leftCards = [
    {
      title: "V 0.4.2",
      subtitle:
        "FIXED A BUG WHERE AI TEAMMATES WOULD START CHANTING THE PLAYERS NAME IN UNISON [NOT FIXED]",
    },
    {
      title: "V 0.5.3",
      subtitle:
        "NERFED THE PENGUINS, REMOVED THE ABILITY FOR THEM TO UNIONIZE, COMPENSATED WITH BREADCRUMBS",
    },
    {
      title: "DEVLOG 382",
      subtitle:
        "IMPLEMENTED A DYNAMIC WEATHER FEATURE. UNFORTUNATELY ITS RAINING BUGS RIGHT NOW.",
    },
    {
      title: "DEVLOG 576",
      subtitle:
        "DESIGNED AND DEVELOPED A REALISTIC BURNOUT SIMULATOR (ALREADY WORKING AS INTENDED)",
    },
  ];

  const rightCards = [
    {
      title: "PLAYER FEEDBACK",
      subtitle: `"I ASKED THE DEVS FOR MULTIPLAYER. THEY SAID: 'LIFE IS MULTIPLAYER. FIGURE IT OUT.'"`,
    },
    {
      title: "PLAYTESTER",
      subtitle: `"FOUND 78 BUGS IN ONE HOUR. REPORTED THEM. GOT PROMOTED TO 'LEAD ENTOMOLOGIST.'"`,
    },
    {
      title: "PENGUIN QUOTES",
      subtitle: "[LOOSELY TRANSLATED]",
      content: `"WE DIDN'T ASK TO BE HERE. BUT HERE WE ARE. TILTING."`,
    },
    {
      title: "CRITICS",
      subtitle: `"...THIS GAME DOESN'T WASTE YOUR TIME. IT STEALS IT, AGGRESSIVELY...."`,
    },
  ];

  // Animation variants for the rails (CardColumns)
  const railVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  // Stagger children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4, // Start after rails begin appearing
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
        ease: [0.25, 0.1, 0.25, 1] as const, // Custom cubic-bezier for smooth entry
      },
    },
  };

  return (
    <section
      className="relative z-10 min-h-screen w-full overflow-hidden
                 bg-[linear-gradient(to_bottom,#c2eee1_25%,#fefaef_100%)]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Subtle grid overlay with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="pointer-events-none absolute inset-0
                   bg-[linear-gradient(0deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]
                   [background-size:40px_40px]"
      />

      {/* Edge marquees - spawn in first (hidden on mobile/tablet) */}
      <motion.div
        variants={railVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:block"
      >
        <CardColumn cards={leftCards} position="left" />
      </motion.div>

      {/* Center content */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          whileHover={{
            rotate: [-1, 1, -1],
            scale: 1.02,
            transition: {
              rotate: {
                duration: 0.3,
                ease: "easeInOut",
                repeat: 0,
              },
              scale: {
                duration: 0.2,
              },
            },
          }}
          whileTap={{ scale: 0.98 }}
          className="text-center leading-[0.9] tracking-[0.02em] sm:tracking-[0.05em]
                     text-[#ffc700]
                     [text-shadow:2px_2px_0_#000,3px_3px_0_#000] sm:[text-shadow:3px_3px_0_#000,4px_4px_0_#000]
                     px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4
                     text-[clamp(2.5rem,14vw,4rem)] sm:text-[clamp(3rem,12vw,6rem)] lg:text-[clamp(4rem,15vw,10rem)]
                     cursor-default select-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          TILTPENGUIN
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mx-auto my-6 sm:my-8 max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] text-center px-4"
        >
          <motion.p
            className="m-1 text-base leading-6 text-black md:text-sm font-bold"
            whileInView={{
              transition: { delay: 0.1 },
            }}
          >
            A scrappy solo game studio powered by delusion.
          </motion.p>
          <motion.p
            className="m-1 text-base leading-6 text-black md:text-sm font-bold"
            whileInView={{
              transition: { delay: 0.15 },
            }}
          >
            Everything here is open source and free, so I can break things and
            you can fix them{" "}
            <motion.span
              className="align-[0.1em] text-m inline-block"
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            >
              😊
            </motion.span>
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-6 sm:mt-8 flex gap-4 sm:gap-6 md:gap-8 flex-wrap justify-center w-full max-w-[280px] sm:max-w-[300px] md:max-w-none"
          whileHover={{
            y: -2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ y: 0 }}
        >
          <Button>COMING SOON</Button>
          {/* <Button variant="secondary">VIEW SOURCE</Button> */}
        </motion.div>
      </motion.div>

      <motion.div
        variants={railVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:block"
      >
        <CardColumn cards={rightCards} position="right" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
