import ExperienceLayout from "@/components/Work/ExperienceLayout";
import { Section } from "@/components/Work/Prose";

export default function KScale() {
  return (
    <ExperienceLayout
      title="K-Scale Labs"
      siteUrl="https://kscale.dev"
      associatedProjectIds={["emx", "kos"]}
      timeline="Winter 2025, Palo Alto"
      overview="At K-Scale Labs, I led the engineering effort on EMX and contributed to kos-sdk and RL walking policies for our humanoid robots."
      bannerImage="/experience/banners/k-scale.webp"
      team={[
        { name: "Chris Thomas", href: "https://chris.vg/" },
        { name: "Wesley Maa", href: "https://wesleymaa.com/" },
        { name: "Aaron Xie", href: "https://aaronxie.com/" },
        { name: "Michael Lutz", href: "https://michael-lutz.github.io/" },
      ]}
      teamSuffix="& more..."
    >
      <Section title="Emotional Matrix (EMX)">
        <p>
          When I started at K-Scale, I led the engineering effort on building
          EMX, our expressive multimodal interface for generating lifelike
          conversational behavior and facial expressions for our humanoids. With
          K-Scale AI Day approaching, I took ownership of designing and
          delivering a{" "}
          <strong>context-aware, multi-modal expression engine</strong> for K-Bot
          to debut at the event.
        </p>

        <p>
          During AI Day, EMX orchestrated a full pipeline of real-time perception
          and generation across audio, visual, and behavioral modalities. I
          integrated Google MediaPipe to extract facial and hand landmarks,
          enabling K-Bot to interpret user gestures and expressions in real time.
        </p>

        <p>
          For affective understanding, I incorporated Hume AI and emotion2vec to
          derive fine-grained emotional embeddings from audio, allowing K-Bot to
          infer user intent and modulate expression accordingly. For
          K-Bot&apos;s underlying voice response and tool use, I used
          OpenAI&apos;s Realtime Voice API to generate low-latency audio
          responses enabling natural, interruption-capable dialogue.
        </p>
      </Section>

      <Section title="kos-sdk">
        <p>
          Later, I contributed to kos-sdk, a Python SDK wrapping our Rust-based
          robot operating system, creating the utilities for hundreds of
          educators, hobbyists, and inventors to{" "}
          <strong>
            program and interact with America&apos;s first open-source humanoids
          </strong>
          .
        </p>
      </Section>

      <Section title="Reinforcement Learning">
        <p>
          Toward the end of my contract, I began exploring RL to train a walking
          policy for Z-Bot, our miniature bipedal robot. Using ksim, I
          experimented with policy training pipelines to enable more stable and
          adaptive locomotion.
        </p>
      </Section>
    </ExperienceLayout>
  );
}
