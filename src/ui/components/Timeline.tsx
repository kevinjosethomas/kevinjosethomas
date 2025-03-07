"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { TimelineEntry } from "@/data/timeline";

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    // Re-enable body scrolling
    document.body.style.overflow = "auto";
  };

  return (
    <div className="w-full">
      <h2 className="mb-8 text-2xl font-medium text-white">Timeline</h2>
      <div className="relative">
        <div className="absolute left-4 top-0 mt-2 h-full w-0.5 bg-white bg-opacity-10"></div>
        <div className="flex flex-col gap-12 md:max-w-[60vw]">
          {entries.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative pl-12"
            >
              <div className="absolute left-4 top-1.5 h-2.5 w-2.5 -translate-x-[4px] rounded-full bg-white" />
              <p className="mb-1 text-sm text-white text-opacity-50">
                {new Date(entry.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h3 className="mb-1 text-xl font-medium text-white">
                {entry.title}
              </h3>
              <p className="mb-3 text-base font-light text-white text-opacity-75">
                {entry.description}
              </p>
              {entry.images.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {entry.images.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="group relative h-40 cursor-pointer overflow-hidden rounded-md transition-all duration-300"
                      onClick={() => openModal(image)}
                    >
                      <div className="flex h-full items-center justify-center">
                        <Image
                          src={image}
                          alt={`${entry.title} image ${imgIndex + 1}`}
                          width={0}
                          height={160}
                          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 33vw"
                          className="h-40 w-auto object-contain saturate-[0.15] filter transition-all duration-300 group-hover:filter-none"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
