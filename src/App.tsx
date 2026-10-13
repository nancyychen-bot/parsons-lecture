import { useState } from "react";
import type { LectureConfig } from "./types";
import { defaultConfig } from "./content/lecture";
import { AppShell } from "./components/AppShell";

export default function App() {
  const [config] = useState<LectureConfig>(defaultConfig);

  return <AppShell config={config} />;
}
