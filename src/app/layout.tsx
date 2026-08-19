import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import N8nChatWidget from "@/components/layout/N8nChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SK Academia - Votre plateforme pour la rÃ©ussite acadÃ©mique",
  description: "Ressources Ã©ducatives, fascicules de concours et formations en ligne pour les Ã©tudiants au SÃ©nÃ©gal et au-delÃ .",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <N8nChatWidget />
      </body>
    </html>
  );
}

