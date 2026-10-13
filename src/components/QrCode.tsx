import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Placeholder } from "./Placeholder";
import "./QrCode.css";

type QrCodeProps = {
  publicUrl: string;
  size?: number; // px, default 320
  label?: string; // alt / aria text
};

/**
 * Inline SVG QR code generated from publicUrl.
 *
 * We ask the `qrcode` package to emit an SVG string, then inject it directly.
 * No network calls, no runtime image assets.
 *
 * With an empty / falsy `publicUrl`, renders a dashed Placeholder — honest
 * missing content per PRD §7.
 */
export function QrCode({
  publicUrl,
  size = 320,
  label = "QR code to this lecture site",
}: QrCodeProps) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    if (!publicUrl) {
      setSvg(null);
      return;
    }
    let cancelled = false;
    QRCode.toString(publicUrl, {
      type: "svg",
      margin: 0,
      errorCorrectionLevel: "M",
      color: { dark: "#ffffff", light: "#00000000" },
    })
      .then((out) => {
        if (!cancelled) setSvg(out);
      })
      .catch(() => {
        if (!cancelled) setSvg(null);
      });
    return () => {
      cancelled = true;
    };
  }, [publicUrl]);

  if (!publicUrl) {
    return (
      <Placeholder
        label="QR code — set publicUrl in LectureConfig"
        width={size}
        height={size}
      />
    );
  }

  if (!svg) {
    // Transient: generating. Keep the same box so layout doesn't jump.
    return (
      <div
        className="baw-qr baw-qr--loading"
        style={{ width: size, height: size }}
        aria-label={label}
        role="img"
      />
    );
  }

  return (
    <div
      className="baw-qr"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
