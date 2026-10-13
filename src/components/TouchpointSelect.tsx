import { useState, useCallback } from "react";
import "./TouchpointSelect.css";

const TOUCHPOINTS = [
  { id: "coffee", label: "Coffee", rings: ["product"] },
  { id: "menu", label: "Menu", rings: ["product", "experience"] },
  { id: "mobile-app", label: "Mobile order app", rings: ["product"] },
  { id: "ordering", label: "Ordering", rings: ["experience"] },
  { id: "staff", label: "Staff", rings: ["experience"] },
  { id: "seating", label: "Seating", rings: ["experience", "world"] },
  { id: "getting-help", label: "Getting help", rings: ["experience"] },
  { id: "regulars", label: "Regulars", rings: ["world"] },
  { id: "reputation", label: "Reputation", rings: ["world"] },
] as const;

type TouchpointId = (typeof TOUCHPOINTS)[number]["id"];

/** Angle positions for each touchpoint around the orbit (degrees, 0 = top) */
const ORBIT_ANGLES: Record<TouchpointId, number> = {
  coffee: 0,
  menu: 40,
  "mobile-app": 80,
  ordering: 120,
  staff: 160,
  seating: 200,
  "getting-help": 240,
  regulars: 280,
  reputation: 320,
};

/** Ring target positions for mapped state (percent from center) */
const RING_RADIUS: Record<string, number> = {
  product: 20,
  experience: 35,
  world: 48,
};

function getOrbitPosition(angleDeg: number, radiusPct: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    left: `${50 + radiusPct * Math.cos(rad)}%`,
    top: `${50 + radiusPct * Math.sin(rad)}%`,
  };
}

/** Map a touchpoint to its primary ring position when mapped */
function getMappedPosition(tp: (typeof TOUCHPOINTS)[number], index: number) {
  const primaryRing = tp.rings[0];
  const radius = RING_RADIUS[primaryRing] ?? 35;
  // Spread touchpoints within the same ring
  const ringMembers = TOUCHPOINTS.filter((t) => t.rings[0] === primaryRing);
  const ringIndex = ringMembers.findIndex((t) => t.id === tp.id);
  const spreadAngle = 360 / Math.max(ringMembers.length, 1);
  const angle = ringIndex * spreadAngle + index * 5; // slight offset to avoid overlap
  return getOrbitPosition(angle, radius);
}

export function TouchpointSelect() {
  const [selected, setSelected] = useState<Set<TouchpointId>>(new Set());
  const [mapped, setMapped] = useState(false);

  const toggle = useCallback(
    (id: TouchpointId) => {
      if (mapped) return; // don't toggle in mapped state
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [mapped]
  );

  const handleReveal = useCallback(() => {
    if (mapped) {
      setMapped(false);
    } else {
      setMapped(true);
    }
  }, [mapped]);

  const activeCount = selected.size;

  return (
    <div className="touchpoint-select" role="group" aria-label="Touchpoint selector">
      <div className="touchpoint-orbit">
        {/* Center icon */}
        <div className="touchpoint-center" aria-hidden="true">
          <span className="touchpoint-center-icon">&#9749;</span>
          <span className="touchpoint-center-label">Coffee shop</span>
        </div>

        {/* Ring labels for mapped state */}
        <div
          className={`touchpoint-ring-labels ${mapped ? "touchpoint-ring-labels--visible" : ""}`}
          aria-hidden="true"
        >
          <span className="touchpoint-ring-label touchpoint-ring-label--product">
            Product
          </span>
          <span className="touchpoint-ring-label touchpoint-ring-label--experience">
            Experience
          </span>
          <span className="touchpoint-ring-label touchpoint-ring-label--world">
            World
          </span>
        </div>

        {/* Touchpoint buttons */}
        {TOUCHPOINTS.map((tp, i) => {
          const isActive = selected.has(tp.id);
          const orbitPos = getOrbitPosition(ORBIT_ANGLES[tp.id], 42);
          const mappedPos = getMappedPosition(tp, i);
          const pos = mapped && isActive ? mappedPos : orbitPos;
          const primaryRing = tp.rings[0];

          return (
            <button
              key={tp.id}
              className={`touchpoint-btn ${mapped ? "touchpoint-btn--mapped" : ""} ${mapped && isActive ? `touchpoint-btn--ring-${primaryRing}` : ""}`}
              style={{
                top: pos.top,
                left: pos.left,
                opacity: mapped && !isActive ? 0.25 : 1,
              }}
              aria-pressed={isActive}
              aria-label={`${tp.label}${mapped && isActive ? `, mapped to ${tp.rings.join(" and ")}` : ""}`}
              onClick={() => toggle(tp.id)}
              disabled={mapped}
            >
              {tp.label}
            </button>
          );
        })}
      </div>

      <p className="touchpoint-status" aria-live="polite">
        {mapped
          ? `${activeCount} touchpoint${activeCount !== 1 ? "s" : ""} mapped to rings`
          : `${activeCount} of 9 selected`}
      </p>

      <button
        className="touchpoint-action"
        onClick={handleReveal}
        disabled={!mapped && activeCount === 0}
        aria-label={mapped ? "Reset touchpoints" : "See the bigger picture"}
      >
        {mapped ? "Reset" : "See the bigger picture"}
      </button>
    </div>
  );
}
