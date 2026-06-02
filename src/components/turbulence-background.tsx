
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
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }
    
    resize();
    window.addEventListener('resize', resize);

    // Grain pré-gerado para textura
    const grainCanvas = document.createElement('canvas');
    const grainCtx = grainCanvas.getContext('2d');
    if (grainCtx) {
      grainCanvas.width = 256;
      grainCanvas.height = 256;
      const grainData = grainCtx.createImageData(256, 256);
      for (let i = 0; i < grainData.data.length; i += 4) {
        const v = Math.round((Math.random() - 0.5) * 20 + 128);
        grainData.data[i] = grainData.data[i+1] = grainData.data[i+2] = v;
        grainData.data[i+3] = 10;
      }
      grainCtx.putImageData(grainData, 0, 0);
    }

    // Função de ruído suave
    function noise(x: number, y: number, t: number) {
      return (
        Math.sin(x * 1.2 + t * 0.18) * Math.cos(y * 0.9 - t * 0.12) * 0.35 +
        Math.sin(x * 0.6 - y * 0.7 + t * 0.09) * 0.25 +
        Math.cos(x * 2.1 + y * 1.4 - t * 0.22) * 0.15
      );
    }

    // Função de cor refinada para elegância - Foco em P&B com detalhes sutis no azul específico
    function getColor(n: number) {
      const t = (n + 1) / 2; // Normaliza para 0-1
      
      // Componente de cinza profundo para manter a base P&B (muito escuro)
      const grayBase = Math.pow(t, 6) * 20;
      
      // O azul agora é um detalhe que utiliza o tom solicitado: 22, 87, 130
      // Usamos um expoente alto (t^5) para que ele apareça apenas nos picos das ondas
      const accent = Math.pow(t, 5); 
      const r = Math.round(grayBase + accent * 22); 
      const g = Math.round(grayBase + accent * 87); 
      const b = Math.round(grayBase + accent * 130); 
      
      return [r, g, b];
    }

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
        const ny = (py / bH) * 3.5;
        for (let px = 0; px < bW; px++) {
          const nx = (px / bW) * 5.0;
          const warpX = noise(nx + 1.7, ny + 9.2, time);
          const warpY = noise(nx + 8.3, ny + 2.8, time + 1.5);
          const combined = noise(nx + warpX * 1.2, ny + warpY * 1.2, time * 0.7);
          
          const [r, g, b] = getColor(combined);
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

        // Textura de grão sutil
        ctx.globalAlpha = 0.08;
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

      time += 0.012; 
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
        transform: 'translateZ(0)',
        willChange: 'contents'
      }}
    />
  );
}
