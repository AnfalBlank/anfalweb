"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ProfileSliderProps {
  images?: string[];
}

export const ProfileSlider = ({ images = [] }: ProfileSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const hasImages = images.length > 0;
  const isSlidable = images.length > 1;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
      };
    },
  };

  return (
    <div className="relative w-full h-full bg-white/5 flex items-center justify-center overflow-hidden">
      {hasImages ? (
        <>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 w-full h-full"
              drag={isSlidable ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000) {
                  paginate(1);
                } else if (swipe > 10000) {
                  paginate(-1);
                }
              }}
            >
              <Image
                src={images[currentIndex]}
                alt={`Profile image ${currentIndex + 1}`}
                fill
                className="object-cover"
                unoptimized // fallback if using external URLs temporarily
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {isSlidable && (
            <>
              {/* Left Arrow */}
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 z-10"
                onClick={() => paginate(-1)}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Right Arrow */}
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 z-10"
                onClick={() => paginate(1)}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dotted Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentIndex
                        ? "w-4 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Inner gradient decoration */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-0" />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-white/30 h-full">
          <ImageIcon className="w-12 h-12 mb-3" />
          <p className="text-sm font-mono tracking-wider">NO PHOTO</p>
          <p className="text-xs mt-1 px-8 text-center">Add PNG images to slide</p>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="h-1.5 w-full bg-white/10 rounded-full mb-2">
              <div className="h-full w-3/4 bg-white/40 rounded-full" />
            </div>
            <p className="text-xs text-gray-500 font-mono">Profile Photo</p>
          </div>
        </div>
      )}
    </div>
  );
};
