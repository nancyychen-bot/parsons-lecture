import { Fragment } from "react";
import "./SpokenPrompt.css";

type SpokenSection = "04" | "05" | "06" | "07";

type Part = { blank: true } | { blank: false; text: string };

type PromptData = {
  parts: Part[];
  sub: string;
};

const B: Part = { blank: true };
const t = (text: string): Part => ({ blank: false, text });

const PROMPTS: Record<SpokenSection, PromptData> = {
  "04": {
    parts: [t("For "), B, t(", this product makes it possible to "), B, t(".")],
    sub: "No feature lists. No buzzwords.",
  },
  "05": {
    parts: [t("We want this moment to feel "), B, t(", so we will "), B, t(".")],
    sub: "Pick one moment. Name one feeling, then one choice that creates it.",
  },
  "06": {
    parts: [t("People can make this their own by "), B, t(".")],
    sub: "What could you invite them to contribute that you couldn’t make alone?",
  },
  "07": {
    parts: [t("Where does the experience stop proving the belief?")],
    sub: "Name the ring. Then name the repair.",
  },
};

type SpokenPromptProps = {
  section: SpokenSection;
};

/**
 * Spoken prompt — left-aligned, lower-third italic sentence with inline drawn
 * blanks. Per DESIGN-HANDOFF §5.2.
 */
export function SpokenPrompt({ section }: SpokenPromptProps) {
  const p = PROMPTS[section];
  return (
    <div className="baw-spoken">
      <div className="baw-spoken__label-group">
        <p className="orr-label orr-muted baw-spoken__label">
          Spoken prompt · say it to the person next to you, or type it in chat
        </p>
        <hr className="orr-rule baw-spoken__rule" />
      </div>
      <h1 className="baw-spoken__sentence">
        {p.parts.map((part, i) =>
          part.blank ? (
            <span
              key={i}
              aria-label="blank"
              className="baw-spoken__blank"
            />
          ) : (
            <Fragment key={i}>{part.text}</Fragment>
          ),
        )}
      </h1>
      <p className="orr-muted baw-spoken__sub">{p.sub}</p>
    </div>
  );
}
