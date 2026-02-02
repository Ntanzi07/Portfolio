"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: any;
    let rafId: number;

    async function init() {
      const module = await import("@studio-freight/lenis").catch(() => null);
      const Lenis = module ? module.default : null;
      if (!Lenis) return;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }

    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis && lenis.destroy) lenis.destroy();
    };
  }, []);

  return null;
}
