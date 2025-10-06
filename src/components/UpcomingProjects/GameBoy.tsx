// components/GameBoy.tsx
import React from "react";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  screenImage?: string;
};

export default function GameBoy({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    // ↓ Smaller by default; scales up gradually on wider screens
  <div
  className={[
    "inline-block mx-auto origin-center",   // ⬅️ center the transform origin + allow auto-centering
    "scale-[0.78] sm:scale-[0.82] md:scale-[0.86] lg:scale-[0.9] xl:scale-[0.94] 2xl:scale-[0.98]",
    className,
  ].join(" ")}
>
      <article
        className={[
          "relative w-[364px] h-[587px]",
          "bg-white border-[6px] border-black rounded-none rounded-br-[54px]",
          "shadow-[12px_12px_0_#000] p-5",
        ].join(" ")}
      >
        {/* Screen — black border + strong drop shadow */}
        <div className="relative w-full h-[270px] bg-[#63DB7E] rounded-none rounded-br-[26px] border-[6px] border-black shadow-[10px_10px_0_#000] overflow-hidden">
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 text-center text-black tracking-[0.08em] text-[18px] font-extrabold"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {project.title}
          </div>

            {project.screenImage && (
            <Image
              src={project.screenImage}
              alt=""
              fill
              className="object-contain max-h-[72%] max-w-[86%] m-auto"
              style={{ position: "absolute", inset: 0 }}
              sizes="(max-width: 364px) 100vw, 364px"
              priority
            />
            )}
        </div>

        {/* Controls */}
        <div className="mt-8 grid grid-cols-[1fr_auto] gap-x-6">
          {/* D-pad */}
          <div className="relative w-[128px] h-[128px]">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[36px] h-full bg-[#9B9B9B] border-[6px] border-black rounded-[8px] shadow-[6px_6px_0_#000]" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[36px] w-full bg-[#9B9B9B] border-[6px] border-black rounded-[8px] shadow-[6px_6px_0_#000]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] bg-[#9B9B9B] border-[6px] border-black rounded-[8px] shadow-[6px_6px_0_#000]" />
          </div>

          {/* A/B — bigger & tighter with shadows */}
          <div className="relative w-[150px] h-[125px]">
            <div className="absolute right-2 top-0 w-[56px] h-[56px] rounded-full bg-[#E46E6E] border-[6px] border-black shadow-[6px_6px_0_#000]" />
            <div className="absolute right-[70px] top-[36px] w-[56px] h-[56px] rounded-full bg-[#E46E6E] border-[6px] border-black shadow-[6px_6px_0_#000]" />
          </div>
        </div>

        {/* CTA — same hover/active feel as your Button */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8">
          <button
            type="button"
            className="
              px-6 py-2 rounded-full uppercase
              bg-[#FFC700] text-black border-[3px] border-black
              shadow-[6px_6px_0_#000]
              tracking-[0.1em] text-[12px]
              transition-[transform,box-shadow] duration-100
              hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_#000]
              active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0_#000]
            "
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            View Source
          </button>
        </div>
      </article>
    </div>
  );
}
