import "./Cutout.css";

type CutoutVariant = "right" | "left" | "centered";

type CutoutProps = {
  src: string;
  alt: string;
  fig: string;
  meaning: string;
  variant?: CutoutVariant;
  height?: number; // defaults to 240
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Die-cut engraving with museum-style two-line caption.
 * Live mode requires 240px min height. Caption position depends on variant:
 *   - right (default): caption sits to the right of the image
 *   - left: caption sits to the left of the image
 *   - centered: caption sits to the right in a centered-figure layout (per Main / KeyLine)
 */
export function Cutout({
  src,
  alt,
  fig,
  meaning,
  variant = "right",
  height = 240,
  className,
  style,
}: CutoutProps) {
  const safeHeight = Math.max(240, height);
  return (
    <figure
      className={`baw-cutout baw-cutout--${variant}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {variant === "left" ? (
        <>
          <figcaption className="baw-cutout__caption baw-cutout__caption--left">
            <span className="orr-label">{fig}</span>
            <span className="orr-label orr-muted">{meaning}</span>
          </figcaption>
          <img
            className="orr-cutout baw-cutout__img"
            src={src}
            alt={alt}
            style={{ height: safeHeight }}
          />
        </>
      ) : variant === "centered" ? (
        <>
          <span className="baw-cutout__spacer" aria-hidden="true" />
          <img
            className="orr-cutout baw-cutout__img"
            src={src}
            alt={alt}
            style={{ height: safeHeight }}
          />
          <figcaption className="baw-cutout__caption baw-cutout__caption--centered">
            <span className="orr-label">{fig}</span>
            <span className="orr-label orr-muted">{meaning}</span>
          </figcaption>
        </>
      ) : (
        <>
          <img
            className="orr-cutout baw-cutout__img"
            src={src}
            alt={alt}
            style={{ height: safeHeight }}
          />
          <figcaption
            className={`baw-cutout__caption baw-cutout__caption--${variant}`}
          >
            <span className="orr-label">{fig}</span>
            <span className="orr-label orr-muted">{meaning}</span>
          </figcaption>
        </>
      )}
    </figure>
  );
}
