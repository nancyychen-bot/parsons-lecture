import type { View, LectureConfig } from "../../types";
import "./views.css";
import "./ShareView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 08.4 — 60-second share. Left text block + right telescope cutout.
 * Mirrors Share.dc.html.
 */
export function ShareView(_props: Props) {
  return (
    <div className="view share-view">
      <p className="orr-label share-view__step">Step iv · 3–8 minutes</p>

      <div className="share-view__text">
        <h1 className="share-view__h1">Sixty seconds. Three circles.</h1>
        <p className="share-view__body">
          Walk your partner through them. They name the strongest connection,
          and one assumption to test with a real person.
        </p>
      </div>

      <figure className="share-view__figure">
        <img
          className="orr-cutout share-view__img"
          src="/cutouts/telescope.png"
          alt="Engraved brass telescope on a tripod"
        />
        <figcaption className="share-view__cap">
          <span className="orr-label">Fig. 08 · Telescope</span>
          <span className="orr-label orr-muted">
            Seen from outside, by someone else
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
