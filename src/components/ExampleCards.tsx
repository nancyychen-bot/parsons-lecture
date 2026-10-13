import type { LectureConfig } from "../types";
import { Placeholder } from "./Placeholder";
import "./ExampleCards.css";

type Props = {
  config: LectureConfig;
};

const CARDS = [
  {
    category: "Identity",
    mainLabel: "What people made",
    productLabel: "What the product made possible",
    experienceLabel: "What the experience encouraged",
  },
  {
    category: "Ritual",
    mainLabel: "What people made",
    productLabel: "What the product made possible",
    experienceLabel: "What the experience encouraged",
  },
  {
    category: "Language",
    mainLabel: "What people made",
    productLabel: "What the product made possible",
    experienceLabel: "What the experience encouraged",
  },
] as const;

export function ExampleCards({ config }: Props) {
  return (
    <div className="example-cards" role="region" aria-label="Three kinds of world-building">
      <div className="example-cards-row">
        {CARDS.map((card, i) => (
          <article key={i} className="example-card">
            <span className="example-card-category">{card.category}</span>

            <div className="example-card-main">
              <Placeholder label={card.mainLabel} config={config} />
            </div>

            <div className="example-card-sub">
              <Placeholder label={card.productLabel} config={config} />
            </div>

            <div className="example-card-sub">
              <Placeholder label={card.experienceLabel} config={config} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
