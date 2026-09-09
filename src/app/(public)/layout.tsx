import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full min-h-screen bg-white dark:bg-[#0a0a0c] text-zinc-900 dark:text-[#e5e1e4] transition-colors duration-200">{children}</main>;
}
