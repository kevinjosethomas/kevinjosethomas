import Image from "next/image";
import { ReactNode } from "react";

/**
 * Full-width image that bleeds out of the prose container.
 * Use for hero/banner screenshots.
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
    <figure className="-mx-6 my-4 md:-mx-[110px]">
      <div className="relative w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={900}
          height={506}
          className="h-auto w-full object-cover select-none"
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
    <figure className="my-4">
      <div className="relative w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={680}
          height={400}
          className="h-auto w-full object-cover select-none"
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
 * Two images side by side.
 */
export function ImageRow({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  return (
    <div className="-mx-6 my-4 grid grid-cols-1 gap-4 md:-mx-[110px] md:grid-cols-2">
      {images.map((img) => (
        <div key={img.src} className="relative overflow-hidden rounded-lg">
          <Image
            src={img.src}
            alt={img.alt}
            width={440}
            height={280}
            className="h-auto w-full object-cover select-none"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Feature card grid (2x2) like ishaand.com's requirements cards.
 */
export function FeatureGrid({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="my-4 grid grid-cols-1 gap-6 md:grid-cols-2">
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
    <div className="flex flex-col gap-3">
      {icon && <div className="text-secondary">{icon}</div>}
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
    <div className="my-4 rounded-lg border border-white/10 bg-white/[0.03] p-6">
      <div className="text-secondary text-base leading-relaxed">{children}</div>
    </div>
  );
}

/**
 * Section heading used to break up the prose into sections.
 */
export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-8 flex flex-col gap-4 first:mt-0">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {children}
    </div>
  );
}
