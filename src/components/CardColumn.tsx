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
    <div className={`cards-container cards-${position}`}>
      <div className={`marquee marquee-${position}`}>
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

      <style jsx>{`
        .cards-container {
          position: absolute;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }

        .cards-left {
          left: 0;
        }

        .cards-right {
          right: 0;
        }

        .marquee {
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
          /* Start offset for downward scroll */
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

        @media (max-width: 768px) {
          .cards-container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
