"use client";

import React, { useEffect, useRef } from 'react';

export function TurbulenceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    function resize() {
      if (canvas) {
        const isMobile = window.innerWidth <= 768;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * (isMobile ? 2.5 : 3.0);
      }
    }
    
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function noise(x: number, y: number, t: number) {
      const n1 = Math.sin(x * 1.1 + t * 0.15) * Math.cos(y * 0.8 - t * 0.1);
      const n2 = Math.sin(x * 0.5 - y * 0.6 + t * 0.08) * 0.5;
      const n3 = Math.cos(x * 1.8 + y * 1.2 - t * 0.2) * 0.25;
      return (n1 + n2 + n3) / 1.75;
    }

    function getColor(n: number) {
      const t = (n + 1) / 2;
      // Interpolação entre #0f1012 (15, 16, 18) e #1f465e (31, 70, 94)
      // Usamos uma potência para dar mais contraste aos "blobs"
      const factor = Math.pow(t, 2.5);
      
      const r = Math.round(15 + factor * 16);
      const g = Math.round(16 + factor * 54);
      const b = Math.round(18 + factor * 76);
      
      return [r, g, b];
    }

    const SCALE = 12;
    let time = 0;
    let animationFrameId: number;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isMobile = window.innerWidth <= 768;
          
          if (isMobile) {
            if (canvas) {
              canvas.style.transform = 'none';
            }
            ticking = false;
            return;
          }

          const docHeight = Math.max(
            document.body.scrollHeight, 
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
          );
          const winHeight = window.innerHeight;
          const scrollY = window.scrollY || window.pageYOffset;
          
          const scrollPercent = Math.max(0, Math.min(1, scrollY / (docHeight - winHeight || 1)));
          const move = scrollPercent * 20; 
          
          if (canvas) {
            canvas.style.transform = `translateY(-${move}%) translateZ(0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    function draw() {
      if (!canvas || !ctx) return;

      const W = canvas.width;
      const H = canvas.height;
      if (W === 0 || H === 0) return;

      const bW = Math.ceil(W / SCALE);
      const bH = Math.ceil(H / SCALE);

      const imgData = ctx.createImageData(bW, bH);
      const data = imgData.data;

      for (let py = 0; py < bH; py++) {
        const ny = (py / bH) * 2.8;
        for (let px = 0; px < bW; px++) {
          const nx = (px / bW) * 4.2;
          
          const qx = noise(nx, ny, time * 0.2);
          const qy = noise(nx + 1.2, ny + 1.2, time * 0.2);
          
          const rx = noise(nx + 2.5 * qx, ny + 2.5 * qy, time * 0.15);
          const ry = noise(nx + 2.5 * qx + 4.0, ny + 2.5 * qy + 1.8, time * 0.15);
          
          const val = noise(nx + rx, ny + ry, time * 0.3);
          
          const [r, g, b] = getColor(val);
          const idx = (py * bW + px) * 4;
          data[idx] = r; 
          data[idx + 1] = g; 
          data[idx + 2] = b; 
          data[idx + 3] = 255;
        }
      }

      const offCanvas = document.createElement('canvas');
      offCanvas.width = bW;
      offCanvas.height = bH;
      const offCtx = offCanvas.getContext('2d');
      if (offCtx) {
        offCtx.putImageData(imgData, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(offCanvas, 0, 0, W, H);
      }

      time += 0.032; 
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="bg-gradient"
      style={{ 
        opacity: 0,
        animation: 'fadeInBg 1.5s ease-out forwards',
        pointerEvents: 'none',
        willChange: 'transform'
      }}
    />
  );
}