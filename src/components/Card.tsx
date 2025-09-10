// components/Card.tsx
import React from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  content?: string;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, content }) => {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      {content && <p className="card-content">{content}</p>}

      <style jsx global>{`
        .card {
          background-color: var(--color-yellow);
          border: 3px solid var(--color-black);
          padding: 2rem;
          width: 320px;
          min-height: 140px;
          box-shadow: 6px 6px 0 var(--color-black);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (max-width: 1220px) {
          .card {
            width: 280px;
            height: 120px; /* Fixed height instead of min-height */
            min-height: unset;
            padding: 1rem;
            box-shadow: 4px 4px 0 var(--color-black);
            border-width: 2px;
            overflow: hidden; /* Hide overflow text */
          }
        }

        .card-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.375rem;
          letter-spacing: 0.05em;
          margin: 0 0 0.5rem 0;
          line-height: 1.2;
          color: var(--color-black);
        }

        .card-subtitle {
          font-size: 0.9375rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: var(--color-black);
        }

        .card-content {
          font-size: 0.9375rem;
          line-height: 1.4;
          margin: 0;
          color: var(--color-black);
        }

        @media (max-width: 1220px) {
          .card-title {
            font-size: 1.125rem;
            margin-bottom: 0.25rem;
            line-height: 1.1;
          }

          .card-subtitle {
            font-size: 0.75rem;
            margin-bottom: 0.25rem;
            line-height: 1.2;
          }

          .card-content {
            font-size: 0.75rem;
            line-height: 1.2;
          }
        }
      `}</style>
    </div>
  );
};
