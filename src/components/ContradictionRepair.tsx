import { useState, useEffect, useRef } from "react";
import type { CircleId } from "../types";
import "./ContradictionRepair.css";

/**
 * ContradictionRepair — matches 07-contradiction-repair.dc.html exactly.
 *
 * 640×576 SVG with rings r=80/160/240, core r=20.
 * Axis at -58deg with ticks, breaks with gap + angle shift.
 * Right column: "Point of view" label, italic belief, ruled list or contradiction text.
 * Three ring buttons, repair prompts.
 *
 * States: coherent -> broken -> repaired (picks a ring)
 */

const REPAIRS: Record<CircleId, { prompt: string; fix: string }> = {
  product: {
    prompt: "Is the menu itself the problem?",
    fix: "Cut the menu to six drinks, each described in plain words.",
  },
  experience: {
    prompt: "Who explains the menu, and when?",
    fix: 'Train staff to answer "what would you recommend?" before it is asked.',
  },
  world: {
    prompt: "What tells a beginner they belong here?",
    fix: "Host an open tasting where the first question is always welcome.",
  },
};

type Phase = "coherent" | "broken" | "repaired";

export function ContradictionRepair() {
  const [phase, setPhase] = useState<Phase>("coherent");
  const [pick, setPick] = useState<CircleId | null>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  const coherent = phase === "coherent";
  const broken = phase === "broken";
  const repaired = phase === "repaired";
  const clean = !broken; // axis is straight in coherent and repaired states

  function choose(id: CircleId) {
    if (coherent) return;
    if (repaired && pick === id) {
      // re-break
      setPhase("broken");
      setPick(null);
      return;
    }
    setPhase("repaired");
    setPick(id);
  }

  function breakIt() {
    setPhase("broken");
    setPick(null);
  }

  // Focus response when repair is shown
  useEffect(() => {
    if (repaired && responseRef.current) {
      responseRef.current.focus();
    }
  }, [repaired, pick]);

  /* Ring label fills: ink for selected, muted for others when repaired */
  function labelFill(id: CircleId): string {
    if (!repaired || pick === id) return "var(--ink)";
    return "var(--muted)";
  }

  const repair = REPAIRS[pick || "product"];

  return (
    <div className="cr" role="group" aria-label="Contradiction and repair interaction">
      {/* Left: 640×576 SVG */}
      <svg
        className="orr-svg cr-svg"
        viewBox="0 0 640 576"
        width="640"
        height="576"
        aria-hidden="true"
      >
        <circle className="orr-core" cx={320} cy={288} r={20} />
        <circle className="orr-ring" cx={320} cy={288} r={80} />
        <circle className="orr-ring" cx={320} cy={288} r={160} />
        <circle className="orr-ring orr-ring--world" cx={320} cy={288} r={240} />

        {/* Clean axis at -58deg */}
        {clean && (
          <g transform="rotate(-58 320 288)">
            <line className="orr-axis" x1={51} y1={288} x2={589} y2={288} />
            <line className="orr-axis" x1={51} y1={279} x2={51} y2={297} />
            <line className="orr-axis" x1={589} y1={279} x2={589} y2={297} />
          </g>
        )}

        {/* Broken axis: center stub at -58deg, outer segments at -52deg */}
        {broken && (
          <>
            <g transform="rotate(-58 320 288)">
              <line className="orr-axis" x1={260} y1={288} x2={380} y2={288} />
            </g>
            <g transform="rotate(-52 320 288)">
              <line className="orr-axis" x1={406} y1={288} x2={589} y2={288} />
              <line className="orr-axis" x1={589} y1={279} x2={589} y2={297} />
              <line className="orr-axis" x1={51} y1={288} x2={234} y2={288} />
              <line className="orr-axis" x1={51} y1={279} x2={51} y2={297} />
            </g>
          </>
        )}

        {/* Ring labels at left (180deg) of center */}
        <text x={240} y={294} style={{ textAnchor: "middle", fontSize: 18, fill: labelFill("product") }}>
          PRODUCT
        </text>
        <text x={160} y={294} style={{ textAnchor: "middle", fontSize: 18, fill: labelFill("experience") }}>
          EXPERIENCE
        </text>
        <text x={80} y={294} style={{ textAnchor: "middle", fontSize: 18, fill: labelFill("world") }}>
          WORLD
        </text>

        {/* Invisible hit areas for clicking rings */}
        <circle
          cx={320} cy={288} r={240}
          onClick={() => choose("world")}
          style={{ fill: "none", stroke: "transparent", strokeWidth: 40, pointerEvents: "stroke", cursor: "pointer" }}
        />
        <circle
          cx={320} cy={288} r={160}
          onClick={() => choose("experience")}
          style={{ fill: "none", stroke: "transparent", strokeWidth: 40, pointerEvents: "stroke", cursor: "pointer" }}
        />
        <circle
          cx={320} cy={288} r={80}
          onClick={() => choose("product")}
          style={{ fill: "transparent", stroke: "transparent", strokeWidth: 40, pointerEvents: "all", cursor: "pointer" }}
        />
      </svg>

      {/* Right column */}
      <section className="cr-right">
        {/* Point of view + belief */}
        <div className="cr-pov">
          <p className="orr-label orr-muted" style={{ margin: 0 }}>Point of view</p>
          <h1 className="cr-belief">
            Good coffee should feel approachable, not exclusive.
          </h1>
        </div>
        <hr className="orr-rule" />

        {/* Coherent state: ruled list */}
        {coherent && (
          <>
            <dl className="cr-list">
              <dt className="orr-label">Product</dt>
              <dd>Small, clear menu</dd>
              <dt className="orr-label">Experience</dt>
              <dd>Basic questions welcome</dd>
              <dt className="orr-label">World</dt>
              <dd>Open tastings for beginners</dd>
            </dl>
            <div style={{ paddingTop: 8 }}>
              <button type="button" className="orr-btn orr-btn--primary" onClick={breakIt}>
                Show a contradiction
              </button>
            </div>
          </>
        )}

        {/* Broken state: contradiction text + ring buttons */}
        {broken && (
          <>
            <div className="cr-contradiction">
              <p className="orr-label orr-muted" style={{ margin: 0 }}>Contradiction</p>
              <p className="cr-contradiction-text">
                The shop says it welcomes everyone, but the menu is full of unexplained jargon.
              </p>
            </div>
            <p className="cr-where-break">Where does it break?</p>
          </>
        )}

        {/* Ring buttons (broken or repaired) */}
        {!coherent && (
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <div role="group" aria-label="Choose the ring where it breaks" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <button type="button" className="orr-btn" aria-pressed={pick === "product"} onClick={() => choose("product")}>
                Product
              </button>
              <button type="button" className="orr-btn" aria-pressed={pick === "experience"} onClick={() => choose("experience")}>
                Experience
              </button>
              <button type="button" className="orr-btn" aria-pressed={pick === "world"} onClick={() => choose("world")}>
                World
              </button>
            </div>
            {repaired && (
              <button type="button" className="orr-btn orr-btn--text" onClick={breakIt}>
                Break it again
              </button>
            )}
          </div>
        )}

        {/* Repair response */}
        <div ref={responseRef} aria-live="polite" className="cr-response" tabIndex={-1}>
          {repaired && pick && (
            <>
              <div className="cr-response-block">
                <p className="orr-label orr-muted" style={{ margin: 0 }}>Discuss</p>
                <p className="cr-response-prompt">{repair.prompt}</p>
              </div>
              <div className="cr-response-block">
                <p className="orr-label orr-muted" style={{ margin: 0 }}>One repair</p>
                <p className="cr-response-fix">{repair.fix}</p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
