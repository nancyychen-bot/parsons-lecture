import { useRef, useEffect, useMemo } from "react";
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
import { useKeyboardNav } from "../hooks/useKeyboardNav";
import "./LiveStage.css";

/* Cutout data per section */
const SECTION_CUTOUTS: Record<string, { src: string; alt: string; label: string; meaning: string } | undefined> = {
  start: { src: "/cutouts/jupiter.png", alt: "Engraved Jupiter with its moons", label: "FIG. 01 · JUPITER", meaning: "A WORLD WITH ITS OWN MOONS" },
  "what-is-a-product": { src: "/cutouts/telescope.png", alt: "Engraved refracting telescope", label: "FIG. 02 · TELESCOPE", meaning: "YOUR PRODUCT, SEEN FROM OUTSIDE" },
  "three-circles": { src: "/cutouts/nautilus.png", alt: "Engraved nautilus shell cross-section", label: "FIG. 03 · NAUTILUS", meaning: "GROWTH IN PROPORTION" },
  world: { src: "/cutouts/raven.png", alt: "Engraved raven in flight, wings spread", label: "FIG. 06 · RAVEN", meaning: "THE REGULAR WHO KEEPS COMING BACK" },
  closing: { src: "/cutouts/ouroboros.png", alt: "Engraved ouroboros serpent forming a ring", label: "FIG. 09 · OUROBOROS", meaning: "A RING THAT FEEDS ITSELF" },
};

/* Key-line cutouts (per section) */
const KEYLINE_CUTOUTS: Record<string, { src: string; alt: string; label: string; meaning: string } | undefined> = {
  "what-is-a-product": { src: "/cutouts/telescope.png", alt: "Engraved refracting telescope", label: "FIG. 02 · TELESCOPE", meaning: "YOUR PRODUCT, SEEN FROM OUTSIDE" },
  experience: { src: "/cutouts/hawk-moth.png", alt: "Engraved hawk moth in flight", label: "FIG. 05 · HAWK MOTH", meaning: "DRAWN TO THE LIGHT, NOT TOLD TO COME" },
  world: { src: "/cutouts/winged-key.png", alt: "Engraved key with wings", label: "FIG. 06 · WINGED KEY", meaning: "THE INVITATION" },
  connect: { src: "/cutouts/anchor.png", alt: "Engraved anchor", label: "FIG. 07 · ANCHOR", meaning: "THE CORE THAT HOLDS" },
};

/* Plate labels per section */
const PLATE_LABELS: Record<string, string> = {
  start: "PARSONS · DIGITAL PRODUCT DESIGN",
  "what-is-a-product": "PLATE 02 · R = 1 · TOUCHPOINTS",
  "three-circles": "PLATE 03 · R = 1:2:3 · THE MODEL",
  product: "PLATE 04 · R = 1 · THE CORE",
  experience: "PLATE 05 · R = 2 · FOUR LEVERS",
  world: "PLATE 06 · R = 3 · FIELD NOTES",
  connect: "PLATE 07 · THE AXIS",
  workshop: "PLATE 08 · YOUR CANVAS",
  closing: "PLATE 09 · THE ORRERY",
};

/* Centered layouts: Title (01), Key Lines (all sections), Site Readback (09) */
function isCenteredView(view: View, sectionId: string): boolean {
  if (view.keyLine) return true;
  if (sectionId === "start" && view.id === "start-title") return true;
  if (view.interaction === "siteReadBack") return true;
  return false;
}

function renderInteraction(
  interaction: NonNullable<View["interaction"]>,
  config: LectureConfig
) {
  switch (interaction) {
    case "touchpoints":
      return <TouchpointSelect />;
    case "circleExplorer":
      return <CircleExplorer />;
    case "beforeAfter":
      return <BeforeAfter />;
    case "exampleCards":
      return <ExampleCards config={config} />;
    case "contradiction":
      return <ContradictionRepair />;
    case "workshop":
      return <WorkshopCanvas config={config} />;
    case "siteReadBack":
      return <SiteReadBack />;
    default:
      return (
        <Placeholder
          label={`Interactive component: ${interaction}`}
          config={config}
        />
      );
  }
}

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
  const centered = isCenteredView(currentView, section.id);

  /* Determine cutout for this view */
  const cutout = currentView.keyLine
    ? KEYLINE_CUTOUTS[section.id]
    : (currentView.id === "start-title" || currentView.interaction === "siteReadBack")
      ? SECTION_CUTOUTS[section.id]
      : (!currentView.interaction ? SECTION_CUTOUTS[section.id] : undefined);

  /* Corner metadata */
  const sectionMeta = `${section.number} / 09 · ${section.navLabel.toUpperCase()}`;
  const plateLabel = PLATE_LABELS[section.id] || "";
  const isTitleView = section.id === "start" && currentView.id === "start-title";

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
      <div className="live-corner live-corner--tl">
        <span className="orr-label orr-muted">{sectionMeta}</span>
      </div>

      {/* ── TOP RIGHT: Progress mark ── */}
      <div className="live-corner live-corner--tr">
        <CircleMark
          focus={currentView.focus}
          filled={filledCircles}
          size="sm"
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className={`live-content ${centered ? "live-content--centered" : "live-content--offcenter"}`}>
        <div className={`live-view ${centered ? "live-view--centered" : "live-view--offcenter"}`}>
          {/* Cutout (centered views: above content; off-center: not shown here, shown inline) */}
          {centered && cutout && (
            <figure className="live-cutout-figure live-cutout-figure--centered">
              <img
                className="orr-cutout"
                src={cutout.src}
                alt={cutout.alt}
                style={{ height: 240 }}
              />
              <figcaption>
                <span className="orr-label">{cutout.label}</span>
                <span className="orr-label orr-muted">{cutout.meaning}</span>
              </figcaption>
            </figure>
          )}

          {/* Key line layout */}
          {currentView.keyLine && (
            <div className="live-keyline">
              <span className="orr-label orr-muted">KEY LINE</span>
              <hr className="live-keyline-rule" />
              <h1
                ref={headingRef}
                className="live-headline live-headline--keyline"
                tabIndex={-1}
              >
                {currentView.headline}
              </h1>
            </div>
          )}

          {/* Non-keyline content */}
          {!currentView.keyLine && (
            <>
              {/* Off-center: diagram left */}
              {!centered && currentView.focus && (
                <div className="live-diagram">
                  <CircleMark
                    focus={currentView.focus}
                    filled={filledCircles}
                    size="lg"
                  />
                </div>
              )}

              {/* Off-center: cutout in right column area */}
              {!centered && cutout && !currentView.interaction && (
                <figure className="live-cutout-figure live-cutout-figure--side">
                  <img
                    className="orr-cutout"
                    src={cutout.src}
                    alt={cutout.alt}
                    style={{ height: 240 }}
                  />
                  <figcaption>
                    <span className="orr-label">{cutout.label}</span>
                    <span className="orr-label orr-muted">{cutout.meaning}</span>
                  </figcaption>
                </figure>
              )}

              <div className="live-text">
                <h1
                  ref={headingRef}
                  className="live-headline"
                  tabIndex={-1}
                >
                  {currentView.headline}
                </h1>

                {currentView.body && (
                  <p className="live-body">{currentView.body}</p>
                )}

                {currentView.placeholder && (
                  <Placeholder
                    label={currentView.placeholder}
                    fallback={currentView.fallback}
                    config={config}
                  />
                )}

                {currentView.id === "start-link" &&
                  config.studentsOnDevices &&
                  config.publicUrl && (
                    <QrCode url={config.publicUrl} size={200} />
                  )}

                {currentView.interaction && (
                  <div className="live-interaction-slot" role="region" aria-label="Interactive element">
                    {renderInteraction(currentView.interaction, config)}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* ── BOTTOM LEFT: Plate label ── */}
      <div className="live-corner live-corner--bl">
        <span className="orr-label orr-muted">
          {isTitleView ? "PARSONS · DIGITAL PRODUCT DESIGN" : plateLabel}
        </span>
      </div>

      {/* ── BOTTOM RIGHT: Nav dots + Previous/Next ── */}
      <div className="live-corner live-corner--br">
        {!isTitleView && (
          <div className="live-nav">
            <SectionNav
              currentSectionId={section.id}
              onNavigate={onSectionNav}
            />
            <div className="live-nav-btns">
              <button
                className="orr-btn orr-btn--text orr-muted"
                onClick={goPrev}
                disabled={isFirst}
                aria-label="Previous view"
              >
                Previous
              </button>
              <button
                className="orr-btn orr-btn--text orr-muted"
                onClick={goNext}
                disabled={isLast}
                aria-label="Next view"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {isTitleView && (
          <span className="orr-label orr-muted">A LECTURE BY NANCY CHEN</span>
        )}
      </div>
    </div>
  );
}
