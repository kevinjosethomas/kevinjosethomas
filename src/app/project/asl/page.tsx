"use client";

import ASLContent from "./asl.mdx";
import Project from "../components/Project";

export default function ASL() {
  return (
    <Project name="Sign Language Translation" image="asl.png" banner="asl.png">
      <div className="prose prose-invert max-w-none">
        <ASLContent />
      </div>
    </Project>
  );
}
