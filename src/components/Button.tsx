import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  bgColor?: string; // only this can be customized
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  bgColor,
  href,
}) => {
  // defaults: primary = var(--color-yellow), secondary = #fff (as before)
  const resolvedBg =
    bgColor ?? (variant === "secondary" ? "#ffffff" : "var(--color-yellow)");

  const style = {
    ["--btn-bg" as any]: resolvedBg,
  } as React.CSSProperties;

  const className = `button ${variant === "secondary" ? "secondary" : ""}`;

  return (
    <>
      {href ? (
        <Link href={href} className={className} style={style}>
          {children}
        </Link>
      ) : (
        <button className={className} onClick={onClick} style={style}>
          {children}
        </button>
      )}

      <style jsx>{`
        .button {
          display: inline-block;
          padding: 0.875rem 2rem;
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.1em;
          border: 2px solid var(--color-black);
          background-color: var(--btn-bg, var(--color-yellow));
          color: var(--color-black);
          box-shadow: 4px 4px 0 var(--color-black);
          cursor: pointer;
          transition:
            transform 0.1s,
            box-shadow 0.1s,
            background-color 0.1s;
          text-transform: uppercase;
          text-decoration: none;
          text-align: center;
        }

        .button:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 var(--color-black);
          background-color: var(
            --btn-bg,
            var(--color-yellow)
          ); /* keep same bg on hover */
        }

        .button:active {
          transform: translate(4px, 4px);
          box-shadow: 0 0 0 var(--color-black);
        }

        .button.secondary {
          /* no extra styles needed; default bg is #fff unless bgColor is passed */
        }

        @media (min-width: 640px) {
          .button {
            padding: 1rem 2.5rem;
            font-size: 1.25rem;
            box-shadow: 6px 6px 0 var(--color-black);
            border-width: 3px;
          }

          .button:hover {
            box-shadow: 8px 8px 0 var(--color-black);
          }

          .button:active {
            transform: translate(6px, 6px);
            box-shadow: 0 0 0 var(--color-black);
          }
        }

        @media (max-width: 480px) {
          .button {
            padding: 0.75rem 1.25rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};
