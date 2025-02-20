"use client";

import TurboContent from "./turbo.mdx";
import Project from "../components/Project";

export default function Turbo() {
  return (
    <Project name="Turbo" image="turbo.png" banner="turbo.svg">
      <div className="prose prose-invert max-w-none">
        <TurboContent />
      </div>
    </Project>
  );
}
