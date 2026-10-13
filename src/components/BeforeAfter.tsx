import { useState, useCallback } from "react";
import "./BeforeAfter.css";

/**
 * BeforeAfter — matches 05-two-shops.dc.html exactly.
 *
 * Headline row with "Same coffee, two shops" + joined toggle buttons.
 * Two side-by-side panels with 2px top rule.
 * Shop A: dense mono uppercase at 16px.
 * Shop B: spacious Newsreader at 24px.
 * Active panel shows numbered ring callouts (1-4) in callout column.
 * Inactive panel at 0.45 opacity.
 */

type Shop = "A" | "B";

function Callout({ n, label }: { n: number; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        aria-hidden="true"
        style={{
          width: 32,
          height: 32,
          flex: "none",
          boxSizing: "border-box",
          borderRadius: "50%",
          border: "2.5px solid var(--ink)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 18,
          fontWeight: 500,
        }}
      >
        {n}
      </span>
      <span className="orr-label">{label}</span>
    </div>
  );
}

export function BeforeAfter() {
  const [active, setActive] = useState<Shop>("B");

  const showA = useCallback(() => setActive("A"), []);
  const showB = useCallback(() => setActive("B"), []);

  const isA = active === "A";

  return (
    <div className="ba" role="group" aria-label="Same coffee, two shops">
      {/* Headline row */}
      <div className="ba-header">
        <h1 className="ba-headline">Same coffee, two shops</h1>
        <div className="ba-toggle" role="group" aria-label="Show shop" style={{ display: "flex", gap: 0 }}>
          <button type="button" className="orr-btn" aria-pressed={isA} onClick={showA}>
            Shop A
          </button>
          <button type="button" className="orr-btn" aria-pressed={!isA} onClick={showB} style={{ marginLeft: -2 }}>
            Shop B
          </button>
        </div>
      </div>

      {/* Two-panel grid */}
      <div className="ba-panels">
        {/* Shop A */}
        <section className="ba-panel" aria-label="Shop A" style={{ opacity: isA ? 1 : 0.45 }}>
          <p className="orr-label" style={{ margin: "0 0 6px" }}>Shop A</p>
          <div className="ba-shop-a">
            {/* Menu row */}
            <p className="ba-a-text" style={{ margin: 0 }}>
              <strong>Menu</strong> Espresso &middot; ristretto &middot; lungo &middot; cortado &middot; gibraltar &middot; flat white &middot; macchiato (trad.) &middot; SO / blend &middot; V60 &middot; kalita &middot; chemex &middot; nitro CB &middot; cold drip &middot; affogato &middot; alt milk +
            </p>
            {isA && <Callout n={1} label="Language" />}

            {/* Empty row for guidance spacing */}
            <p style={{ margin: 0, minHeight: 32 }} />
            {isA && <Callout n={2} label="Guidance" />}

            {/* "Next!" */}
            <p className="ba-a-text" style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>&ldquo;Next!&rdquo;</p>
            {isA && <Callout n={3} label="Pace" />}

            {/* Rules */}
            <p className="ba-a-text" style={{ margin: 0 }}>Order at register. No substitutions. No modifications to SO.</p>
            {isA && <Callout n={4} label="Support" />}
          </div>
        </section>

        {/* Shop B */}
        <section className="ba-panel" aria-label="Shop B" style={{ opacity: isA ? 0.45 : 1 }}>
          <p className="orr-label" style={{ margin: "0 0 6px" }}>Shop B</p>
          <div className="ba-shop-b">
            {/* Menu */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <p style={{ margin: 0 }}>Coffee — smooth, not bitter</p>
              <p style={{ margin: 0 }}>Coffee with milk — mild, creamy</p>
            </div>
            {!isA ? <Callout n={1} label="Language" /> : <span />}

            {/* Guidance */}
            <p style={{ margin: 0, fontStyle: "italic" }}>First time? Here&rsquo;s what we&rsquo;d recommend.</p>
            {!isA ? <Callout n={2} label="Guidance" /> : <span />}

            {/* Pace */}
            <p style={{ margin: 0 }}>Take your time. We&rsquo;ll be ready when you are.</p>
            {!isA ? <Callout n={3} label="Pace" /> : <span />}

            {/* Support */}
            <p style={{ margin: 0 }}>Ask us anything.</p>
            {!isA ? <Callout n={4} label="Support" /> : <span />}
          </div>
        </section>
      </div>
    </div>
  );
}
