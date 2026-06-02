"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal } from "./scroll-reveal";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Mensagem Enviada!",
        description: "Entrarei em contato em breve.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-5xl mx-auto">
      <ScrollReveal className="w-full">
        <div className="liquid-card p-12 md:p-20 space-y-16">
          <div className="space-y-6 text-center">
            <ScrollReveal delay={100}>
              <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tight glow-text leading-none">
                Vamos criar <br /> algo novo?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-foreground/40 max-w-xl mx-auto text-lg">
                Disponível para novos projetos e colaborações criativas que desafiam o comum.
              </p>
            </ScrollReveal>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal delay={300} className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 ml-4">Nome</label>
                <input 
                  required
                  placeholder="Seu nome"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl h-14 px-6 focus:border-white/30 focus:bg-white/[0.05] transition-all outline-none"
                />
              </ScrollReveal>
              <ScrollReveal delay={400} className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 ml-4">E-mail</label>
                <input 
                  required
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl h-14 px-6 focus:border-white/30 focus:bg-white/[0.05] transition-all outline-none"
                />
              </ScrollReveal>
            </div>
            <ScrollReveal delay={500} className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 ml-4">Sua Mensagem</label>
              <textarea 
                required
                placeholder="Fale um pouco sobre o seu projeto..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-3xl min-h-[180px] p-6 focus:border-white/30 focus:bg-white/[0.05] transition-all outline-none resize-none"
              />
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <button 
                type="submit" 
                disabled={loading}
                className="liquid-button w-full h-16 text-sm font-bold uppercase tracking-[0.3em] bg-white/[0.05] border-white/40"
              >
                {loading ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </ScrollReveal>
          </form>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10 text-foreground/30 text-[10px] uppercase tracking-widest border-t border-white/5 pt-12">
            <ScrollReveal delay={700}>
              <p className="hover:text-foreground/60 transition-colors cursor-pointer">whatsapp: +55 11 99999-9999</p>
            </ScrollReveal>
            <ScrollReveal delay={800}>
              <p className="hover:text-foreground/60 transition-colors cursor-pointer">email: contato@matsu.pro</p>
            </ScrollReveal>
            <ScrollReveal delay={900}>
              <p>São Paulo, Brasil</p>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
