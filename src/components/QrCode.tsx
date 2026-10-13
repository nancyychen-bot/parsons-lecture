import { useEffect, useState } from "react";
import QRCodeLib from "qrcode";
import "./QrCode.css";

type Props = {
  url: string;
  /** SVG pixel size; default 256 */
  size?: number;
};

/**
 * QR Code component — generates a real, scannable QR code as an inline SVG.
 * Uses the `qrcode` npm package for local generation (no network request).
 * Falls back to showing the URL as text if encoding fails.
 */
export function QrCode({ url, size = 256 }: Props) {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    QRCodeLib.toString(url, {
      type: "svg",
      width: size,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#111111", light: "#ffffff" },
    })
      .then((svg) => {
        if (!cancelled) {
          setSvgMarkup(svg);
          setError(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url, size]);

  if (error || (!svgMarkup && !url)) {
    return (
      <div className="qr-code">
        <p className="qr-code-url">{url}</p>
      </div>
    );
  }

  if (!svgMarkup) {
    return (
      <div className="qr-code" style={{ width: size, height: size }} />
    );
  }

  return (
    <div className="qr-code">
      <div
        role="img"
        aria-label={`QR code for ${url}`}
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
      <p className="qr-code-url">{url}</p>
    </div>
  );
}
