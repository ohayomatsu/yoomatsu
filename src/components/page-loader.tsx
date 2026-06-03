"use client";

import { useEffect, useState } from "react";

/**
 * @fileOverview Um componente de loader global que cobre a tela até que a página esteja carregada.
 */

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Bloqueia o scroll do corpo imediatamente ao montar o componente no cliente
    document.body.style.overflow = 'hidden';

    const handleLoad = () => {
      // Aguarda um pequeno delay para garantir que a transição seja percebida
      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
        
        // Dispara um evento global para notificar outros componentes (como o Hero)
        // que o loader terminou de desaparecer (0.6s de transição)
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('page-loader-finished'));
        }, 600);
        
        // Remove o componente do DOM completamente após a transição de opacidade (0.6s)
        setTimeout(() => setShouldRender(false), 600);
      }, 300);
    };

    // Se o documento já estiver carregado (ex: refresh rápido), executa imediatamente
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      
      // Fallback de segurança: se o carregamento demorar mais de 3 segundos, libera o site
      const fallback = setTimeout(handleLoad, 3000);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      id="page-loader"
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0c0d0d',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s ease, visibility 0.6s ease',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isVisible ? 'all' : 'none',
      }}
    >
      <div style={{
        width: '40px',
        height: '40px',
        border: '2px solid rgba(255,255,255,0.1)',
        borderTopColor: 'rgba(255,255,255,0.6)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
