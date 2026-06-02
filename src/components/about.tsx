
"use client";

import Image from "next/image";
import { Youtube, Twitter } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-[680px] mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="shrink-0">
          <div className="relative w-[220px] h-[220px]">
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse" />
            <div className="absolute inset-3 rounded-full backdrop-blur-[20px] bg-white/[0.04] border border-white/30 overflow-hidden">
              <Image
                src="/norantry.png"
                alt="Matsu Portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 flex-1 text-center md:text-left">
          <div className="space-y-1">
            <h2 className="text-[2.2rem] font-headline font-bold tracking-tight">MATSU!</h2>
            <p className="text-[1.1rem] text-foreground/80 font-light leading-relaxed">
              Criador de conteúdo e Editor de vídeo.
            </p>
          </div>
          
          <div className="text-[0.95rem] text-foreground/60 leading-relaxed">
            <p>
              Opa, eu sou o Matsu, trabalho com edição de vídeo e motion design há mais de 5 anos.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
            {[
              { 
                icon: <Youtube size={16} />, 
                href: "https://www.youtube.com/@yoomatsu" 
              },
              { 
                icon: <Twitter size={16} />, 
                href: "https://x.com/ohayomatsu" 
              }
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:scale-[1.04]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
