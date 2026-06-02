"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const SERVICES = [
  {
    title: "Edição Básica",
    description: "Ideal para reels, shorts e stories que precisam de agilidade.",
    features: [
      "Cortes e ritmo dinâmico",
      "Legendas automáticas",
      "Transições limpas",
      "Ajustes básicos de cor",
      "Exportação em 4K"
    ],
  },
  {
    title: "Edição Complexa",
    description: "Para conteúdos que precisam se destacar e contar uma história.",
    features: [
      "Tudo do plano básico",
      "Motion Graphics avançado",
      "VFX e composição",
      "Mixagem de áudio profissional",
      "Design de som imersivo",
      "Tratamento de cor (Color Grading)"
    ],
    highlight: true,
  },
  {
    title: "Sonorização",
    description: "O áudio é 50% do seu vídeo. Dê vida às suas imagens.",
    features: [
      "Curadoria de trilha sonora",
      "Sound Design (Foley e FX)",
      "Mixagem e masterização",
      "Remoção de ruídos",
      "Equalização vocal"
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Serviços</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Soluções completas de pós-produção para elevar seu conteúdo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className={`glass-card p-8 flex flex-col space-y-6 ${
                service.highlight ? "border-white/30 bg-white/10 ring-1 ring-white/10 scale-105" : ""
              }`}
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-headline">{service.title}</h3>
                <p className="text-foreground/60 text-sm">{service.description}</p>
              </div>

              <div className="h-px bg-white/10 w-full" />

              <ul className="flex-1 space-y-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-foreground/80">
                    <Check size={18} className="text-white/50 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 glass-effect rounded-xl font-semibold hover:bg-white/20 transition-all">
                Saber Mais
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}