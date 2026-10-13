import { useState, useCallback } from "react";
import "./TouchpointSelect.css";

/**
 * TouchpointSelect — matches 02-touchpoints.dc.html exactly.
 *
 * Coffee cup at center drawn in ring grammar (rim r=26, coffee core r=17, handle r=9).
 * Nine touchpoints on a single faint orbit (r=210) or mapped to three rings.
 * Each is a 14px dot + mono label knocked out against ground.
 *
 * The component renders ONLY the left diagram area (740×576) and the bottom-left
 * reveal button + status. The right column (cutout + headline) and four corners
 * are handled by LiveStage.
 */

type TouchpointDef = {
  id: string;
  label: string;
  orbit: [number, number, "r" | "l"]; // [radius, angle°, labelSide]
  map: [number, number, "r" | "l"];
};

const TOUCHPOINTS: TouchpointDef[] = [
  { id: "coffee",      label: "Coffee",          orbit: [210, -90,  "r"], map: [70,  0,    "r"] },
  { id: "app",         label: "Mobile order app", orbit: [210, -50,  "r"], map: [70,  180,  "l"] },
  { id: "menu",        label: "Menu",             orbit: [210, -10,  "r"], map: [105, 130,  "l"] },
  { id: "ordering",    label: "Ordering",         orbit: [210, 30,   "r"], map: [140, -40,  "r"] },
  { id: "help",        label: "Getting help",     orbit: [210, 70,   "r"], map: [140, -125, "l"] },
  { id: "staff",       label: "Staff",            orbit: [210, 110,  "l"], map: [140, 40,   "r"] },
  { id: "seating",     label: "Seating",          orbit: [210, 150,  "l"], map: [140, 90,   "r"] },
  { id: "regulars",    label: "Regulars",         orbit: [210, 190,  "l"], map: [210, 200,  "l"] },
  { id: "reputation",  label: "Reputation",       orbit: [210, 230,  "l"], map: [175, 10,   "r"] },
];

const W = 740;
const CX = 360;
const CY = 288;

const DEFAULT_ON: Record<string, boolean> = {
  coffee: true,
  app: true,
  menu: true,
};

export function TouchpointSelect() {
  const [on, setOn] = useState<Record<string, boolean>>(DEFAULT_ON);
  const [mapped, setMapped] = useState(false);

  const toggle = useCallback(
    (id: string) => {
      setOn((prev) => ({ ...prev, [id]: !prev[id] }));
    },
    []
  );

  const handleReveal = useCallback(() => {
    setMapped((prev) => !prev);
  }, []);

  return (
    <div className="tp-select" role="group" aria-label="Touchpoints of a coffee shop">
      {/* Left diagram area */}
      <div className="tp-diagram" style={{ width: W, height: 576, position: "relative" }}>
        {/* SVG rings and coffee cup */}
        <svg
          className="orr-svg"
          viewBox={`0 0 ${W} 576`}
          width={W}
          height={576}
          aria-hidden="true"
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          {/* Orbit ring (single faint circle) — shown when NOT mapped */}
          {!mapped && (
            <circle className="orr-ring orr-ring--unfilled" cx={CX} cy={CY} r={210} />
          )}

          {/* Three rings + labels — shown when mapped */}
          {mapped && (
            <>
              <circle className="orr-ring" cx={CX} cy={CY} r={70} />
              <circle className="orr-ring" cx={CX} cy={CY} r={140} />
              <circle className="orr-ring orr-ring--world" cx={CX} cy={CY} r={210} />
              <text x={CX} y={CY - 70 + 6} style={{ textAnchor: "middle", fontSize: "18px" }}>
                PRODUCT
              </text>
              <text x={CX} y={CY - 140 + 6} style={{ textAnchor: "middle", fontSize: "18px" }}>
                EXPERIENCE
              </text>
              <text x={CX} y={CY - 210 + 6} style={{ textAnchor: "middle", fontSize: "18px" }}>
                WORLD
              </text>
            </>
          )}

          {/* Coffee cup: rim r=26, coffee core r=17, handle r=9 */}
          <circle className="orr-ring" cx={CX} cy={CY} r={26} />
          <circle className="orr-core" cx={CX} cy={CY} r={17} />
          <circle className="orr-ring" cx={CX + 34} cy={CY} r={9} />
        </svg>

        {/* Touchpoint buttons — positioned absolutely */}
        {TOUCHPOINTS.map((tp) => {
          const p = mapped ? tp.map : tp.orbit;
          const rad = (p[1] * Math.PI) / 180;
          const x = Math.round(CX + p[0] * Math.cos(rad));
          const y = Math.round(CY + p[0] * Math.sin(rad));
          const side = p[2];

          const isOn = !!on[tp.id];

          // Position: dot is 14px, centered at (x, y)
          // Button is 44px tall for hit target
          const posStyle: React.CSSProperties =
            side === "r"
              ? { left: x - 7, top: y - 22 }
              : { right: W - x - 7, top: y - 22 };

          return (
            <button
              key={tp.id}
              type="button"
              aria-pressed={isOn}
              onClick={() => toggle(tp.id)}
              className="tp-btn"
              style={{
                ...posStyle,
                flexDirection: side === "r" ? "row" : "row-reverse",
                transition: "left 500ms ease-out, right 500ms ease-out, top 500ms ease-out",
              }}
            >
              <span
                className="tp-dot"
                aria-hidden="true"
                style={{
                  background: isOn ? "var(--ink)" : "var(--ground)",
                }}
              />
              <span className="tp-label" style={{ background: "var(--ground)", padding: "2px 4px" }}>
                {tp.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom-left: reveal button + status */}
      <div className="tp-bottom">
        <button
          type="button"
          className={mapped ? "orr-btn" : "orr-btn orr-btn--primary"}
          aria-pressed={mapped}
          onClick={handleReveal}
        >
          {mapped ? "Back to the orbit" : "See the bigger picture"}
        </button>
        <p className="orr-muted tp-status" role="status" style={{ margin: 0, maxWidth: 380, fontSize: 20, lineHeight: 1.3, fontStyle: "italic" }}>
          {mapped
            ? "The app is one dot on the inner ring. Points between rings belong to both."
            : "Which of these count as the product? Call them out."}
        </p>
      </div>
    </div>
  );
}
