export default function Highlight({
  icon,
  href,
  rotate,
  children,
  className,
}: {
  children: string;
  className?: string;
  icon?: string;
  href?: string;
  rotate?: number;
}) {
  const content = (
    <div
      className={`group relative inline-flex items-center bg-blue-600 bg-opacity-0 transition duration-300 hover:bg-opacity-30 ${
        icon && "gap-0.5"
      } ${className}`}
    >
      {icon && (
        <img
          src={icon}
          alt={icon}
          className={`mr-1 h-3 w-3 ${
            rotate === 1 ? "rotate-12" : "-rotate-12"
          } duration-200 group-hover:rotate-0`}
        />
      )}
      <p className="z-40 text-white text-opacity-100">{children}</p>
      <div className="absolute bottom-0 left-0 h-[0.1rem] w-full bg-blue-500 opacity-0 transition duration-300 group-hover:opacity-50" />
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank">
        {content}
      </a>
    );
  }

  return content;
}
