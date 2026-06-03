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
    
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroTitleVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const heroTitle = document.getElementById("hero-title");
    if (heroTitle) observer.observe(heroTitle);

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
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const rawEnd = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        const end = Math.min(rawEnd, maxScroll);
        
        const duration = 1000;
        let startTime: number | null = null;

        function easeInOutCubic(t: number) {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function step(timestamp: number) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          window.scrollTo({
            top: start + (end - start) * easeInOutCubic(progress),
            behavior: 'auto'
          });

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-full border",
          isScrolled 
            ? "liquid-glass py-2 px-6" 
            : "border-transparent bg-transparent py-4 px-6"
        )}
        style={{ 
          willChange: 'transform, background, border, box-shadow', 
          transform: 'translateX(-50%) translateZ(0)',
          transition: 'background 0.3s ease, border 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease, padding 0.5s ease'
        }}
      >
        <div className="flex items-center relative min-h-[40px] w-full md:overflow-visible">
          <Link 
            href="#hero" 
            className={cn(
              "navbar-logo transition-all duration-500 ease-in-out absolute z-10 flex items-center",
              "left-2 md:left-0",
              isHeroTitleVisible 
                ? "opacity-0 -translate-x-2 blur-sm pointer-events-none" 
                : "opacity-100 translate-x-0 blur-0"
            )}
          >
            <img 
              src="/logo.svg" 
              alt="MATSU" 
              style={{ height: '22px', width: 'auto' }} 
            />
          </Link>

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

          <button
            className="md:hidden text-foreground ml-auto z-10 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Moved outside of the nav with transform to fix backdrop-filter bug */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[9999] flex flex-col items-center justify-center p-8 space-y-6 animate-in fade-in duration-300"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <button
            className="absolute top-6 right-[5%] text-foreground p-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>

          <img 
            src="/logo.svg" 
            alt="MATSU" 
            className="mb-8"
            style={{ height: '32px', width: 'auto' }} 
          />

          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-bold uppercase tracking-widest py-3 border-b border-white/5 w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="mt-4 px-12 py-5 liquid-glass rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-200 w-full text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Fale Comigo
          </Link>
        </div>
      )}
    </>
  );
}
