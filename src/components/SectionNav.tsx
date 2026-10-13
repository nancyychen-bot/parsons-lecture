import { sections } from "../content/lecture";
import "./SectionNav.css";

type Props = {
  currentSectionId: string;
  onNavigate: (sectionId: string) => void;
};

/**
 * Nine section dots rendered as an inline SVG — matching the mockup exactly.
 *
 * viewBox="0 0 172 12", dots spaced 20px apart starting at cx=6.
 *  - Past sections: .orr-tp (outlined, ink stroke, ground fill)
 *  - Current section: .orr-core with r=5 (filled, slightly larger)
 *  - Future sections: .orr-core--unfilled with r=4.5 (faint outline)
 *
 * Each dot is clickable for navigation.
 */
export function SectionNav({ currentSectionId, onNavigate }: Props) {
  const currentIdx = sections.findIndex((s) => s.id === currentSectionId);

  return (
    <nav className="section-nav" aria-label="Sections">
      <svg
        className="orr-svg"
        viewBox="0 0 172 12"
        width="172"
        height="12"
        aria-hidden="true"
      >
        {sections.map((section, idx) => {
          const cx = 6 + idx * 20;
          const isPast = idx < currentIdx;
          const isCurrent = idx === currentIdx;

          let cls: string;
          let r: number;

          if (isCurrent) {
            cls = "orr-core";
            r = 5;
          } else if (isPast) {
            cls = "orr-tp";
            r = 4.5;
          } else {
            cls = "orr-core--unfilled";
            r = 4.5;
          }

          return (
            <circle
              key={section.id}
              className={cls}
              cx={cx}
              cy={6}
              r={r}
              style={{ cursor: "pointer" }}
              onClick={() => onNavigate(section.id)}
              role="button"
              tabIndex={-1}
              aria-label={`${section.number} ${section.navLabel}`}
            />
          );
        })}
      </svg>
    </nav>
  );
}
