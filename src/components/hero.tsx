"use client";

import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 z-10 scroll-mt-20">
      <div className="text-center max-w-4xl relative z-10 flex flex-col items-center gap-[1.2rem]">
        <p 
          className="text-[10px] uppercase tracking-[0.6em] text-foreground/40 font-bold animate-fade-up-blur"
          style={{ animationDelay: '0s' }}
        >
          EDITOR DE VÍDEO
        </p>
        
        <div 
          className="flex justify-center items-center animate-fade-up-blur"
          style={{ animationDelay: '0.15s' }}
        >
          <img 
            id="hero-title"
            src="/logo.svg" 
            alt="Matsu" 
            width={420} 
            style={{
              maxWidth: '75vw', 
              height: 'auto', 
              display: 'block', 
              margin: '0 auto'
            }} 
            onError={(e: any) => { 
              e.target.style.display='none'; 
              console.log('Logo não encontrada'); 
            }} 
          />
        </div>

        <p 
          className="text-[0.95rem] text-foreground/40 max-w-2xl mx-auto leading-relaxed font-light mb-5 animate-fade-up-blur"
          style={{ animationDelay: '0.3s' }}
        >
          Transformando minhas ideias malucas em maluquices visuais. 
        </p>

        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up-blur"
          style={{ animationDelay: '0.45s' }}
        >
          <a href="#portfolio" className="liquid-button bg-white/[0.08] text-[10px] uppercase tracking-[0.3em] py-5 px-14 inline-block">
            Ver Portfólio
          </a>
          <a href="#contact" className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 hover:text-foreground transition-all">
            Fale Comigo
          </a>
        </div>
      </div>

      <div className="absolute bottom-12">
        <a href="#about" className="animate-bounce text-foreground/20 hover:text-foreground transition-colors block">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
}