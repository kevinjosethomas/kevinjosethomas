"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TimelineEntry } from "@/data/timeline";
import { useState, useRef, useEffect, useCallback } from "react";

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [currentEntryIndex, setCurrentEntryIndex] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const openModal = useCallback(
    (entryIndex: number, imageIndex: number) => {
      setCurrentEntryIndex(entryIndex);
      setCurrentImageIndex(imageIndex);
      setSelectedImage(entries[entryIndex].images[imageIndex]);
      document.body.style.overflow = "hidden";
    },
    [entries],
  );

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  }, []);

  const showPreviousImage = useCallback(() => {
    if (currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(entries[currentEntryIndex].images[newIndex]);
    }
  }, [currentImageIndex, currentEntryIndex, entries]);

  const showNextImage = useCallback(() => {
    const maxIndex = entries[currentEntryIndex].images.length - 1;
    if (currentImageIndex < maxIndex) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(entries[currentEntryIndex].images[newIndex]);
    }
  }, [currentImageIndex, currentEntryIndex, entries]);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString
      .split("-")
      .map((num) => parseInt(num, 10));

    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const parseMarkdownLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const [_, linkText, linkUrl] = match;
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-white border-opacity-30 transition-all duration-200 hover:border-opacity-70 hover:text-white"
        >
          {linkText}
        </a>,
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = window.scrollY + viewportHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      entryRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const entryCenter = window.scrollY + rect.top + rect.height / 2;
          const distance = Math.abs(entryCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveIndex(closestIndex);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [entries.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "ArrowLeft") {
        showPreviousImage();
      } else if (e.key === "ArrowRight") {
        showNextImage();
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedImage,
    currentImageIndex,
    currentEntryIndex,
    showPreviousImage,
    showNextImage,
    closeModal,
  ]);

  return (
    <div className="mb-40 w-full">
      <h2 className="mb-8 text-2xl font-medium text-white">Timeline</h2>
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-white bg-opacity-10"></div>
        <div className="flex flex-col gap-12 md:max-w-[50vw]">
          {entries.map((entry, entryIndex) => (
            <motion.div
              key={entryIndex}
              ref={(el) => (entryRefs.current[entryIndex] = el)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: entryIndex * 0.1 }}
              className={`relative pl-12 transition-all duration-500 ${
                activeIndex === entryIndex ? "opacity-100" : "opacity-70"
              }`}
            >
              <div
                className={`absolute left-[1.0625rem] top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white transition-all duration-500 ${
                  activeIndex === entryIndex ? "scale-125" : ""
                }`}
              />
              <p className="text-xs text-white text-opacity-50">
                {formatDate(entry.date)}
              </p>
              <h3 className="mb-1 text-lg font-medium text-white">
                {entry.title}
              </h3>
              <p className="mb-3 text-sm text-white text-opacity-75">
                {parseMarkdownLinks(entry.description)}
              </p>
              {entry.images.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {entry.images.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="group relative h-28 cursor-pointer overflow-hidden transition-all duration-300"
                      onClick={() => openModal(entryIndex, imgIndex)}
                    >
                      <div className="flex h-full items-center justify-center">
                        <Image
                          src={image}
                          alt={`${entry.title} image ${imgIndex + 1}`}
                          width={0}
                          height={160}
                          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 33vw"
                          className={`h-28 w-auto object-contain transition-all duration-500 ${
                            activeIndex === entryIndex ? "" : "grayscale"
                          } group-hover:filter-none`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
            onClick={closeModal}
          >
            {currentImageIndex > 0 && (
              <motion.button
                className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white transition-all hover:bg-opacity-70 md:left-8"
                onClick={(e) => {
                  e.stopPropagation();
                  showPreviousImage();
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </motion.button>
            )}

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                width={0}
                height={0}
                sizes="90vw"
                className="max-h-[90vh] w-auto object-contain"
                style={{ maxWidth: "90vw" }}
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black bg-opacity-50 px-3 py-1 text-sm text-white">
                {currentImageIndex + 1} /{" "}
                {entries[currentEntryIndex].images.length}
              </div>

              <button
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white transition-all hover:bg-opacity-70"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>

            {currentImageIndex <
              entries[currentEntryIndex].images.length - 1 && (
              <motion.button
                className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white transition-all hover:bg-opacity-70 md:right-8"
                onClick={(e) => {
                  e.stopPropagation();
                  showNextImage();
                }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
