"use client";

import { cn } from "@/lib/utils";

const CLIENTS = [
  { name: "Batatinha" },
  { name: "Polícia Em Ação" },
  { name: "Luska Dreus" },
  { name: "Opaulomathias" },
  { name: "Liny Henricky" },
  { name: "Lukskk" },
  { name: "Luksss" },
  { name: "Upbuxx" },
  { name: "Lukszin" },
  { name: "Elly" },
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
  // Triple the list to ensure smooth infinite loop
  const marqueeItems = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-foreground/80">
          Quem confia no meu trabalho
        </h2>
      </div>

      <div className="relative flex group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] space-x-12 px-6">
          {marqueeItems.map((client, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-4 shrink-0">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-[20px] flex items-center justify-center transition-all duration-500 hover:border-teal-500/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] cursor-default group/item">
                <span className="text-xl md:text-2xl font-bold tracking-tighter text-white/40 group-hover/item:text-white group-hover/item:glow-text transition-all duration-500">
                  {getInitials(client.name)}
                </span>
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground/40 tracking-wider uppercase">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
