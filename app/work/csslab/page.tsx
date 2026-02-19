import ExperienceLayout from "@/components/Work/ExperienceLayout";
import { Section, WideImage } from "@/components/Work/Prose";

export default function CSSLab() {
  return (
    <ExperienceLayout
      bannerImage="/experience/banners/csslab.webp"
      bannerAlt="CSSLab"
      title="CSSLab"
      subtitle="Research"
      dateRange="2024 - Present"
      siteUrl="https://csslab.cs.toronto.edu"
      associatedProjectIds={["maia"]}
      timeline="July 2024 - Present"
      role="Lead Engineer, Maia Chess"
      overview="At the University of Toronto's Computational Social Science Lab, I work closely with Dr. Ashton Anderson to lead engineering for the Maia Chess project— a research platform studying human decision-making through chess. Maia is currently the most-played chess bot in the world."
      tools={["TypeScript", "React", "Next.js", "Python", "PyTorch", "ONNX Runtime"]}
    >
      <Section title="Building the Platform">
        <p className="text-secondary text-base leading-relaxed">
          When I joined the lab, Maia existed only as a collection of papers and
          Lichess bots. To help Maia reach a wider audience and to foster more
          direct engagement with our community, I led the engineering effort to
          build our <strong className="font-semibold text-white">in-house Maia Chess platform from the ground up</strong>.
        </p>

        <p className="text-secondary text-base leading-relaxed">
          This included complex frontend pipelines in TypeScript and React (Next.js)
          for live gameplay, move analysis, interactive drilling tools, mistake
          classification, user accounts, and real-time model inference.
        </p>

        <WideImage
          src="/projects/images/maia-1.webp"
          alt="Maia Chess platform interface"
          caption="The Maia Chess platform — live gameplay, analysis, and training tools"
        />

        <p className="text-secondary text-base leading-relaxed">
          Maia is currently the most-played chess bot in the world, with more than
          four million games on Lichess and thousands of monthly users who train,
          analyze mistakes, drill openings, and play against it. My role is to take
          Maia beyond papers and training scripts and build the actual platform
          people interact with.
        </p>
      </Section>

      <Section title="Client-Side ML Inference">
        <p className="text-secondary text-base leading-relaxed">
          On the applied machine learning side, I restructured Maia&apos;s
          inference pipeline by converting our PyTorch weights to run entirely in
          the browser using the ONNX web runtime.
        </p>

        <p className="text-secondary text-base leading-relaxed">
          By building a client-side inference stack that runs directly on users&apos;
          machines, Maia can now <strong className="font-semibold text-white">serve millions of games with sub-second latency,
          without costing our lab a single cent for compute</strong>.
        </p>
      </Section>
    </ExperienceLayout>
  );
}
