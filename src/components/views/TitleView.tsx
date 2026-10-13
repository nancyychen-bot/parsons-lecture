import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./TitleView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 01.1 Title — centered Jupiter cutout + big headline + three CTA buttons.
 * Mirrors Main.dc.html.
 */
export function TitleView(_props: Props) {
  return (
    <div className="view title-view">
      <figure className="title-view__figure">
        <span className="title-view__spacer" aria-hidden="true" />
        <img
          className="orr-cutout title-view__cutout"
          src="/cutouts/jupiter.png"
          alt="Engraved Jupiter with three of its moons"
        />
        <figcaption className="title-view__caption">
          <span className="orr-label">Fig. 01 · Jupiter</span>
          <span className="orr-label orr-muted">A world with its own moons</span>
        </figcaption>
      </figure>

      <div className="title-view__block">
        <h1 className="title-view__h1">
          Build a world,
          <br />
          not just a product
        </h1>
        <p className="title-view__sub">
          How products become experiences, and experiences become worlds
        </p>
        <div className="title-view__actions">
          <a
            className="orr-btn orr-btn--primary"
            href="#/live/start/2"
          >
            Enter the world
          </a>
          <a className="orr-btn" href="#/explore/start">
            Explore on your own
          </a>
          <a className="orr-btn orr-btn--text" href="#/workshop">
            Go to the workshop
          </a>
        </div>
      </div>
    </div>
  );
}
