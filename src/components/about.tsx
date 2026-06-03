"use client";

import Image from "next/image";
import { Youtube, Twitter } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-[680px] mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="shrink-0">
          <div className="relative w-[231px] h-[231px]">
            {/* Círculo externo pulsante - Escala de 2px para 2.1px */}
            <div className="absolute inset-0 rounded-full border-[2.1px] border-white/20 animate-pulse" />
            
            {/* Container do Avatar com efeito Liquid Glass - Escala de inset-3 (12px) para 12.6px */}
            <div 
              className="absolute rounded-full overflow-hidden"
              style={{
                top: '12.6px',
                right: '12.6px',
                bottom: '12.6px',
                left: '12.6px',
                border: '1.6px solid rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  0 0 0 6.3px rgba(255, 255, 255, 0.04),
                  0 0 0 7.4px rgba(255, 255, 255, 0.06),
                  0 0 31.5px 8.4px rgba(100, 180, 255, 0.08),
                  inset 0 1.6px 0 rgba(255, 255, 255, 0.3)
                `,
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
              }}
            >
              <Image
                src="/norantry.png"
                alt="Matsu Portrait"
                fill
                className="object-cover"
                loading="lazy"
                decoding="async"
              />
              
              {/* Pseudo-elemento de brilho/reflexo (Liquid Glass overlay) */}
              <div 
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)'
                }}
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
              Opa, eu sou o Matsu, trabalho com edição de vídeo e motion design. Sou especializado em <strong><u>After Effects</u></strong> e <strong><u>Premiere Pro</u></strong> há mais de 8 anos, começando na época de ouro das Intros.
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
