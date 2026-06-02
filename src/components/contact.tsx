
"use client";

import { Twitter, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="pt-4 pb-32 px-6 max-w-[500px] mx-auto">
      <div className="flex flex-col items-center text-center gap-10">
        <h2 className="text-[1.2rem] font-headline font-bold tracking-tight glow-text leading-tight">
          Ficou interessado? <br /> só chamar.
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://x.com/ohayomatsu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-8 py-3 flex items-center gap-3 transition-all hover:bg-white/10 active:scale-95 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <Twitter size={16} />
            Twitter / X
          </a>
          
          <a 
            href="mailto:contato.ohayomatsu@gmail.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-8 py-3 flex items-center gap-3 transition-all hover:bg-white/10 active:scale-95 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <Mail size={16} />
            E-mail
          </a>
        </div>
      </div>
    </section>
  );
}
