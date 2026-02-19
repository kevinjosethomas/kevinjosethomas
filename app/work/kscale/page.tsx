import ExperienceLayout from "@/components/Work/ExperienceLayout";
import { Section, WideImage, ProseImage } from "@/components/Work/Prose";

export default function KScale() {
  return (
    <ExperienceLayout
      bannerImage="/experience/banners/k-scale.webp"
      bannerAlt="K-Scale Labs"
      title="K-Scale Labs"
      subtitle="Work"
      dateRange="2025"
      siteUrl="https://kscale.dev"
      associatedProjectIds={["emx", "kos"]}
      timeline="4 Months, January - April 2025"
      role="Software Engineer Intern"
      overview="At K-Scale Labs, I led the engineering effort on building EMX, our expressive multimodal interface for generating lifelike conversational behavior and facial expressions for our humanoids. I also contributed to kos-sdk and explored RL for walking policies."
      tools={["Python", "TypeScript", "React", "PyTorch", "OpenAI Realtime API", "Google MediaPipe"]}
    >
      <Section title="Emotional Matrix (EMX)">
        <p className="text-secondary text-base leading-relaxed">
          When I started at K-Scale, I led the engineering effort on building EMX,
          our expressive multimodal interface for generating lifelike
          conversational behavior and facial expressions for our humanoids. With
          K-Scale AI Day approaching, I took ownership of designing and delivering
          a <strong className="font-semibold text-white">context-aware, multi-modal expression engine</strong> for K-Bot to debut at the event.
        </p>

        <p className="text-secondary text-base leading-relaxed">
          During AI Day, EMX orchestrated a full pipeline of real-time perception
          and generation across audio, visual, and behavioral modalities. I
          integrated Google MediaPipe to extract facial and hand landmarks,
          enabling K-Bot to interpret user gestures and expressions in real time.
        </p>

        <WideImage
          src="/projects/images/emx-1.webp"
          alt="EMX expression engine interface"
          caption="EMX generating lifelike facial expressions for K-Bot during AI Day"
        />

        <p className="text-secondary text-base leading-relaxed">
          For affective understanding, I incorporated Hume AI and emotion2vec to
          derive fine-grained emotional embeddings from audio, allowing K-Bot to
          infer user intent and modulate expression accordingly. For K-Bot&apos;s
          underlying voice response and tool use, I used OpenAI&apos;s Realtime
          Voice API to generate low-latency audio responses enabling natural,
          interruption-capable dialogue.
        </p>
      </Section>

      <Section title="kos-sdk">
        <p className="text-secondary text-base leading-relaxed">
          Later, I contributed to kos-sdk, a Python SDK wrapping our Rust-based
          robot operating system, creating the utilities for hundreds of
          educators, hobbyists, and inventors to <strong className="font-semibold text-white">program and interact with
          America&apos;s first open-source humanoids</strong>.
        </p>

        <ProseImage
          src="/projects/images/kos-1.webp"
          alt="kos-sdk documentation and interface"
          caption="The kos-sdk Python interface for controlling K-Scale's humanoid robots"
        />
      </Section>

      <Section title="Reinforcement Learning">
        <p className="text-secondary text-base leading-relaxed">
          Toward the end of my contract, I began exploring RL to train a walking
          policy for Z-Bot, our miniature bipedal robot. Using ksim, I
          experimented with policy training pipelines to enable more stable and
          adaptive locomotion.
        </p>
      </Section>
    </ExperienceLayout>
  );
}
