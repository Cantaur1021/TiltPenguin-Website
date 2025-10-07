// components/AboutMeLocked.tsx
"use client";

import Image from "next/image";
import React from "react";

const PAPER = "#F3F1EB";
const BG = "#E46E6E";

/* ---------------- Small bits ---------------- */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute right-2 top-2 rounded-sm border border-black/60 bg-[var(--paper)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-[2px_2px_0_rgba(0,0,0,0.7)]">
      {children}
    </span>
  );
}

function Card({
  title,
  center,
  children,
  className = "",
}: {
  title?: string;
  center?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "h-full w-full border-[5px] border-[var(--color-black)] bg-[var(--paper)]",
        "shadow-[8px_8px_0_var(--color-black)] p-4 md:p-5 lg:p-6",
        className,
      ].join(" ")}
    >
      {title && (
        <h4
          className={[
            "mb-2 text-4xl uppercase leading-none tracking-wide",
            center ? "text-center" : "",
          ].join(" ")}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {title}
        </h4>
      )}
      {children && (
        <p
          className={[
            center ? "text-center" : "",
            "m-0 text-base leading-snug font-bold",
          ].join(" ")}
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {children}
        </p>
      )}
    </div>
  );
}

/**
 * Aspect wrappers to preserve your Figma proportions while letting the
 * grid expand edge-to-edge. These match your original pixel boxes:
 *  - Wide block:   607 x 355  => aspect-[607/355]
 *  - Small cards:  296 x 251  => aspect-[296/251]
 *  - Tall image:   607 x 520  => aspect-[607/520]
 */
function Aspect({ ratio, children, className = "" }: { ratio: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={["relative w-full", `aspect-[${ratio}]`, className].join(" ")}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

export default function AboutMeLocked() {
  return (
    <section
      className="
        relative flex flex-col items-stretch
        border-t-[5px] border-b-[5px] border-[var(--color-black)]
        bg-[var(--color-yellow)]
        px-0 z-10
      "
      style={{ background: BG, ["--paper" as any]: PAPER }}
    >
      {/* Title */}
      <h2
        className="
          mt-3 mb-1 md:mb-2
          text-center leading-[0.82] tracking-[0.04em]
          [text-shadow:3px_3px_0_var(--color-black),4px_4px_0_var(--color-black)]
          text-[2.75rem] md:text-[4.75rem] lg:text-[7.75rem]
        "
        style={{ color: "#FFE3E3", fontFamily: "'Bebas Neue', sans-serif" }}
      >
        ABOUT ME
      </h2>

      {/* Edge-to-edge grid with tight gaps (matches AboutSection) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 pb-6 px-3 md:px-4">

        {/* LEFT COLUMN (stack) */}
        <div className="flex flex-col gap-3 lg:gap-4">
          {/* Top-left (wide text) — 607x355 */}
          <Aspect ratio="607/355">
            <Card className="flex items-center justify-center">
              <p
                className="m-0 text-center text-[2.1rem] md:text-[2.4rem] lg:text-[2.65rem] leading-[1.05] uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Hi, I&apos;m Chinmay. I&apos;ve built games for brand events and companies,
                but TiltPenguin is where I get loose, get messy, and make the kind
                of odd little experiments I actually want to play.
              </p>
            </Card>
          </Aspect>

          {/* Row of two small cards — 296x251 each */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <Aspect ratio="296/251">
              <Card title="SUPERPOWER" center>
                Turning barely baked ideas into barely playable demos.
              </Card>
            </Aspect>
            <Aspect ratio="296/251">
              <Card title="GOAL" center>
                Games that surprise, delight and maybe confuse you (and me as well).
              </Card>
            </Aspect>
          </div>

          {/* Row of two small cards — 296x251 each */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <Aspect ratio="296/251">
              <Card title="WEAKNESS" center>
                Fixing bugs I accidentally start to like (they grow on me). And cookies.
              </Card>
            </Aspect>
            <Aspect ratio="296/251">
              <Card title="SOLO POWERED" center>
                Games that surprise, delight and maybe confuse you (and me as well).
              </Card>
            </Aspect>
          </div>

          {/* Bottom-left image — 607x355 */}
          <Aspect ratio="607/355">
            <div className="relative h-full w-full border-[5px] border-[var(--color-black)] shadow-[8px_8px_0_var(--color-black)] overflow-hidden bg-[var(--paper)]">
              <Label>BARELY GROWN-UP ENGINEERING</Label>
              <Image src="/images/about/bottom-left.webp" alt="Lab chaos" fill className="object-cover" />
            </div>
          </Aspect>
        </div>

        {/* RIGHT COLUMN (stack) */}
        <div className="flex flex-col gap-3 lg:gap-4">
          {/* Top-right image — 607x355 */}
          <Aspect ratio="607/355">
            <div className="z-1 relative h-full w-full border-[5px] border-[var(--color-black)] shadow-[8px_8px_0_var(--color-black)] overflow-hidden bg-[var(--paper)]">
              <Label>2007 KERALA // OUTDOOR GAMING SETUP</Label>
              <Image src="/images/about/top-right.webp" alt="Retro gaming setup" fill className="object-cover" priority />
            </div>
          </Aspect>

          {/* Middle-right (wide text) — 607x355 */}
          <Aspect ratio="607/355">
            <Card className="flex items-center justify-center">
              <p
                className="m-0 text-center text-[2.1rem] md:text-[2.4rem] lg:text-[2.65rem] leading-[1.05] uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                When I&apos;m not wrangling code, I&apos;m usually breaking it on purpose just to see what happens.
                This site is literally just a museum of prototypes, mistakes and happy accidents (shout out Bob Ross).
              </p>
            </Card>
          </Aspect>

          {/* Bottom-right tall image — 607x520 */}
          <Aspect ratio="607/520">
            <div className="relative h-full w-full border-[5px] border-[var(--color-black)] shadow-[8px_8px_0_var(--color-black)] overflow-hidden bg-[var(--paper)]">
              <Label>KERALA MY SPAWN POINT</Label>
              <Image src="/images/about/bottom-right.webp" alt="Kerala street" fill className="object-cover" />
            </div>
          </Aspect>
        </div>
      </div>

      {/* Tablet & Mobile already follow edge-to-edge pattern via the same grid above.
          If you want the old stacked variants, we can add specific md:hidden blocks again,
          but this keeps the look consistent across breakpoints. */}
    </section>
  );
}
