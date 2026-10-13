import { useEffect, useMemo, useState } from "react";
import "./TouchpointSelect.css";

type Mode = "orbit" | "mapped";
type Dir = "r" | "l";

type Def = {
  id: string;
  label: string;
  orbit: [number, number, Dir]; // radius, angle (deg), label side
  map: [number, number, Dir];
};

const CX = 360;
const CY = 288;
const W = 740;

const DEFS: Def[] = [
  { id: "coffee", label: "Coffee", orbit: [210, -90, "r"], map: [70, 0, "r"] },
  { id: "app", label: "Mobile order app", orbit: [210, -50, "r"], map: [70, 180, "l"] },
  { id: "menu", label: "Menu", orbit: [210, -10, "r"], map: [105, 130, "l"] },
  { id: "ordering", label: "Ordering", orbit: [210, 30, "r"], map: [140, -40, "r"] },
  { id: "help", label: "Getting help", orbit: [210, 70, "r"], map: [140, -125, "l"] },
  { id: "staff", label: "Staff", orbit: [210, 110, "l"], map: [140, 40, "r"] },
  { id: "seating", label: "Seating", orbit: [210, 150, "l"], map: [140, 90, "r"] },
  { id: "regulars", label: "Regulars", orbit: [210, 190, "l"], map: [210, 200, "l"] },
  { id: "reputation", label: "Reputation", orbit: [210, 230, "l"], map: [175, 10, "r"] },
];

export function TouchpointSelect({ start = "orbit" }: { start?: Mode }) {
  const [mapped, setMapped] = useState<boolean>(start === "mapped");
  const [on, setOn] = useState<Record<string, boolean>>({
    coffee: true,
    app: true,
    menu: true,
  });
  // Track whether rings should animate (only when transitioning orbit -> mapped
  // during this component's lifetime; not on first render if starting mapped).
  const [animateRings, setAnimateRings] = useState(false);

  // When mapped flips to true from an interaction, animate rings in. On initial
  // render with start="mapped" we skip the animation to avoid a flash.
  useEffect(() => {
    // intentionally runs on mount: no animation on initial render
    setAnimateRings(false);
  }, []);

  const toggle = (id: string) => {
    setOn((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const reveal = () => {
    if (!mapped) setAnimateRings(true);
    setMapped((m) => !m);
  };

  const points = useMemo(() => {
    return DEFS.map((d) => {
      const p = mapped ? d.map : d.orbit;
      const [radius, angle, side] = p;
      const a = (angle * Math.PI) / 180;
      const x = Math.round(CX + radius * Math.cos(a));
      const y = Math.round(CY + radius * Math.sin(a));
      const style: React.CSSProperties =
        side === "r"
          ? { left: `${x - 7}px`, top: `${y - 22}px` }
          : { right: `${W - x - 7}px`, top: `${y - 22}px` };
      return {
        def: d,
        side,
        style,
        isOn: !!on[d.id],
      };
    });
  }, [mapped, on]);

  const statusLine = mapped
    ? "The app is one dot on the inner ring. Points between rings belong to both."
    : "Which of these count as the product? Call them out.";
  const revealLabel = mapped ? "Back to the orbit" : "See the bigger picture";
  const revealClass = mapped ? "orr-btn" : "orr-btn orr-btn--primary";

  // Points move only after rings have drawn, so we delay their position
  // transition by t-touchpoint when a fresh reveal animation is running.
  const pointDelayClass = animateRings && mapped ? "tp-point--delay" : "";

  return (
    <>
      <div
        className="tp-root"
        role="group"
        aria-label="Touchpoints of a coffee shop"
      >
        <svg
          className="orr-svg tp-rings"
          viewBox="0 0 740 576"
          width="740"
          height="576"
          aria-hidden="true"
        >
          {!mapped && (
            <circle
              className="orr-ring orr-ring--unfilled"
              cx="360"
              cy="288"
              r="210"
              pathLength={1}
            />
          )}
          {mapped && (
            <>
              <circle
                className={`orr-ring ${animateRings ? "tp-ring-draw tp-ring-draw--1" : ""}`}
                cx="360"
                cy="288"
                r="70"
                pathLength={1}
              />
              <circle
                className={`orr-ring ${animateRings ? "tp-ring-draw tp-ring-draw--2" : ""}`}
                cx="360"
                cy="288"
                r="140"
                pathLength={1}
              />
              <circle
                className={`orr-ring orr-ring--world ${animateRings ? "tp-ring-draw tp-ring-draw--3" : ""}`}
                cx="360"
                cy="288"
                r="210"
                pathLength={1}
              />
              <text x="360" y="224" style={{ textAnchor: "middle", fontSize: 18 }}>
                PRODUCT
              </text>
              <text x="360" y="154" style={{ textAnchor: "middle", fontSize: 18 }}>
                EXPERIENCE
              </text>
              <text x="360" y="84" style={{ textAnchor: "middle", fontSize: 18 }}>
                WORLD
              </text>
            </>
          )}
          {/* Coffee cup glyph at center: rim, coffee core, handle */}
          <circle className="orr-ring" cx="360" cy="288" r="26" />
          <circle className="orr-core" cx="360" cy="288" r="17" />
          <circle className="orr-ring" cx="394" cy="288" r="9" />
        </svg>

        {points.map((p) => (
          <button
            key={p.def.id}
            type="button"
            aria-pressed={p.isOn}
            onClick={() => toggle(p.def.id)}
            className={`tp-point tp-point--${p.side === "r" ? "row" : "row-reverse"} ${pointDelayClass}`}
            style={p.style}
          >
            <span
              aria-hidden="true"
              className={`tp-dot ${p.isOn ? "tp-dot--on" : ""}`}
            />
            <span className="tp-label">{p.def.label}</span>
          </button>
        ))}
      </div>

      <div className="tp-side">
        <figure className="tp-figure">
          <img
            className="orr-cutout"
            src="/cutouts/telescope.png"
            alt="Engraved brass telescope on a tripod"
          />
          <figcaption className="tp-caption">
            <span className="orr-label">Fig. 02 · Telescope</span>
            <span className="orr-label orr-muted">
              Your product, seen from outside
            </span>
          </figcaption>
        </figure>
        <h1 className="tp-headline">Every touchpoint is part of the product</h1>
      </div>

      <div className="tp-controls">
        <button
          type="button"
          className={revealClass}
          aria-pressed={mapped}
          onClick={reveal}
          style={{ flex: "none" }}
        >
          {revealLabel}
        </button>
        <p className="orr-muted tp-status" role="status">
          {statusLine}
        </p>
      </div>
    </>
  );
}
