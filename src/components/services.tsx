"use client";

import { Check } from "lucide-react";

const SERVICES = [
  {
    title: "Long Form",
    description: "Texto placeholder descrevendo o serviço de edição para vídeos longos.",
    features: [
      "Item placeholder 1",
      "Item placeholder 2",
      "Item placeholder 3"
    ],
  },
  {
    title: "Shorts",
    description: "Texto placeholder descrevendo o serviço de edição para vídeos curtos/shorts.",
    features: [
      "Item placeholder 1",
      "Item placeholder 2",
      "Item placeholder 3"
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
            Soluções premium de pós-produção com estética cinematográfica.
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
              <div className="space-y-3">
                <h3 className="text-3xl font-bold font-headline glow-text">{service.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">{service.description}</p>
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
                SAIBA MAIS
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
