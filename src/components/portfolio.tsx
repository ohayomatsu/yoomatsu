"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PROJECTS = [
  { id: 1, title: "Modern Brand Identity", category: "Edição Básica", imgId: "portfolio-1" },
  { id: 2, title: "Dynamic Social Ad", category: "Edição Complexa", imgId: "portfolio-2" },
  { id: 3, title: "ASMR Audio Mix", category: "Sonorização", imgId: "portfolio-3" },
  { id: 4, title: "Cinematic Travel Film", category: "Edição Complexa", imgId: "portfolio-4" },
  { id: 5, title: "Urban Lifestyle Reel", category: "Edição Básica", imgId: "portfolio-5" },
  { id: 6, title: "Commercial Sound Design", category: "Sonorização", imgId: "portfolio-6" },
];

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "Edição Básica", label: "Edição Básica" },
  { id: "Edição Complexa", label: "Edição Complexa" },
  { id: "Sonorização", label: "Sonorização" },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const filteredProjects = activeCategory === "all" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  useEffect(() => {
    const activeBtn = buttonsRef.current[activeCategory];
    if (activeBtn && containerRef.current) {
      setPillStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        opacity: 1
      });
    }
  }, [activeCategory]);

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto space-y-16 scroll-mt-20">
      <div className="space-y-4 text-center">
        <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Portfólio</h2>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Uma seleção de trabalhos que traduzem visão em realidade.
        </p>
      </div>

      <div className="w-full flex flex-col items-center justify-center space-y-12">
        <div 
          ref={containerRef}
          className="relative flex flex-wrap justify-center p-1 bg-white/[0.04] border border-white/10 rounded-full"
        >
          {/* Liquid Slider Pill */}
          <div 
            className="absolute top-1 bottom-1 pointer-events-none z-0"
            style={{
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity,
              transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
              borderRadius: '9999px',
            }}
          />

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              ref={(el) => {
                buttonsRef.current[cat.id] = el;
              }}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "relative z-10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-opacity duration-300",
                activeCategory === cat.id
                  ? "text-white opacity-100"
                  : "text-white/40 opacity-50 hover:opacity-80"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredProjects.map((project) => {
            const image = PlaceHolderImages.find(img => img.id === project.imgId);
            return (
              <div key={project.id} className="group relative liquid-card overflow-hidden aspect-video cursor-pointer">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 saturate-[0.8]"
                    data-ai-hint="video editing"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-4 backdrop-blur-sm">
                  <div className="p-4 rounded-full bg-white/20 border border-white/40 scale-0 group-hover:scale-100 transition-transform duration-500">
                    <Play fill="white" size={32} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <Badge variant="outline" className="mb-2 bg-white/5 text-white/80 border-white/20 backdrop-blur-md">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-medium text-white group-hover:glow-text transition-all">
                    {project.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}