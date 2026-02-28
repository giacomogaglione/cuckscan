import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Cuckometro - Quanto sei cornuto?",
  description: "Incolla il profilo Instagram. Scopri la verità. 🐂",
  openGraph: {
    title: "Cuckometro - Quanto sei cornuto?",
    description: "Ho appena scoperto il mio livello di corna 🐂",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${grotesk.variable} ${mono.variable}`}>
      <body className="font-[family-name:var(--font-grotesk)]">{children}</body>
    </html>
  );
}
