import type { LectureConfig } from "../types";
import "./ExampleCards.css";

/**
 * ExampleCards — matches 06-example-cards.dc.html exactly.
 *
 * Three ruled columns with roman numeral category labels and dashed placeholder blocks.
 * The reading + headline + raven cutout are rendered by LiveStage.
 * This component renders ONLY the three-column card grid.
 */

type Props = {
  config: LectureConfig;
};

const CARDS = [
  {
    numeral: "i",
    category: "Identity",
    description: "A template that expresses its creator's identity",
  },
  {
    numeral: "ii",
    category: "Ritual",
    description: "A gathering or ritual",
  },
  {
    numeral: "iii",
    category: "Language",
    description: "A shared joke, phrase or user archetype",
  },
] as const;

export function ExampleCards({ config: _config }: Props) {
  return (
    <div className="ec-grid" role="region" aria-label="Three kinds of world-building">
      {CARDS.map((card) => (
        <article key={card.numeral} className="ec-card">
          <h2 className="orr-label" style={{ margin: 0 }}>
            {card.numeral} &middot; {card.category}
          </h2>
          <div className="ec-placeholder">
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <p className="orr-label orr-muted" style={{ margin: 0 }}>
                Placeholder — people made
              </p>
              <p className="orr-muted" style={{ margin: 0, fontSize: 24, lineHeight: 1.25 }}>
                {card.description}
              </p>
            </div>
            <p className="orr-label orr-muted" style={{ margin: 0 }}>
              &rarr; The product made possible
            </p>
            <p className="orr-label orr-muted" style={{ margin: 0 }}>
              &rarr; The experience encouraged
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
