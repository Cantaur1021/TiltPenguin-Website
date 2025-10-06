import React from "react";
import { CardColumn } from "../CardColumn";
import { Button } from "../Button";

// If you're using Next.js, load fonts in your root layout with next/font/google
// and replace the inline style fontFamily usages below with the classes they expose.

const HeroSection: React.FC = () => {
  const leftCards = [
    { title: "V 0.4.2", subtitle: "FIXED A BUG WHERE AI TEAMMATES WOULD START CHANTING THE PLAYERS NAME IN UNISON [NOT FIXED]" },
    { title: "V 0.5.3", subtitle: "NERFED THE PENGUINS, REMOVED THE ABILITY FOR THEM TO UNIONIZE, COMPENSATED WITH BREADCRUMBS" },
    { title: "DEVLOG 382", subtitle: "IMPLEMENTED A DYNAMIC WEATHER FEATURE. UNFORTUNATELY ITS RAINING BUGS RIGHT NOW." },
    { title: "DEVLOG 576", subtitle: "DESIGNED AND DEVELOPED A REALISTIC BURNOUT SIMULATOR (ALREADY WORKING AS INTENDED)" },
  ];

  const rightCards = [
    { title: "PLAYER FEEDBACK", subtitle: `"I ASKED THE DEVS FOR MULTIPLAYER. THEY SAID: 'LIFE IS MULTIPLAYER. FIGURE IT OUT.'"` },
    { title: "PLAYTESTER", subtitle: `"FOUND 78 BUGS IN ONE HOUR. REPORTED THEM. GOT PROMOTED TO 'LEAD ENTOMOLOGIST.'"` },
    { title: "PENGUIN QUOTES", subtitle: "[LOOSELY TRANSLATED]", content: `"WE DIDN'T ASK TO BE HERE. BUT HERE WE ARE. TILTING."` },
    { title: "CRITICS", subtitle: `"...THIS GAME DOESN'T WASTE YOUR TIME. IT STEALS IT, AGGRESSIVELY...."` },
  ];

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden
                 bg-[linear-gradient(to_bottom,#c2eee1_25%,#fefaef_100%)]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0
                   bg-[linear-gradient(0deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]
                   [background-size:40px_40px]"
      />

      {/* Edge marquees */}
      <CardColumn cards={leftCards} position="left" />

      {/* Center content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8 md:p-6 sm:p-4">
        <h1
          className="text-center leading-[0.9] tracking-[0.05em]
                     text-[#ffc700]
                     [text-shadow:3px_3px_0_#000,4px_4px_0_#000]
                     px-8 py-4 md:px-6 md:py-3 sm:px-0 sm:py-0
                     text-[clamp(3rem,12vw,6rem)] lg:text-[clamp(4rem,15vw,10rem)]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          TILTPENGUIN
        </h1>

        <div className="mx-auto my-8 max-w-[600px] text-center md:my-6 md:max-w-[400px] sm:px-4">
          <p className="m-1 text-base leading-6 text-black md:text-sm font-bold">
            A scrappy solo game studio powered by delusion.
          </p>
          <p className="m-1 text-base leading-6 text-black md:text-sm font-bold">
            Everything here is open source and free, so I can break things and you can fix them{" "}
            <span className="align-[0.1em] text-m">😊</span>
          </p>
        </div>

        <div className="mt-8 flex gap-8 md:gap-4 md:flex-wrap md:justify-center sm:w-full sm:max-w-[300px] sm:flex-col">
          <Button>COMING SOON</Button>
          {/* <Button variant="secondary">VIEW SOURCE</Button> */}
        </div>
      </div>

      <CardColumn cards={rightCards} position="right" />
    </section>
  );
};

export default HeroSection;
