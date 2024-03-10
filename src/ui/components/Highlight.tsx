export default function Highlight({
  children,
  href,
}: {
  children: string;
  href?: string;
}) {
  const Content = () => (
    <div className="group relative inline-block bg-blue-600 bg-opacity-0 hover:bg-opacity-30 transition duration-300">
      <p className="text-white text-opacity-100 z-40">{children}</p>
      <div className="absolute opacity-0 w-full group-hover:opacity-50 transition duration-300 bottom-0 h-[0.1rem] bg-blue-500" />
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank">
        <Content />
      </a>
    );
  } else {
    return <Content />;
  }
}
