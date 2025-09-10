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

      <style jsx>{`
        .card {
          background-color: var(--color-yellow);
          border: 3px solid var(--color-black);
          padding: 1.5rem;
          max-width: 280px;
          box-shadow: 6px 6px 0 var(--color-black);
        }

        .card-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.25rem;
          letter-spacing: 0.05em;
          margin: 0 0 0.5rem 0;
          line-height: 1.2;
          color: var(--color-black);
        }

        .card-subtitle {
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: var(--color-black);
        }

        .card-content {
          font-size: 0.875rem;
          line-height: 1.4;
          margin: 0;
          color: var(--color-black);
        }
      `}</style>
    </div>
  );
};
