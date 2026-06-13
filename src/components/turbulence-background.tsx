"use client";

import React, { useEffect, useState } from 'react';

/**
 * Versão CSS-only do fundo animado.
 * Substitui o canvas com noise procedural por gradientes radiais
 * com blur, animados via CSS, mantendo a mesma paleta de cores
 * (do azul escuro #080909 ao azul mais claro ~#102f59) e o
 * movimento sutil tanto em idle quanto no scroll.
 *
 * Custo de CPU: praticamente zero (roda no compositor/GPU),
 * contra ~9s de main-thread do canvas original.
 */
export function TurbulenceBackground() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleReady = () => setIsReady(true);
    window.addEventListener('page-loader-finished', handleReady);

    // Fallback: se o evento já passou ou não disparar, mostra mesmo assim
    if (document.readyState === 'complete' && !document.getElementById('page-loader')) {
      setIsReady(true);
    }

    return () => window.removeEventListener('page-loader-finished', handleReady);
  }, []);

  return (
    <div
      className="bg-gradient turbulence-css"
      style={{
        opacity: isReady ? 1 : 0,
        transition: 'opacity 1s ease',
      }}
    >
      <div className="turbulence-blob turbulence-blob-1" />
      <div className="turbulence-blob turbulence-blob-2" />
      <div className="turbulence-blob turbulence-blob-3" />

      <style>{`
        .turbulence-css {
          position: relative;
          width: 100%;
          height: 100%;
          background: #080909;
          overflow: hidden;
        }

        .turbulence-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          will-change: transform;
          mix-blend-mode: screen;
        }

        .turbulence-blob-1 {
          width: 70%;
          height: 50%;
          top: -10%;
          left: 5%;
          background: radial-gradient(circle, rgba(16,48,89,0.65) 0%, rgba(16,48,89,0) 70%);
          animation: drift-1 32s ease-in-out infinite alternate;
        }

        .turbulence-blob-2 {
          width: 60%;
          height: 55%;
          top: 30%;
          right: 0%;
          background: radial-gradient(circle, rgba(12,34,68,0.6) 0%, rgba(12,34,68,0) 70%);
          animation: drift-2 38s ease-in-out infinite alternate;
        }

        .turbulence-blob-3 {
          width: 65%;
          height: 50%;
          bottom: -10%;
          left: 20%;
          background: radial-gradient(circle, rgba(9,22,48,0.55) 0%, rgba(9,22,48,0) 70%);
          animation: drift-3 44s ease-in-out infinite alternate;
        }

        @keyframes drift-1 {
          0%   { transform: translate(0%, 0%) scale(1); }
          50%  { transform: translate(-6%, 4%) scale(1.08); }
          100% { transform: translate(4%, -3%) scale(1); }
        }

        @keyframes drift-2 {
          0%   { transform: translate(0%, 0%) scale(1); }
          50%  { transform: translate(5%, -6%) scale(1.1); }
          100% { transform: translate(-4%, 3%) scale(1); }
        }

        @keyframes drift-3 {
          0%   { transform: translate(0%, 0%) scale(1); }
          50%  { transform: translate(-4%, -5%) scale(1.06); }
          100% { transform: translate(5%, 4%) scale(1); }
        }

        /* Movimento sutil ao rolar a página, igual ao canvas original.
           Suportado em Chrome/Edge recentes; navegadores sem suporte
           simplesmente ignoram e ficam com o drift idle apenas. */
        @supports (animation-timeline: scroll()) {
          .turbulence-css {
            animation: scroll-parallax linear;
            animation-timeline: scroll(root);
          }

          @keyframes scroll-parallax {
            from { transform: translateY(0%); }
            to   { transform: translateY(-20%); }
          }
        }

        @media (max-width: 768px) {
          .turbulence-blob {
            filter: blur(40px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .turbulence-blob {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}