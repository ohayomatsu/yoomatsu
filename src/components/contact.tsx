
"use client";

import { Twitter, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 max-w-[500px] mx-auto">
      {/* Substituído liquid-card por liquid-glass direto para remover o efeito de hover do background */}
      <div className="liquid-glass rounded-[2rem] py-8 px-12 space-y-12 flex flex-col items-center text-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight glow-text leading-tight">
            Ficou interessado? <br /> só chamar.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-10">
          <a 
            href="#" 
            className="w-[60px] h-[60px] rounded-full liquid-glass flex items-center justify-center transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-110 group"
            aria-label="Twitter"
          >
            <Twitter size={24} className="text-foreground/60 group-hover:text-foreground transition-colors" />
          </a>
          <a 
            href="#" 
            className="w-[60px] h-[60px] rounded-full liquid-glass flex items-center justify-center transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-110 group"
            aria-label="Email"
          >
            <Mail size={24} className="text-foreground/60 group-hover:text-foreground transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
