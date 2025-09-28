// components/AboutMeLocked.tsx
"use client";

import Image from "next/image";

const PAPER = "#F3F1EB";
const BG = "#E46E6E";

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
  style,
}: {
  title?: string;
  center?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={[
        "border-[3px] border-black bg-[var(--paper)] p-4",
        "shadow-[6px_6px_0_rgba(0,0,0,0.85)]",
        className,
      ].join(" ")}
      style={style}
    >
      {title && (
        <h4
          className={[
            "mb-2 text-2xl font-extrabold uppercase leading-none tracking-wide",
            center ? "text-center" : "",
          ].join(" ")}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {title}
        </h4>
      )}
      {children && (
        <p
          className={[center ? "text-center" : "", "m-0 text-base leading-snug"].join(" ")}
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {children}
        </p>
      )}
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
        px-0 
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
 

      {/* DESKTOP: EXACT FIGMA DIMENSIONS */}
      <div className="hidden lg:block pb-8">
        <div
          className="mx-auto"
          style={{
            width: "1229px", // Total width: 607 + 15 + 607
            display: "grid",
            gridTemplateColumns: "607px 15px 607px",
            gridTemplateRows: "355px 19px 251px 19px 251px 19px 520px",
            gap: "0",
          }}
        >
          {/* Row 1 Col 1 — TOP LEFT 607×355 */}
          <div 
            style={{ gridColumn: "1", gridRow: "1", width: "607px", height: "355px" }}
          >
            <Card className="h-full w-full flex items-center justify-center">
              <p
                className="m-0 text-center text-[22px] leading-tight font-black uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Hi, I'm Chinmay. I've built games for brand events and companies,
                but TiltPenguin is where I get loose, get messy, and make the kind
                of odd little experiments I actually want to play.
              </p>
            </Card>
          </div>

          {/* Row 1 Col 3 — TOP RIGHT 607×355 */}
          <div 
            className="relative rounded-md border-[3px] border-black shadow-[6px_6px_0_rgba(0,0,0,0.85)] overflow-hidden"
            style={{ gridColumn: "3", gridRow: "1", width: "607px", height: "355px" }}
          >
            <Label>2007 KERALA // OUTDOOR GAMING SETUP</Label>
            <Image src="/images/about/top-right.jpg" alt="Retro gaming setup" fill className="object-cover" priority />
          </div>

          {/* Row 3 Col 1 — SUPERPOWER + GOAL under left card */}
          <div
            className="flex gap-[15px]"
            style={{ gridColumn: "1", gridRow: "3", width: "607px", height: "251px" }}
          >
            <Card title="SUPERPOWER" center className="h-full" style={{ width: "296px" }}>
              Turning barely baked ideas into barely playable demos.
            </Card>
            <Card title="GOAL" center className="h-full" style={{ width: "296px" }}>
              Games that surprise, delight and maybe confuse you (and me as well).
            </Card>
          </div>

          {/* Row 3 Col 3 — MIDDLE RIGHT 607×355 */}
          <div
            style={{ gridColumn: "3", gridRow: "3", width: "607px", height: "355px" }}
          >
            <Card className="h-full w-full flex items-center justify-center">
              <p
                className="m-0 text-center text-[22px] leading-tight font-black uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                When I'm not wrangling code, I'm usually breaking it on purpose just to see what happens. 
                This site is literally just a museum of prototypes, mistakes and happy accidents (shout out Bob Ross).
              </p>
            </Card>
          </div>

          {/* Row 5 Col 1 — WEAKNESS + SOLO POWERED under left card */}
          <div
            className="flex gap-[15px]"
            style={{ gridColumn: "1", gridRow: "5", width: "607px", height: "251px" }}
          >
            <Card title="WEAKNESS" center className="h-full" style={{ width: "296px" }}>
              Fixing bugs I accidentally start to like (they grow on me). And cookies.
            </Card>
            <Card title="SOLO POWERED" center className="h-full" style={{ width: "296px" }}>
              Games that surprise, delight and maybe confuse you (and me as well).
            </Card>
          </div>

          {/* Row 7 Col 1 — BOTTOM LEFT 607×355 */}
          <div 
            className="relative rounded-md border-[3px] border-black shadow-[6px_6px_0_rgba(0,0,0,0.85)] overflow-hidden"
            style={{ gridColumn: "1", gridRow: "7", width: "607px", height: "355px" }}
          >
            <Label>BARELY GROWN-UP ENGINEERING</Label>
            <Image src="/images/about/bottom-left.jpg" alt="Lab chaos" fill className="object-cover" />
          </div>

          {/* Row 5 Col 3 — BOTTOM RIGHT 607×520 (moved up to row 5) */}
          <div 
            className="relative rounded-md border-[3px] border-black shadow-[6px_6px_0_rgba(0,0,0,0.85)] overflow-hidden mt-27"
            style={{ 
              gridColumn: "3", 
              gridRow: "5 / 8", 
              width: "607px", 
              height: "520px"
            }}
          >
            <Label>KERALA MY SPAWN POINT</Label>
            <Image src="/images/about/bottom-right.jpg" alt="Kerala street" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* TABLET: Medium screen layout */}
      <div className="hidden md:grid lg:hidden gap-4 px-6 py-8">
        <Card className="flex items-center justify-center p-6">
          <p
            className="m-0 text-center text-2xl leading-tight font-black uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Hi, I'm Chinmay. I've built games for brand events and companies, but TiltPenguin is where I get loose, get
            messy, and make the kind of odd little experiments I actually want to play.
          </p>
        </Card>

        <div className="relative aspect-[16/9] rounded-md border-[3px] border-black shadow-[6px_6px_0_rgba(0,0,0,0.85)] overflow-hidden">
          <Label>2007 KERALA // OUTDOOR GAMING SETUP</Label>
          <Image src="/images/about/top-right.jpg" alt="Retro gaming setup" fill className="object-cover" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card title="SUPERPOWER" center>
            Turning barely baked ideas into barely playable demos.
          </Card>
          <Card title="GOAL" center>
            Games that surprise, delight and maybe confuse you (and me as well).
          </Card>
        </div>

        <Card className="p-6">
          <p
            className="m-0 text-center text-2xl leading-tight font-black uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            When I'm not wrangling code, I'm usually breaking it on purpose just to see what happens. This site is
            literally just a museum of prototypes, mistakes and happy accidents (shout out Bob Ross).
          </p>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card title="WEAKNESS" center>
            Fixing bugs I accidentally start to like (they grow on me). And cookies.
          </Card>
          <Card title="SOLO POWERED" center>
            Games that surprise, delight and maybe confuse you (and me as well).
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[16/9] rounded-md border-[3px] border-black shadow-[6px_6px_0_rgba(0,0,0,0.85)] overflow-hidden">
            <Label>BARELY GROWN-UP ENGINEERING</Label>
            <Image src="/images/about/bottom-left.jpg" alt="Lab chaos" fill className="object-cover" />
          </div>
          <div className="relative aspect-[4/5] rounded-md border-[3px] border-black shadow-[6px_6px_0_rgba(0,0,0,0.85)] overflow-hidden">
            <Label>KERALA MY SPAWN POINT</Label>
            <Image src="/images/about/bottom-right.jpg" alt="Kerala street" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* MOBILE: Small screen layout */}
      <div className="grid gap-3 px-4 py-6 md:hidden">
        <Card className="flex items-center justify-center">
          <p
            className="m-0 text-center text-lg leading-tight font-black uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Hi, I'm Chinmay. I've built games for brand events and companies, but TiltPenguin is where I get loose, get
            messy, and make the kind of odd little experiments I actually want to play.
          </p>
        </Card>

        <div className="relative aspect-video rounded-md border-[3px] border-black shadow-[6px_6px_0_rgba(0,0,0,0.85)] overflow-hidden">
          <Label>2007 KERALA // OUTDOOR GAMING SETUP</Label>
          <Image src="/images/about/top-right.jpg" alt="Retro gaming setup" fill className="object-cover" />
        </div>

        <Card title="SUPERPOWER" center>
          Turning barely baked ideas into barely playable demos.
        </Card>

        <Card title="GOAL" center>
          Games that surprise, delight and maybe confuse you (and me as well).
        </Card>

        <Card>
          <p
            className="m-0 text-center text-lg leading-tight font-black uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            When I'm not wrangling code, I'm usually breaking it on purpose just to see what happens. This site is
            literally just a museum of prototypes, mistakes and happy accidents (shout out Bob Ross).
          </p>
        </Card>

        <Card title="WEAKNESS" center>
          Fixing bugs I accidentally start to like (they grow on me). And cookies.
        </Card>

        <Card title="SOLO POWERED" center>
          Games that surprise, delight and maybe confuse you (and me as well).
        </Card>

        <div className="relative aspect-video rounded-md border-[3px] border-black shadow-[6px_6px_0_rgba(0,0,0,0.85)] overflow-hidden">
          <Label>BARELY GROWN-UP ENGINEERING</Label>
          <Image src="/images/about/bottom-left.jpg" alt="Lab chaos" fill className="object-cover" />
        </div>

        <div className="relative aspect-[3/4] rounded-md border-[3px] border-black shadow-[6px_6px_0_rgba(0,0,0,0.85)] overflow-hidden">
          <Label>KERALA MY SPAWN POINT</Label>
          <Image src="/images/about/bottom-right.jpg" alt="Kerala street" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}