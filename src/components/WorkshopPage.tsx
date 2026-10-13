import WorkshopCanvas from "./WorkshopCanvas";
import "./WorkshopPage.css";

export default function WorkshopPage() {
  return (
    <div data-theme="explore" className="workshop-page-root">
      <WorkshopCanvas />
    </div>
  );
}
