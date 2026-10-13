import { useState, useCallback } from "react";
import type { CircleId } from "../types";
import "./CircleExplorer.css";

/**
 * CircleExplorer — matches 03-circle-explorer.dc.html exactly.
 *
 * Layout: 480×480 SVG left, right column with buttons + question + meaning + coffee block.
 * The right-column content and nautilus cutout are rendered by LiveStage.
 * This component renders the SVG diagram, the three ring buttons, and the text panel.
 */

const RINGS_DATA = {
  product: {
    i: 0,
    r: 1,
    question: "What can I do?",
    meaning: "The useful core.",
    example: "Get a good cup, reliably.",
  },
  experience: {
    i: 1,
    r: 2,
    question: "How does it feel?",
    meaning: "Everything around using it.",
    example: "Ordering feels welcoming, not intimidating.",
  },
  world: {
    i: 2,
    r: 3,
    question: "What am I part of?",
    meaning: "The identity, culture and community people help create.",
    example: 'Regulars, tastings, "our place."',
  },
} as const;

const RING_ORDER: CircleId[] = ["product", "experience", "world"];

export function CircleExplorer() {
  const [sel, setSel] = useState<CircleId>("experience");

  const pick = useCallback((id: CircleId) => {
    setSel(id);
  }, []);

  const ring = RINGS_DATA[sel];
  const k = ring.i; // index 0, 1, 2

  /* Ring class: filled up to k, unfilled beyond */
  function ringCls(i: number): string {
    if (i > k) return "orr-ring orr-ring--unfilled";
    return i === 2 ? "orr-ring orr-ring--world" : "orr-ring";
  }

  /* Label fill: ink for selected ring's level, muted for others */
  function labelFill(i: number): string {
    return i === k ? "var(--ink)" : "var(--muted)";
  }

  return (
    <div className="ce" role="group" aria-label="Circle explorer">
      {/* Left: 480×480 SVG diagram */}
      <svg
        className="orr-svg ce-svg"
        viewBox="0 0 480 480"
        width="480"
        height="480"
        aria-hidden="true"
      >
        <circle className="orr-core" cx={240} cy={240} r={18} />
        <circle className={ringCls(0)} cx={240} cy={240} r={72} />
        <circle className={ringCls(1)} cx={240} cy={240} r={144} />
        <circle className={ringCls(2)} cx={240} cy={240} r={216} />

        {/* Ring labels at top of each ring */}
        <text x={240} y={240 - 72 + 6} style={{ textAnchor: "middle", fontSize: "18px", fill: labelFill(0) }}>
          PRODUCT
        </text>
        <text x={240} y={240 - 144 + 6} style={{ textAnchor: "middle", fontSize: "18px", fill: labelFill(1) }}>
          EXPERIENCE
        </text>
        <text x={240} y={240 - 216 + 6} style={{ textAnchor: "middle", fontSize: "18px", fill: labelFill(2) }}>
          WORLD
        </text>

        {/* Invisible hit areas for clicking rings */}
        <circle
          cx={240} cy={240} r={216}
          onClick={() => pick("world")}
          style={{ fill: "none", stroke: "transparent", strokeWidth: 40, pointerEvents: "stroke", cursor: "pointer" }}
        />
        <circle
          cx={240} cy={240} r={144}
          onClick={() => pick("experience")}
          style={{ fill: "none", stroke: "transparent", strokeWidth: 40, pointerEvents: "stroke", cursor: "pointer" }}
        />
        <circle
          cx={240} cy={240} r={72}
          onClick={() => pick("product")}
          style={{ fill: "transparent", stroke: "transparent", strokeWidth: 40, pointerEvents: "all", cursor: "pointer" }}
        />
      </svg>

      {/* Right column */}
      <div className="ce-right">
        {/* Ring buttons */}
        <div className="ce-buttons" role="group" aria-label="Choose a ring">
          {RING_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              className="orr-btn"
              aria-pressed={sel === id}
              onClick={() => pick(id)}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>

        {/* Question + meaning */}
        <div className="ce-text" aria-live="polite">
          <h1 className="ce-question">{ring.question}</h1>
          <p className="ce-meaning">{ring.meaning}</p>
        </div>

        {/* Coffee-shop example block */}
        <div className="ce-example">
          <p className="orr-label orr-muted" style={{ margin: 0 }}>
            At the coffee shop &middot; r = {ring.r}
          </p>
          <p className="ce-example-text">{ring.example}</p>
        </div>
      </div>
    </div>
  );
}
