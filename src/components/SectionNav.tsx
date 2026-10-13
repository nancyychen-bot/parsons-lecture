import { sections } from "../content/lecture";
import "./SectionNav.css";

type Props = {
  currentSectionId: string;
  onNavigate: (sectionId: string) => void;
};

export function SectionNav({ currentSectionId, onNavigate }: Props) {
  return (
    <nav className="section-nav" aria-label="Lecture sections">
      <ol className="section-nav-list">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              className={`section-dot ${section.id === currentSectionId ? "section-dot--active" : ""}`}
              onClick={() => onNavigate(section.id)}
              aria-label={`${section.number} ${section.navLabel}`}
              aria-current={section.id === currentSectionId ? "step" : undefined}
            >
              <span className="section-dot-number">{section.number}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
