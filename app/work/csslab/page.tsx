import ExperienceLayout from "@/components/Work/ExperienceLayout";
import GridPattern from "@/components/Work/GridPattern";

export default function CSSLab() {
  return (
    <ExperienceLayout
      bannerImage="/experience/banners/csslab.webp"
      bannerAlt="CSSLab"
      title="CSSLab"
      dateRange="JUL 2024 - PRESENT"
      siteUrl="https://csslab.cs.toronto.edu"
      backgroundPattern={<GridPattern />}
      associatedProjectIds={["maia"]}
    >
      <p>
        At the University of Toronto’s Computational Social Science Lab, I work
        closely with Dr. Ashton Anderson to lead engineering for the Maia Chess
        project, a research platform that studies human decision-making through
        chess. Maia is currently the most-played chess bot in the world, with
        more than four million games on Lichess and thousands of monthly users
        who train, analyze mistakes, drill openings, and play against it. My
        role is to take Maia beyond papers and training scripts and build the
        actual platform people interact with.
      </p>
      <p>
        When I joined the lab, Maia existed only as a collection of papers and
        Lichess bots. To help Maia reach a wider audience and to foster more
        direct engagement with our community, I led the engineering effort to
        build our in-house Maia Chess platform from the ground up. This included
        complex frontend pipelines in TypeScript and React (Next.js)for live
        gameplay, move analysis, interactive drilling tools, mistake
        classification, user accounts, and real-time model inference.
      </p>
      <p>
        On the applied machine learning side, I restructured Maia&apos;s
        inference pipeline by converting our PyTorch weights to run entirely in
        the browser using the ONNX web runtime. By building a client-side
        inference stack that runs directly on users’ machines, Maia can now
        serve millions of games with sub-second latency, without costing our lab
        a single cent for compute.
      </p>
    </ExperienceLayout>
  );
}
