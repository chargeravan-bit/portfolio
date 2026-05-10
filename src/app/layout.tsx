import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohan Rathod — Creative Developer & Designer",
  description:
    "Portfolio of Mohan Rathod — a creative developer crafting immersive, high-performance web experiences with Next.js, Three.js, GSAP, and WebGL.",
  keywords: [
    "creative developer",
    "web designer",
    "portfolio",
    "Next.js",
    "Three.js",
    "GSAP",
    "WebGL",
    "animation",
    "frontend",
  ],
  authors: [{ name: "Mohan Rathod" }],
  openGraph: {
    title: "Mohan Rathod — Creative Developer & Designer",
    description:
      "Immersive 3D scrolling portfolio with cinematic animations and premium interactions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      style={{ scrollBehavior: "auto" }}
    >
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
