
"use client";

import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 z-10">
      <div className="text-center max-w-4xl space-y-12 relative z-10">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.6em] text-foreground/40 font-bold">
            EDITOR DE VÍDEO
          </p>
          
          <div className="flex justify-center items-center mt-6">
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
        </div>

        <p className="text-lg md:text-xl text-foreground/40 max-w-2xl mx-auto leading-relaxed font-light">
          Transformo ideias em imagens de alto impacto. Conteúdo especializado para quem busca transcendência visual.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <a href="#portfolio" className="liquid-button bg-white/[0.08] text-[10px] uppercase tracking-[0.3em] py-5 px-14 inline-block">
            Ver Portfólio
          </a>
          <a href="#contact" className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 hover:text-foreground transition-all">
            Fale Comigo
          </a>
        </div>
      </div>

      <div className="absolute bottom-12">
        <a href="#portfolio" className="animate-bounce text-foreground/20 hover:text-foreground transition-colors block">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
}
