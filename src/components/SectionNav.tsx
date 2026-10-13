import { sections } from "../content/lecture";
import "./SectionNav.css";

type Props = {
  currentSectionId: string;
  onNavigate: (sectionId: string) => void;
};

export function SectionNav({ currentSectionId, onNavigate }: Props) {
  const currentIdx = sections.findIndex((s) => s.id === currentSectionId);

  return (
    <nav className="section-nav" aria-label="Lecture sections">
      <ol className="section-nav-list">
        {sections.map((section, idx) => {
          const isPast = idx < currentIdx;
          const isActive = section.id === currentSectionId;
          let cls = "section-dot";
          if (isActive) cls += " section-dot--active";
          else if (isPast) cls += " section-dot--past";

          return (
            <li key={section.id}>
              <button
                className={cls}
                onClick={() => onNavigate(section.id)}
                aria-label={`${section.number} ${section.navLabel}`}
                aria-current={isActive ? "step" : undefined}
              >
                <span className="section-dot-number">{section.number}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
