import type {Metadata} from 'next';
import './globals.css';
import { TurbulenceBackground } from '@/components/turbulence-background';

export const metadata: Metadata = {
  title: 'Matsu | Video Editor & Content Creator',
  description: 'Portfolio of Matsu, professional video editor and content creator specialized in high-impact social media content.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" style={{ background: '#000' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <style>{`
          .bg-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            width: 100dvw;
            height: 100%;
            height: 100dvh;
            z-index: -1;
            overflow: hidden;
            pointer-events: none;
            background: #000;
          }
          .bg-gradient { 
            position: absolute; 
            top: -60%;
            left: 0; 
            width: 100%; 
            height: 220%;
            min-width: 100vw;
            z-index: -1;
            pointer-events: none;
          }
          body { 
            background: transparent !important; 
            position: relative;
            min-height: 100vh;
            overflow-x: hidden;
          }
          main {
            position: relative;
            z-index: 1;
          }
          @media (max-width: 768px) {
            .bg-container {
              height: 100dvh;
            }
            .bg-gradient {
              height: 220%;
              top: -60%;
            }
          }
        `}</style>
      </head>
      <body className="font-body antialiased text-[#F0F0F0] noise-bg">
        <div className="bg-container">
          <TurbulenceBackground />
        </div>
        {children}
      </body>
    </html>
  );
}
