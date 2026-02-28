import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "CuckScan - How cucked are you?",
  description: "Paste an Instagram profile. Find out the truth. 🐂",
  openGraph: {
    title: "CuckScan - How cucked are you?",
    description: "I just found out my cuck level 🐂",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body className="font-[family-name:var(--font-grotesk)]">{children}</body>
    </html>
  );
}
