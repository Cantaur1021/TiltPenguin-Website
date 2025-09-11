'use client';

import React, { useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragCancelEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

type CardItem = { id: string; title: string; description: string };

// Replace your CardShell with this version
function CardShell({
  item,
  className = "",
  center = true,           // NEW: center text
  border = 4,               // NEW: border thickness in px (default 4)
}: {
  item: CardItem;
  className?: string;
  center?: boolean;
  border?: 3 | 4 | 5;
}) {
  const borderCls = border === 5 ? "border-[5px]" : border === 4 ? "border-[4px]" : "border-[3px]";
  const shadowCls = border === 5 ? "shadow-[9px_9px_0_var(--color-black)]"
                    : border === 4 ? "shadow-[8px_8px_0_var(--color-black)]"
                                   : "shadow-[6px_6px_0_var(--color-black)]";

  return (
    <div
      className={[
        "w-[16.3125rem] h-[15.4375rem] p-5 select-none",
        "bg-[#eeece4]",
        borderCls,
        "border-[var(--color-black)]",
        shadowCls,
        className,
      ].join(" ")}
    >
      <h4
        className={[
          "m-0 text-[2.25rem] leading-[0.9] tracking-[0.05em] text-[var(--color-black)]",
          "mb-3",                 // MORE space between title and body
          center ? "text-center" : "",
        ].join(" ")}
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {item.title}
      </h4>

      <p
        className={[
          "m-0 text-[0.875rem] leading-[1.35] text-[var(--color-black)]",
          center ? "text-center" : "",
        ].join(" ")}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {item.description}
      </p>
    </div>
  );
}


function SortableCard({
  item,
  disableHover,
}: {
  item: CardItem;
  disableHover: boolean;
}) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging, isOver} =
    useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,                 // let dnd-kit own the transform transition
    willChange: "transform",
    backfaceVisibility: "hidden",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={[
        "principle-card group",   // no bg/border/size/shadow here anymore
        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "cursor-default md:cursor-grab active:cursor-grabbing",
        isDragging ? "opacity-40" : "",
        // only translate on hover (no shadow here)
        !disableHover && !isDragging ? "hover:-translate-x-[2px] hover:-translate-y-[2px]" : "",
      ].join(" ")}
    >
      <CardShell
        item={item}
        border={4}
        center={true}
        className={
          // inner card controls shadow changes
          isOver
            ? "shadow-[10px_10px_0_var(--color-black)]"
            : (!disableHover && !isDragging
                ? "group-hover:shadow-[8px_8px_0_var(--color-black)]"
                : "")
        }
      />
    </div>
  );
}

const AboutSection: React.FC = () => {
  const [items, setItems] = useState<CardItem[]>([
    { id: "open-source", title: "OPEN SOURCE", description: "Every project lives on GitHub. Take it, remix it, laugh at it (not too loud), and maybe fix it if you're feeling generous." },
    { id: "fun-first", title: "FUN FIRST", description: "I suck at art, so mechanics always lead the way. Graphics stumble behind and play awkward catchup." },
    { id: "solo-powered", title: "SOLO POWERED", description: 'All bugs get promoted as "features." Every messy decision is canon now, and yes, that really is my official dev process.' },
    { id: "bugs-welcome", title: "BUGS WELCOME", description: "Big visions start small and scrappy — and honestly, they'll probably stay that way. But that's the charm of it (I think)." },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 100, tolerance: 5 } }),
    useSensor(KeyboardSensor)
  );

  // Reduced motion?
  const isReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const firstRow = items.slice(0, 2);
  const secondRow = items.slice(2);

  const onDragStart = ({ active }: DragStartEvent) => setActiveId(String(active.id));
  const onDragCancel = (_e: DragCancelEvent) => setActiveId(null);
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) { setActiveId(null); return; }
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    setItems((prev) => arrayMove(prev, oldIndex, newIndex));
    setActiveId(null);
  };

  // Keep overlay simple—no scale/rotate to avoid “zoom” on handoff.
  const dropAnimation: DropAnimation = {
    duration: 380, // tweak if you want slower/faster
    easing: "cubic-bezier(0.22,1,0.36,1)",
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: { opacity: "0.6" },   // fade a touch while dropping
        dragOverlay: { boxShadow: "12px 12px 0 var(--color-black)" }, // keep the neo-brutalist shadow only
      },
    }),
  };

  const activeItem = activeId ? items.find((i) => i.id === activeId) ?? null : null;
  const disableHover = !!activeId || !!isReducedMotion; // no hover moves while sorting or if reduced motion

  return (
    <section className="relative flex min-h-[51.3125rem] flex-col items-center border-t-[5px] border-b-[5px] border-[var(--color-black)] bg-[var(--color-yellow)] px-6">
      <div className="flex h-full w-full max-w-full flex-col pt-[0.875rem] pb-[2.25rem]">
        <h2
          className="mb-[1.875rem] text-center leading-[0.8] tracking-[0.05em] text-[#ffe68b]
                     [text-shadow:4px_4px_0_var(--color-black),5px_5px_0_var(--color-black),6px_6px_0_var(--color-black)]
                     text-[9.4375rem]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ABOUT TILTPENGUIN
        </h2>

        <div className="flex flex-1 justify-center gap-5">
          {/* Left panel */}
          <div className="flex h-[37.375rem] w-[41.625rem] flex-shrink-0 items-center border-[3px] border-[var(--color-black)] bg-[#eeece4] p-8 shadow-[8px_8px_0_var(--color-black)]">
            <p
              className="m-0 text-center text-[2.625rem] leading-[1.1] tracking-[0.02em] text-[var(--color-black)]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TILTPENGUIN IS A BOOTSTRAP GAME STUDIO RUN BY EXACTLY ONE PERSON.
              <br /><br />
              BUILT ON SLEEPLESS NIGHTS, A LOT OF MISPLACED CONFIDENCE AND AN UNHEALTHY RELATIONSHIP WITH GIT RESTORE.
              <br /><br />
              EVERYTHING MADE HERE IS FREE AND OPEN BY DESIGN, BECAUSE THINGS ARE ALWAYS MORE FUN WHEN YOU HAVE A 20 SOMETHING YEAR OLD YOU CAN LAUGH AT.
            </p>
          </div>

          {/* Right column with Sortable grid */}
          <div className="flex flex-col justify-between gap-1">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToWindowEdges]}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragCancel={onDragCancel}
            >
              <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
                {/* Row 1 */}
                <div className="grid grid-cols-[16.3125rem_16.3125rem] gap-5">
                  {firstRow.map((it) => (
                    <SortableCard key={it.id} item={it} disableHover={disableHover} />
                  ))}
                </div>

                {/* Heading between rows */}
                <h3
                  className="m-0 text-center leading-[0.8] tracking-[0.05em] text-[#ffe68b]
                             [text-shadow:3px_3px_0_var(--color-black),4px_4px_0_var(--color-black)]
                             text-[5.625rem]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  PRINCIPLES
                </h3>

                {/* Row 2 */}
                <div className="grid grid-cols-[16.3125rem_16.3125rem] gap-5">
                  {secondRow.map((it) => (
                    <SortableCard key={it.id} item={it} disableHover={disableHover} />
                  ))}
                </div>
              </SortableContext>

              {/* Overlay with no scale/rotate to prevent zoom flicker */}
              <DragOverlay dropAnimation={dropAnimation}>
                {activeItem ? <CardShell item={activeItem} /> : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
