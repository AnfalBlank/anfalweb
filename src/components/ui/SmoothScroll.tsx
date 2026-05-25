"use client";

import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Disable smooth scroll on mobile/touch devices
    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;
    if (isMobile) return;

    const lenis = new Lenis({
      lerp: 0.1, 
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
