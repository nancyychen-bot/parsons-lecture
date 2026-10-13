import { useState } from "react";
import "./BeforeAfter.css";

type Shop = "A" | "B";

function Callout({ n, label }: { n: number; label: string }) {
  return (
    <div className="ba-callout">
      <span aria-hidden="true" className="ba-num">
        {n}
      </span>
      <span className="orr-label">{label}</span>
    </div>
  );
}

export function BeforeAfter({ start = "B" }: { start?: Shop }) {
  const [shop, setShop] = useState<Shop>(start);
  const isA = shop === "A";
  const isB = !isA;

  return (
    <>
      <div className="ba-head">
        <h1 className="ba-headline">Same coffee, two shops</h1>
        <div className="ba-toggle" role="group" aria-label="Show shop">
          <button
            type="button"
            className="orr-btn"
            aria-pressed={isA}
            onClick={() => setShop("A")}
          >
            Shop A
          </button>
          <button
            type="button"
            className="orr-btn"
            aria-pressed={isB}
            onClick={() => setShop("B")}
          >
            Shop B
          </button>
        </div>
      </div>

      <div className="ba-grid">
        <section
          aria-label="Shop A"
          className="ba-panel"
          style={{ opacity: isA ? 1 : 0.45 }}
        >
          <p className="orr-label ba-panel-label">Shop A</p>
          <div className="ba-rows ba-rows--a">
            <p>
              <strong>Menu</strong> Espresso · ristretto · lungo · cortado · gibraltar · flat white · macchiato (trad.) · SO / blend · V60 · kalita · chemex · nitro CB · cold drip · affogato · alt milk +
            </p>
            {isA ? <Callout n={1} label="Language" /> : <span />}

            <p style={{ minHeight: 32 }} />
            {isA ? <Callout n={2} label="Guidance" /> : <span />}

            <p className="ba-pullquote">“Next!”</p>
            {isA ? <Callout n={3} label="Pace" /> : <span />}

            <p>Order at register. No substitutions. No modifications to SO.</p>
            {isA ? <Callout n={4} label="Support" /> : <span />}
          </div>
        </section>

        <section
          aria-label="Shop B"
          className="ba-panel"
          style={{ opacity: isB ? 1 : 0.45 }}
        >
          <p className="orr-label ba-panel-label">Shop B</p>
          <div className="ba-rows ba-rows--b">
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <p>Coffee — smooth, not bitter</p>
              <p>Coffee with milk — mild, creamy</p>
            </div>
            {isB ? <Callout n={1} label="Language" /> : <span />}

            <p className="ba-italic">First time? Here’s what we’d recommend.</p>
            {isB ? <Callout n={2} label="Guidance" /> : <span />}

            <p>Take your time. We’ll be ready when you are.</p>
            {isB ? <Callout n={3} label="Pace" /> : <span />}

            <p>Ask us anything.</p>
            {isB ? <Callout n={4} label="Support" /> : <span />}
          </div>
        </section>
      </div>
    </>
  );
}
