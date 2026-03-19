import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    p: (props) => (
      <p className="text-secondary text-base leading-relaxed" {...props} />
    ),
    h1: (props) => (
      <h1 className="mt-8 text-3xl font-bold text-white first:mt-0" {...props} />
    ),
    h2: (props) => (
      <h2
        className="mt-8 text-2xl font-semibold text-white first:mt-0"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-6 text-xl font-semibold text-white first:mt-0"
        {...props}
      />
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
    code: (props) => (
      <code
        className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm"
        {...props}
      />
    ),
    strong: (props) => <strong className="font-semibold text-white" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="border-l-2 border-white/20 pl-4"
        {...props}
      />
    ),
    hr: () => <hr className="border-border my-4 border-t" />,
  };
}
