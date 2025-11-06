import Image from "next/image";
import { ReactNode } from "react";
import ArrowIcon from "./ArrowIcon";

interface ProjectLayoutProps {
  bannerImage: string;
  bannerAlt: string;
  title: string;
  dateRange: string;
  github?: string;
  website?: string;
  children: ReactNode;
  images?: string[];
}

interface CallToActionProps {
  href: string;
  icon: ReactNode;
  text: string;
  borderClass?: string;
}

function CTA({ href, icon, text, borderClass }: CallToActionProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`border-border group flex flex-col items-start justify-center gap-8 bg-black/20 p-8 transition-all ${borderClass}`}
    >
      {icon}
      <div className="flex items-center justify-start gap-4">
        <span className="text-xl">{text}</span>
        <ArrowIcon className="h-3 w-3" />
      </div>
    </a>
  );
}

export default function ProjectLayout({
  bannerImage,
  bannerAlt,
  title,
  dateRange,
  github,
  website,
  children,
  images,
}: ProjectLayoutProps) {
  return (
    <div className="h-full">
      <Image
        className="h-full w-full object-cover"
        src={bannerImage}
        alt={bannerAlt}
        width={1280}
        height={300}
      />
      <div className="grid w-full grid-cols-4 items-start justify-between">
        {/* Left side - Content */}
        <div className="z-10 col-span-3 flex flex-col items-start justify-start gap-4 p-16">
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-secondary text-sm tracking-wider uppercase">
              {dateRange}
            </p>
          </div>
          <div className="text-secondary flex w-full flex-col items-start justify-start gap-4 text-lg">
            {children}
          </div>
        </div>

        {/* Right side - Links */}
        {(github || website) && (
          <div className="border-border flex h-full flex-col border-l py-16">
            {github && (
              <CTA
                href={github}
                icon={
                  <Image
                    src="/icons/github.svg"
                    alt="GitHub"
                    width={28}
                    height={28}
                  />
                }
                text="View GitHub"
                borderClass="border-y"
              />
            )}
            {website && (
              <CTA
                href={website}
                icon={
                  <div className="text-secondary">
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                }
                text="Visit Website"
                borderClass="border-b"
              />
            )}
          </div>
        )}
      </div>

      {/* Images section - only render if images exist */}
      {images && images.length > 0 && (
        <div className="border-border flex w-full flex-col items-start justify-start gap-8 border-t p-16">
          <h2 className="text-2xl font-semibold">Project Images</h2>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="border-border overflow-hidden rounded-lg border"
              >
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
