// components/AboutSection.tsx
import React, { useState, useRef } from "react";

const AboutSection: React.FC = () => {
  const [principles, setPrinciples] = useState([
    {
      id: "open-source",
      title: "OPEN SOURCE",
      description:
        "Every project lives on GitHub. Take it, remix it, laugh at it (not too loud), and maybe fix it if you're feeling generous.",
      position: 0,
    },
    {
      id: "fun-first",
      title: "FUN FIRST",
      description:
        "I suck at art, so mechanics always lead the way. Graphics stumble behind and play awkward catchup.",
      position: 1,
    },
    {
      id: "solo-powered",
      title: "SOLO POWERED",
      description:
        'All bugs get promoted as "features." Every messy decision is canon now, and yes, that really is my official dev process.',
      position: 2,
    },
    {
      id: "bugs-welcome",
      title: "BUGS WELCOME",
      description:
        "Big visions start small and scrappy — and honestly, they'll probably stay that way. But that's the charm of it (I think).",
      position: 3,
    },
  ]);

  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [dragOverCard, setDragOverCard] = useState<string | null>(null);
  const [animatingCards, setAnimatingCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const draggedOverRef = useRef<string | null>(null);

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = "move";

    // Make the drag image invisible
    const dragImage = new Image();
    dragImage.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent, cardId: string) => {
    e.preventDefault();
    if (draggedCard && draggedCard !== cardId) {
      setDragOverCard(cardId);
      draggedOverRef.current = cardId;
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || !relatedTarget.closest(".principle-card")) {
      setDragOverCard(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetCardId: string) => {
    e.preventDefault();
    performSwap(targetCardId);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (
      draggedOverRef.current &&
      draggedCard &&
      draggedOverRef.current !== draggedCard
    ) {
      performSwap(draggedOverRef.current);
    } else {
      setDraggedCard(null);
      setDragOverCard(null);
    }
    draggedOverRef.current = null;
  };

  const performSwap = (targetCardId: string) => {
    if (!draggedCard || draggedCard === targetCardId) return;

    const draggedElem = cardRefs.current[draggedCard];
    const targetElem = cardRefs.current[targetCardId];

    if (draggedElem && targetElem) {
      const draggedRect = draggedElem.getBoundingClientRect();
      const targetRect = targetElem.getBoundingClientRect();

      // Calculate the distance between cards
      const draggedToTarget = {
        x: targetRect.left - draggedRect.left,
        y: targetRect.top - draggedRect.top,
      };
      const targetToDragged = {
        x: draggedRect.left - targetRect.left,
        y: draggedRect.top - targetRect.top,
      };

      // Swap the data immediately
      setPrinciples((prev) => {
        const newPrinciples = [...prev];
        const draggedIndex = newPrinciples.findIndex(
          (p) => p.id === draggedCard
        );
        const targetIndex = newPrinciples.findIndex(
          (p) => p.id === targetCardId
        );

        // Swap the cards
        [newPrinciples[draggedIndex], newPrinciples[targetIndex]] = [
          newPrinciples[targetIndex],
          newPrinciples[draggedIndex],
        ];

        return newPrinciples;
      });

      // Set cards as animating
      setAnimatingCards(new Set([draggedCard, targetCardId]));

      // Start cards at their swapped positions (opposite of where they should be)
      // This is because the content has already swapped, but we want to show them moving
      requestAnimationFrame(() => {
        // The dragged card content is now in the target position, so move it from target to dragged
        draggedElem.style.transform = `translate(${targetToDragged.x}px, ${targetToDragged.y}px)`;
        targetElem.style.transform = `translate(${draggedToTarget.x}px, ${draggedToTarget.y}px)`;

        // Force reflow
        void draggedElem.offsetHeight;
        void targetElem.offsetHeight;

        // Add transition
        draggedElem.style.transition =
          "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
        targetElem.style.transition =
          "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
        draggedElem.style.zIndex = "10";
        targetElem.style.zIndex = "9";

        // Animate to final position (no transform)
        requestAnimationFrame(() => {
          draggedElem.style.transform = "";
          targetElem.style.transform = "";
        });
      });

      // Clean up after animation
      setTimeout(() => {
        draggedElem.style.transition = "";
        draggedElem.style.zIndex = "";
        targetElem.style.transition = "";
        targetElem.style.zIndex = "";
        setAnimatingCards(new Set());
      }, 500);
    }

    setDraggedCard(null);
    setDragOverCard(null);
  };

  // Split principles into top and bottom rows
  const topPrinciples = principles.slice(0, 2);
  const bottomPrinciples = principles.slice(2, 4);

  return (
    <section className="about-section">
      <style jsx>{`
        .about-section {
          background-color: var(--color-yellow);
          padding: 0 1.5rem;
          min-height: 51.3125rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          border-top: 5px solid var(--color-black);
          border-bottom: 5px solid var(--color-black);
        }

        .container {
          max-width: 100%;
          width: 100%;
          height: 100%;
          padding: 0.875rem 0 2.25rem 0;
          display: flex;
          flex-direction: column;
        }

        .section-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 9.4375rem;
          text-align: center;
          margin: 0 0 1.875rem 0;
          letter-spacing: 0.05em;
          color: #ffe68b;
          text-shadow: 4px 4px 0 var(--color-black),
            5px 5px 0 var(--color-black), 6px 6px 0 var(--color-black);
          line-height: 0.8;
        }

        .content-wrapper {
          display: flex;
          gap: 1.25rem;
          flex: 1;
          justify-content: center;
        }

        .left-content {
          width: 41.625rem;
          height: 37.375rem;
          background-color: #eeece4;
          border: 3px solid var(--color-black);
          padding: 2rem;
          box-shadow: 8px 8px 0 var(--color-black);
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .studio-description {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2.625rem;
          line-height: 1.1;
          color: var(--color-black);
          letter-spacing: 0.02em;
          text-align: center;
          margin: 0;
        }

        .right-side {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          justify-content: space-between;
        }

        .principles-row {
          display: grid;
          grid-template-columns: 16.3125rem 16.3125rem;
          gap: 1.25rem;
          position: relative;
        }

        .principles-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 5.625rem;
          text-align: center;
          letter-spacing: 0.05em;
          color: #ffe68b;
          text-shadow: 3px 3px 0 var(--color-black),
            4px 4px 0 var(--color-black);
          margin: 0;
          line-height: 0.8;
        }

        .principle-card {
          width: 16.3125rem;
          height: 15.4375rem;
          background-color: #eeece4;
          border: 3px solid var(--color-black);
          padding: 1.25rem;
          box-shadow: 6px 6px 0 var(--color-black);
          display: flex;
          flex-direction: column;
          justify-content: center;
          cursor: grab;
          user-select: none;
          position: relative;
          transition: box-shadow 0.1s ease, background-color 0.2s ease,
            opacity 0.2s ease;
        }

        .principle-card:active {
          cursor: grabbing;
        }

        .principle-card.dragging {
          opacity: 0.4;
          transition: opacity 0.1s ease;
        }

        .principle-card.drag-over {
          background-color: #d8d6ce;
          transform: scale(1.03);
          box-shadow: 10px 10px 0 var(--color-black);
          transition: transform 0.2s ease, box-shadow 0.2s ease,
            background-color 0.2s ease;
        }

        .principle-card.animating {
          pointer-events: none;
        }

        .principle-card:hover:not(.dragging):not(.animating) {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0 var(--color-black);
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }

        .principle-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2.25rem;
          letter-spacing: 0.05em;
          margin: 0 0 0.375rem 0;
          color: var(--color-black);
          line-height: 0.9;
          pointer-events: none;
        }

        .principle-description {
          font-family: "Poppins", sans-serif;
          font-size: 0.875rem;
          line-height: 1.25;
          color: var(--color-black);
          margin: 0;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .principle-card {
            cursor: default;
          }
        }
      `}</style>

      <div className="container">
        <h2 className="section-title">ABOUT TILTPENGUIN</h2>

        <div className="content-wrapper">
          <div className="left-content">
            <p className="studio-description">
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

          <div className="right-side">
            <div className="principles-row">
              {topPrinciples.map((principle) => (
                <div
                  key={principle.id}
                  ref={(el) => (cardRefs.current[principle.id] = el)}
                  className={`principle-card ${
                    draggedCard === principle.id ? "dragging" : ""
                  } ${dragOverCard === principle.id ? "drag-over" : ""} ${
                    animatingCards.has(principle.id) ? "animating" : ""
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, principle.id)}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, principle.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, principle.id)}
                  onDragEnd={handleDragEnd}
                >
                  <h4 className="principle-title">{principle.title}</h4>
                  <p className="principle-description">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="principles-title">PRINCIPLES</h3>

            <div className="principles-row">
              {bottomPrinciples.map((principle) => (
                <div
                  key={principle.id}
                  ref={(el) => (cardRefs.current[principle.id] = el)}
                  className={`principle-card ${
                    draggedCard === principle.id ? "dragging" : ""
                  } ${dragOverCard === principle.id ? "drag-over" : ""} ${
                    animatingCards.has(principle.id) ? "animating" : ""
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, principle.id)}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, principle.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, principle.id)}
                  onDragEnd={handleDragEnd}
                >
                  <h4 className="principle-title">{principle.title}</h4>
                  <p className="principle-description">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
