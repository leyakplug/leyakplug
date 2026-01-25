import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leyak Plug - AI Agency Dashboard",
  description: "AI Agency Dashboard for Beauty & Nail Salons - Manage operations, sales, and metrics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
