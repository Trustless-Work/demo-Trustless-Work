"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 h-full">{children}</div>
    </div>
  );
}
