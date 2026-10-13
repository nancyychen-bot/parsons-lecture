import { useRef, useEffect, useMemo, useState } from "react";
import type { Section, View, LectureConfig } from "../types";
import { sections, getVisibleViews, getFilledCircles } from "../content/lecture";
import { CircleMark } from "./CircleMark";
import { Placeholder } from "./Placeholder";
import { SectionNav } from "./SectionNav";
import { TouchpointSelect } from "./TouchpointSelect";
import { CircleExplorer } from "./CircleExplorer";
import { BeforeAfter } from "./BeforeAfter";
import { ExampleCards } from "./ExampleCards";
import { ContradictionRepair } from "./ContradictionRepair";
import { SiteReadBack } from "./SiteReadBack";
import { WorkshopCanvas } from "./WorkshopCanvas";
import { QrCode } from "./QrCode";
import { copyBrief } from "../lib/exportBrief";
import { coffeeShopExample } from "../content/coffee-shop-example";
import { useKeyboardNav } from "../hooks/useKeyboardNav";
import "./LiveStage.css";

/* ── Cutout data ── */
const SECTION_CUTOUTS: Record<string, { src: string; alt: string; label: string; meaning: string } | undefined> = {
  start: { src: "/cutouts/jupiter.png", alt: "Engraved Jupiter with three of its moons", label: "Fig. 01 · Jupiter", meaning: "A world with its own moons" },
  "what-is-a-product": { src: "/cutouts/telescope.png", alt: "Engraved brass telescope on a tripod", label: "Fig. 02 · Telescope", meaning: "Your product, seen from outside" },
  "three-circles": { src: "/cutouts/nautilus.png", alt: "Engraved nautilus shell, its chambers growing in proportion", label: "Fig. 03 · Nautilus", meaning: "Growth in proportion" },
  world: { src: "/cutouts/raven.png", alt: "Engraved raven in flight, wings spread", label: "Fig. 06 · Raven", meaning: "The regular who keeps coming back" },
  closing: { src: "/cutouts/ouroboros.png", alt: "Engraved serpent curled into a ring, biting its own tail", label: "Fig. 09 · Ouroboros", meaning: "A ring that feeds itself" },
};

const KEYLINE_CUTOUTS: Record<string, { src: string; alt: string; label: string; meaning: string } | undefined> = {
  "what-is-a-product": { src: "/cutouts/telescope.png", alt: "Engraved brass telescope on a tripod", label: "Fig. 02 · Telescope", meaning: "Your product, seen from outside" },
  experience: { src: "/cutouts/hawk-moth.png", alt: "Engraved hawk moth with open wings", label: "Fig. 05 · Hawk moth", meaning: "Drawn to the light, not told to come" },
  world: { src: "/cutouts/winged-key.png", alt: "Engraved key with wings on its bow", label: "Fig. 06 · Winged key", meaning: "The invitation" },
  connect: { src: "/cutouts/anchor.png", alt: "Engraved ship’s anchor wrapped in rope", label: "Fig. 07 · Anchor", meaning: "The core that holds" },
};

const PLATE_LABELS: Record<string, string> = {
  start: "Parsons · Digital product design",
  "what-is-a-product": "Plate 02 · No rings yet",
  "three-circles": "Plate 03 · r = 1:2:3",
  product: "Plate 04 · r = 1",
  experience: "Plate 05 · r = 2 · four levers",
  world: "Plate 06 · r = 3 · field notes",
  connect: "Plate 07 · the axis",
  workshop: "Plate 08 · your canvas",
  closing: "Plate 09 · the orrery",
};

/* ── Cutout figure component ── */
function CutoutFigure({
  cutout,
  align = "right",
  height = 240,
}: {
  cutout: { src: string; alt: string; label: string; meaning: string };
  align?: "left" | "right" | "center";
  height?: number;
}) {
  const captionStyle: React.CSSProperties =
    align === "right"
      ? { display: "flex", flexDirection: "column", gap: 6, paddingBottom: 4 }
      : align === "left"
        ? { display: "flex", flexDirection: "column", gap: 6, textAlign: "right", width: 200 }
        : { display: "flex", flexDirection: "column", gap: 6, width: 236 };

  if (align === "center") {
    return (
      <figure style={{ position: "absolute", left: 0, right: 0, top: 48, margin: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 32 }}>
        <span style={{ width: 236, flex: "none" }} />
        <img className="orr-cutout" src={cutout.src} alt={cutout.alt} style={{ height, width: "auto", flex: "none" }} />
        <figcaption style={{ ...captionStyle, flex: "none" }}>
          <span className="orr-label">{cutout.label}</span>
          <span className="orr-label orr-muted">{cutout.meaning}</span>
        </figcaption>
      </figure>
    );
  }

  if (align === "left") {
    // Caption on the left, image on the right
    return (
      <figure style={{ margin: 0, display: "flex", alignItems: "flex-end", gap: 20 }}>
        <figcaption style={captionStyle}>
          <span className="orr-label">{cutout.label}</span>
          <span className="orr-label orr-muted">{cutout.meaning}</span>
        </figcaption>
        <img className="orr-cutout" src={cutout.src} alt={cutout.alt} style={{ height, width: "auto", flex: "none" }} />
      </figure>
    );
  }

  // Default: image on the left, caption on the right
  return (
    <figure style={{ margin: 0, display: "flex", alignItems: "flex-end", gap: 20 }}>
      <img className="orr-cutout" src={cutout.src} alt={cutout.alt} style={{ height, width: "auto", flex: "none" }} />
      <figcaption style={captionStyle}>
        <span className="orr-label">{cutout.label}</span>
        <span className="orr-label orr-muted">{cutout.meaning}</span>
      </figcaption>
    </figure>
  );
}

/* ── Main component ── */
type Props = {
  sectionId: string;
  viewIndex: number;
  config: LectureConfig;
  onNavigate: (sectionId: string, viewIndex: number) => void;
  onSectionNav: (sectionId: string) => void;
  onOpenPresenter?: () => void;
};

export function LiveStage({
  sectionId,
  viewIndex,
  config,
  onNavigate,
  onSectionNav,
  onOpenPresenter,
}: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const announceRef = useRef<HTMLDivElement>(null);
  const [exampleCopied, setExampleCopied] = useState(false);

  const section = useMemo(
    () => sections.find((s) => s.id === sectionId) || sections[0],
    [sectionId]
  );

  const visibleViews = useMemo(
    () => getVisibleViews(section, config),
    [section, config]
  );

  const currentView = visibleViews[viewIndex] || visibleViews[0];
  const sectionIndex = sections.findIndex((s) => s.id === section.id);
  const filledCircles = getFilledCircles(sectionIndex);

  const flatViews = useMemo(() => {
    const flat: { section: Section; view: View; viewIdx: number }[] = [];
    for (const s of sections) {
      const views = getVisibleViews(s, config);
      views.forEach((v, i) => flat.push({ section: s, view: v, viewIdx: i }));
    }
    return flat;
  }, [config]);

  const currentFlatIndex = flatViews.findIndex(
    (f) => f.section.id === section.id && f.viewIdx === viewIndex
  );

  function goNext() {
    if (currentFlatIndex < flatViews.length - 1) {
      const next = flatViews[currentFlatIndex + 1];
      onNavigate(next.section.id, next.viewIdx);
    }
  }

  function goPrev() {
    if (currentFlatIndex > 0) {
      const prev = flatViews[currentFlatIndex - 1];
      onNavigate(prev.section.id, prev.viewIdx);
    }
  }

  useKeyboardNav({
    onNext: goNext,
    onPrev: goPrev,
    onPresenter: onOpenPresenter,
    enabled: true,
  });

  useEffect(() => {
    headingRef.current?.focus();
    if (announceRef.current) {
      announceRef.current.textContent = `${section.number} ${section.navLabel}: ${currentView.headline}`;
    }
  }, [section, currentView]);

  const isFirst = currentFlatIndex === 0;
  const isLast = currentFlatIndex === flatViews.length - 1;
  const isTitleView = section.id === "start" && currentView.id === "start-title";

  /* Corner metadata */
  const sectionMeta = `${section.number} / 09 · ${section.navLabel}`;

  /* Determine the progress mark state for the current section */
  const markBroken = false; // only 07 broken state sets this, handled by ContradictionRepair internally

  return (
    <div className="live-stage" data-mode="live" data-theme="live">
      <div
        ref={announceRef}
        className="live-region"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* ── TOP LEFT: Section metadata ── */}
      <p className="orr-label orr-muted live-corner live-corner--tl" style={{ margin: 0 }}>
        {sectionMeta}
      </p>

      {/* ── TOP RIGHT: Progress mark ── */}
      <div className="live-corner live-corner--tr">
        <CircleMark
          filled={filledCircles}
          size="sm"
          broken={markBroken}
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="live-content">
        {renderViewContent(currentView, section, config, filledCircles, headingRef, exampleCopied, setExampleCopied)}
      </div>

      {/* ── BOTTOM LEFT ── */}
      <p className="orr-label orr-muted live-corner live-corner--bl" style={{ margin: 0 }}>
        {isTitleView ? "Parsons · Digital product design" : (PLATE_LABELS[section.id] || "")}
      </p>

      {/* ── BOTTOM RIGHT: Nav ── */}
      <div className="live-corner live-corner--br">
        {!isTitleView ? (
          <nav aria-label="Sections" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <SectionNav currentSectionId={section.id} onNavigate={onSectionNav} />
            <button
              className="orr-btn orr-btn--text"
              onClick={goPrev}
              disabled={isFirst}
              style={{ display: "inline-flex", alignItems: "center", color: "var(--muted)" }}
            >
              Previous
            </button>
            <button
              className="orr-btn orr-btn--text"
              onClick={goNext}
              disabled={isLast}
              style={{ display: "inline-flex", alignItems: "center", color: "var(--muted)" }}
            >
              Next
            </button>
          </nav>
        ) : (
          <span className="orr-label orr-muted">A lecture by Nancy Chen</span>
        )}
      </div>
    </div>
  );
}

/* ── View-specific rendering ── */
function renderViewContent(
  view: View,
  section: Section,
  config: LectureConfig,
  _filledCircles: ReturnType<typeof getFilledCircles>,
  headingRef: React.RefObject<HTMLHeadingElement | null>,
  exampleCopied: boolean,
  setExampleCopied: (v: boolean) => void,
) {
  const isTitleView = section.id === "start" && view.id === "start-title";

  /* ─── 01 TITLE ─── */
  if (isTitleView) {
    const cutout = SECTION_CUTOUTS.start!;
    return (
      <>
        <CutoutFigure cutout={cutout} align="center" height={248} />

        <div className="ls-title-block">
          <h1 ref={headingRef} className="ls-title" tabIndex={-1}>
            Build a world,<br />not just a product
          </h1>
          <p className="orr-muted ls-subtitle">
            How products become experiences, and experiences become worlds
          </p>
          <div className="ls-title-actions">
            <button className="orr-btn orr-btn--primary" style={{ display: "inline-flex", alignItems: "center" }}>
              Enter the world
            </button>
            <button className="orr-btn" style={{ display: "inline-flex", alignItems: "center" }}>
              Explore on your own
            </button>
            <button className="orr-btn orr-btn--text" style={{ display: "inline-flex", alignItems: "center" }}>
              Go to the workshop
            </button>
          </div>
        </div>
      </>
    );
  }

  /* ─── KEY LINE ─── */
  if (view.keyLine) {
    const cutout = KEYLINE_CUTOUTS[section.id];
    return (
      <>
        {cutout && <CutoutFigure cutout={cutout} align="center" height={240} />}

        <div className="ls-keyline-block">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <p className="orr-label" style={{ margin: 0 }}>Key line</p>
            <hr className="orr-rule" style={{ width: 96 }} />
          </div>
          <h1
            ref={headingRef}
            className="ls-keyline-text"
            tabIndex={-1}
          >
            {view.headline}
          </h1>
        </div>
      </>
    );
  }

  /* ─── 02 TOUCHPOINTS ─── */
  if (view.interaction === "touchpoints") {
    const cutout = SECTION_CUTOUTS["what-is-a-product"]!;
    return (
      <>
        {/* Left: touchpoint diagram */}
        <div className="ls-tp-left">
          <TouchpointSelect />
        </div>

        {/* Right column: cutout + headline */}
        <div className="ls-tp-right">
          <CutoutFigure cutout={cutout} align="right" height={240} />
          <h1 ref={headingRef} className="ls-tp-headline" tabIndex={-1}>
            Every touchpoint is part of the product
          </h1>
        </div>
      </>
    );
  }

  /* ─── 03 CIRCLE EXPLORER ─── */
  if (view.interaction === "circleExplorer") {
    return (
      <div className="ls-ce-layout">
        <CircleExplorer />
        {/* Nautilus cutout in bottom-right */}
        {section.id === "three-circles" && (
          <div className="ls-ce-cutout">
            <CutoutFigure
              cutout={SECTION_CUTOUTS["three-circles"]!}
              align="left"
              height={240}
            />
          </div>
        )}
      </div>
    );
  }

  /* ─── 05 BEFORE/AFTER (two shops) ─── */
  if (view.interaction === "beforeAfter") {
    return (
      <div className="ls-ba-layout">
        <BeforeAfter />
      </div>
    );
  }

  /* ─── 06 EXAMPLE CARDS ─── */
  if (view.interaction === "exampleCards") {
    const cutout = SECTION_CUTOUTS.world;
    return (
      <div className="ls-ec-layout">
        {/* Top row: reading + headline left, raven cutout right */}
        <div className="ls-ec-top">
          <div className="ls-ec-text">
            <p style={{ margin: 0, fontSize: 28, lineHeight: 1.3, fontStyle: "italic", fontVariationSettings: "'opsz' 24" }}>
              The best parts of a world are the ones you didn&rsquo;t make.
            </p>
            <h1 ref={headingRef} tabIndex={-1} style={{ margin: 0, fontSize: 64, lineHeight: 1.02, fontWeight: 400, letterSpacing: "-0.015em", fontVariationSettings: "'opsz' 72" }}>
              Look for what people made.
            </h1>
          </div>
          {cutout && (
            <CutoutFigure cutout={cutout} align="left" height={240} />
          )}
        </div>

        {/* Cards */}
        <ExampleCards config={config} />
      </div>
    );
  }

  /* ─── 07 CONTRADICTION REPAIR ─── */
  if (view.interaction === "contradiction") {
    return (
      <div className="ls-cr-layout">
        <ContradictionRepair />
      </div>
    );
  }

  /* ─── 08 WORKSHOP CANVAS ─── */
  if (view.interaction === "workshop") {
    return (
      <div className="ls-workshop-layout">
        <WorkshopCanvas config={config} />
      </div>
    );
  }

  /* ─── 09 SITE READBACK ─── */
  if (view.interaction === "siteReadBack") {
    const cutout = SECTION_CUTOUTS.closing!;
    return (
      <>
        <CutoutFigure cutout={cutout} align="center" height={240} />
        <SiteReadBack />
      </>
    );
  }

  /* ─── GENERIC CONTENT VIEW (prompts, text-only views, etc.) ─── */
  return (
    <div className="ls-generic">
      {/* Optionally show a section cutout */}
      {!view.interaction && SECTION_CUTOUTS[section.id] && (
        <div className="ls-generic-cutout">
          <CutoutFigure
            cutout={SECTION_CUTOUTS[section.id]!}
            align="right"
            height={240}
          />
        </div>
      )}

      <div className="ls-generic-text">
        <h1
          ref={headingRef}
          className="ls-generic-headline"
          tabIndex={-1}
        >
          {view.headline}
        </h1>

        {view.body && (
          <p className="ls-generic-body">{view.body}</p>
        )}

        {view.placeholder && (
          <Placeholder
            label={view.placeholder}
            fallback={view.fallback}
            config={config}
          />
        )}

        {view.id === "start-link" &&
          config.studentsOnDevices &&
          config.publicUrl && (
            <QrCode url={config.publicUrl} size={200} />
          )}

        {section.id === "closing" && view.id === "closing-readback" && (
          <button
            className="orr-btn"
            style={{ marginTop: 24 }}
            onClick={async () => {
              const result = await copyBrief(coffeeShopExample);
              if (result.ok) {
                setExampleCopied(true);
                setTimeout(() => setExampleCopied(false), 2000);
              }
            }}
          >
            {exampleCopied ? "Copied!" : "Download coffee-shop example"}
          </button>
        )}
      </div>
    </div>
  );
}
