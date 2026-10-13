import { sections } from "../content/lecture";
import "./SectionNav.css";

type Props = {
  currentSectionId: string;
  onJump: (sectionId: string) => void;
};

const DOT_CX = [6, 26, 46, 66, 86, 106, 126, 146, 166];

/**
 * SectionNav — nine section dots (interactive). Click a dot to jump to that
 * section's first view. The dots mirror the mockups: past = `.orr-tp` (r 4.5),
 * current = `.orr-core` (r 5), future = `.orr-core--unfilled` (r 4.5).
 */
export function SectionNav({ currentSectionId, onJump }: Props) {
  const currentIndex = sections.findIndex((s) => s.id === currentSectionId);

  return (
    <div className="section-nav" role="group" aria-label="Section navigation">
      <svg
        className="orr-svg section-nav__svg"
        viewBox="0 0 172 12"
        width="172"
        height="12"
        aria-hidden="true"
      >
        {sections.map((section, i) => {
          const cx = DOT_CX[i];
          let cls = "orr-core--unfilled";
          let r = 4.5;
          if (i < currentIndex) {
            cls = "orr-tp";
            r = 4.5;
          } else if (i === currentIndex) {
            cls = "orr-core";
            r = 5;
          }
          return <circle key={section.id} className={cls} cx={cx} cy="6" r={r} />;
        })}
      </svg>
      {/* Invisible but keyboard-accessible buttons sitting over each dot */}
      <div className="section-nav__buttons">
        {sections.map((section, i) => (
          <button
            key={section.id}
            type="button"
            className="section-nav__btn"
            aria-label={`Jump to ${section.navLabel}${
              i === currentIndex ? " (current)" : ""
            }`}
            aria-current={i === currentIndex ? "step" : undefined}
            onClick={() => onJump(section.id)}
          />
        ))}
      </div>
    </div>
  );
}
