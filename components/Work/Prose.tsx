import Image from "next/image";
import { ReactNode } from "react";

/**
 * Full-width image that bleeds wider than the prose column.
 * Use for hero/feature screenshots that need visual impact.
 */
export function WideImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="-mx-6 my-2 md:-mx-[110px]">
      <div className="relative w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={900}
          height={506}
          className="h-auto w-full select-none"
          draggable={false}
        />
      </div>
      {caption && (
        <figcaption className="text-secondary mt-3 px-6 text-center text-sm md:px-0">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Standard inline image within the prose column.
 */
export function ProseImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-2">
      <div className="relative w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={680}
          height={400}
          className="h-auto w-full select-none"
          draggable={false}
        />
      </div>
      {caption && (
        <figcaption className="text-secondary mt-3 text-center text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Two images side by side. Bleeds wider than prose.
 */
export function ImageRow({
  images,
}: {
  images: { src: string; alt: string; caption?: string }[];
}) {
  return (
    <div className="-mx-6 my-2 grid grid-cols-1 gap-4 md:-mx-[110px] md:grid-cols-2">
      {images.map((img) => (
        <figure key={img.src}>
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={img.src}
              alt={img.alt}
              width={440}
              height={280}
              className="h-auto w-full select-none"
              draggable={false}
            />
          </div>
          {img.caption && (
            <figcaption className="text-secondary mt-2 text-center text-sm">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

/**
 * 2-column feature/requirement grid like the ishaand.com inspiration.
 */
export function FeatureGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-2 grid grid-cols-1 gap-8 md:grid-cols-2">
      {children}
    </div>
  );
}

export function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {icon && <div className="text-secondary mb-1">{icon}</div>}
      <h4 className="text-base font-semibold text-white">{title}</h4>
      <p className="text-secondary text-sm leading-relaxed">{description}</p>
    </div>
  );
}

/**
 * Callout / highlight block.
 */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-2 rounded-lg border border-white/10 bg-white/[0.02] px-6 py-5">
      <div className="text-secondary text-base leading-relaxed">{children}</div>
    </div>
  );
}

/**
 * Section with a heading. Used to break the prose into logical chunks.
 */
export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}
