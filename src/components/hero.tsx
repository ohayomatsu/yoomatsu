"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function Hero() {
  const heroImg = PlaceHolderImages.find((img) => img.id === "hero-bg");

  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background with filter */}
      <div className="absolute inset-0 -z-10 bg-[#0D0D0D]">
        {heroImg && (
          <Image
            src={heroImg.imageUrl}
            alt="Hero Background"
            fill
            className="object-cover opacity-20 saturate-0"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/20 via-[#0D0D0D]/80 to-[#0D0D0D]" />
      </div>

      {/* Hero Content */}
      <div className="text-center max-w-4xl space-y-8 relative z-10 animate-fade-in-up">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-foreground/50 font-medium">
            Creative Portfolio
          </p>
          <h1 className="text-8xl md:text-[12rem] font-headline font-bold tracking-tighter glow-text leading-none m-0 p-0 text-white">
            MATSU
          </h1>
          <p className="text-xl md:text-2xl font-light text-foreground/80 tracking-wide mt-4">
            Editor de vídeo & criador de conteúdo
          </p>
        </div>

        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
          Transformo ideias em imagens que ficam. Conteúdo especializado para quem busca impacto visual e engajamento real.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="rounded-full px-12 h-14 text-lg font-medium glass-effect bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all hover:scale-105">
            <a href="#portfolio">Ver Portfólio</a>
          </Button>
          <Button asChild variant="ghost" size="lg" className="rounded-full px-12 h-14 text-lg font-medium text-white/70 hover:text-white hover:bg-white/5">
            <a href="#contact">Fale Comigo</a>
          </Button>
        </div>
      </div>

      <a href="#portfolio" className="absolute bottom-12 animate-bounce text-foreground/30 hover:text-foreground transition-colors">
        <ChevronDown size={32} />
      </a>
    </section>
  );
}