import { useState, useCallback, useEffect, useRef } from "react";
import type { CircleId } from "../types";
import "./ContradictionRepair.css";

type CRState = "coherent" | "broken";

const CX = 50;
const CY = 50;
const RINGS = {
  world: { r: 44 },
  experience: { r: 30 },
  product: { r: 16 },
} as const;

const AXIS_TOP = CY - RINGS.world.r - 4;
const AXIS_BOTTOM = CY + RINGS.world.r + 4;
const AXIS_MID = CY;

const COHERENT_BELIEF = "Good coffee should feel approachable, not exclusive.";
const CONTRADICTION =
  "The shop says it welcomes everyone, but the menu is full of unexplained jargon.";

const COHERENT_ANNOTATIONS = [
  { label: "Small, clear menu", y: CY - 12 },
  { label: "Questions welcome", y: CY },
  { label: "Open tastings", y: CY + 12 },
];

const REPAIR_DATA: Record<
  CircleId,
  { prompt: string; repair: string }
> = {
  product: {
    prompt:
      "The menu itself contradicts the belief. Jargon replaces clarity.",
    repair:
      "Repair: Rewrite the menu in plain language. Name sizes simply. Offer a \"start here\" pick.",
  },
  experience: {
    prompt:
      "The ordering moment feels like a test, not a welcome.",
    repair:
      "Repair: Train staff to ask \"First time?\" and guide the order. Slow the pace.",
  },
  world: {
    prompt:
      "The culture signals insider knowledge, not openness.",
    repair:
      "Repair: Host beginner tastings. Display descriptions, not just names. Make newcomers visible as welcome, not lost.",
  },
};

export function ContradictionRepair() {
  const [crState, setCRState] = useState<CRState>("coherent");
  const [selectedRing, setSelectedRing] = useState<CircleId | null>(null);
  const [healing, setHealing] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const switchState = useCallback((state: CRState) => {
    setCRState(state);
    setSelectedRing(null);
    setHealing(false);
  }, []);

  const pickRing = useCallback((ring: CircleId) => {
    setSelectedRing(ring);
    setHealing(true);
    // After the heal animation, return to coherent-like display
  }, []);

  // Focus the response when a ring is selected
  useEffect(() => {
    if (selectedRing && responseRef.current) {
      responseRef.current.focus();
    }
  }, [selectedRing]);

  const isBroken = crState === "broken" && !healing;
  const showBreak = crState === "broken" && !selectedRing;

  return (
    <div
      className="contradiction-repair"
      role="group"
      aria-label="Contradiction and repair interaction"
    >
      {/* State toggle */}
      <div className="cr-state-toggle" role="radiogroup" aria-label="Select state">
        <button
          className="cr-state-btn"
          role="radio"
          aria-pressed={crState === "coherent"}
          aria-checked={crState === "coherent"}
          onClick={() => switchState("coherent")}
        >
          Coherent
        </button>
        <button
          className="cr-state-btn"
          role="radio"
          aria-pressed={crState === "broken"}
          aria-checked={crState === "broken"}
          onClick={() => switchState("broken")}
        >
          Broken
        </button>
      </div>

      {/* Belief text */}
      <div className="cr-belief" aria-live="polite">
        <div className="cr-belief-label">
          {crState === "coherent" ? "Belief" : "Contradiction"}
        </div>
        <p
          className={`cr-belief-text ${crState === "broken" ? "cr-belief-text--contradiction" : ""}`}
        >
          {crState === "coherent" ? COHERENT_BELIEF : CONTRADICTION}
        </p>
      </div>

      {/* Diagram */}
      <div className="cr-diagram">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={
            crState === "coherent"
              ? "Three filled rings with a coherent axis"
              : isBroken
                ? "Three rings with a broken axis"
                : "Three rings with the axis repairing"
          }
        >
          {/* Rings */}
          {(["world", "experience", "product"] as const).map((id) => (
            <g key={id}>
              <circle
                cx={CX}
                cy={CY}
                r={RINGS[id].r}
                className={`cr-ring cr-ring--${id} cr-ring--filled`}
              />
              {/* Clickable ring hit areas in broken state */}
              {crState === "broken" && !selectedRing && (
                <circle
                  cx={CX}
                  cy={CY}
                  r={RINGS[id].r}
                  className="cr-ring-btn"
                  onClick={() => pickRing(id)}
                  role="button"
                  tabIndex={-1}
                  aria-label={`Select ${id} ring as the break point`}
                />
              )}
            </g>
          ))}

          {/* Axis — two halves so we can break them */}
          <line
            x1={CX}
            y1={AXIS_TOP}
            x2={CX}
            y2={AXIS_MID}
            className={`cr-axis ${
              isBroken
                ? "cr-axis--top-broken"
                : healing
                  ? "cr-axis--healing-top"
                  : ""
            }`}
          />
          <line
            x1={CX}
            y1={AXIS_MID}
            x2={CX}
            y2={AXIS_BOTTOM}
            className={`cr-axis ${
              isBroken
                ? "cr-axis--bottom-broken"
                : healing
                  ? "cr-axis--healing-bottom"
                  : ""
            }`}
          />

          {/* Break mark */}
          {crState === "broken" && !selectedRing && (
            <g
              className={`cr-break-mark ${showBreak ? "cr-break-mark--visible cr-break-mark--snap" : ""}`}
            >
              <line
                x1={CX - 4}
                y1={CY - 2}
                x2={CX + 4}
                y2={CY + 2}
                stroke="var(--ink)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1={CX - 4}
                y1={CY + 2}
                x2={CX + 4}
                y2={CY - 2}
                stroke="var(--ink)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Coherent annotations */}
          {crState === "coherent" &&
            COHERENT_ANNOTATIONS.map((a) => (
              <text
                key={a.label}
                x={CX + RINGS.world.r + 6}
                y={a.y}
                className="cr-annotation"
              >
                {a.label}
              </text>
            ))}
        </svg>
      </div>

      {/* Ring selection buttons (broken state, no selection yet) */}
      {crState === "broken" && !selectedRing && (
        <div className="cr-ring-select" role="group" aria-label="Where does it break?">
          {(["product", "experience", "world"] as const).map((id) => (
            <button
              key={id}
              className="cr-ring-select-btn"
              aria-pressed={false}
              onClick={() => pickRing(id)}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Response panel */}
      <div
        ref={responseRef}
        className={`cr-response ${selectedRing ? "cr-response--enter" : ""}`}
        role="region"
        aria-live="polite"
        aria-label="Discussion prompt and repair"
        tabIndex={-1}
        key={selectedRing ?? "empty"}
      >
        {selectedRing && REPAIR_DATA[selectedRing] ? (
          <>
            <p className="cr-response-prompt">
              {REPAIR_DATA[selectedRing].prompt}
            </p>
            <p className="cr-response-repair">
              {REPAIR_DATA[selectedRing].repair}
            </p>
          </>
        ) : crState === "coherent" ? (
          <p className="cr-response-prompt" style={{ color: "var(--muted)" }}>
            The axis passes cleanly through all three rings.
          </p>
        ) : (
          <p className="cr-response-prompt" style={{ color: "var(--muted)" }}>
            Pick the ring where the contradiction breaks.
          </p>
        )}
      </div>
    </div>
  );
}
