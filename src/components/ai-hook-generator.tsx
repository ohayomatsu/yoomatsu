"use client";

import { useState } from "react";
import { generateVideoContentHooks } from "@/ai/flows/generate-video-content-hooks";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Copy, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function AIHookGenerator() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ title: string; caption: string } | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const output = await generateVideoContentHooks({ videoDescription: description });
      setResult(output);
    } catch (error) {
      toast({
        title: "Erro ao gerar hooks",
        description: "Ocorreu um problema com o assistente de IA. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Conteúdo copiado para a área de transferência.",
    });
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <Badge className="bg-white/10 text-white border-white/20 mb-2">GenAI Powered</Badge>
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight flex items-center justify-center gap-3">
            <Sparkles className="text-white/60" /> Matsu AI Assistant
          </h2>
          <p className="text-foreground/60">
            Tem um vídeo mas não sabe como postar? Deixe minha IA criar títulos e captions magnéticos para você.
          </p>
        </div>

        <div className="glass-card p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70">Descreva o seu vídeo brevemente:</label>
            <Textarea 
              placeholder="Ex: Um vídeo cinematográfico de um café sendo preparado em câmera lenta com jazz ao fundo..."
              className="bg-white/5 border-white/10 min-h-[120px] focus:ring-white/20 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={loading || !description}
            className="w-full h-12 glass-effect bg-white/10 hover:bg-white/20 text-white text-lg font-medium"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              <RefreshCw className="mr-2 h-5 w-5" />
            )}
            Gerar Estratégia de Postagem
          </Button>

          {result && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="glass-effect p-6 rounded-xl space-y-3 relative group">
                <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Título Sugerido</span>
                <p className="text-lg font-semibold leading-tight">{result.title}</p>
                <button 
                  onClick={() => copyToClipboard(result.title)}
                  className="absolute top-4 right-4 p-2 rounded-md hover:bg-white/10 text-foreground/40 hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Copy size={16} />
                </button>
              </div>
              <div className="glass-effect p-6 rounded-xl space-y-3 relative group">
                <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Caption (Legenda)</span>
                <p className="text-sm text-foreground/80 leading-relaxed italic line-clamp-4">{result.caption}</p>
                <button 
                  onClick={() => copyToClipboard(result.caption)}
                  className="absolute top-4 right-4 p-2 rounded-md hover:bg-white/10 text-foreground/40 hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
      {children}
    </span>
  );
}
