"use client";

import { Twitter, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="pt-4 pb-32 px-6 max-w-[500px] mx-auto">
      <div className="flex flex-col items-center text-center gap-[0.6rem]">
        <h2 className="text-[1.2rem] font-headline font-bold tracking-tight glow-text leading-tight">
          Ficou interessado? <br /> só chamar.
        </h2>

        <div className="flex items-center justify-center gap-[0.6rem]">
          <a 
            href="https://x.com/ohayomatsu" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-110 group"
            aria-label="Twitter"
          >
            <Twitter size={16} className="text-foreground/60 group-hover:text-foreground transition-colors" />
          </a>
          <a 
            href="mailto:contato.ohayomatsu@gmail.com" 
            className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-110 group"
            aria-label="Email"
          >
            <Mail size={16} className="text-foreground/60 group-hover:text-foreground transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
