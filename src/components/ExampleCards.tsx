import "./ExampleCards.css";

type Card = {
  roman: string;
  label: string;
  description: string;
};

const CARDS: Card[] = [
  {
    roman: "i",
    label: "Identity",
    description: "A template that expresses its creator’s identity",
  },
  {
    roman: "ii",
    label: "Ritual",
    description: "A gathering or ritual",
  },
  {
    roman: "iii",
    label: "Language",
    description: "A shared joke, phrase or user archetype",
  },
];

export function ExampleCards({ variant }: { variant?: "m45" | "m60" | "m75" } = {}) {
  const cards = variant === "m45" ? CARDS.slice(0, 1) : CARDS;
  const gridClass = variant === "m45" ? "ec-grid ec-grid--one" : "ec-grid";

  return (
    <>
      <div className="ec-head">
        <p className="orr-label orr-muted ec-eyebrow">
          Three kinds of world-building
        </p>
        <h1 className="ec-headline">Look for what people made.</h1>
      </div>

      <figure className="ec-figure">
        <figcaption className="ec-caption">
          <span className="orr-label">Fig. 06 · Raven</span>
          <span className="orr-label orr-muted">
            The regular who keeps coming back
          </span>
        </figcaption>
        <img
          className="orr-cutout"
          src="/cutouts/raven.png"
          alt="Engraved raven in flight, wings spread"
        />
      </figure>

      <div className={gridClass}>
        {cards.map((c) => (
          <article key={c.roman} className="ec-card">
            <h2 className="orr-label">
              {c.roman} · {c.label}
            </h2>
            <div className="ec-placeholder">
              <div className="ec-ph-head">
                <p className="orr-label orr-muted">Placeholder — people made</p>
                <p className="orr-muted ec-desc">{c.description}</p>
              </div>
              <p className="orr-label orr-muted">→ The product made possible</p>
              <p className="orr-label orr-muted">→ The experience encouraged</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
