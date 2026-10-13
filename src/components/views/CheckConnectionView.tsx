import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./CheckConnectionView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 08.3 — Check the connection. Three rings with POV axis broken at Experience.
 * Mirrors CheckConnection.dc.html.
 */
export function CheckConnectionView(_props: Props) {
  return (
    <div className="view check-view">
      <p className="orr-label check-view__step">Step iii · 3 minutes</p>

      <div className="check-view__text">
        <h1 className="check-view__h1">
          Do all three circles say the same thing?
        </h1>
        <p className="check-view__body">
          Find one contradiction or gap. Change one choice to fix it.
        </p>
      </div>

      <svg
        className="orr-svg check-view__rings"
        viewBox="0 0 480 480"
        width="480"
        height="480"
        role="img"
        aria-label="Three rings with the point-of-view axis broken at the Experience ring"
      >
        <circle className="orr-core" cx="240" cy="240" r="16" />
        <circle className="orr-ring" cx="240" cy="240" r="64" />
        <circle className="orr-ring" cx="240" cy="240" r="128" />
        <circle className="orr-ring orr-ring--world" cx="240" cy="240" r="192" />
        <g transform="rotate(-58 240 240)">
          <line className="orr-axis" x1="130" y1="240" x2="350" y2="240" />
        </g>
        <g transform="rotate(-52 240 240)">
          <line className="orr-axis" x1="386" y1="240" x2="455" y2="240" />
          <line className="orr-axis" x1="455" y1="231" x2="455" y2="249" />
          <line className="orr-axis" x1="25" y1="240" x2="94" y2="240" />
          <line className="orr-axis" x1="25" y1="231" x2="25" y2="249" />
        </g>
        <text x="176" y="246" style={{ textAnchor: "middle", fontSize: 18 }}>
          PRODUCT
        </text>
        <text x="112" y="200" style={{ textAnchor: "middle", fontSize: 18 }}>
          EXPERIENCE
        </text>
        <text x="80" y="104" style={{ textAnchor: "middle", fontSize: 18 }}>
          WORLD
        </text>
      </svg>
    </div>
  );
}
