import React from 'react';
import { Card } from './Card';

interface CardData {
  title: string;
  subtitle?: string;
  content?: string;
}

interface CardColumnProps {
  cards: CardData[];
  position: 'left' | 'right';
}

export const CardColumn: React.FC<CardColumnProps> = ({ cards, position }) => {
  return (
    <div className={`cards-${position}`}>
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
      
      <style jsx>{`
        .cards-left, .cards-right {
          position: absolute;
          top: 0;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 2rem 0;
          height: 100vh;
          overflow: hidden;
        }

        .cards-left {
          left: 0;
        }

        .cards-right {
          right: 0;
        }

        @media (max-width: 768px) {
          .cards-left, .cards-right {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
