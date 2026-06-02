import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { AIHookGenerator } from "@/components/ai-hook-generator";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <Hero />
      
      <Portfolio />
      
      <Services />

      <AIHookGenerator />
      
      <About />
      
      <Contact />

      <footer className="py-12 border-t border-white/5 text-center text-foreground/30 text-xs">
        <p>© {new Date().getFullYear()} Matsu. Todos os direitos reservados.</p>
        <p className="mt-2 tracking-widest uppercase">Transforming ideas into images.</p>
      </footer>

      <Toaster />
    </main>
  );
}