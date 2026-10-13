import type { View, LectureConfig } from "../../types";
import { Placeholder } from "../Placeholder";
import "./views.css";
import "./AboutView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 01.2 About Nancy — placeholder headshot on the left, bio block on the right.
 * Mirrors About.dc.html. Bio copy is draft; see DESIGN-HANDOFF §8.
 */
export function AboutView(_props: Props) {
  return (
    <div className="view about-view">
      <div className="about-view__photo">
        <Placeholder
          label="Placeholder — headshot (optional)"
          width="100%"
          height="100%"
        />
      </div>

      <div className="about-view__bio">
        <p className="orr-label about-view__role">
          Community Experiential Lead · Notion
        </p>
        <h1 className="about-view__h1">
          No “product,” “design” or “engineering” in my title.
        </h1>
        <p className="about-view__body">
          I build products anyway: dashboards, backends, tools vibe-coded into
          Notion. Before that, six businesses across food, wine, e-commerce
          and music.
        </p>
        <div className="about-view__also">
          <p className="orr-label orr-muted">
            Also teaches AI, marketing and psychology at NYU
          </p>
        </div>
      </div>
    </div>
  );
}
