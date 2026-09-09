import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://glitch-ai-studio.vercel.app'),
  title: "Glitch AI Studio | The AI Avatar Content System by Soumitro Halder Shan",
  description: "Stop filming. Start scaling. Founded and operated by solopreneur Soumitro Halder Shan. I engineer hyper-realistic AI avatars and automated content pipelines producing 30 days of branded video in 24 hours.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/favicon-180x180.png',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${anton.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-[#0a0a0c] text-[#e5e1e4] font-sans antialiased selection:bg-[#c3f400] selection:text-[#161e00]`}
        suppressHydrationWarning
      >
        <ScrollToTop />
        <Suspense>{children}</Suspense>
        <Toaster position="bottom-right"
          toastOptions={{
            style: {
              background: '#1c1b1d',
              color: '#fff',
              border: '1px solid #2a2a2c',
            },
          }}
        />
      </body>
    </html>
  );
}
