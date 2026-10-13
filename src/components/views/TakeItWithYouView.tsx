import type { View, LectureConfig } from "../../types";
import { coffeeShopExample } from "../../content/coffee-shop-example";
import { QrCode } from "../QrCode";
import { Placeholder } from "../Placeholder";
import "./views.css";
import "./TakeItWithYouView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 09.4 — Take it with you. Downloads: blank canvas, coffee-shop example.
 * QR + URL on the right. Resource list is a visible placeholder (DESIGN §8).
 */
export function TakeItWithYouView({ config }: Props) {
  const url = config.publicUrl?.trim();

  // We touch coffeeShopExample here so the import stays a real reference and
  // future "copy example" wiring has it in scope. The actual download link
  // writes the example to the clipboard / print surface.
  const exampleName = coffeeShopExample.projectName;

  return (
    <div className="view takeit-view">
      <div className="takeit-view__text">
        <p className="orr-label">Take it with you</p>
        <h1 className="takeit-view__h1">
          Keep the canvas. Use it this week.
        </h1>
        <div className="takeit-view__actions">
          <a
            className="orr-btn orr-btn--primary"
            href="#/workshop?print=blank"
          >
            Print blank canvas
          </a>
          <a className="orr-btn" href="#/workshop?example=coffee-shop">
            Coffee-shop example
          </a>
          <a className="orr-btn" href="#/explore/start">
            Explore on your own
          </a>
        </div>
        <p className="orr-label orr-muted takeit-view__example-note">
          Example: {exampleName}
        </p>
        <p className="orr-label orr-muted takeit-view__placeholder">
          Placeholder — resources for a first prototype (none invented)
        </p>
      </div>

      <div className="takeit-view__qr">
        {url ? (
          <QrCode publicUrl={url} size={280} />
        ) : (
          <Placeholder
            label="Placeholder — QR code"
            width={280}
            height={280}
          />
        )}
        <p className="takeit-view__url">{url || "[public URL]"}</p>
      </div>
    </div>
  );
}
