"use client";

import { useEffect } from "react";
import { LoadingProvider } from "@/context/loading-context";
import { GlobalLoader } from "@/components/loading/global-loader";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // Always start at the top of the page on load/navigation
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    return (
        <LoadingProvider>
            <GlobalLoader />
            <main>
                {children}
            </main>
        </LoadingProvider>
    );
}
