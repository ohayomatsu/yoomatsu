import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";
import { Clients } from "@/components/clients";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <Hero />
      
      <About />
      
      <Portfolio />

      <Clients />
      
      <Services />
      
      <Contact />

      <footer className="py-12 border-t border-white/5 text-center text-foreground/30 text-xs">
        <p>© {new Date().getFullYear()} Matsu. Todos os direitos reservados.</p>
      </footer>

      <Toaster />
    </main>
  );
}
