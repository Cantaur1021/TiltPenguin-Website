// components/CardColumn.tsx
import React from "react";
import { Card } from "./Card";

interface CardData {
  title: string;
  subtitle?: string;
  content?: string;
}

interface CardColumnProps {
  cards: CardData[];
  position: "left" | "right";
}

export const CardColumn: React.FC<CardColumnProps> = ({ cards, position }) => {
  return (
    <>
      {/* Desktop: Vertical marquees on left/right */}
      <div className={`cards-container-vertical cards-${position}`}>
        <div className={`marquee marquee-vertical marquee-${position}`}>
          {/* First set of cards */}
          {cards.map((card, index) => (
            <div key={`${position}-${index}-1`} className="card-wrapper">
              <Card {...card} />
            </div>
          ))}
          {/* Second set for seamless loop */}
          {cards.map((card, index) => (
            <div key={`${position}-${index}-2`} className="card-wrapper">
              <Card {...card} />
            </div>
          ))}
          {/* Third set to ensure no gaps during animation */}
          {cards.map((card, index) => (
            <div key={`${position}-${index}-3`} className="card-wrapper">
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet: Horizontal marquees on top/bottom */}
      <div
        className={`cards-container-horizontal cards-${
          position === "left" ? "top" : "bottom"
        }`}
      >
        <div
          className={`marquee marquee-horizontal marquee-${
            position === "left" ? "top" : "bottom"
          }`}
        >
          {/* Triple the cards for seamless horizontal scrolling */}
          {[...cards, ...cards, ...cards].map((card, index) => (
            <div
              key={`${position}-h-${index}`}
              className="card-wrapper-horizontal"
            >
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Vertical marquees for desktop */
        .cards-container-vertical {
          position: absolute;
          top: 0;
          height: 100vh;
          overflow: hidden;
          display: block;
          z-index: 1;
        }

        .cards-left {
          left: 0;
        }

        .cards-right {
          right: 0;
        }

        .marquee-vertical {
          display: flex;
          flex-direction: column;
        }

        .card-wrapper {
          margin-bottom: 2rem;
        }

        .marquee-left {
          animation: scroll-up 30s linear infinite;
        }

        .marquee-right {
          animation: scroll-down 30s linear infinite;
          transform: translateY(calc(-100% / 3));
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(-100% / 3));
          }
        }

        @keyframes scroll-down {
          0% {
            transform: translateY(calc(-100% / 3));
          }
          100% {
            transform: translateY(0);
          }
        }

        /* Horizontal marquees for tablet */
        .cards-container-horizontal {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          height: auto;
          overflow: hidden;
          display: none;
          z-index: 1;
        }

        .cards-top {
          top: 0;
        }

        .cards-bottom {
          bottom: 0;
        }

        .marquee-horizontal {
          display: flex;
          flex-direction: row;
          width: fit-content;
          padding: 1rem 0;
        }

        .card-wrapper-horizontal {
          display: inline-block;
          margin-right: 2rem;
          flex-shrink: 0;
        }

        /* Horizontal scroll animations */
        .marquee-top {
          animation: scroll-left 40s linear infinite;
        }

        .marquee-bottom {
          animation: scroll-right 40s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }

        /* Responsive behavior - THIS IS THE KEY PART */
        @media (max-width: 1220px) {
          .cards-container-vertical {
            display: none !important;
          }

          .cards-container-horizontal {
            display: block !important;
          }
        }

        @media (max-width: 768px) {
          .cards-container-vertical,
          .cards-container-horizontal {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
