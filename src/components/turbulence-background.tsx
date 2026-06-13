"use client";

import React, { useEffect, useState } from 'react';

/**
 * Versão CSS-only do fundo animado.
 * Vinheta azul radial nas bordas/cantos, fixa na viewport (1 tela),
 * sempre visível na mesma posição. Centro preto. Drift sutil via
 * transform (compositor), sem custo de CPU relevante.
 */
export function TurbulenceBackground() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleReady = () => setIsReady(true);
    window.addEventListener('page-loader-finished', handleReady);

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
      <div className="glow" />

      <style>{`
        .turbulence-css {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          background: #080909;
          overflow: hidden;
        }

        .glow {
          position: absolute;
          inset: -10%;
          width: 120%;
          height: 120%;
          will-change: transform;
          background: radial-gradient(circle at 50% 50%, #080909 0%, #0a1424 45%, #16294d 100%);
          animation: drift 40s ease-in-out infinite alternate;
        }

        @keyframes drift {
          0%   { transform: translate(0%, 0%) scale(1); }
          50%  { transform: translate(-1.5%, 1%) scale(1.03); }
          100% { transform: translate(1.5%, -1%) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .glow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}