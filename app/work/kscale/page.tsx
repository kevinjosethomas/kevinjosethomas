import ExperienceLayout from "@/components/ExperienceLayout";
import GridPattern from "@/components/patterns/GridPattern";

export default function KScale() {
  return (
    <ExperienceLayout
      bannerImage="/experience/banners/k-scale.png"
      bannerAlt="K-Scale Labs"
      title="K-Scale Labs"
      dateRange="JAN - APR 2025"
      siteUrl="https://kscale.dev"
      backgroundPattern={<GridPattern />}
      associatedProjectIds={["emx", "kos"]}
    >
      <p>
        When I started at K-Scale, I led the engineering effort on building EMX,
        our expressive multimodal interface for generating lifelike
        conversational behavior and facial expressions for our humanoids. With
        K-Scale AI Day approaching, I took ownership of designing and delivering
        a context-aware, multi-modal expression engine for K-Bot to debut at the
        event.{" "}
      </p>
      <p>
        During AI Day, EMX orchestrated a full pipeline of real-time perception
        and generation across audio, visual, and behavioral modalities. I
        integrated Google MediaPipe to extract facial and hand landmarks,
        enabling K-Bot to interpret user gestures and expressions in real time.
        For affective understanding, I incorporated Hume AI and emotion2vec to
        derive fine-grained emotional embeddings from audio, allowing K-Bot to
        infer user intent and modulate expression accordingly. For K-Bot&apos;s
        underlying voice response and tool use, I used OpenAI&apos;s Realtime
        Voice API to generate low-latency audio responses enabling natural,
        interruption-capable dialogue.
      </p>
      <p>
        Later, I contributed to kos-sdk, a Python SDK wrapping our Rust-based
        robot operating system, creating the utilities for hundreds of
        educators, hobbyists, and inventors to program and interact with
        America&apos;s first open-source humanoids.
      </p>
      <p>
        Toward the end of my contract, I began exploring RL to train a walking
        policy for Z-Bot, our miniature bipedal robot. Using ksim, I
        experimented with policy training pipelines to enable more stable and
        adaptive locomotion.
      </p>
    </ExperienceLayout>
  );
}
