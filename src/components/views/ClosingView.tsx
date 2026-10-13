import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./ClosingView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 09.3 — Closing line. Centered fern cutout + reading + three-line charge.
 * Mirrors Closing.dc.html.
 */
export function ClosingView(_props: Props) {
  return (
    <div className="view closing-view">
      <figure className="closing-view__figure">
        <span className="closing-view__spacer" aria-hidden="true" />
        <img
          className="orr-cutout closing-view__cutout"
          src="/cutouts/fern.png"
          alt="Engraved fern frond, its leaves repeating the shape of the whole"
        />
        <figcaption className="closing-view__cap">
          <span className="orr-label">Fig. 09 · Fern</span>
          <span className="orr-label orr-muted">A pattern that keeps growing</span>
        </figcaption>
      </figure>

      <div className="closing-view__block">
        <p className="closing-view__reading">
          Make one change. Watch someone use it.
        </p>
        <h1 className="closing-view__h1">
          Build something useful.
          <br />
          Make the experience meaningful.
          <br />
          Leave room for people to make it their own.
        </h1>
      </div>
    </div>
  );
}
