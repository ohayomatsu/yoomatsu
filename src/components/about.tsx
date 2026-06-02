"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Youtube, Instagram, Twitter, MessageCircle } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

export function About() {
  const profileImg = PlaceHolderImages.find(img => img.id === "about-matsu");

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <ScrollReveal className="shrink-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse" />
            <div className="absolute inset-4 rounded-full liquid-glass overflow-hidden">
              {profileImg && (
                <Image
                  src={profileImg.imageUrl}
                  alt="Matsu Portrait"
                  fill
                  className="object-cover saturate-0"
                />
              )}
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-8 flex-1 text-center md:text-left">
          <div className="space-y-4">
            <ScrollReveal delay={200}>
              <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Sou Matsu.</h2>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed">
                Editor de vídeo e criador de conteúdo especializado em redes sociais.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="space-y-6 text-lg text-foreground/60 leading-relaxed max-w-2xl">
            <ScrollReveal delay={400}>
              <p>
                Com mais de 5 anos de experiência transformando raw footage em narrativas poderosas, trabalho com creators e marcas que buscam transcender o básico. 
              </p>
            </ScrollReveal>
            <ScrollReveal delay={500}>
              <p>
                Minha abordagem foca em retenção, estética moderna e design de som imersivo. Acredito que cada frame é uma oportunidade de conectar.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={600} className="flex items-center justify-center md:justify-start gap-6 pt-4">
            <a href="#" className="p-3 rounded-full liquid-glass hover:bg-white/10 transition-all hover:scale-110">
              <Instagram size={24} />
            </a>
            <a href="#" className="p-3 rounded-full liquid-glass hover:bg-white/10 transition-all hover:scale-110">
              <Youtube size={24} />
            </a>
            <a href="#" className="p-3 rounded-full liquid-glass hover:bg-white/10 transition-all hover:scale-110">
              <Twitter size={24} />
            </a>
            <a href="#" className="p-3 rounded-full liquid-glass hover:bg-white/10 transition-all hover:scale-110">
              <MessageCircle size={24} />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
