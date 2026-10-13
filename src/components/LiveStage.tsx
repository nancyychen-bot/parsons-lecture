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

  return (
    <div className="live-stage" data-mode="live">
      <div
        ref={announceRef}
        className="live-region"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      <header className="live-header">
        <CircleMark
          focus={currentView.focus}
          filled={filledCircles}
          size="sm"
        />
        <span className="live-section-label">
          {section.number} {section.navLabel}
        </span>
        <span className="live-reading">{section.reading}</span>
      </header>

      <main className="live-content">
        <div className="live-view">
          {currentView.focus && (
            <div className="live-diagram">
              <CircleMark
                focus={currentView.focus}
                filled={filledCircles}
                size="lg"
              />
            </div>
          )}

          <div className="live-text">
            <h1
              ref={headingRef}
              className={`live-headline ${currentView.keyLine ? "live-headline--keyline" : ""}`}
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
        </div>
      </main>

      <footer className="live-footer">
        <button
          className="live-nav-btn"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Previous view"
        >
          ←
        </button>

        <SectionNav
          currentSectionId={section.id}
          onNavigate={onSectionNav}
        />

        <button
          className="live-nav-btn"
          onClick={goNext}
          disabled={isLast}
          aria-label="Next view"
        >
          →
        </button>
      </footer>
    </div>
  );
}
