import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full min-h-screen bg-[#0a0a0c]">{children}</main>;
}
