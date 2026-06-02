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
        // O canvas ocupa a largura da tela
        canvas.width = window.innerWidth;
        // Altura levemente maior para suportar o movimento do parallax sem mostrar o fundo preto
        canvas.height = window.innerHeight * 1.2;
      }
    }
    
    resize();
    window.addEventListener('resize', resize);

    // Motor de Parallax com Limite de Footer
    const handleScroll = () => {
      if (canvas) {
        const scrollY = window.scrollY;
        const footer = document.querySelector('footer');
        const bodyHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const footerHeight = footer ? (footer as HTMLElement).offsetHeight : 0;
        
        // Cálculo do scroll máximo permitido
        const maxScroll = bodyHeight - windowHeight - footerHeight;
        const limited = Math.min(scrollY, maxScroll);
        
        // Aplicamos o transform baseado no scroll limitado (fator 0.4 conforme solicitado)
        // O movimento é suave e limitado ao viewport pelo container fixo
        canvas.style.transform = `translateY(${limited * 0.15}px)`;
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
      // Frequências ajustadas para movimento fluido
      const n1 = Math.sin(x * 1.1 + t * 0.15) * Math.cos(y * 0.8 - t * 0.1);
      const n2 = Math.sin(x * 0.5 - y * 0.6 + t * 0.08) * 0.5;
      const n3 = Math.cos(x * 1.8 + y * 1.2 - t * 0.2) * 0.25;
      return (n1 + n2 + n3) / 1.75;
    }

    function getColor(n: number) {
      const t = (n + 1) / 2;
      // Estética monocromática luxuosa
      const grayScale = Math.pow(t, 4) * 35;
      // Azul sutil como detalhe (RGB: 22, 87, 130)
      const accentStrength = Math.pow(t, 14); 
      
      const r = Math.round(grayScale + accentStrength * 22);
      const g = Math.round(grayScale + accentStrength * 87);
      const b = Math.round(grayScale + accentStrength * 130);
      
      return [r, g, b];
    }

    const SCALE = 12; // Resolução otimizada para alto FPS
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
        const ny = (py / bH) * 2.8;
        for (let px = 0; px < bW; px++) {
          const nx = (px / bW) * 4.2;
          
          // Domain Warping para viscosidade de fluido real
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

        // Aplicação de granulação sutil
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

      time += 0.008; // Incremento granular para suavidade extrema
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
      style={{ 
        opacity: 0,
        animation: 'fadeInBg 1.5s ease-out forwards',
      }}
    />
  );
}
