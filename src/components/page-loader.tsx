"use client";

import { useEffect, useState } from "react";

/**
 * @fileOverview Um componente de loader global que sincroniza o carregamento com as animações do site.
 */

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Bloqueia o scroll do corpo imediatamente
    document.body.style.overflow = 'hidden';

    const handleLoad = () => {
      // Pequeno delay inicial conforme solicitado
      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
        
        // Após o fade out do loader (0.6s), dispara os eventos de animação
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('page-loader-finished'));
        }, 600);
        
        // Remove do DOM após a transição
        setTimeout(() => setShouldRender(false), 800);
      }, 300);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
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
        background: '#0a0a0a',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s ease, visibility 0.6s ease',
        willChange: 'opacity, visibility',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isVisible ? 'all' : 'none',
        transform: 'translateZ(0)'
      }}
    >
      <div style={{
        width: '40px',
        height: '40px',
        border: '2px solid rgba(255,255,255,0.1)',
        borderTopColor: 'rgba(255,255,255,0.6)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        willChange: 'transform'
      }} />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
