"use client";

import Project from "../components/Project";
import BCYDCContent from "./bcydc.mdx";

export default function BCYDC() {
  return (
    <Project
      name="British Columbia Youth Developer Collective"
      image="bcydc.png"
      banner="bcydc.png"
    >
      <div className="prose prose-invert max-w-none">
        <BCYDCContent />
      </div>
    </Project>
  );
}
