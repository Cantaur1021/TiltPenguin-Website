import React from "react";
import { Card } from "./Card";

interface CardData { title: string; subtitle?: string; content?: string; }
interface CardColumnProps { cards: CardData[]; position: "left" | "right"; }

export const CardColumn: React.FC<CardColumnProps> = ({ cards, position }) => {
  const isLeft = position === "left";

  // Arbitrary animation utilities (TW v4, no config)
  const vertAnim  = isLeft
    ? "animate-[scroll-up_30s_linear_infinite]"
    : "animate-[scroll-down_30s_linear_infinite]";
  const horizAnim = isLeft
    ? "animate-[scroll-left_40s_linear_infinite]"
    : "animate-[scroll-right_40s_linear_infinite]";

  return (
    <>
      {/* Desktop/Large: vertical marquees on the extreme edges */}
      <div
        className={[
          "absolute top-0 z-[1] h-screen overflow-hidden",
          isLeft ? "left-0" : "right-0",
          "max-[1220px]:hidden",
        ].join(" ")}
      >
        <div
          className={[
            "flex flex-col",
            vertAnim,
            !isLeft ? "translate-y-[-33.333%]" : "",
          ].join(" ")}
        >
          {[...cards, ...cards, ...cards].map((card, i) => (
            <div key={`${position}-v-${i}`} className="mb-8">
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet-only: horizontal marquees on top/bottom */}
      <div
        className={[
          "absolute left-0 right-0 w-full overflow-hidden z-[1]",
          isLeft ? "top-0" : "bottom-0",
          "hidden max-[1220px]:block max-[768px]:hidden",
        ].join(" ")}
      >
        <div className={["flex flex-row w-fit py-4", horizAnim].join(" ")}>
          {[...cards, ...cards, ...cards].map((card, i) => (
            <div key={`${position}-h-${i}`} className="inline-block mr-8 shrink-0">
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
