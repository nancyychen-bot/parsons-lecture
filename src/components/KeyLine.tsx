import { Cutout } from "./Cutout";
import "./KeyLine.css";

type KeyLineSection = "02" | "04" | "05" | "06" | "07";

type KeyLineData = {
  img: string;
  alt: string;
  fig: string;
  meaning: string;
  line: string;
};

const LINES: Record<KeyLineSection, KeyLineData> = {
  "02": {
    img: "/cutouts/telescope.png",
    alt: "Engraved brass telescope on a tripod",
    fig: "Fig. 02 · Telescope",
    meaning: "Your product, seen from outside",
    line: "The interface is where the product appears. The experience is what the product actually is.",
  },
  "04": {
    img: "/cutouts/stag-beetle.png",
    alt: "Engraved stag beetle seen from above",
    fig: "Fig. 04 · Stag beetle",
    meaning: "The product, examined",
    line: "A world needs a reason to enter. Start with something useful.",
  },
  "05": {
    img: "/cutouts/hawk-moth.png",
    alt: "Engraved hawk moth with open wings",
    fig: "Fig. 05 · Hawk moth",
    meaning: "Drawn to the light, not told to come",
    line: "‘Welcoming’ is not a visual style. It is something the experience must prove.",
  },
  "06": {
    img: "/cutouts/winged-key.png",
    alt: "Engraved key with wings on its bow",
    fig: "Fig. 06 · Winged key",
    meaning: "The invitation",
    line: "You can design the invitation. You cannot script belonging.",
  },
  "07": {
    img: "/cutouts/anchor.png",
    alt: "Engraved ship’s anchor wrapped in rope",
    fig: "Fig. 07 · Anchor",
    meaning: "The core that holds",
    line: "World-building is not adding more things. It is making the things agree.",
  },
};

type KeyLineProps = {
  section: KeyLineSection;
};

/**
 * Centered KeyLine layout per DESIGN-HANDOFF §5.1.
 * Cutout 240px top-center with caption to its right, then KEY LINE label over a
 * 96px rule, then the line at 64px centered.
 */
export function KeyLine({ section }: KeyLineProps) {
  const k = LINES[section];
  return (
    <div className="baw-keyline">
      <Cutout
        src={k.img}
        alt={k.alt}
        fig={k.fig}
        meaning={k.meaning}
        variant="centered"
        height={240}
        className="baw-keyline__cutout"
      />
      <div className="baw-keyline__block">
        <div className="baw-keyline__label-group">
          <p className="orr-label baw-keyline__label">Key line</p>
          <hr className="orr-rule baw-keyline__rule" />
        </div>
        <h1 className="baw-keyline__line">{k.line}</h1>
      </div>
    </div>
  );
}
