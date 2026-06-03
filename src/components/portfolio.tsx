"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PROJECTS = [
  { 
    id: 1, 
    title: "SUPER BATTLE GOLF (YOOMATSU)", 
    category: "Edição Complexa", 
    videoId: "YLDHPSmUhVg" 
  },
  { 
    id: 2, 
    title: "MD10 CS (YOOMATSU)", 
    category: "Edição Complexa", 
    videoId: "S5kAg4xBnNo" 
  },
  { 
    id: 3, 
    title: "15K INTRO (YOOMATSU)", 
    category: "Edição Complexa", 
    videoId: "u29iT_vn468" 
  },
  { 
    id: 4, 
    title: "MINECRAFT SURVIVAL (YOOMATSU)", 
    category: "Edição Básica", 
    videoId: "Ctt-e2dugY8" 
  },
  { 
    id: 5, 
    title: "PEAK (YOOMATSU)", 
    category: "Edição Básica", 
    videoId: "bxg4Qrf-UZg" 
  },
  { 
    id: 6, 
    title: "MINECRAFT TERROR (YOOMATSU)", 
    category: "Edição Básica", 
    videoId: "jVsj5zg67Pc" 
  },
];

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "Edição Básica", label: "Edição Básica" },
  { id: "Edição Complexa", label: "Edição Complexa" },
  { id: "Sonorização", label: "Sonorização" },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, height: 0, opacity: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const filteredProjects = activeCategory === "all" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  useEffect(() => {
    const updatePill = () => {
      const activeBtn = buttonsRef.current[activeCategory];
      if (activeBtn && containerRef.current) {
        setPillStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          height: activeBtn.offsetHeight,
          opacity: 1
        });
      }
    };

    updatePill();
    
    window.addEventListener('resize', updatePill, { passive: true });
    return () => window.removeEventListener('resize', updatePill);
  }, [activeCategory]);

  useEffect(() => {
    if (selectedVideoId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedVideoId]);

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto space-y-16 scroll-mt-20">
      <div className="space-y-4 text-center">
        <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Portfólio</h2>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Alguns dos meus trabalhos mais recentes.
        </p>
      </div>

      <div className="w-full flex flex-col items-center justify-center space-y-12">
        {/* Filter Wrapper Extra - Isolates overflow */}
        <div className="w-full overflow-visible">
          {/* Scroll Container */}
          <div 
            className="overflow-x-auto overflow-y-visible no-scrollbar py-2 px-4 md:px-1 scroll-px-4" 
            style={{ 
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            <div 
              ref={containerRef}
              className="relative flex items-center p-1 bg-white/[0.04] border border-white/10 rounded-full w-fit mx-auto gap-0 flex-nowrap"
              style={{ isolation: 'isolate' }}
            >
              {/* Active Indicator (Pill) */}
              <div 
                className="absolute pointer-events-none z-0"
                style={{
                  left: `${pillStyle.left}px`,
                  top: '50%',
                  width: `${pillStyle.width}px`,
                  height: `${pillStyle.height}px`,
                  opacity: pillStyle.opacity,
                  transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '9999px',
                  willChange: 'left, width, opacity',
                  transform: 'translateY(-50%) translateZ(0)'
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
                    "relative z-10 px-5 md:px-6 py-2.5 md:py-2 rounded-full text-[0.7rem] md:text-xs font-bold uppercase tracking-widest transition-opacity duration-300 bg-transparent border-none text-center shrink-0 whitespace-nowrap",
                    activeCategory === cat.id
                      ? "text-white opacity-100"
                      : "text-white/40 opacity-50 hover:opacity-80"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredProjects.map((project) => {
            const thumbnailUrl = `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`;
            return (
              <div 
                key={project.id} 
                onClick={() => setSelectedVideoId(project.videoId)}
                className="group relative liquid-card overflow-hidden aspect-video cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={thumbnailUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] grayscale group-hover:grayscale-0 group-hover:scale-110"
                    unoptimized
                    loading="lazy"
                    decoding="async"
                  />
                </div>
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

      {selectedVideoId && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedVideoId(null)}
        >
          <button 
            className="absolute top-6 right-6 p-3 text-white/60 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedVideoId(null);
            }}
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative w-full max-w-[860px] aspect-video mx-4 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-2xl shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </section>
  );
}
