import type { View, LectureConfig } from "../../types";
import { QrCode } from "../QrCode";
import "./views.css";
import "./FollowAlongView.css";

type Props = { view: View; config: LectureConfig };

/**
 * 01.3 Follow along — link + QR code.
 * Only rendered when `config.studentsOnDevices` is true; LiveStage is
 * responsible for skipping this view when the flag is off, but we also show
 * a muted note at the bottom in case it is ever presented.
 */
export function FollowAlongView({ config }: Props) {
  const url = config.publicUrl?.trim();
  return (
    <div className="view follow-view">
      <div className="follow-view__qr">
        <QrCode publicUrl={url || ""} size={320} />
      </div>

      <div className="follow-view__block">
        <p className="orr-label follow-view__label">Follow along</p>
        <h1 className="follow-view__h1">Open this on your laptop or phone.</h1>
        <p className="follow-view__url">{url ? url : "[public URL]"}</p>
        <p className="follow-view__sub">
          Nothing to sign up for. Your answers stay on your device.
        </p>
      </div>
    </div>
  );
}
