import * as React from "react";

export default function QuoteCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="w-[260px]">
      <div className="bg-[var(--color-yellow)] border-[3px] border-[var(--color-black)] p-6 shadow-[6px_6px_0_var(--color-black)]">
        <h3
          className="m-0 mb-2 text-[1.25rem] leading-[1.1] tracking-[0.05em] text-[var(--color-black)]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {title}
        </h3>
        <p className="m-0 text-[0.95rem] leading-[1.4] text-[var(--color-black)]">{body}</p>
      </div>
    </div>
  );
}
