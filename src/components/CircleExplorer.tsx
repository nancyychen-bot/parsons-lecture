import { useState, useCallback, useRef, useEffect } from "react";
import type { CircleId } from "../types";
import "./CircleExplorer.css";

const RINGS = {
  product: {
    r: 16,
    label: "Product",
    definition: "What can I do?",
    example: "Get a good cup, reliably.",
  },
  experience: {
    r: 30,
    label: "Experience",
    definition: "How does it feel?",
    example: "Ordering feels welcoming, not intimidating.",
  },
  world: {
    r: 44,
    label: "World",
    definition: "What am I part of?",
    example: 'Regulars, tastings, "our place."',
  },
} as const;

const RING_ORDER: CircleId[] = ["product", "experience", "world"];
const CX = 50;
const CY = 50;

export function CircleExplorer() {
  const [active, setActive] = useState<CircleId | null>(null);
  const [pulseKey, setPulseKey] = useState(0);
  const infoRef = useRef<HTMLDivElement>(null);

  const select = useCallback(
    (id: CircleId) => {
      setActive((prev) => (prev === id ? null : id));
      setPulseKey((k) => k + 1);
    },
    []
  );

  // Arrow key navigation among buttons
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      let nextIdx = -1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextIdx = (idx + 1) % RING_ORDER.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        nextIdx = (idx - 1 + RING_ORDER.length) % RING_ORDER.length;
      }
      if (nextIdx >= 0) {
        e.preventDefault();
        const btns = e.currentTarget
          .closest(".circle-explorer-buttons")
          ?.querySelectorAll<HTMLButtonElement>("button");
        btns?.[nextIdx]?.focus();
        select(RING_ORDER[nextIdx]);
      }
    },
    [select]
  );

  // Focus the info panel on change for screen readers
  useEffect(() => {
    if (active && infoRef.current) {
      infoRef.current.focus();
    }
  }, [active]);

  const info = active ? RINGS[active] : null;

  return (
    <div className="circle-explorer" role="group" aria-label="Circle explorer">
      {/* Text buttons */}
      <div className="circle-explorer-buttons" role="toolbar" aria-label="Select a ring">
        {RING_ORDER.map((id, idx) => (
          <button
            key={id}
            className="circle-explorer-btn"
            aria-pressed={active === id}
            onClick={() => select(id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            tabIndex={idx === 0 || active === id ? 0 : -1}
          >
            {RINGS[id].label}
          </button>
        ))}
      </div>

      {/* Interactive SVG */}
      <div className="circle-explorer-diagram">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three concentric circles">
          {/* Render rings outside-in so inner ring is on top */}
          {(["world", "experience", "product"] as const).map((id) => {
            const ring = RINGS[id];
            const isActive = active === id;
            const isDimmed = active !== null && !isActive;
            return (
              <g key={id}>
                {/* Invisible hit area */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={ring.r}
                  className="ce-ring-hit"
                  onClick={() => select(id)}
                  role="button"
                  tabIndex={-1}
                  aria-label={`Select ${ring.label} ring`}
                />
                {/* Visual ring */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={ring.r}
                  className={[
                    "ce-ring",
                    `ce-ring--${id}`,
                    isActive ? "ce-ring--active" : "",
                    isDimmed ? "ce-ring--dimmed" : "",
                    isActive ? "ce-ring--pulse" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={isActive ? `${id}-${pulseKey}` : id}
                  style={{ pointerEvents: "none" }}
                />
                {/* Label */}
                <text
                  x={CX}
                  y={CY - ring.r - 2}
                  className={`ce-ring-text ${isActive ? "ce-ring-text--active" : ""}`}
                >
                  {ring.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Info panel */}
      <div
        ref={infoRef}
        className={`circle-explorer-info ${info ? "circle-explorer-info--enter" : ""}`}
        role="region"
        aria-live="polite"
        aria-label="Ring details"
        tabIndex={-1}
        key={active ?? "empty"}
      >
        {info ? (
          <>
            <h3 className="circle-explorer-info-title">
              {info.label}: {info.definition}
            </h3>
            <p className="circle-explorer-info-def">{info.definition}</p>
            <p className="circle-explorer-info-example">
              Coffee shop: {info.example}
            </p>
          </>
        ) : (
          <p className="circle-explorer-info-def">
            Select a ring to see its definition.
          </p>
        )}
      </div>
    </div>
  );
}
