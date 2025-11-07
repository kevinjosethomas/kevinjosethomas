import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    p: (props) => <p className="text-secondary text-lg" {...props} />,
    h1: (props) => <h1 className="text-3xl font-bold" {...props} />,
    h2: (props) => <h2 className="text-2xl font-semibold" {...props} />,
    h3: (props) => <h3 className="text-xl font-semibold" {...props} />,
    ul: (props) => <ul className="list-disc pl-6" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6" {...props} />,
    li: (props) => <li className="text-secondary text-lg" {...props} />,
    a: (props) => (
      <a
        className="text-white underline transition-colors hover:text-white/80"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm"
        {...props}
      />
    ),
  };
}
