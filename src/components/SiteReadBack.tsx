import "./SiteReadBack.css";
import { CircleMark } from "./CircleMark";

/**
 * SiteReadBack — matches 09-site-readback.dc.html exactly.
 *
 * Centered ouroboros cutout at top.
 * Centered headline at 44px.
 * Three-column ruled table with mini orrery glyphs (72px SVG), labels, statements.
 * Bottom-left vibe-coding note.
 *
 * The cutout and four corners are rendered by LiveStage.
 * This component renders the headline and the three-column table.
 */

const COLUMNS = [
  {
    label: "Product · r = 1",
    statement: "A lecture and a usable canvas",
    filled: { product: true, experience: false, world: false, axis: false },
  },
  {
    label: "Experience · r = 2",
    statement: "The journey you just took",
    filled: { product: true, experience: true, world: false, axis: false },
  },
  {
    label: "World · r = 3",
    statement: "What you do with it next",
    filled: { product: true, experience: true, world: true, axis: true },
  },
] as const;

export function SiteReadBack() {
  return (
    <div className="srb" role="region" aria-label="This site, read through its own three circles">
      {/* Headline */}
      <h1 className="srb-headline">
        This site, read through its own three circles
      </h1>

      {/* Three-column ruled table */}
      <dl className="srb-table">
        {COLUMNS.map((col) => (
          <div key={col.label} className="srb-column">
            {/* Mini orrery glyph */}
            <CircleMark
              filled={col.filled}
              size="md"
            />
            <dt className="orr-label" style={{ marginTop: 2 }}>{col.label}</dt>
            <dd className="srb-statement">{col.statement}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
