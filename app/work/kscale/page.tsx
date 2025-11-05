import Image from "next/image";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function KScale() {
  const associatedProjectIds = ["emx", "kos"];
  const associatedProjects = projects.filter((project) =>
    associatedProjectIds.includes(project.id),
  );

  return (
    <div>
      <Image
        className="h-full w-full object-cover"
        src="/experience/banners/k-scale.png"
        alt="KScale"
        width={1280}
        height={300}
      />
      <div className="relative flex w-full flex-col items-start justify-start gap-4 overflow-hidden p-16">
        <div className="absolute top-0 right-0 -z-10">
          <div className="relative grid grid-cols-4 gap-0">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className="border-border box-border h-[118px] w-[118px] border"
              />
            ))}

            <div
              className="absolute z-10"
              style={{
                top: "118px",
                left: "0px",
                width: "236px",
                height: "236px",
              }}
            >
              <Image
                src="/experience/assets/head.png"
                alt="Head"
                width={236}
                height={236}
                className="h-full w-full object-cover"
              />
            </div>

            <div
              className="absolute z-10"
              style={{
                top: "590px",
                left: "118px",
                width: "354px",
                height: "236px",
              }}
            >
              <Image
                src="/experience/assets/gaze.png"
                alt="Gaze"
                width={354}
                height={236}
                className="h-full w-full object-cover"
              />
            </div>

            <div
              className="pointer-events-none absolute top-0 left-0 h-full w-1/2"
              style={{
                background:
                  "radial-gradient(ellipse at top left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-full w-1/4"
              style={{
                background:
                  "radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
              }}
            />
          </div>
        </div>
        <h1 className="z-10 text-4xl font-bold">K-Scale Labs</h1>
        <div className="text-secondary z-10 flex w-full max-w-2xl flex-col items-start justify-start gap-4 text-lg">
          <p>
            When I started at K-Scale, I led the engineering effort on building
            EMX, our expressive multimodal interface for generating lifelike
            conversational behavior and facial expressions for our humanoids.
            With K-Scale AI Day approaching, I took ownership of designing and
            delivering a context-aware, multi-modal expression engine for K-Bot
            to debut at the event.{" "}
          </p>
          <p>
            During AI Day, EMX orchestrated a full pipeline of real-time
            perception and generation across audio, visual, and behavioral
            modalities. I integrated Google MediaPipe to extract facial and hand
            landmarks, enabling K-Bot to interpret user gestures and expressions
            in real time. For affective understanding, I incorporated Hume AI
            and emotion2vec to derive fine-grained emotional embeddings from
            audio, allowing K-Bot to infer user intent and modulate expression
            accordingly. For K-Bot&apos;s underlying voice response and tool
            use, I used OpenAI’s Realtime Voice API to generate low-latency
            audio responses enabling natural, interruption-capable dialogue.
          </p>
          <p>
            Later, I contributed to kos-sdk, a Python SDK wrapping our
            Rust-based robot operating system, creating the utilities for
            hundreds of educators, hobbyists, and inventors to program and
            interact with America&apos;s first open-source humanoids.
          </p>
          <p>
            Toward the end of my contract, I began exploring RL to train a
            walking policy for Z-Bot, our miniature bipedal robot. Using ksim, I
            experimented with policy training pipelines to enable more stable
            and adaptive locomotion.
          </p>
        </div>
      </div>

      {/* Associated Projects Section */}
      <div className="border-border flex w-full flex-col items-start justify-start gap-8 border-t p-16">
        <h2 className="text-2xl font-semibold">Associated Projects</h2>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {associatedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
