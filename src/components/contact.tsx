"use client";

import { Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="pt-4 pb-32 px-6 max-w-[500px] mx-auto scroll-mt-20">
      <div className="flex flex-col items-center text-center gap-3">
        <h2 className="text-[1.8rem] font-headline font-bold tracking-tight glow-text leading-tight text-white">
          Ficou interessado? <br /> só chamar!
        </h2>
        
        <div className="flex items-center justify-center gap-6 mt-6">
          <a 
            href="https://x.com/ohayomatsu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="liquid-glass w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:scale-[1.1] active:scale-95"
            aria-label="X (Twitter)"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          
          <a 
            href="mailto:contato.ohayomatsu@gmail.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:scale-[1.1] active:scale-95"
            aria-label="E-mail"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
