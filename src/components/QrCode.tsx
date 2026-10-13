import "./QrCode.css";

type Props = {
  url: string;
  /** SVG pixel size; default 256 */
  size?: number;
};

/**
 * QR Code component.
 *
 * TODO: Replace this placeholder with a proper QR encoder (e.g. `qrcode` npm
 * package). The current implementation renders a styled placeholder with the
 * URL as text. The component interface (url + size props, inline SVG output)
 * is correct and won't change.
 *
 * To swap in a real implementation:
 *   npm install qrcode @types/qrcode
 *   - Use QRCode.create(url, { errorCorrectionLevel: "M" }) to get a module matrix
 *   - Map the matrix to SVG <rect> elements the same way the placeholder does
 */
export function QrCode({ url, size = 256 }: Props) {
  // Generate a deterministic pattern from the URL so it at least looks like a QR code.
  // This is NOT scannable — it's a visual placeholder.
  const modules = generatePlaceholderMatrix(url);
  const moduleCount = modules.length;
  const cellSize = size / moduleCount;

  return (
    <div className="qr-code">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label={`QR code for ${url}`}
      >
        <rect width={size} height={size} fill="#ffffff" />
        {modules.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <rect
                key={`${x}-${y}`}
                x={x * cellSize}
                y={y * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#111111"
              />
            ) : null
          )
        )}
        {/* Finder patterns — the three corner squares that make QR codes recognizable */}
        {renderFinderPattern(0, 0, cellSize)}
        {renderFinderPattern((moduleCount - 7) * cellSize, 0, cellSize)}
        {renderFinderPattern(0, (moduleCount - 7) * cellSize, cellSize)}
      </svg>
      <p className="qr-code-url">{url}</p>
    </div>
  );
}

/** Render a 7x7 QR finder pattern (position detection pattern) at (ox, oy) */
function renderFinderPattern(ox: number, oy: number, cellSize: number) {
  const rects: React.ReactElement[] = [];
  const s = cellSize;

  // Outer 7x7 black border
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      const isOuter = i === 0 || i === 6 || j === 0 || j === 6;
      const isInner = i >= 2 && i <= 4 && j >= 2 && j <= 4;
      if (isOuter || isInner) {
        rects.push(
          <rect
            key={`fp-${ox}-${oy}-${i}-${j}`}
            x={ox + j * s}
            y={oy + i * s}
            width={s}
            height={s}
            fill="#111111"
          />
        );
      } else {
        rects.push(
          <rect
            key={`fp-${ox}-${oy}-${i}-${j}`}
            x={ox + j * s}
            y={oy + i * s}
            width={s}
            height={s}
            fill="#ffffff"
          />
        );
      }
    }
  }

  return <g key={`finder-${ox}-${oy}`}>{rects}</g>;
}

/**
 * Generate a deterministic pseudo-random boolean matrix from a string.
 * This simulates a QR code pattern for visual purposes only.
 */
function generatePlaceholderMatrix(input: string): boolean[][] {
  const size = 25; // Version 2 QR is 25x25
  const matrix: boolean[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false)
  );

  // Simple hash-based fill
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Skip finder pattern areas
      if (x < 8 && y < 8) continue;
      if (x >= size - 8 && y < 8) continue;
      if (x < 8 && y >= size - 8) continue;

      // Deterministic pseudo-random based on position + hash
      const val = Math.abs(
        ((hash * (x + 1) * 7 + (y + 1) * 13) ^ (hash >>> (x % 16))) %
          100
      );
      matrix[y][x] = val < 45;
    }
  }

  // Timing patterns (row 6 and column 6)
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  return matrix;
}
