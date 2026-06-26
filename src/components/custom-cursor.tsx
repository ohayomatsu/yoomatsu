"use client";

import { useEffect, useRef } from "react";

/**
 * @fileOverview Componente de cursor personalizado que segue o mouse e reage a cliques.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Evita execução se não estiver no navegador
    if (typeof window === "undefined") return;

    // Criar o elemento do cursor
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    cursor.style.position = "fixed";
    cursor.style.top = "0";
    cursor.style.left = "0";
    cursor.style.width = "32px";
    cursor.style.height = "32px";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "99999";
    cursor.style.transformOrigin = "12% 16%";
    cursor.style.transition = "transform 0.08s ease";
    cursor.style.display = "none"; // Oculto inicialmente até o primeiro movimento

    // SVG do cursor (usando white para visibilidade no fundo escuro)
    cursor.innerHTML = `
      <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32">
        <path fill="white" d="m64.9 405.7c-13.2-5.6-21.4-15.4-24-28.8-1.7-9.3-15.7-308-14.7-314.6 3.7-23.8 28.2-40.8 51.7-35.9 4 0.8 9.6 2.8 12.4 4.3 5.1 2.8 230.6 188.1 241.8 198.8 3.4 3.1 6.8 7.7 8.5 11.2 2.6 5.3 2.9 6.8 2.9 16.3 0 9.6-0.3 11-2.9 16.5-3.8 7.6-10.5 14.3-18.1 18.1-6 2.9-6 2.9-58 3.5-45.3 0.5-53 0.8-59.5 2.3-14.7 3.6-29.1 11.8-39 22.2-3.1 3.3-17.3 21.4-31.7 40.4-14.3 19-27.8 36.2-29.9 38.2-2.2 2-6.4 4.9-9.4 6.4-4.6 2.4-7 2.9-15 3.1-8.2 0.3-10.3 0-15.1-2z"/>
      </svg>
    `;

    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.display = "block";
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "scale(0.78)";
      }
    };

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "scale(1)";
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  return null;
}
