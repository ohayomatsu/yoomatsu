"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";

const PROJECTS = [
  { id: 1, title: "Modern Brand Identity", category: "Edição Básica", imgId: "portfolio-1" },
  { id: 2, title: "Dynamic Social Ad", category: "Edição Complexa", imgId: "portfolio-2" },
  { id: 3, title: "ASMR Audio Mix", category: "Sonorização", imgId: "portfolio-3" },
  { id: 4, title: "Cinematic Travel Film", category: "Edição Complexa", imgId: "portfolio-4" },
  { id: 5, title: "Urban Lifestyle Reel", category: "Edição Básica", imgId: "portfolio-5" },
  { id: 6, title: "Commercial Sound Design", category: "Sonorização", imgId: "portfolio-6" },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="space-y-4 text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Portfólio</h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Uma seleção de trabalhos que traduzem visão em realidade.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={200} className="w-full flex flex-col items-center space-y-12">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
          <div className="flex justify-center mb-12">
            <TabsList className="liquid-glass p-1 h-auto rounded-full bg-white/5 border-white/10">
              <TabsTrigger value="all" className="rounded-full px-6 py-2 data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Todos</TabsTrigger>
              <TabsTrigger value="Edição Básica" className="rounded-full px-6 py-2 data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Edição Básica</TabsTrigger>
              <TabsTrigger value="Edição Complexa" className="rounded-full px-6 py-2 data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Edição Complexa</TabsTrigger>
              <TabsTrigger value="Sonorização" className="rounded-full px-6 py-2 data-[state=active]:bg-white/10 data-[state=active]:text-white transition-all">Sonorização</TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {filteredProjects.map((project, index) => {
              const image = PlaceHolderImages.find(img => img.id === project.imgId);
              return (
                <ScrollReveal key={project.id} delay={index * 100}>
                  <div className="group relative liquid-card overflow-hidden aspect-video cursor-pointer">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 saturate-[0.8]"
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
                </ScrollReveal>
              );
            })}
          </div>
        </Tabs>
      </ScrollReveal>
    </section>
  );
}
