"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending
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
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="glass-card p-12 space-y-12 text-center md:text-left">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Vamos criar algo novo?</h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Disponível para novos projetos e colaborações criativas. 
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-foreground/70 ml-1">Nome</label>
              <Input 
                required
                placeholder="Seu nome"
                className="bg-white/5 border-white/10 h-12 focus:ring-white/20 transition-all"
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-foreground/70 ml-1">E-mail</label>
              <Input 
                required
                type="email"
                placeholder="seu@email.com"
                className="bg-white/5 border-white/10 h-12 focus:ring-white/20 transition-all"
              />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <label className="text-sm font-medium text-foreground/70 ml-1">Sua Mensagem</label>
            <Textarea 
              required
              placeholder="Fale um pouco sobre o seu projeto..."
              className="bg-white/5 border-white/10 min-h-[160px] focus:ring-white/20 resize-none transition-all"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 text-lg font-bold glass-effect bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-[1.02]"
          >
            {loading ? "Enviando..." : "Enviar Mensagem"}
          </Button>
        </form>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-foreground/40 text-sm border-t border-white/5 pt-8">
          <p>whatsapp: +55 11 99999-9999</p>
          <p>email: contato@matsu.pro</p>
          <p>São Paulo, Brasil</p>
        </div>
      </div>
    </section>
  );
}