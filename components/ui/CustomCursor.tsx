"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentWidth = 12;
    let currentHeight = 12;
    let currentBorderRadius = 50;
    
    let targetX = 0;
    let targetY = 0;
    let targetWidth = 12;
    let targetHeight = 12;
    let targetBorderRadius = 50;
    
    let isOverElement = false;

    const updatePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const magneticElements = document.querySelectorAll<HTMLElement>(".cursor-magnetic");
      let hovered: HTMLElement | null = null;
      let hoveredRect: DOMRect | null = null;

      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          hovered = element;
          hoveredRect = rect;
        }
      });

      if (hovered && hoveredRect) {
        isOverElement = true;
        targetX = hoveredRect.left + hoveredRect.width / 2;
        targetY = hoveredRect.top + hoveredRect.height / 2;
        targetWidth = hoveredRect.width + 1;
        targetHeight = hoveredRect.height + 1;
        
        const computedStyle = window.getComputedStyle(hovered);
        const br = computedStyle.borderRadius;
        targetBorderRadius = br === "50%" || br === "9999px" ? 9999 : parseFloat(br) || 8;
        
        if (cursorRef.current) {
          cursorRef.current.style.mixBlendMode = "subtract";
          cursorRef.current.style.backgroundColor = "white";
          cursorRef.current.style.filter = "none";
        }
      } else {
        isOverElement = false;
        targetX = mouseX;
        targetY = mouseY;
        targetWidth = 12;
        targetHeight = 12;
        targetBorderRadius = 50;
        
        if (cursorRef.current) {
          cursorRef.current.style.mixBlendMode = "difference";
          cursorRef.current.style.backgroundColor = "#93c5fd";
          cursorRef.current.style.filter = "hue-rotate(150deg)";
        }
      }
    };

    const animate = () => {

      const ease = isOverElement ? 0.2 : 0.15;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      currentWidth += (targetWidth - currentWidth) * ease;
      currentHeight += (targetHeight - currentHeight) * ease;
      currentBorderRadius += (targetBorderRadius - currentBorderRadius) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentX}px`;
        cursorRef.current.style.top = `${currentY}px`;
        cursorRef.current.style.width = `${currentWidth}px`;
        cursorRef.current.style.height = `${currentHeight}px`;
        cursorRef.current.style.borderRadius = `${currentBorderRadius}px`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", updatePosition);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-9999"
      style={{
        transform: "translate(-50%, -50%)",
        willChange: "left, top, width, height, border-radius",
        backgroundColor: "#93c5fd",
        mixBlendMode: "difference",
        filter: "hue-rotate(150deg)",
      }}
    />
  );
}
