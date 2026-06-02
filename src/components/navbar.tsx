"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Início", href: "#hero" },
  { name: "Sobre", href: "#about" },
  { name: "Portfólio", href: "#portfolio" },
  { name: "Clientes", href: "#clients" },
  { name: "Serviços", href: "#services" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeroTitleVisible, setIsHeroTitleVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroTitleVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const heroTitle = document.getElementById("hero-title");
    if (heroTitle) observer.observe(heroTitle);

    // High-Precision Liquid Smooth Scroll
    const handleHashLinks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (!targetElement) return;

        const start = window.scrollY;
        const end = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        const duration = 1200; // Aumentado para um deslize mais majestoso
        let startTime: number | null = null;

        // Quintic Easing: Aceleração e desaceleração extremamente suaves
        function ease(t: number) {
          return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
        }

        function step(timestamp: number) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          window.scrollTo(0, start + (end - start) * ease(progress));
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        }

        requestAnimationFrame(step);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleHashLinks);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (heroTitle) observer.unobserve(heroTitle);
      document.removeEventListener('click', handleHashLinks);
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[90%] max-w-5xl rounded-full",
        isScrolled ? "liquid-glass py-2 px-6" : "bg-transparent py-4 px-6"
      )}
    >
      <div className="flex items-center relative min-h-[40px] w-full overflow-hidden md:overflow-visible">
        {/* Logo MATSU - Animação de Opacidade e Deslizamento */}
        <Link 
          href="#hero" 
          className={cn(
            "transition-all duration-500 ease-in-out absolute left-0 z-10 flex items-center",
            isHeroTitleVisible 
              ? "opacity-0 -translate-x-2 pointer-events-none" 
              : "opacity-100 translate-x-0"
          )}
        >
          <img 
            src="/logo.svg" 
            alt="MATSU" 
            style={{ height: '22px', width: 'auto' }} 
          />
        </Link>

        {/* Desktop Menu Wrapper */}
        <div className="hidden md:flex flex-1 items-center transition-all duration-500 ease-in-out">
          <div className="flex-1 transition-all duration-500" />
          
          <div className="flex items-center space-x-8 transition-all duration-500">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className="px-6 py-2 liquid-glass rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-200 hover:scale-[1.04] active:scale-95 whitespace-nowrap"
            >
              Fale Comigo
            </Link>
          </div>

          <div 
            className={cn(
              "transition-all duration-500 ease-in-out",
              isHeroTitleVisible ? "flex-1" : "flex-[0.0001]"
            )} 
          />
        </div>

        {/* Mobile Menu Trigger */}
        <button
          className="md:hidden text-foreground ml-auto z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-4 liquid-glass rounded-3xl p-8 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium py-3 border-b border-white/5 text-center"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="px-6 py-4 liquid-glass rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-200 hover:scale-[1.04] text-center"
          >
            Fale Comigo
          </Link>
        </div>
      )}
    </nav>
  );
}
