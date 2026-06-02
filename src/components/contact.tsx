
"use client";

import { Twitter, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 max-w-5xl mx-auto">
      <div className="liquid-card p-16 md:p-24 space-y-16 flex flex-col items-center text-center">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tight glow-text leading-none">
            Vamos criar <br /> algo novo?
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
