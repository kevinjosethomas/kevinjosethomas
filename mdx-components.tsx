import type { MDXComponents } from "mdx/types";
import { highlight } from "sugar-high";
import { ReactNode } from "react";
import {
  FeatureGrid,
  Feature,
  VoiceIcon,
  VisionIcon,
  EmotionIcon,
} from "@/components/MDX/FeatureGrid";
import { V0AutoConstraints } from "@/components/MDX/V0AutoConstraints";
import { ZoomableImage } from "@/components/MDX/ZoomableImage";

function slugify(children: ReactNode): string {
  const text = typeof children === "string"
    ? children
    : Array.isArray(children)
      ? children.map((c) => (typeof c === "string" ? c : "")).join("")
      : "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    p: (props) => (
      <p className="text-secondary text-base leading-relaxed" {...props} />
    ),
    h1: (props) => (
      <h1 className="mt-8 text-3xl font-bold text-white first:mt-0" {...props} />
    ),
    h2: ({ children, ...props }) => (
      <h2
        id={slugify(children)}
        className="mt-20 text-2xl font-semibold text-white first:mt-0"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        id={slugify(children)}
        className="mt-6 text-xl font-semibold text-white/50 first:mt-0"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        id={slugify(children)}
        className="mt-6 text-lg font-semibold text-white/40 first:mt-0"
        {...props}
      >
        {children}
      </h4>
    ),
    ul: (props) => <ul className="list-disc pl-6" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6" {...props} />,
    li: (props) => (
      <li className="text-secondary text-base leading-relaxed" {...props} />
    ),
    a: (props) => (
      <a
        className="text-white underline decoration-white/40 underline-offset-2 transition-colors hover:decoration-white"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="overflow-x-auto rounded-lg border border-white/10 bg-[#0d1117] p-4 text-sm leading-snug"
        {...props}
      />
    ),
    code: ({ children, className, ...props }) => {
      const isInline = !className?.includes("language-");
      if (isInline) {
        return (
          <code
            className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm"
            {...props}
          >
            {children}
          </code>
        );
      }
      const codeHTML = highlight(String(children));
      return (
        <code
          className="font-mono"
          dangerouslySetInnerHTML={{ __html: codeHTML }}
          {...props}
        />
      );
    },
    strong: (props) => <strong className="font-semibold text-white" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="border-l-2 border-white/20 pl-4"
        {...props}
      />
    ),
    hr: () => <hr className="border-border my-4 border-t" />,
    img: ({ src, alt }) => (
      <ZoomableImage
        src={src as string}
        alt={(alt as string) ?? ""}
        className="my-4 h-56 w-auto shrink-0 rounded-lg object-cover"
      />
    ),
    ImageRow: ({ children }: { children: React.ReactNode }) => (
      <div className="mt-12 mb-2 md:-mr-[calc((100vw-720px)/2-3rem)]">
        <div className="flex gap-4 overflow-x-auto pr-4 [&_img]:my-0 [&_img]:h-56 [&_img]:max-h-56 [&_img]:w-auto [&_img]:shrink-0">
          {children}
        </div>
      </div>
    ),
    FullWidthImage: ({ src, alt }: { src: string; alt: string }) => (
      <div className="my-12 lg:-mx-24 xl:-mx-40">
        <ZoomableImage
          src={src}
          alt={alt}
          className="block w-full select-none rounded-lg"
        />
      </div>
    ),
    FeatureGrid,
    Feature,
    VoiceIcon,
    VisionIcon,
    EmotionIcon,
    V0AutoConstraints,
  };
}
