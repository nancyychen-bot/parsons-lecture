import { useEffect, useRef, useState } from "react";
import "./ContradictionRepair.css";

type Phase = "coherent" | "broken" | "repaired";
type Ring = "product" | "experience" | "world";

const REPAIRS: Record<Ring, { prompt: string; fix: string }> = {
  product: {
    prompt: "Is the menu itself the problem?",
    fix: "Cut the menu to six drinks, each described in plain words.",
  },
  experience: {
    prompt: "Who explains the menu, and when?",
    fix: "Train staff to answer “what would you recommend?” before it is asked.",
  },
  world: {
    prompt: "What tells a beginner they belong here?",
    fix: "Host an open tasting where the first question is always welcome.",
  },
};

export function ContradictionRepair({
  start = "broken",
}: {
  start?: "coherent" | "broken";
}) {
  const [phase, setPhase] = useState<Phase>(start);
  const [pick, setPick] = useState<Ring | null>(null);
  // Delay the repair-text fade until after the axis animation completes.
  const [showRepair, setShowRepair] = useState(false);
  const repairTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (repairTimer.current !== null) {
        window.clearTimeout(repairTimer.current);
      }
    };
  }, []);

  const choose = (id: Ring) => {
    if (phase === "coherent") return;
    if (phase === "repaired" && pick === id) {
      // Clicking the same picked ring re-breaks the axis
      setPhase("broken");
      setPick(null);
      setShowRepair(false);
      return;
    }
    setPhase("repaired");
    setPick(id);
    setShowRepair(false);
    if (repairTimer.current !== null) window.clearTimeout(repairTimer.current);
    // Axis repair takes 400ms, then fade in the repair text
    repairTimer.current = window.setTimeout(() => {
      setShowRepair(true);
    }, 400);
  };

  const breakIt = () => {
    setPhase("broken");
    setPick(null);
    setShowRepair(false);
  };

  const coherent = phase === "coherent";
  const repaired = phase === "repaired";
  const broken = phase === "broken";
  const axisBroken = broken; // only broken shows the gapped axis
  const choosing = !coherent;

  const fillFor = (id: Ring) =>
    !repaired || pick === id ? "var(--ink)" : "var(--muted)";

  const repair = pick ? REPAIRS[pick] : REPAIRS.product;

  // The top-right progress mark is rendered by LiveStage via <CircleMark>.
  // CircleMark accepts a `broken` prop; the foundation agent wires it to this
  // component's phase. We only render the large diagram and side column here.

  return (
    <>
      <svg
        className="orr-svg cr-diagram"
        viewBox="0 0 640 576"
        width="640"
        height="576"
        aria-hidden="true"
      >
        <circle className="orr-core" cx="320" cy="288" r="20" />
        <circle className="orr-ring" cx="320" cy="288" r="80" />
        <circle className="orr-ring" cx="320" cy="288" r="160" />
        <circle className="orr-ring orr-ring--world" cx="320" cy="288" r="240" />
        {!axisBroken && (
          <g transform="rotate(-58 320 288)">
            <line className="orr-axis" x1="51" y1="288" x2="589" y2="288" />
            <line className="orr-axis" x1="51" y1="279" x2="51" y2="297" />
            <line className="orr-axis" x1="589" y1="279" x2="589" y2="297" />
          </g>
        )}
        {axisBroken && (
          <>
            <g transform="rotate(-58 320 288)">
              <line className="orr-axis" x1="260" y1="288" x2="380" y2="288" />
            </g>
            <g transform="rotate(-52 320 288)">
              <line className="orr-axis" x1="406" y1="288" x2="589" y2="288" />
              <line className="orr-axis" x1="589" y1="279" x2="589" y2="297" />
              <line className="orr-axis" x1="51" y1="288" x2="234" y2="288" />
              <line className="orr-axis" x1="51" y1="279" x2="51" y2="297" />
            </g>
          </>
        )}
        <text x="240" y="294" style={{ textAnchor: "middle", fontSize: 18, fill: fillFor("product") }}>
          PRODUCT
        </text>
        <text x="160" y="294" style={{ textAnchor: "middle", fontSize: 18, fill: fillFor("experience") }}>
          EXPERIENCE
        </text>
        <text x="80" y="294" style={{ textAnchor: "middle", fontSize: 18, fill: fillFor("world") }}>
          WORLD
        </text>
        {/* Hit areas */}
        <circle
          cx="320"
          cy="288"
          r="240"
          onClick={() => choose("world")}
          style={{
            fill: "none",
            stroke: "transparent",
            strokeWidth: 40,
            pointerEvents: coherent ? "none" : "stroke",
            cursor: coherent ? "default" : "pointer",
          }}
        />
        <circle
          cx="320"
          cy="288"
          r="160"
          onClick={() => choose("experience")}
          style={{
            fill: "none",
            stroke: "transparent",
            strokeWidth: 40,
            pointerEvents: coherent ? "none" : "stroke",
            cursor: coherent ? "default" : "pointer",
          }}
        />
        <circle
          cx="320"
          cy="288"
          r="80"
          onClick={() => choose("product")}
          style={{
            fill: "transparent",
            stroke: "transparent",
            strokeWidth: 40,
            pointerEvents: coherent ? "none" : "all",
            cursor: coherent ? "default" : "pointer",
          }}
        />
      </svg>

      <section className="cr-side">
        <div className="cr-side-head">
          <p className="orr-label orr-muted" style={{ margin: 0 }}>
            Point of view
          </p>
          <h1 className="cr-belief">
            Good coffee should feel approachable, not exclusive.
          </h1>
        </div>
        <hr className="orr-rule" />

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
              <button
                type="button"
                className="orr-btn orr-btn--primary"
                onClick={() => {
                  setPhase("broken");
                  setPick(null);
                  setShowRepair(false);
                }}
              >
                Show a contradiction
              </button>
            </div>
          </>
        )}

        {(broken || repaired) && (
          <>
            <div className="cr-contradiction">
              <p className="orr-label orr-muted" style={{ margin: 0 }}>
                Contradiction
              </p>
              <p className="cr-con-body">
                The shop says it welcomes everyone, but the menu is full of
                unexplained jargon.
              </p>
            </div>
            <p className="cr-prompt-ask">Where does it break?</p>
          </>
        )}

        {choosing && (
          <div className="cr-picker">
            <div role="group" aria-label="Choose the ring where it breaks">
              <button
                type="button"
                className="orr-btn"
                aria-pressed={pick === "product"}
                onClick={() => choose("product")}
              >
                Product
              </button>
              <button
                type="button"
                className="orr-btn"
                aria-pressed={pick === "experience"}
                onClick={() => choose("experience")}
              >
                Experience
              </button>
              <button
                type="button"
                className="orr-btn"
                aria-pressed={pick === "world"}
                onClick={() => choose("world")}
              >
                World
              </button>
            </div>
            {repaired && (
              <button
                type="button"
                className="orr-btn orr-btn--text"
                onClick={breakIt}
              >
                Break it again
              </button>
            )}
          </div>
        )}

        <div aria-live="polite" className="cr-repair">
          {repaired && showRepair && (
            <>
              <div className="cr-repair-group cr-fade">
                <p className="orr-label orr-muted" style={{ margin: 0 }}>
                  Discuss
                </p>
                <p className="cr-repair-prompt">{repair.prompt}</p>
              </div>
              <div className="cr-repair-group cr-fade">
                <p className="orr-label orr-muted" style={{ margin: 0 }}>
                  One repair
                </p>
                <p className="cr-repair-body">{repair.fix}</p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
