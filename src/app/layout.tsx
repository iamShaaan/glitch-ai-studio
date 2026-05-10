import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://glitch-ai-studio.vercel.app'),
  title: "Glitch AI Studio | The AI Avatar Content System",
  description: "Stop filming. Start scaling. We build hyper-realistic AI avatars and the automated content systems that produce 30 days of branded video in 24 hours. Used by lawyers, brokers, and businesses worldwide.",
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
    <html lang="en">
      <body
        className="bg-[#060d11] text-slate-100 antialiased"
        suppressHydrationWarning
      >
        <Suspense>{children}</Suspense>
        <Toaster position="bottom-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155',
            },
          }}
        />
      </body>
    </html>
  );
}
