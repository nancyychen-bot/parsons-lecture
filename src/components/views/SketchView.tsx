import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./SketchView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 03.4 — Sketch prompt + key line. Spoken prompt on the left, three empty
 * rings on the right, key line underneath. Mirrors Sketch.dc.html.
 */
export function SketchView(_props: Props) {
  return (
    <div className="view sketch-view">
      <div className="sketch-view__prompt">
        <p className="sketch-view__reading">Everything you make has an orbit.</p>
        <div className="sketch-view__label-group">
          <p className="orr-label orr-muted">Spoken prompt</p>
          <hr className="orr-rule sketch-view__rule-96" />
        </div>
        <h1 className="sketch-view__h1">
          Think of a product you used today. Name one thing in each ring.
        </h1>
      </div>

      <div className="sketch-view__keyline">
        <p className="orr-label">Key line</p>
        <hr className="orr-rule" />
        <p className="sketch-view__key-text">
          The product sits inside the experience. The experience sits inside
          the world.
        </p>
      </div>

      <svg
        className="orr-svg sketch-view__rings"
        viewBox="0 0 480 480"
        width="480"
        height="480"
        role="img"
        aria-label="Three empty rings waiting for one answer each"
      >
        <circle className="orr-core" cx="240" cy="240" r="18" />
        <circle className="orr-ring" cx="240" cy="240" r="72" />
        <circle className="orr-ring" cx="240" cy="240" r="144" />
        <circle className="orr-ring orr-ring--world" cx="240" cy="240" r="216" />
        <text x="204" y="184" style={{ textAnchor: "middle", fontSize: 18 }}>
          PRODUCT
        </text>
        <text
          x="204"
          y="208"
          style={{ textAnchor: "middle", fontSize: 18, fill: "var(--muted)" }}
        >
          ______
        </text>
        <text x="168" y="121" style={{ textAnchor: "middle", fontSize: 18 }}>
          EXPERIENCE
        </text>
        <text
          x="168"
          y="145"
          style={{ textAnchor: "middle", fontSize: 18, fill: "var(--muted)" }}
        >
          ______
        </text>
        <text x="132" y="59" style={{ textAnchor: "middle", fontSize: 18 }}>
          WORLD
        </text>
        <text
          x="132"
          y="83"
          style={{ textAnchor: "middle", fontSize: 18, fill: "var(--muted)" }}
        >
          ______
        </text>
      </svg>
    </div>
  );
}
