import React from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  content?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  content,
  className = "",
}) => {
  return (
    <div
      className={[
        // base box
        "flex flex-col justify-center",
        "bg-[var(--color-yellow)] border-[2px] sm:border-[3px] border-[var(--color-black)]",
        "w-[260px] sm:w-[280px] lg:w-[320px] min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] p-4 sm:p-6 lg:p-8",
        "shadow-[4px_4px_0_var(--color-black)] sm:shadow-[5px_5px_0_var(--color-black)] lg:shadow-[6px_6px_0_var(--color-black)]",
        "overflow-hidden",
        className,
      ].join(" ")}
    >
      <h3
        className={[
          "text-[1rem] sm:text-[1.125rem] lg:text-[1.375rem] leading-[1.1] sm:leading-[1.2] tracking-[0.05em] m-0 mb-1 sm:mb-2",
          "text-[var(--color-black)]",
        ].join(" ")}
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {title}
      </h3>

      {subtitle && (
        <p
          className={[
            "text-[0.7rem] sm:text-[0.75rem] lg:text-[0.9375rem] font-semibold m-0 mb-1 sm:mb-2 leading-[1.2] sm:leading-[1.4]",
            "text-[var(--color-black)]",
          ].join(" ")}
        >
          {subtitle}
        </p>
      )}

      {content && (
        <p
          className={[
            "text-[0.7rem] sm:text-[0.75rem] lg:text-[0.9375rem] leading-[1.2] sm:leading-[1.4] m-0",
            "text-[var(--color-black)]",
          ].join(" ")}
        >
          {content}
        </p>
      )}
    </div>
  );
};
