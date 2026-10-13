import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./WorkshopLiveView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 08.2 — Canvas (projected). Mirrors WorkshopLive.dc.html.
 * The live canvas with the belief sentence, three ring definitions, and the
 * empty orrery on the right.
 */
export function WorkshopLiveView({ config }: Props) {
  const url = config.publicUrl?.trim();
  return (
    <div className="view workshop-live-view">
      <p className="orr-label workshop-live-view__step">
        Steps i–ii · 9 minutes
      </p>

      <div className="workshop-live-view__sentence-block">
        <h1 className="workshop-live-view__h1">
          We are building for{" "}
          <span aria-label="blank" className="workshop-live-view__blank" />,
          and we believe{" "}
          <span aria-label="blank" className="workshop-live-view__blank" />.
        </h1>
        <p className="workshop-live-view__sub">
          Make a choice. ‘For everyone’ is not a belief.
        </p>
      </div>

      <dl className="workshop-live-view__dl">
        <div className="workshop-live-view__row workshop-live-view__row--first">
          <dt className="orr-label">Product</dt>
          <dd className="workshop-live-view__dd">
            One useful thing they can do.
          </dd>
        </div>
        <div className="workshop-live-view__row">
          <dt className="orr-label">Experience</dt>
          <dd className="workshop-live-view__dd">
            One moment, and one choice that creates the feeling.
          </dd>
        </div>
        <div className="workshop-live-view__row workshop-live-view__row--last">
          <dt className="orr-label">World</dt>
          <dd className="workshop-live-view__dd">
            One invitation a real person would accept without being paid or
            asked twice.
          </dd>
        </div>
      </dl>

      <svg
        className="orr-svg workshop-live-view__rings"
        viewBox="0 0 420 420"
        width="420"
        height="420"
        role="img"
        aria-label="An empty canvas: three rings waiting for answers"
      >
        <circle className="orr-core--unfilled" cx="210" cy="210" r="15" />
        <circle
          className="orr-ring orr-ring--unfilled"
          cx="210"
          cy="210"
          r="60"
        />
        <circle
          className="orr-ring orr-ring--unfilled"
          cx="210"
          cy="210"
          r="120"
        />
        <circle
          className="orr-ring orr-ring--unfilled"
          cx="210"
          cy="210"
          r="180"
        />
        <text x="180" y="164" style={{ textAnchor: "middle", fontSize: 18 }}>
          PRODUCT
        </text>
        <text x="150" y="112" style={{ textAnchor: "middle", fontSize: 18 }}>
          EXPERIENCE
        </text>
        <text x="120" y="60" style={{ textAnchor: "middle", fontSize: 18 }}>
          WORLD
        </text>
      </svg>

      <p className="orr-label orr-muted workshop-live-view__footnote">
        Open the canvas at {url || "[public URL]"} · or take a paper one
      </p>
    </div>
  );
}
