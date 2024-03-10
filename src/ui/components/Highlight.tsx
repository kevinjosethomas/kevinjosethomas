export default function Highlight({
  children,
  href,
}: {
  children: string;
  href?: string;
}) {
  const Content = () => (
    <div className="group relative inline-block bg-blue-600 bg-opacity-0 transition duration-300 hover:bg-opacity-30">
      <p className="z-40 text-white text-opacity-100">{children}</p>
      <div className="absolute bottom-0 h-[0.1rem] w-full bg-blue-500 opacity-0 transition duration-300 group-hover:opacity-50" />
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
