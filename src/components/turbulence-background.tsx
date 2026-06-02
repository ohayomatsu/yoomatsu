
"use client";

import React, { useEffect, useRef } from 'react';

export function TurbulenceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Otimização: desativa alpha global
    if (!ctx) return;

    function resize() {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }
    
    resize();
    window.addEventListener('resize', resize);

    // Grain pré-gerado
    const grainCanvas = document.createElement('canvas');
    const grainCtx = grainCanvas.getContext('2d');
    if (grainCtx) {
      grainCanvas.width = 256;
      grainCanvas.height = 256;
      const grainData = grainCtx.createImageData(256, 256);
      for (let i = 0; i < grainData.data.length; i += 4) {
        const v = Math.round((Math.random() - 0.5) * 30 + 128);
        grainData.data[i] = grainData.data[i+1] = grainData.data[i+2] = v;
        grainData.data[i+3] = 12;
      }
      grainCtx.putImageData(grainData, 0, 0);
    }

    // Noise mais performático
    function noise(x: number, y: number, t: number) {
      return (
        Math.sin(x * 1.2 + t * 0.18) * Math.cos(y * 0.9 - t * 0.12) * 0.35 +
        Math.sin(x * 0.6 - y * 0.7 + t * 0.09) * 0.25 +
        Math.cos(x * 2.1 + y * 1.4 - t * 0.22) * 0.15
      );
    }

    function getColor(n: number) {
      const t = (n + 1) / 2;
      if (t < 0.6) return [Math.round(t * 8), Math.round(t * 12), Math.round(t * 20)];
      if (t < 0.8) return [Math.round(8 + (t-0.6) * 40), Math.round(12 + (t-0.6) * 60), Math.round(20 + (t-0.6) * 120)];
      return [30, 45, 90];
    }

    // SCALE maior (8) para reduzir iterações e permitir High FPS
    const SCALE = 8;
    let time = 0;
    let animationFrameId: number;

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
        const ny = (py / bH) * 4.0;
        for (let px = 0; px < bW; px++) {
          const nx = (px / bW) * 6.0;
          const warpX = noise(nx + 1.7, ny + 9.2, time);
          const warpY = noise(nx + 8.3, ny + 2.8, time + 1.5);
          const combined = noise(nx + warpX * 1.5, ny + warpY * 1.5, time * 0.8);
          
          const [r, g, b] = getColor(combined);
          const idx = (py * bW + px) * 4;
          data[idx] = r; 
          data[idx + 1] = g; 
          data[idx + 2] = b; 
          data[idx + 3] = 255;
        }
      }

      // Renderização ultra rápida
      const offCanvas = document.createElement('canvas');
      offCanvas.width = bW;
      offCanvas.height = bH;
      const offCtx = offCanvas.getContext('2d');
      if (offCtx) {
        offCtx.putImageData(imgData, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(offCanvas, 0, 0, W, H);

        // Grain estático (padrão repetido para performance)
        ctx.globalAlpha = 0.1;
        ctx.globalCompositeOperation = 'screen';
        const gW = grainCanvas.width;
        const gH = grainCanvas.height;
        for (let tx = 0; tx < W; tx += gW) {
          for (let ty = 0; ty < H; ty += gH) {
            ctx.drawImage(grainCanvas, tx, ty);
          }
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      }

      time += 0.015; // Incremento menor para suavidade em Hz altos
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="turbulence-bg"
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 0,
        opacity: 0,
        animation: 'fadeInBg 1.5s ease-out forwards',
        transform: 'translateZ(0)', // Force GPU
        willChange: 'contents'
      }}
    />
  );
}
