import ExperienceLayout from "@/components/Work/ExperienceLayout";
import { Section } from "@/components/Work/Prose";

export default function CSSLab() {
  return (
    <ExperienceLayout
      title="CSSLab"
      siteUrl="https://csslab.cs.toronto.edu"
      associatedProjectIds={["maia"]}
      timeline="Jul 2024 - Present"
      overview="I lead engineering for the Maia Chess project at the University of Toronto's Computational Social Science Lab, building the platform for the world's most popular chess bot."
      bannerImage="/experience/banners/csslab.webp"
      bannerLogoText="CSSLab"
      team={[
        { name: "Dr. Ashton Anderson", href: "https://www.cs.toronto.edu/~ashton/" },
        { name: "CSSLab", href: "https://csslab.cs.toronto.edu" },
      ]}
    >
      <Section title="Building the Platform">
        <p>
          When I joined the lab, Maia existed only as a collection of papers and
          Lichess bots. To help Maia reach a wider audience and to foster more
          direct engagement with our community, I led the engineering effort to
          build our{" "}
          <strong>in-house Maia Chess platform from the ground up</strong>.
        </p>

        <p>
          This included complex frontend pipelines in TypeScript and React
          (Next.js) for live gameplay, move analysis, interactive drilling tools,
          mistake classification, user accounts, and real-time model inference.
        </p>

        <p>
          Maia is currently the most-played chess bot in the world, with more
          than four million games on Lichess and thousands of monthly users who
          train, analyze mistakes, drill openings, and play against it. My role
          is to take Maia beyond papers and training scripts and build the actual
          platform people interact with.
        </p>
      </Section>

      <Section title="Client-Side ML Inference">
        <p>
          On the applied machine learning side, I restructured Maia&apos;s
          inference pipeline by converting our PyTorch weights to run entirely in
          the browser using the ONNX web runtime.
        </p>

        <p>
          By building a client-side inference stack that runs directly on
          users&apos; machines, Maia can now{" "}
          <strong>
            serve millions of games with sub-second latency, without costing our
            lab a single cent for compute
          </strong>
          .
        </p>
      </Section>
    </ExperienceLayout>
  );
}
