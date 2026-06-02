
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Início", href: "#hero" },
  { name: "Portfólio", href: "#portfolio" },
  { name: "Serviços", href: "#services" },
  { name: "Sobre", href: "#about" },
  { name: "Contato", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroTitleVisible, setIsHeroTitleVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroTitleVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const titleElement = document.getElementById("hero-title");
    if (titleElement) {
      observer.observe(titleElement);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (titleElement) observer.unobserve(titleElement);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[90%] max-w-5xl rounded-full",
        isScrolled ? "liquid-glass py-2 px-6" : "bg-transparent py-4 px-6"
      )}
    >
      <div className="flex items-center relative min-h-[40px]">
        {/* Logo - Animates opacity and horizontal slide */}
        <Link 
          href="#hero" 
          className={cn(
            "text-xl font-headline font-bold tracking-tighter glow-text transition-all duration-500 ease-in-out absolute left-0 z-10",
            isHeroTitleVisible 
              ? "opacity-0 pointer-events-none -translate-x-2" 
              : "opacity-100 translate-x-0"
          )}
        >
          MATSU
        </Link>

        {/* Desktop Menu - Animated centering logic using spacers */}
        <div className="hidden md:flex items-center w-full transition-all duration-500 ease-in-out">
          {/* Left Spacer - Always expanding to push links from the left */}
          <div className="flex-1 transition-all duration-500" />
          
          {/* Links Container */}
          <div className="flex items-center space-x-8 shrink-0">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className="px-6 py-2 liquid-glass rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95"
            >
              Fale Comigo
            </Link>
          </div>

          {/* Right Spacer - Toggles flex-grow to center or right-align links */}
          <div 
            className={cn(
              "transition-all duration-500 ease-in-out",
              isHeroTitleVisible ? "flex-1" : "flex-[0]"
            )} 
          />
        </div>

        {/* Mobile Menu Trigger */}
        <button
          className="md:hidden text-foreground ml-auto"
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
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium py-3 border-b border-white/5 text-center"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
