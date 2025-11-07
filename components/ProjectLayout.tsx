import Image from "next/image";
import { ReactNode } from "react";
import ArrowIcon from "./ArrowIcon";

interface ProjectLayoutProps {
  bannerImage: string;
  bannerAlt: string;
  title: string;
  dateRange: string;
  arxiv?: string;
  github?: string;
  website?: string;
  youtube?: string;
  blog?: string;
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
      className={`border-border group flex flex-row items-center justify-start gap-4 bg-black/20 p-6 transition-all md:flex-col md:items-start md:justify-center md:gap-8 md:p-8 ${borderClass}`}
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
  arxiv,
  youtube,
  blog,
  children,
  images,
}: ProjectLayoutProps) {
  return (
    <div className="h-full">
      <div className="flex w-full flex-col md:grid md:grid-cols-4 md:items-start md:justify-between">
        <div className="z-10 flex flex-col items-start justify-start gap-4 p-6 md:col-span-3 md:p-16">
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
        {(github || website || arxiv || youtube || blog) && (
          <div className="border-border flex h-full flex-col border-l md:py-16">
            {arxiv && (
              <CTA
                href={arxiv}
                icon={
                  <Image
                    src="/icons/arxiv.svg"
                    alt="arXiv"
                    className="select-none"
                    draggable={false}
                    width={28}
                    height={28}
                  />
                }
                text="View arXiv"
                borderClass="border-y"
              />
            )}
            {github && (
              <CTA
                href={github}
                icon={
                  <Image
                    src="/icons/github.svg"
                    alt="GitHub"
                    className="select-none"
                    draggable={false}
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
                      className="h-7 w-7 select-none"
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
            {youtube && (
              <CTA
                href={youtube}
                icon={
                  <div className="text-secondary">
                    <svg
                      className="h-7 w-7 select-none"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                }
                text="Watch YouTube"
                borderClass="border-b"
              />
            )}
            {blog && (
              <CTA
                href={blog}
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
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                }
                text="Read Blog"
                borderClass="border-b"
              />
            )}
          </div>
        )}
      </div>

      {images && images.length > 0 && (
        <section className="md:border-border relative w-full overflow-hidden bg-black/10 md:mt-12 md:border-t">
          <div className="relative flex w-full flex-col items-start justify-start gap-10">
            <div className="flex w-full flex-col flex-nowrap overflow-x-auto pb-6 md:flex-row">
              {images.map((image, index) => {
                return (
                  <div
                    key={image}
                    className="border-border relative shrink-0 border-r md:py-8"
                  >
                    <div className="border-border border-y px-6 md:pr-0 md:pl-8">
                      <Image
                        src={image}
                        width={300}
                        height={300}
                        draggable={false}
                        alt={`${title} - Image ${index + 1}`}
                        className="border-border h-56 w-auto border-x object-contain select-none md:border-r-0 md:border-l"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
