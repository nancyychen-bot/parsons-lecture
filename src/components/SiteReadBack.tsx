import { useState, useCallback, useEffect, useRef } from "react";
import "./SiteReadBack.css";

const CX = 50;
const CY = 50;

const RINGS = {
  product: { r: 16 },
  experience: { r: 30 },
  world: { r: 44 },
} as const;

const STATEMENTS = [
  {
    ring: "product" as const,
    label: "Product",
    text: "A lecture and a usable canvas",
  },
  {
    ring: "experience" as const,
    label: "Experience",
    text: "The journey you just took",
  },
  {
    ring: "world" as const,
    label: "World",
    text: "What you do with it next",
  },
] as const;

const VIBE_NOTE =
  "This site was vibe-coded by someone without \"engineer\" in her title. The judgment was hers; the typing was shared.";

/** Step timing in ms — each statement appears then its ring lights */
const STEP_DELAY = 600;

export function SiteReadBack() {
  const [step, setStep] = useState(-1); // -1 = not started, 0/1/2 = statement index, 3 = all + axis
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const play = useCallback(() => {
    setStep(-1);
    // Start the sequence after a brief pause
    let current = 0;
    const advance = () => {
      setStep(current);
      current++;
      if (current <= 3) {
        timerRef.current = setTimeout(advance, STEP_DELAY);
      }
    };
    timerRef.current = setTimeout(advance, 200);
  }, []);

  // Auto-play on mount
  useEffect(() => {
    play();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLit = (ring: "product" | "experience" | "world") => {
    const idx = STATEMENTS.findIndex((s) => s.ring === ring);
    return step >= idx;
  };

  const showAxis = step >= 3;
  const allDone = step >= 3;

  return (
    <div className="site-readback" role="region" aria-label="Site read through its own three circles">
      {/* Diagram */}
      <div className="srb-diagram">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three concentric circles lighting up">
          {/* World */}
          <circle
            cx={CX}
            cy={CY}
            r={RINGS.world.r}
            className={`srb-ring srb-ring--world ${isLit("world") ? "srb-ring--lit" : ""}`}
          />
          {/* Experience */}
          <circle
            cx={CX}
            cy={CY}
            r={RINGS.experience.r}
            className={`srb-ring srb-ring--experience ${isLit("experience") ? "srb-ring--lit" : ""}`}
          />
          {/* Product */}
          <circle
            cx={CX}
            cy={CY}
            r={RINGS.product.r}
            className={`srb-ring srb-ring--product ${isLit("product") ? "srb-ring--lit" : ""}`}
          />
          {/* Axis */}
          <line
            x1={CX}
            y1={CY - RINGS.world.r - 4}
            x2={CX}
            y2={CY + RINGS.world.r + 4}
            className={`srb-axis ${showAxis ? "srb-axis--visible" : ""}`}
          />
        </svg>
      </div>

      {/* Statements */}
      <div className="srb-statements" aria-live="polite">
        {STATEMENTS.map((s, i) => (
          <div
            key={s.ring}
            className={`srb-statement ${step >= i ? "srb-statement--visible" : ""}`}
          >
            <span className="srb-statement-ring">{s.label}</span>
            <span className="srb-statement-text">{s.text}</span>
          </div>
        ))}
      </div>

      {/* Vibe-coding note */}
      <p className={`srb-note ${allDone ? "srb-note--visible" : ""}`}>
        {VIBE_NOTE}
      </p>

      {/* Replay button */}
      <button
        className="srb-play-btn"
        onClick={play}
        aria-label="Replay the reveal"
      >
        {allDone ? "Replay" : "Playing..."}
      </button>
    </div>
  );
}
