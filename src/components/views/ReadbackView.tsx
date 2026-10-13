import type { View, LectureConfig } from "../../types";
import { useWorkshopDraft } from "../../hooks/useWorkshopDraft";
import "./views.css";
import "./ReadbackView.css";

type Props = { view: View; config: LectureConfig };

type Column = {
  label: string;
  ring: "product" | "experience" | "world";
  value: string;
  draftKey: "product" | "experienceMoment" | "world";
};

const COLUMNS: Column[] = [
  {
    label: "Product · r = 1",
    ring: "product",
    value: "A lecture and a usable canvas",
    draftKey: "product",
  },
  {
    label: "Experience · r = 2",
    ring: "experience",
    value: "The journey you just took",
    draftKey: "experienceMoment",
  },
  {
    label: "World · r = 3",
    ring: "world",
    value: "What you do with it next",
    draftKey: "world",
  },
];

/**
 * 09.2 — This site, read back. Three ouroboros columns, each with the ring
 * state they describe. When a student draft exists, show "Yours: …" muted
 * italic under each column (per DESIGN-HANDOFF §4 and spec).
 */
export function ReadbackView(_props: Props) {
  const { draft, hasContent } = useWorkshopDraft();

  return (
    <div className="view readback-view">
      <figure className="readback-view__figure">
        <span className="readback-view__spacer" aria-hidden="true" />
        <img
          className="orr-cutout readback-view__cutout"
          src="/cutouts/ouroboros.png"
          alt="Engraved serpent curled into a ring, biting its own tail"
        />
        <figcaption className="readback-view__cap">
          <span className="orr-label">Fig. 09 · Ouroboros</span>
          <span className="orr-label orr-muted">A ring that feeds itself</span>
        </figcaption>
      </figure>

      <h1 className="readback-view__h1">
        This site, read through its own three circles
      </h1>

      <dl className="readback-view__dl">
        {COLUMNS.map((col) => {
          const yours = hasContent ? draft[col.draftKey] : "";
          return (
            <div key={col.label} className="readback-view__col">
              <RingMark ring={col.ring} />
              <dt className="orr-label readback-view__dt">{col.label}</dt>
              <dd className="readback-view__dd">{col.value}</dd>
              {yours ? (
                <dd className="readback-view__yours">Yours: {yours}</dd>
              ) : null}
            </div>
          );
        })}
      </dl>

      <p className="orr-muted readback-view__sig">
        Vibe-coded by someone without “engineer” in her title. The judgment
        was hers; the typing was shared.
      </p>
    </div>
  );
}

function RingMark({ ring }: { ring: "product" | "experience" | "world" }) {
  // Each column's small orrery shows one additional ring reached per column.
  const r2Filled = ring !== "product";
  const r3Filled = ring === "world";
  return (
    <svg
      className="orr-svg orr-mark readback-view__ring"
      viewBox="0 0 72 72"
      width="72"
      height="72"
      aria-hidden="true"
    >
      <circle className="orr-core" cx="36" cy="36" r="2.6" />
      <circle className="orr-ring" cx="36" cy="36" r="10.5" />
      <circle
        className={r2Filled ? "orr-ring" : "orr-ring orr-ring--unfilled"}
        cx="36"
        cy="36"
        r="21"
      />
      <circle
        className={
          r3Filled ? "orr-ring orr-ring--world" : "orr-ring orr-ring--unfilled"
        }
        cx="36"
        cy="36"
        r="31.5"
      />
      {ring === "world" ? (
        <g transform="rotate(-58 36 36)">
          <line className="orr-axis" x1="0.7" y1="36" x2="71.3" y2="36" />
        </g>
      ) : null}
    </svg>
  );
}
