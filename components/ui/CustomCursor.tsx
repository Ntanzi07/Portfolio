"use client";

import { useEffect, useRef, useState } from "react";

interface CloneData {
  element: HTMLElement;
  clone: HTMLDivElement;
  currentScale: number;
  currentOpacity: number;
  currentX: number;
  currentY: number;
}

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const paddingRef = useRef<number>(40);
  const mouseInsideRef = useRef<boolean>(true);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let cursorScale = 1;
    let targetCursorScale = 1;
    let cursorOpacity = 1;
    let currentWidth = 20;
    let currentHeight = 20;
    let targetWidth = 20;
    let targetHeight = 20;

    const clonesMap = new Map<HTMLElement, CloneData>();

    const updateClones = () => {
      const magneticElements = document.querySelectorAll<HTMLElement>(".cursor-magnetic");

      // Remover clones de elementos que não existem mais
      clonesMap.forEach((data, element) => {
        if (!document.body.contains(element)) {
          data.clone.remove();
          clonesMap.delete(element);
        }
      });

      // Criar clones para novos elementos
      magneticElements.forEach((element) => {
        if (!clonesMap.has(element)) {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const clone = document.createElement("div");
          clone.style.position = "absolute";
          clone.style.backgroundColor = "var(--color-blue-300)";
          clone.className = "hue-rotate-150";
          clone.style.borderRadius = window.getComputedStyle(element).borderRadius;
          clone.style.pointerEvents = "none";
          clone.style.opacity = "0";
          clone.style.willChange = "transform, opacity";
          clone.style.transformOrigin = "center";

          containerRef.current?.appendChild(clone);

          clonesMap.set(element, {
            element,
            clone,
            currentScale: 0.3,
            currentOpacity: 0,
            currentX: centerX,
            currentY: centerY,
          });
        }
      });
    };

    updateClones();

    const updatePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleDocumentMouseOut = (e: MouseEvent) => {
      // Se relatedTarget for null, o ponteiro saiu da janela
      const related = (e as any).relatedTarget as Node | null;
      if (!related) {
        mouseInsideRef.current = false;
      }
    };

    const handleDocumentMouseEnter = () => {
      mouseInsideRef.current = true;
    };

    const animate = () => {

      // Verificar novos elementos a cada frame
      updateClones();

      // Verificar se cursor está perto de algum elemento magnético
      let nearMagnetic = false;
      let isOverElement = false;
      let targetCenterX = mouseX;
      let targetCenterY = mouseY;
      let closestDistance = Infinity;

      // Primeiro passe: detectar se o cursor está SOBRE algum elemento (sem padding)
      const clonesArray = Array.from(clonesMap.values());
      let hoveredData: CloneData | null = null;
      for (const data of clonesArray) {
        const rect = data.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const isOver =
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom;

        if (isOver) {
          isOverElement = true;
          hoveredData = data;
          targetCenterX = centerX;
          targetCenterY = centerY;
          break;
        }
      }

      // Definir padding efetivo: desativado (0) se estiver SOBRE algum elemento
      const effectivePadding = isOverElement ? 0 : paddingRef.current;

      // Segunda passe: calcular isNear e animar clones usando o padding efetivo
      for (const data of clonesArray) {
        const rect = data.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calcular distância do mouse ao centro do elemento
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const isOver = hoveredData === data;

        // Detectar se mouse está PERTO do elemento (com padding) - para animar clone
        const isNear =
          mouseX >= rect.left - effectivePadding &&
          mouseX <= rect.right + effectivePadding &&
          mouseY >= rect.top - effectivePadding &&
          mouseY <= rect.bottom + effectivePadding;

        if (isNear) {
          nearMagnetic = true;
          closestDistance = Math.min(closestDistance, distance);
        }

        const targetScale = isNear ? 1 : 0.3;
        const targetOpacity = isNear ? 1 : 0;

        // Calcular posição do clone
        let targetX, targetY;
        if (isOver) {
          if (isOver) {
            // Pull
            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            const maxPull = 10; // pixels por eixo

            const pullX = Math.max(-maxPull, Math.min(dx, maxPull));
            const pullY = Math.max(-maxPull, Math.min(dy, maxPull));

            targetX = centerX + pullX;
            targetY = centerY + pullY;
          } else {
            targetX = centerX;
            targetY = centerY;
          }
        } else {
          targetX = centerX;
          targetY = centerY;
        }

        data.currentScale += (targetScale - data.currentScale) * (isNear ? 0.2 : 0.15);
        data.currentOpacity += (targetOpacity - data.currentOpacity) * (isNear ? 0.2 : 0.15);
        data.currentX += (targetX - data.currentX) * 0.15;
        data.currentY += (targetY - data.currentY) * 0.15;

        data.clone.style.left = `${data.currentX}px`;
        data.clone.style.top = `${data.currentY}px`;
        data.clone.style.width = `${rect.width}px`;
        data.clone.style.height = `${rect.height}px`;
        data.clone.style.transform = `translate(-50%, -50%) scale(${data.currentScale})`;
        data.clone.style.opacity = `${data.currentOpacity}`;
      }

      const ease = isOverElement ? 0.2 : 0.15;

      currentX += (targetCenterX - currentX) * ease;
      currentY += (targetCenterY - currentY) * ease;

      // Definir tamanho e escala do cursor baseado no estado
      if (isOverElement) {
        // Mouse SOBRE: cursor normal
        targetWidth = 20;
        targetHeight = 20;
        targetCursorScale = 1;
      } else if (nearMagnetic && closestDistance < Infinity) {
        // Mouse PERTO (mas não sobre): cursor aumenta de escala
        targetWidth = 35;
        targetHeight = 35;
        const normalizedDistance = effectivePadding > 0 ? Math.min(closestDistance / effectivePadding, 1) : 0;
        const proximity = 1 - normalizedDistance;
        targetCursorScale = 1 + proximity * 1.5;
      } else {
        // Mouse LONGE: cursor normal
        targetWidth = 20;
        targetHeight = 20;
        targetCursorScale = 1;
      }

      currentWidth += (targetWidth - currentWidth) * ease;
      currentHeight += (targetHeight - currentHeight) * ease;
      cursorScale += (targetCursorScale - cursorScale) * 0.15;

      // Interpolar opacidade do cursor para desvanecer suavemente quando fora da janela
      const targetCursorOpacity = mouseInsideRef.current ? 1 : 0;
      cursorOpacity += (targetCursorOpacity - cursorOpacity) * 0.12;

      // Atualizar cursor principal
      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentX}px`;
        cursorRef.current.style.top = `${currentY}px`;
        cursorRef.current.style.width = `${currentWidth}px`;
        cursorRef.current.style.height = `${currentHeight}px`;
        cursorRef.current.style.transform = `translate(-50%, -50%) scale(${cursorScale})`;
        cursorRef.current.style.opacity = `${cursorOpacity}`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseout", handleDocumentMouseOut);
    document.addEventListener("mouseenter", handleDocumentMouseEnter);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseout", handleDocumentMouseOut);
      document.removeEventListener("mouseenter", handleDocumentMouseEnter);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      clonesMap.forEach((data) => data.clone.remove());
    };
  }, []);

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            <feColorMatrix
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 30 -12"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{
          filter: "url(#goo)",
          mixBlendMode: "difference",
        }}
      >
        <div
          ref={cursorRef}
          className="absolute hue-rotate-150"
          style={{
            transform: "translate(-50%, -50%)",
            borderRadius: "9999px",
            backgroundColor: `var(--color-blue-300)`,
            width: "20px",
            height: "20px",
            willChange: "left, top",
          }}
        />
      </div>
    </>
  );
}
