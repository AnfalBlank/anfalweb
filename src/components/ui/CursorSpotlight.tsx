"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CursorSpotlight = () => {
  const [isMobile, setIsMobile] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const mobile = window.innerWidth < 768 || "ontouchstart" in window;
    setIsMobile(mobile);
    if (mobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Don't render anything on mobile
  if (isMobile) return null;

  return (
    <>
      {/* Main spotlight blob following cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full z-10"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Static ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-[20%] w-[600px] h-[400px] bg-white/[0.025] blur-[120px] rounded-full" />
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-white/[0.02] blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-white/[0.015] blur-[120px] rounded-full" />
      </div>
    </>
  );
};
