"use client";

import React, { useEffect, useRef } from 'react';

export function TurbulenceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }
    
    resize();
    window.addEventListener('resize', resize);

    // Grain pré-gerado uma única vez — não recalcula a cada frame
    const grainCanvas = document.createElement('canvas');
    const grainCtx = grainCanvas.getContext('2d');
    if (grainCtx) {
      grainCanvas.width = 512;
      grainCanvas.height = 512;
      const grainData = grainCtx.createImageData(512, 512);
      for (let i = 0; i < grainData.data.length; i += 4) {
        const v = Math.round((Math.random() - 0.5) * 30 + 128);
        grainData.data[i] = grainData.data[i+1] = grainData.data[i+2] = v;
        grainData.data[i+3] = 18;
      }
      grainCtx.putImageData(grainData, 0, 0);
    }

    function noise(x: number, y: number, t: number) {
      return (
        Math.sin(x * 1.2 + t * 0.18) * Math.cos(y * 0.9 - t * 0.12) * 0.35 +
        Math.sin(x * 0.6 - y * 0.7 + t * 0.09) * 0.25 +
        Math.cos(x * 2.1 + y * 1.4 - t * 0.22) * 0.15 +
        Math.sin((x + y) * 0.8 + t * 0.14) * Math.cos(x * 0.5 - t * 0.07) * 0.15 +
        Math.cos(x * 0.3 + y * 2.0 + t * 0.11) * 0.10
      );
    }

    function getColor(n: number) {
      const t = (n + 1) / 2;
      let r, g, b;
      if (t < 0.55) {
        const s = t / 0.55;
        r = Math.round(s * 4);
        g = Math.round(s * 6);
        b = Math.round(s * 10);
      } else if (t < 0.78) {
        const s = (t - 0.55) / 0.23;
        r = Math.round(4 + s * 6);
        g = Math.round(6 + s * 12);
        b = Math.round(10 + s * 28);
      } else if (t < 0.92) {
        const s = (t - 0.78) / 0.14;
        r = Math.round(10 + s * 10);
        g = Math.round(18 + s * 20);
        b = Math.round(38 + s * 40);
      } else {
        const s = (t - 0.92) / 0.08;
        r = Math.round(20 + s * 55);
        g = Math.round(38 + s * 55);
        b = Math.round(78 + s * 60);
      }
      return [Math.min(255, r), Math.min(255, g), Math.min(255, b)];
    }

    const SCALE = 4;
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
        for (let px = 0; px < bW; px++) {
          const nx = (px / bW) * 6.0;
          const ny = (py / bH) * 4.0;
          const warpX = noise(nx + 1.7, ny + 9.2, time);
          const warpY = noise(nx + 8.3, ny + 2.8, time + 1.5);
          const n = noise(nx + warpX * 1.5, ny + warpY * 1.5, time * 0.8);
          const wx2 = noise(nx * 1.3 + warpX, ny * 1.3 + warpY + 5.1, time * 1.1);
          const n2 = noise(nx + wx2 * 0.8, ny + wx2 * 0.5, time * 0.6 + 2.3);
          const combined = n * 0.65 + n2 * 0.35;
          const [r, g, b] = getColor(combined);
          const idx = (py * bW + px) * 4;
          data[idx] = r; data[idx + 1] = g; data[idx + 2] = b; data[idx + 3] = 255;
        }
      }

      const offCanvas = document.createElement('canvas');
      offCanvas.width = bW;
      offCanvas.height = bH;
      const offCtx = offCanvas.getContext('2d');
      if (offCtx) {
        offCtx.putImageData(imgData, 0, 0);
        ctx.clearRect(0, 0, W, H);
        ctx.filter = 'blur(2px)';
        ctx.drawImage(offCanvas, 0, 0, W, H);
        ctx.filter = 'none';

        // Grain estático aplicado via compositing — zero custo de CPU
        ctx.globalAlpha = 0.12;
        ctx.globalCompositeOperation = 'screen';
        const gW = grainCanvas.width, gH = grainCanvas.height;
        for (let tx = 0; tx < W; tx += gW)
          for (let ty = 0; ty < H; ty += gH)
            ctx.drawImage(grainCanvas, tx, ty);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      }

      time += 0.018;
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
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
