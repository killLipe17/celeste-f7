import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Celeste F7 | Futebol 7",
    template: "%s | Celeste F7",
  },
  description:
    "Site oficial do Celeste F7, time de Futebol 7 de São Paulo, fundado em 2007.",
  keywords: [
    "Celeste F7",
    "Futebol 7",
    "São Paulo",
    "CDC Rola Bola",
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${geist.variable} ${barlowCondensed.variable} scroll-smooth antialiased`}
    >
      <head>
        <meta name="color-scheme" content="only light" />
      </head>
      <body>{children}</body>
    </html>
  );
}
