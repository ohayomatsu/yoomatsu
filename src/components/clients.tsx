"use client";

import { cn } from "@/lib/utils";

const CLIENTS = [
  { 
    name: "CAIO ANDRES", 
    imageUrl: "/caioandres.jpeg", 
    href: "https://www.youtube.com/@caio_andress" 
  },
  { 
    name: "REYSHEE", 
    imageUrl: "/rey.jpg",
    href: "https://www.youtube.com/@Reyshee" 
  },
  { 
    name: "YOOMATSU (EU)", 
    imageUrl: "/eu.png", 
    href: "https://www.youtube.com/@yoomatsu" 
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

export function Clients() {
  return (
    <section id="clients" className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-foreground/80 uppercase">
          canais em que trabalhei!
        </h2>
      </div>

      <div className="flex justify-center items-center gap-12 md:gap-24 px-6 flex-wrap">
        {CLIENTS.map((client, idx) => (
          <a 
            key={idx} 
            href={client.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-4 shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95 group"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-[20px] flex items-center justify-center transition-all duration-500 group-hover:border-white/50 group-hover:shadow-[0_0_15px_4px_rgba(59,89,130,0.5)] overflow-hidden">
              {client.imageUrl ? (
                <img 
                  src={client.imageUrl} 
                  alt={client.name}
                  className="w-full h-full object-cover rounded-full grayscale transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:grayscale-0"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="text-xl md:text-2xl font-bold tracking-tighter text-white/40 group-hover:text-white group-hover:glow-text transition-all duration-500">
                  {getInitials(client.name)}
                </span>
              )}
            </div>
            <span className="text-xs md:text-sm font-medium text-foreground/40 tracking-wider uppercase group-hover:text-foreground/80 transition-colors">
              {client.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
