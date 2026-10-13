import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./OurPlaceView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 06.1 — "Our place". Left text block, right constellation cutout.
 * Mirrors OurPlace.dc.html.
 */
export function OurPlaceView(_props: Props) {
  return (
    <div className="view ourplace-view">
      <div className="ourplace-view__text">
        <p className="ourplace-view__reading">
          The best parts of a world are the ones you didn’t make.
        </p>
        <h1 className="ourplace-view__h1">
          Then it becomes “our place.”
        </h1>
        <p className="ourplace-view__body">
          Regulars recognize one another. A local artist hosts a gathering.
          The shop sets the conditions. People make the world.
        </p>
        <div className="ourplace-view__term">
          <p className="orr-label orr-muted">
            Sociologists call it a third place
          </p>
        </div>
      </div>

      <figure className="ourplace-view__figure">
        <img
          className="orr-cutout ourplace-view__img"
          src="/cutouts/constellation.png"
          alt="Engraved constellation: stars joined by lines on a black field"
        />
        <figcaption className="ourplace-view__cap">
          <span className="orr-label">Fig. 06 · Constellation</span>
          <span className="orr-label orr-muted">
            A shape people agree to see
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
