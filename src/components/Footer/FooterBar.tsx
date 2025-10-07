"use client";

import Image from "next/image";
import { Button } from "../Button";

export default function FooterBar() {
  return (
    <footer className="bg-[#F4B905] border-t-4 border-black py-4 sticky bottom-0 z-0">
      <div className="mx-auto max-w flex flex-col items-center">
        
        {/* === SVG TEXT GOES HERE === */}
        <div className="w-full px-4 md:px-8">
            <h1
              className="
                mt-1 
                leading-[0.82]
                [text-shadow:3px_3px_0_var(--color-black),4px_4px_0_var(--color-black)]
                text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14.75rem]
                w-full
                text-center
                tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.15em] lg:tracking-[0.18em]
                [@media(min-width:1024px)]:tracking-[0.22em]
                [@media(min-width:1280px)]:tracking-[0.28em]
              "
              style={{ 
                color: "#EEECE4", 
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: 'calc((100vw - 11ch) / 10)' // Dynamic spacing based on viewport
              }}
            >
              TILTPENGUIN
            </h1>
        </div>

        {/* === Button === */}
        <Button bgColor="#EEECE4">JUDGE ME AND MY SKILLS</Button>

        {/* === Copyright === */}
        <p className="mt-6 text-center text-xs font-semibold text-black/70">
          © 2025 TiltPenguin
        </p>
      </div>
    </footer>
  );
}