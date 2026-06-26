import type {Metadata} from 'next';
import './globals.css';
import { CustomCursor } from '@/components/custom-cursor';

export const metadata: Metadata = {
  title: 'yoomatsu',
  description: 'criador de conteúdo e editor de vídeo',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" style={{ background: '#0a0a0a' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <style>{`
          body { 
            background: #0a0a0a !important;
            position: relative;
            min-height: 100vh;
            overflow-x: hidden;
            margin: 0;
          }
          @media (max-width: 768px) {
            .mobile-menu-blur {
              backdrop-filter: blur(12px) !important;
              -webkit-backdrop-filter: blur(12px) !important;
            }
          }
        `}</style>
      </head>
      <body className="font-body antialiased text-[#F0F0F0]">
        <CustomCursor />
        <div className="min-h-screen w-full bg-[#0a0a0a] relative overflow-hidden">
          {/* Top Spotlight Background */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(
                  circle at top,
                  rgba(255, 255, 255, 0.08) 0%,
                  rgba(255, 255, 255, 0.08) 20%,
                  rgba(0, 0, 0, 0.0) 60%
                )
              `,
            }}
          />
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
