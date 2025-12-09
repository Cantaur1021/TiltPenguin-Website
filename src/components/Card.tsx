import React from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  content?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, content, className = "" }) => {
  return (
    <div
      className={[
        // base box
        "flex flex-col justify-center",
        "bg-[var(--color-yellow)] border-[3px] border-[var(--color-black)]",
        "w-[320px] min-h-[140px] p-8",
        "shadow-[6px_6px_0_var(--color-black)]",
        // ≤1220px adjustments
        "max-[1220px]:w-[280px] max-[1220px]:h-[120px] max-[1220px]:min-h-0",
        "max-[1220px]:p-4 max-[1220px]:shadow-[4px_4px_0_var(--color-black)] max-[1220px]:border-2",
        "max-[1220px]:overflow-hidden",
        className,
      ].join(" ")}
    >
      <h3
        className={[
          "text-[1.375rem] leading-[1.2] tracking-[0.05em] m-0 mb-2",
          "text-[var(--color-black)]",
          "max-[1220px]:text-[1.125rem] max-[1220px]:mb-1 max-[1220px]:leading-[1.1]",
        ].join(" ")}
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {title}
      </h3>

      {subtitle && (
        <p
          className={[
            "text-[0.9375rem] font-semibold m-0 mb-2 leading-[1.4]",
            "text-[var(--color-black)]",
            "max-[1220px]:text-[0.75rem] max-[1220px]:mb-1 max-[1220px]:leading-[1.2]",
          ].join(" ")}
        >
          {subtitle}
        </p>
      )}

      {content && (
        <p
          className={[
            "text-[0.9375rem] leading-[1.4] m-0",
            "text-[var(--color-black)]",
            "max-[1220px]:text-[0.75rem] max-[1220px]:leading-[1.2]",
          ].join(" ")}
        >
          {content}
        </p>
      )}
    </div>
  );
};
