
"use client";

import { Twitter, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 max-w-[380px] mx-auto">
      <div className="liquid-glass rounded-[2rem] py-6 px-8 space-y-8 flex flex-col items-center text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-headline font-bold tracking-tight glow-text leading-tight">
            Ficou interessado? <br /> só chamar.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a 
            href="https://x.com/ohayomatsu" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-110 group"
            aria-label="Twitter"
          >
            <Twitter size={18} className="text-foreground/60 group-hover:text-foreground transition-colors" />
          </a>
          <a 
            href="mailto:contato@matsu.com" 
            className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-110 group"
            aria-label="Email"
          >
            <Mail size={18} className="text-foreground/60 group-hover:text-foreground transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
