"use client";

import Project from "../components/Project";
import ChromeAIContent from "./chromeai.mdx";

export default function ChromeAI() {
  return (
    <Project name="ChromeAI" image="chromeai.png" banner="chromeai.png">
      <div className="prose prose-invert max-w-none">
        <ChromeAIContent />
      </div>
    </Project>
  );
}
