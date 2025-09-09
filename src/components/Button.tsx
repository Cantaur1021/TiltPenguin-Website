import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick 
}) => {
  return (
    <>
      <button 
        className={`button ${variant === 'secondary' ? 'secondary' : ''}`}
        onClick={onClick}
      >
        {children}
      </button>
      
      <style jsx>{`
        .button {
          padding: 1rem 2.5rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.25rem;
          letter-spacing: 0.1em;
          border: 3px solid var(--color-black);
          background-color: var(--color-yellow);
          color: var(--color-black);
          box-shadow: 6px 6px 0 var(--color-black);
          cursor: pointer;
          transition: transform 0.1s, box-shadow 0.1s;
          text-transform: uppercase;
        }

        .button:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0 var(--color-black);
        }

        .button:active {
          transform: translate(4px, 4px);
          box-shadow: 2px 2px 0 var(--color-black);
        }

        .button.secondary {
          background-color: white;
        }
      `}</style>
    </>
  );
};
