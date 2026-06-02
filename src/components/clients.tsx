
"use client";

import { cn } from "@/lib/utils";

const CLIENTS = [
  { name: "CAIO ANDRES", imageUrl: "/caioandres.jpeg" },
  { name: "?" },
  { name: "YOOMATSU", imageUrl: "/eu.png" },
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
          Canais que editei!
        </h2>
      </div>

      <div className="flex justify-center items-center gap-12 md:gap-24 px-6 flex-wrap">
        {CLIENTS.map((client, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-4 shrink-0">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-[20px] flex items-center justify-center transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-default group/item overflow-hidden">
              {client.imageUrl ? (
                <img 
                  src={client.imageUrl} 
                  alt={client.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-xl md:text-2xl font-bold tracking-tighter text-white/40 group-hover/item:text-white group-hover/item:glow-text transition-all duration-500">
                  {getInitials(client.name)}
                </span>
              )}
            </div>
            <span className="text-xs md:text-sm font-medium text-foreground/40 tracking-wider uppercase">
              {client.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
