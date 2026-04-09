"use client";

import { LoadingProvider } from "@/context/loading-context";
import { GlobalLoader } from "@/components/loading/global-loader";
import { useLoading } from "@/context/loading-context";

// Inner wrapper so we can read isReady from context
function PageContent({ children }: { children: React.ReactNode }) {
  const { isReady } = useLoading();

  return (
    <main
      style={{
        // Layout is computed while loading (so scroll measurements work),
        // but nothing is visible. Once isReady flips we show instantly.
        visibility: isReady ? "visible" : "hidden",
        // Prevent any opacity flash — use visibility not opacity so
        // framer-motion whileInView animations still register correctly.
      }}
    >
      {children}
    </main>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <GlobalLoader />
      <PageContent>{children}</PageContent>
    </LoadingProvider>
  );
}
