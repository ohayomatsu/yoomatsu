"use client";

import { Check } from "lucide-react";

const SERVICES = [
  {
    eyebrow: "VÍDEO LONGO",
    title: "Diretor's Cut",
    description: "Edição completa para vídeos de longa duração, focada em retenção e qualidade cinematográfica.",
    price: "Sob consulta",
    features: [
      "Cortes e ritmo dinâmico",
      "Legendas e elementos gráficos",
      "Tratamento de cor",
      "Até 2 rodadas de revisão"
    ],
  },
  {
    eyebrow: "VERTICAL / SHORTS",
    title: "Corte Rápido",
    description: "Edição ágil para Reels, TikTok e Shorts, otimizada para viralização e impacto imediato.",
    price: "Sob consulta",
    features: [
      "Edição de 1 vídeo curto (até 60s)",
      "Legendas estilizadas + SFX",
      "1 rodada de revisão",
      "Entrega em até 48h"
    ],
    highlight: true,
  },
];

export function Services() {
  const triggerGlow = () => {
    window.dispatchEvent(new CustomEvent("trigger-contact-glow"));
  };

  return (
    <section id="services" className="py-32 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-6xl font-headline font-bold tracking-tight glow-text">Serviços</h2>
          <p className="text-foreground/40 max-w-2xl mx-auto text-lg">
            Duas opções já pensadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className={`liquid-card p-10 flex flex-col space-y-8 h-full ${
                service.highlight ? "border-white/40 bg-white/[0.08]" : ""
              }`}
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-foreground/40 uppercase">
                    {service.eyebrow}
                  </span>
                  <h3 className="text-3xl font-bold font-headline glow-text">{service.title}</h3>
                </div>
                <p className="text-foreground/50 text-sm leading-relaxed">{service.description}</p>
                <div className="pt-2">
                  <span className="text-lg font-medium text-white/90">{service.price}</span>
                </div>
              </div>

              <div className="h-px bg-white/10 w-full" />

              <ul className="flex-1 space-y-5">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-4 text-sm text-foreground/70">
                    <div className="p-1 rounded-full bg-white/5 border border-white/10 mt-0.5">
                      <Check size={14} className="text-white/60 shrink-0" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#contact" 
                onClick={triggerGlow}
                className="liquid-button w-full text-xs font-bold uppercase tracking-widest bg-white/5 text-center flex items-center justify-center"
              >
                QUERO ESSE
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
