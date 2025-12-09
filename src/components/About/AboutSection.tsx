// components/AboutSection.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  isBeingDragged = false,
}: {
  item: CardItem;
  className?: string;
  center?: boolean;
  border?: 3 | 4 | 5;
  isBeingDragged?: boolean;
}) {
  const borderCls =
    border === 5
      ? "border-[5px]"
      : border === 4
      ? "border-[4px]"
      : "border-[3px]";
  const shadowCls =
    border === 5
      ? "shadow-[7px_7px_0_var(--color-black)]"
      : border === 4
      ? "shadow-[6px_6px_0_var(--color-black)]"
      : "shadow-[4px_4px_0_var(--color-black)]";

  return (
    <motion.div
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
      animate={isBeingDragged ? {
        rotate: [0, -2, 2, -1, 1, 0],
        transition: {
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      } : {}}
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
          "m-0 text-[0.95rem] md:text-[1rem] leading-[1.35] font-bo text-[var(--color-black)]",
          center ? "text-center" : "",
        ].join(" ")}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {item.description}
      </p>
    </motion.div>
  );
}

/* ---------------- Sortable Wrapper ---------------- */
function SortableCard({
  item,
  disableHover,
  className = "",
  index,
}: {
  item: CardItem;
  disableHover: boolean;
  className?: string;
  index: number;
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
    <motion.div
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
      initial={{ opacity: 0, y: 40, rotate: -5 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotate: 0,
        transition: {
          delay: index * 0.1,
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={!isDragging ? {
        rotate: [0, -1, 1, 0],
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        }
      } : {}}
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
    </motion.div>
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
        "Big visions start small and scrappy — and honestly, they'll probably stay that way. But that's the charm of it (I think).",
    },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragCount, setDragCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Show hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveId(String(active.id));
    setShowHint(false);
  };
  
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
    setDragCount(prev => prev + 1);
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
        px-0 z-10
      "
    >
      {/* Title with animation */}
       <motion.h2
                className="mt-3 mb-1 md:mb-2 text-center leading-[0.82] tracking-[0.04em]
                           [text-shadow:3px_3px_0_var(--color-black),4px_4px_0_var(--color-black)]
                           text-[2.75rem] md:text-[4.75rem] lg:text-[7.75rem]"
                style={{ color: "#FFE68B", fontFamily: "'Bebas Neue', sans-serif" }}
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.02,
                  rotate: [-0.5, 0.5, 0],
                  transition: { duration: 0.3 }
                }}
              >
        ABOUT TILTPENGUIN
      </motion.h2>

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
        <motion.div 
          className="lg:h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className="
              h-full w-full border-[5px] border-[var(--color-black)] bg-[#eeece4]
              p-5 md:p-6 shadow-[8px_8px_0_var(--color-black)] flex items-center
              lg:min-h-[36rem] md:min-h-[30rem] min-h-[26rem]
              transition-all duration-300 hover:shadow-[10px_10px_0_var(--color-black)]
            "
          >
            <motion.p
              className="
                m-0 text-center
                text-[1.25rem] md:text-[1.75rem] lg:text-[2.25rem]
                leading-[1.08] tracking-[0.01em] text-[var(--color-black)]
              "
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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
            </motion.p>
          </div>
        </motion.div>

        {/* RIGHT — principles */}
        <motion.div 
          className="lg:h-full relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
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

          {/* Floating hint for drag and drop */}
          <AnimatePresence>
            {showHint && !activeId && dragCount === 0 && (
              <motion.div
                className="absolute -top-2 right-0 z-30 hidden md:block"
                initial={{ opacity: 0, y: -10, rotate: -5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotate: [0, 2, -2, 0],
                  transition: {
                    opacity: { duration: 0.3 },
                    y: { duration: 0.3 },
                    rotate: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="bg-[#FFE68B] border-2 border-black px-3 py-1 shadow-[3px_3px_0_#000]">
                  <p className="text-xs font-bold text-black" style={{ fontFamily: "Poppins, sans-serif" }}>
                    DRAG TO REARRANGE →
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sarcastic comment after dragging */}
          <AnimatePresence>
            {dragCount > 0 && (
              <motion.div
                className="absolute -top-2 right-0 z-30 hidden md:block"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-[#FFE68B] border-2 border-black px-3 py-1 shadow-[3px_3px_0_#000]">
                  <p className="text-xs font-bold text-black" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {dragCount === 1 && "YEP, THEY'RE FLEXIBLE"}
                    {dragCount === 2 && "VERY PRINCIPLED, I KNOW"}
                    {dragCount === 3 && "CONSISTENCY IS OVERRATED"}
                    {dragCount > 3 && "OK YOU CAN STOP NOW"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                {items.map((it, idx) => (
                  <SortableCard
                    key={it.id}
                    item={it}
                    disableHover={disableHover}
                    index={idx}
                  />
                ))}
              </div>

              {/* Desktop row 1 */}
              <div className="hidden lg:grid grid-cols-2 gap-3">
                {firstRow.map((it, idx) => (
                  <SortableCard
                    key={it.id}
                    item={it}
                    disableHover={disableHover}
                    index={idx}
                  />
                ))}
              </div>

              {/* Mid heading (desktop) with wobble */}
              <motion.h3
                className="
                  hidden lg:block my-2 text-center leading-[0.82] tracking-[0.04em]
                  [text-shadow:2px_2px_0_var(--color-black),3px_3px_0_var(--color-black)]
                  text-[4.25rem]
                "
                style={{
                  color: "#FFE68B",
                  fontFamily: "'Bebas Neue', sans-serif",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: dragCount > 0 ? [0, -1, 1, 0] : 0
                }}
                transition={{ 
                  duration: 0.5,
                  rotate: {
                    duration: 0.3,
                    ease: "easeInOut"
                  }
                }}
              >
                PRINCIPLES
                {dragCount > 2 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[2rem] ml-2"
                  >
                    ?
                  </motion.span>
                )}
              </motion.h3>

              {/* Desktop row 2 */}
              <div className="hidden lg:grid grid-cols-2 gap-3">
                {secondRow.map((it, idx) => (
                  <SortableCard
                    key={it.id}
                    item={it}
                    disableHover={disableHover}
                    index={idx + 2}
                  />
                ))}
              </div>
            </SortableContext>

            <DragOverlay dropAnimation={dropAnimation}>
              {activeItem ? (
                <CardShell item={activeItem} border={4} center isBeingDragged />
              ) : null}
            </DragOverlay>
          </DndContext>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;