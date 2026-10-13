import { useEffect, useRef, useState } from "react";
import "./CircleExplorer.css";

type Sel = "product" | "experience" | "world";

const RINGS: Record<Sel, {
  i: 0 | 1 | 2;
  r: 1 | 2 | 3;
  question: string;
  meaning: string;
  example: string;
}> = {
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
    meaning:
      "The identity, culture and community people help create.",
    example: "Regulars, tastings, “our place.”",
  },
};

export function CircleExplorer({ start = "experience" }: { start?: Sel }) {
  const [sel, setSel] = useState<Sel>(start);
  const prevSel = useRef<Sel>(start);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    if (prevSel.current !== sel) {
      prevSel.current = sel;
      setFadeKey((k) => k + 1);
    }
  }, [sel]);

  const k = RINGS[sel].i;

  const classFor = (i: 0 | 1 | 2) => {
    if (i > k) return "orr-ring orr-ring--unfilled";
    return i === 2 ? "orr-ring orr-ring--world" : "orr-ring";
  };
  const fillFor = (i: 0 | 1 | 2) => (i === k ? "var(--ink)" : "var(--muted)");

  const ring = RINGS[sel];

  // Only draw-in the newly selected ring. Compare to previous to decide.
  const drawClass = (i: 0 | 1 | 2) => (i === k ? "ce-ring-draw" : "");

  return (
    <>
      <svg
        className="orr-svg ce-diagram"
        viewBox="0 0 480 480"
        width="480"
        height="480"
        aria-hidden="true"
      >
        <circle className="orr-core" cx="240" cy="240" r="18" />
        <circle
          key={`r0-${k === 0 ? fadeKey : "s"}`}
          className={`${classFor(0)} ${k === 0 ? drawClass(0) : ""}`}
          cx="240"
          cy="240"
          r="72"
          pathLength={1}
        />
        <circle
          key={`r1-${k === 1 ? fadeKey : "s"}`}
          className={`${classFor(1)} ${k === 1 ? drawClass(1) : ""}`}
          cx="240"
          cy="240"
          r="144"
          pathLength={1}
        />
        <circle
          key={`r2-${k === 2 ? fadeKey : "s"}`}
          className={`${classFor(2)} ${k === 2 ? drawClass(2) : ""}`}
          cx="240"
          cy="240"
          r="216"
          pathLength={1}
        />
        <text x="240" y="174" style={{ textAnchor: "middle", fontSize: 18, fill: fillFor(0) }}>
          PRODUCT
        </text>
        <text x="240" y="102" style={{ textAnchor: "middle", fontSize: 18, fill: fillFor(1) }}>
          EXPERIENCE
        </text>
        <text x="240" y="30" style={{ textAnchor: "middle", fontSize: 18, fill: fillFor(2) }}>
          WORLD
        </text>
        {/* Clickable hit areas: outer first so inner wins when overlapping */}
        <circle
          cx="240"
          cy="240"
          r="216"
          onClick={() => setSel("world")}
          style={{
            fill: "none",
            stroke: "transparent",
            strokeWidth: 40,
            pointerEvents: "stroke",
            cursor: "pointer",
          }}
        />
        <circle
          cx="240"
          cy="240"
          r="144"
          onClick={() => setSel("experience")}
          style={{
            fill: "none",
            stroke: "transparent",
            strokeWidth: 40,
            pointerEvents: "stroke",
            cursor: "pointer",
          }}
        />
        <circle
          cx="240"
          cy="240"
          r="72"
          onClick={() => setSel("product")}
          style={{
            fill: "transparent",
            stroke: "transparent",
            strokeWidth: 40,
            pointerEvents: "all",
            cursor: "pointer",
          }}
        />
      </svg>

      <div className="ce-buttons" role="group" aria-label="Choose a ring">
        <button
          type="button"
          className="orr-btn"
          aria-pressed={sel === "product"}
          onClick={() => setSel("product")}
        >
          Product
        </button>
        <button
          type="button"
          className="orr-btn"
          aria-pressed={sel === "experience"}
          onClick={() => setSel("experience")}
        >
          Experience
        </button>
        <button
          type="button"
          className="orr-btn"
          aria-pressed={sel === "world"}
          onClick={() => setSel("world")}
        >
          World
        </button>
      </div>

      <div className="ce-text" aria-live="polite" key={`text-${fadeKey}`}>
        <h1 className="ce-headline ce-fade">{ring.question}</h1>
        <p className="ce-meaning ce-fade">{ring.meaning}</p>
      </div>

      <div className="ce-example-block" key={`ex-${fadeKey}`}>
        <p className="orr-label orr-muted ce-example-label ce-fade">
          At the coffee shop · r = {ring.r}
        </p>
        <p className="ce-example ce-fade">{ring.example}</p>
      </div>

      <figure className="ce-figure">
        <figcaption className="ce-figure-caption">
          <span className="orr-label">Fig. 03 · Nautilus</span>
          <span className="orr-label orr-muted">Growth in proportion</span>
        </figcaption>
        <img
          className="orr-cutout"
          src="/cutouts/nautilus.png"
          alt="Engraved nautilus shell, its chambers growing in proportion"
        />
      </figure>
    </>
  );
}
