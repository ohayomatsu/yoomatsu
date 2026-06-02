
"use client";

import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 z-10">
      <div className="text-center max-w-4xl space-y-12 relative z-10">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.6em] text-foreground/40 font-bold">
            Visual Storytelling
          </p>
          
          <h1 
            id="hero-title"
            className="text-8xl md:text-[14rem] font-headline font-bold tracking-tighter glow-text leading-none m-0 p-0 text-white select-none"
          >
            MATSU
          </h1>
          
          <p className="text-xl md:text-3xl font-light text-foreground/60 tracking-[0.2em] mt-6">
            EDITOR DE VÍDEO
          </p>
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
