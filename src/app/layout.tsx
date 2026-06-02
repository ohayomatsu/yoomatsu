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
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <style>{`
          #turbulence-bg { 
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            z-index: 0; 
          }
          body { 
            background: #000; 
          }
          main, section, nav, footer { 
            position: relative; 
            z-index: 10; 
          }
        `}</style>
      </head>
      <body className="font-body antialiased bg-black text-[#F0F0F0] noise-bg">
        <TurbulenceBackground />
        {children}
      </body>
    </html>
  );
}
