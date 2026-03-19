import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const skModernist = localFont({
  src: "../public/fonts/Sk-Modernist-Regular.otf",
  variable: "--font-sk-modernist",
});

const aura = localFont({
  src: "../public/fonts/Aura/Aura.otf",
  variable: "--font-aura",
});

const nura = localFont({
  src: "../public/fonts/Nura/Nura Normal.otf",
  variable: "--font-nura",
});

const solen = localFont({
  src: "../public/fonts/Solen/Solen Semibold.otf",
  variable: "--font-solen",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Welcome to my personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${skModernist.variable} ${aura.variable} ${nura.variable} ${solen.variable} antialiased`}
      >
        <CustomCursor />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
