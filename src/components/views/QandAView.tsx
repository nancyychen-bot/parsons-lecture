import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./QandAView.css";

type Props = { view: View; config: LectureConfig };

/**
 * Q&A — holding view. Finished orrery (three rings + axis) centered above
 * the "Questions" headline. Mirrors QandA.dc.html.
 */
export function QandAView(_props: Props) {
  return (
    <div className="view qa-view">
      <svg
        className="orr-svg qa-view__orrery"
        viewBox="0 0 400 400"
        width="340"
        height="340"
        role="img"
        aria-label="The finished orrery: three rings and the axis through them"
      >
        <circle className="orr-core" cx="200" cy="200" r="13" />
        <circle className="orr-ring" cx="200" cy="200" r="52" />
        <circle className="orr-ring" cx="200" cy="200" r="104" />
        <circle className="orr-ring orr-ring--world" cx="200" cy="200" r="156" />
        <g transform="rotate(-58 200 200)">
          <line className="orr-axis" x1="25" y1="200" x2="375" y2="200" />
          <line className="orr-axis" x1="25" y1="191" x2="25" y2="209" />
          <line className="orr-axis" x1="375" y1="191" x2="375" y2="209" />
        </g>
      </svg>

      <div className="qa-view__block">
        <h1 className="qa-view__h1">Questions</h1>
        <p className="qa-view__sub">
          The missing title. The tools. The work. Anything.
        </p>
      </div>
    </div>
  );
}
