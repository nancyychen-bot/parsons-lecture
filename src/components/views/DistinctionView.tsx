import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./DistinctionView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 06.3 — A distinction. Not every useful product needs a fandom.
 * Mirrors Distinction.dc.html.
 */
export function DistinctionView(_props: Props) {
  return (
    <div className="view distinction-view">
      <div className="distinction-view__text">
        <div className="distinction-view__label-group">
          <p className="orr-label">A distinction</p>
          <hr className="orr-rule distinction-view__rule-96" />
        </div>
        <h1 className="distinction-view__h1">
          Not every useful product needs a fandom.
        </h1>
        <p className="distinction-view__body">
          World-building means a coherent context people can join. Not
          manufactured loyalty.
        </p>
        <p className="distinction-view__ask">
          Ask: what could people contribute that you couldn’t make alone?
        </p>
      </div>

      <figure className="distinction-view__figure">
        <img
          className="orr-cutout distinction-view__img"
          src="/cutouts/quartz-cluster.png"
          alt="Engraved cluster of quartz crystals"
        />
        <figcaption className="distinction-view__cap">
          <span className="orr-label">Fig. 06.3 · Quartz cluster</span>
          <span className="orr-label orr-muted">
            Many small parts, one thing
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
