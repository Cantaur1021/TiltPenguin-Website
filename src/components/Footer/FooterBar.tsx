"use client";

import Image from "next/image";
import { Button } from "../Button";

export default function FooterBar() {
  return (
    <footer className="bg-[#F4B905] border-t-4 border-black py-4">
      <div className="mx-auto max-w flex flex-col items-center">
        
        {/* === SVG TEXT GOES HERE === */}
        <div className="w-full flex justify-center overflow-hidden">
            <h1
              className="
                mt-1
                text-center leading-[0.82]
                [text-shadow:3px_3px_0_var(--color-black),4px_4px_0_var(--color-black)]
                text-[14.75rem] tracking-widest
              "
              style={{ color: "#EEECE4", fontFamily: "'Bebas Neue', sans-serif" }}
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
