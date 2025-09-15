// components/AboutSection.tsx
"use client";

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

/* ---------------- Types ---------------- */
type CardItem = { id: string; title: string; description: string };

/* ---------------- Visual Card ---------------- */
function CardShell({
  item,
  className = "",
  center = false,
  border = 4,
}: {
  item: CardItem;
  className?: string;
  center?: boolean;
  border?: 3 | 4 | 5;
}) {
  const borderCls =
    border === 5
      ? "border-[5px]"
      : border === 4
      ? "border-[4px]"
      : "border-[3px]";
  const shadowCls =
    border === 5
      ? "shadow-[9px_9px_0_var(--color-black)]"
      : border === 4
      ? "shadow-[8px_8px_0_var(--color-black)]"
      : "shadow-[6px_6px_0_var(--color-black)]";

  return (
    <div
      className={[
        "w-full",
        // Taller / squarer cards to match your original design
        "min-h-[14.25rem] md:min-h-[16rem] lg:min-h-[17.625rem]", // 17.625*2 + 0.75rem gap ≈ 36rem left block
        "p-4 md:p-5 lg:p-6 select-none bg-[#eeece4]",
        borderCls,
        "border-[var(--color-black)]",
        shadowCls,
        className,
      ].join(" ")}
    >
      <h4
        className={[
          "m-0 text-[1.75rem] md:text-[2rem] leading-[0.9] tracking-[0.04em] text-[var(--color-black)]",
          "mb-2 md:mb-3",
          center ? "text-center" : "",
        ].join(" ")}
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {item.title}
      </h4>
      <p
        className={[
          "m-0 text-[0.95rem] md:text-[1rem] leading-[1.35] text-[var(--color-black)]",
          center ? "text-center" : "",
        ].join(" ")}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {item.description}
      </p>
    </div>
  );
}

/* ---------------- Sortable Wrapper ---------------- */
function SortableCard({
  item,
  disableHover,
  className = "",
}: {
  item: CardItem;
  disableHover: boolean;
  className?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
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
        "group transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isDragging
          ? "cursor-grabbing opacity-40"
          : "cursor-default md:cursor-grab",
        !disableHover && !isDragging
          ? "hover:-translate-x-[2px] hover:-translate-y-[2px]"
          : "",
        className,
      ].join(" ")}
    >
      <CardShell
        item={item}
        border={4}
        center
        className={
          isOver
            ? "shadow-[10px_10px_0_var(--color-black)]"
            : !disableHover
            ? "group-hover:shadow-[8px_8px_0_var(--color-black)]"
            : ""
        }
      />
    </div>
  );
}

/* ---------------- About Section ---------------- */
const AboutSection: React.FC = () => {
  const [items, setItems] = useState<CardItem[]>([
    {
      id: "open-source",
      title: "OPEN SOURCE",
      description:
        "Every project lives on GitHub. Take it, remix it, laugh at it (not too loud), and maybe fix it if you're feeling generous.",
    },
    {
      id: "fun-first",
      title: "FUN FIRST",
      description:
        "I suck at art, so mechanics always lead the way. Graphics stumble behind and play awkward catchup.",
    },
    {
      id: "solo-powered",
      title: "SOLO POWERED",
      description:
        'All bugs get promoted as "features." Every messy decision is canon now, and yes, that really is my official dev process.',
    },
    {
      id: "bugs-welcome",
      title: "BUGS WELCOME",
      description:
        "Big visions start small and scrappy — and honestly, they’ll probably stay that way. But that’s the charm of it (I think).",
    },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  const onDragStart = ({ active }: DragStartEvent) =>
    setActiveId(String(active.id));
  const onDragCancel = (_e: DragCancelEvent) => setActiveId(null);
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    setItems((prev) => arrayMove(prev, oldIndex, newIndex));
    setActiveId(null);
  };

  const dropAnimation: DropAnimation = {
    duration: 360,
    easing: "cubic-bezier(0.22,1,0.36,1)",
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: { opacity: "0.6" },
        dragOverlay: { boxShadow: "12px 12px 0 var(--color-black)" },
      },
    }),
  };

  const activeItem = activeId
    ? items.find((i) => i.id === activeId) ?? null
    : null;
  const disableHover = !!activeId;

  const firstRow = items.slice(0, 2);
  const secondRow = items.slice(2);

  return (
    <section
      className="
        relative flex flex-col items-stretch
        border-t-[5px] border-b-[5px] border-[var(--color-black)]
        bg-[var(--color-yellow)]
        px-0 
      "
    >
      {/* Title — same spacing/style as UPCOMING PROJECTS */}
      <h2
        className="
          mt-3 mb-1 md:mb-2
          text-center leading-[0.82] tracking-[0.04em]
          [text-shadow:3px_3px_0_var(--color-black),4px_4px_0_var(--color-black)]
          text-[2.75rem] md:text-[4.75rem] lg:text-[7.75rem]
        "
        style={{ color: "#FFE68B", fontFamily: "'Bebas Neue', sans-serif" }}
      >
        ABOUT TILTPENGUIN
      </h2>

      {/* Two columns – edge-to-edge, tight gaps */}
      <div
        className="
          grid grid-cols-1 lg:grid-cols-2
          gap-3 lg:gap-4
          pb-6
          px-3 md:px-4
        "
      >
        {/* LEFT — main copy block, taller to balance right side */}
        <div className="lg:h-full">
          <div
            className="
              h-full w-full border-[5px] border-[var(--color-black)] bg-[#eeece4]
              p-5 md:p-6 shadow-[8px_8px_0_var(--color-black)] flex items-center
              lg:min-h-[36rem] md:min-h-[30rem] min-h-[26rem]
            "
          >
            <p
              className="
                m-0 text-center
                text-[1.25rem] md:text-[1.75rem] lg:text-[2.25rem]
                leading-[1.08] tracking-[0.01em] text-[var(--color-black)]
              "
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TILTPENGUIN IS A BOOTSTRAP GAME STUDIO RUN BY EXACTLY ONE PERSON.
              <br />
              <br />
              BUILT ON SLEEPLESS NIGHTS, A LOT OF MISPLACED CONFIDENCE AND AN
              UNHEALTHY RELATIONSHIP WITH GIT RESTORE.
              <br />
              <br />
              EVERYTHING MADE HERE IS FREE AND OPEN BY DESIGN, BECAUSE THINGS
              ARE ALWAYS MORE FUN WHEN YOU HAVE A 20 SOMETHING YEAR OLD YOU CAN
              LAUGH AT.
            </p>
          </div>
        </div>

        {/* RIGHT — principles */}
        <div className="lg:h-full">
          {/* Mobile heading */}
          <h3
            className="
              block lg:hidden mb-2 text-center leading-[0.82] tracking-[0.04em]
              [text-shadow:2px_2px_0_var(--color-black),3px_3px_0_var(--color-black)]
              text-[2.5rem] md:text-[3.5rem]
            "
            style={{ color: "#FFE68B", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            PRINCIPLES
          </h3>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToWindowEdges]}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
          >
            <SortableContext
              items={items.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              {/* Mobile/Tablet */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:hidden">
                {items.map((it) => (
                  <SortableCard
                    key={it.id}
                    item={it}
                    disableHover={disableHover}
                  />
                ))}
              </div>

              {/* Desktop row 1 */}
              <div className="hidden lg:grid grid-cols-2 gap-3">
                {firstRow.map((it) => (
                  <SortableCard
                    key={it.id}
                    item={it}
                    disableHover={disableHover}
                  />
                ))}
              </div>

              {/* Mid heading (desktop) */}
              <h3
                className="
                  hidden lg:block my-2 text-center leading-[0.82] tracking-[0.04em]
                  [text-shadow:2px_2px_0_var(--color-black),3px_3px_0_var(--color-black)]
                  text-[4.25rem]
                "
                style={{
                  color: "#FFE68B",
                  fontFamily: "'Bebas Neue', sans-serif",
                }}
              >
                PRINCIPLES
              </h3>

              {/* Desktop row 2 */}
              <div className="hidden lg:grid grid-cols-2 gap-3">
                {secondRow.map((it) => (
                  <SortableCard
                    key={it.id}
                    item={it}
                    disableHover={disableHover}
                  />
                ))}
              </div>
            </SortableContext>

            <DragOverlay dropAnimation={dropAnimation}>
              {activeItem ? (
                <CardShell item={activeItem} border={4} center />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
