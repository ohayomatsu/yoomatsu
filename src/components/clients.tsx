
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const CLIENTS = [
  { name: "Batatinha", imgId: "client-1" },
  { name: "Polícia Em Ação", imgId: "client-2" },
  { name: "Luska Dreus", imgId: "client-3" },
  { name: "Opaulomathias", imgId: "client-4" },
  { name: "Liny Henricky", imgId: "client-5" },
  { name: "Lukskk", imgId: "client-6" },
  { name: "Luksss", imgId: "client-7" },
  { name: "Upbuxx", imgId: "client-8" },
  { name: "Lukszin", imgId: "client-9" },
  { name: "Elly", imgId: "client-10" },
];

export function Clients() {
  // Dobramos a lista para garantir o loop infinito suave
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
          {marqueeItems.map((client, idx) => {
            const image = PlaceHolderImages.find(img => img.id === client.imgId);
            return (
              <div key={idx} className="flex flex-col items-center space-y-4 shrink-0">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full liquid-glass overflow-hidden border border-white/10 transition-all duration-500 hover:border-teal-500/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] cursor-default group/item">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={client.name}
                      fill
                      className="object-cover saturate-0 transition-all duration-500 group-hover/item:saturate-100"
                    />
                  )}
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground/40 tracking-wider uppercase">
                  {client.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
