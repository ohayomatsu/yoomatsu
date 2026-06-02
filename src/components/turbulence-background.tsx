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
        // Definimos a altura do canvas como 150% da viewport para o efeito parallax
        canvas.height = window.innerHeight * 1.5;
      }
    }
    
    resize();
    window.addEventListener('resize', resize);

    // Efeito Parallax
    const handleScroll = () => {
      if (canvas) {
        const scrollY = window.scrollY;
        // Aplicamos o transform baseado no scroll para o efeito de profundidade
        canvas.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

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

    function noise(x: number, y: number, t: number) {
      const n1 = Math.sin(x * 1.1 + t * 0.15) * Math.cos(y * 0.8 - t * 0.1);
      const n2 = Math.sin(x * 0.5 - y * 0.6 + t * 0.08) * 0.5;
      const n3 = Math.cos(x * 1.8 + y * 1.2 - t * 0.2) * 0.25;
      return (n1 + n2 + n3) / 1.75;
    }

    function getColor(n: number) {
      const t = (n + 1) / 2;
      const grayScale = Math.pow(t, 4) * 20;
      const accentStrength = Math.pow(t, 8); // Mais acentuado para ser apenas detalhe
      
      const r = Math.round(grayScale + accentStrength * 22);
      const g = Math.round(grayScale + accentStrength * 87);
      const b = Math.round(grayScale + accentStrength * 130);
      
      return [r, g, b];
    }

    const SCALE = 10; // Aumentado para performance em monitores High-Hz
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
        const ny = (py / bH) * 2.5;
        for (let px = 0; px < bW; px++) {
          const nx = (px / bW) * 3.8;
          
          // Domain Warping para fluidez máxima
          const qx = noise(nx, ny, time * 0.3);
          const qy = noise(nx + 1.5, ny + 1.5, time * 0.3);
          
          const rx = noise(nx + 3.0 * qx, ny + 3.0 * qy, time * 0.2);
          const ry = noise(nx + 3.0 * qx + 5.0, ny + 3.0 * qy + 2.0, time * 0.2);
          
          const val = noise(nx + rx, ny + ry, time * 0.4);
          
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

        ctx.globalAlpha = 0.05;
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

      time += 0.006; 
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
      id="turbulence-bg"
      className="absolute inset-0 pointer-events-none"
      style={{ 
        zIndex: -1,
        opacity: 0,
        animation: 'fadeInBg 1.5s ease-out forwards',
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    />
  );
}
