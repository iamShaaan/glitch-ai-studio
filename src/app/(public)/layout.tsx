"use client";

import { useEffect } from "react";

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
        <main>
            {children}
        </main>
    );
}
