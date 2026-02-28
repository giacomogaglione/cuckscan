# cuckometro.it Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a satirical single-page site where users paste an Instagram profile and get a fake "cuckold score" with dramatic loading animation and shareable results.

**Architecture:** Single Next.js 15 app with App Router. All client-side — no backend. Username is hashed to produce a deterministic score so the same profile always gets the same result. Three UI states: input → analyzing → result.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, TypeScript, Vercel

---

### Task 1: Project scaffolding

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx`
- Create: `.gitignore`

**Step 1: Initialize Next.js project**

```bash
cd /Users/jst/Desktop/cuckometro
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack --yes
```

This scaffolds Next.js 15 with App Router, TypeScript, Tailwind v4, and ESLint.

**Step 2: Clean up boilerplate**

Remove default Next.js content from `app/page.tsx`. Replace with a minimal placeholder:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold">cuckometro.it</h1>
    </main>
  );
}
```

Update `app/globals.css` to set dark defaults:

```css
@import "tailwindcss";

:root {
  --neon: #39FF14;
}

body {
  background: #000;
  color: #fff;
}
```

Update `app/layout.tsx` metadata:

```tsx
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
```

**Step 3: Verify it runs**

```bash
npm run dev
```

Open http://localhost:3000 — should show "cuckometro.it" centered on black background.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with dark theme"
```

---

### Task 2: Score engine and roast data

**Files:**
- Create: `lib/score.ts`
- Create: `lib/roasts.ts`

**Step 1: Write the score engine**

Create `lib/score.ts` — deterministic hash from username to 0-100 score:

```ts
export function extractUsername(input: string): string {
  const cleaned = input.trim().replace(/\/+$/, "");
  const igRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)/;
  const match = cleaned.match(igRegex);
  if (match) return match[1].toLowerCase();
  // Assume raw username
  const username = cleaned.replace(/^@/, "");
  if (/^[a-zA-Z0-9._]+$/.test(username)) return username.toLowerCase();
  return "";
}

export function hashUsername(username: string): number {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    const char = username.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

export function getScore(username: string): number {
  const hash = hashUsername(username);
  return (hash % 101); // 0-100
}

export function generateFakeStats(username: string): {
  followersSospetti: number;
  commentiFuoco: number;
  storiesNotturne: number;
  dmSospetti: number;
  fotoInDue: number;
} {
  const h = hashUsername(username);
  return {
    followersSospetti: (h % 900) + 100,
    commentiFuoco: (h % 50) + 3,
    storiesNotturne: (h % 30) + 1,
    dmSospetti: (h % 200) + 10,
    fotoInDue: (h % 15) + 1,
  };
}
```

**Step 2: Write the roast data**

Create `lib/roasts.ts`:

```ts
export interface RoastResult {
  minScore: number;
  maxScore: number;
  level: string;
  emoji: string;
  roast: string;
}

export const roasts: RoastResult[] = [
  {
    minScore: 0, maxScore: 10,
    level: "Intoccabile",
    emoji: "😇",
    roast: "Pulito. O lei è un angelo, o tu non sai usare Instagram.",
  },
  {
    minScore: 11, maxScore: 20,
    level: "Sicuro",
    emoji: "😌",
    roast: "Tranquillo, per ora. Ma tieni gli occhi aperti.",
  },
  {
    minScore: 21, maxScore: 30,
    level: "Quasi Sicuro",
    emoji: "🤔",
    roast: "Tutto ok... ma quel 'migliore amico' commenta troppo.",
  },
  {
    minScore: 31, maxScore: 40,
    level: "Dubbioso",
    emoji: "😐",
    roast: "C'è qualcosa che non torna. Fidati del tuo istinto.",
  },
  {
    minScore: 41, maxScore: 50,
    level: "Sospetto",
    emoji: "🤨",
    roast: "Hmm. Quella storia alle 2 di notte non si è vista da sola.",
  },
  {
    minScore: 51, maxScore: 60,
    level: "Preoccupante",
    emoji: "😬",
    roast: "I segnali ci sono. Tu scegli di non vederli.",
  },
  {
    minScore: 61, maxScore: 70,
    level: "Critico",
    emoji: "😰",
    roast: "Ci sono più red flags qui che in una partita di calcio.",
  },
  {
    minScore: 71, maxScore: 80,
    level: "Cornuto Probabile",
    emoji: "🐂",
    roast: "Fratello, le corna si vedono dal satellite.",
  },
  {
    minScore: 81, maxScore: 85,
    level: "Cornuto Certificato",
    emoji: "🐂🐂",
    roast: "Non serviva l'AI. Lo sapevano tutti tranne te.",
  },
  {
    minScore: 86, maxScore: 90,
    level: "Cornuto Leggendario",
    emoji: "🐂🐂🐂",
    roast: "Le corna si vedono da Google Maps. Sei un punto di riferimento.",
  },
  {
    minScore: 91, maxScore: 95,
    level: "Cornuto Cosmico",
    emoji: "🐂🐂🐂🐂",
    roast: "La NASA ti ha contattato. Le tue corna interferiscono coi satelliti.",
  },
  {
    minScore: 96, maxScore: 100,
    level: "Re dei Cornuti",
    emoji: "👑🐂👑",
    roast: "A questo punto apriti un allevamento di tori. Sei il re indiscusso.",
  },
];

export function getRoast(score: number): RoastResult {
  return roasts.find((r) => score >= r.minScore && score <= r.maxScore) ?? roasts[roasts.length - 1];
}
```

**Step 3: Commit**

```bash
git add lib/
git commit -m "feat: add score engine and curated roast data"
```

---

### Task 3: Instagram input component

**Files:**
- Create: `components/instagram-input.tsx`

**Step 1: Write the component**

```tsx
"use client";

import { useState } from "react";
import { extractUsername } from "@/lib/score";

interface Props {
  onSubmit: (username: string) => void;
  disabled?: boolean;
}

export function InstagramInput({ onSubmit, disabled }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const username = extractUsername(value);
    if (!username) {
      setError("Inserisci un profilo Instagram valido");
      return;
    }
    setError("");
    onSubmit(username);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(""); }}
          placeholder="instagram.com/username"
          disabled={disabled}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 font-mono text-lg focus:outline-none focus:border-[var(--neon)] focus:ring-1 focus:ring-[var(--neon)] transition-colors disabled:opacity-50"
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={disabled}
        className="w-full py-3 bg-[var(--neon)] text-black font-bold text-lg rounded-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-mono)]"
      >
        ANALIZZA
      </button>
    </form>
  );
}
```

**Step 2: Commit**

```bash
git add components/
git commit -m "feat: add Instagram input component"
```

---

### Task 4: Fake analyzer component

**Files:**
- Create: `components/fake-analyzer.tsx`

**Step 1: Write the component**

```tsx
"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Accesso al profilo...",
  "Analisi following sospetti...",
  "Scansione commenti...",
  "Controllo likes notturni...",
  "Analisi stories recenti...",
  "Elaborazione livello di corna...",
];

const STEP_DELAY = 1200; // ms per step

interface Props {
  username: string;
  onComplete: () => void;
}

export function FakeAnalyzer({ username, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStep((s) => s + 1);
      }, STEP_DELAY);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <div className="w-full max-w-md space-y-3">
      <p className="text-white/60 font-mono text-sm mb-4">
        Analizzando <span className="text-[var(--neon)]">@{username}</span>
      </p>
      {STEPS.map((step, i) => (
        <div
          key={step}
          className={`flex items-center gap-3 transition-all duration-300 ${
            i < currentStep
              ? "opacity-100"
              : i === currentStep
              ? "opacity-100 animate-pulse"
              : "opacity-0"
          }`}
        >
          <span className="text-sm font-mono">
            {i < currentStep ? (
              <span className="text-[var(--neon)]">✓</span>
            ) : i === currentStep ? (
              <span className="animate-spin inline-block">⟳</span>
            ) : null}
          </span>
          <span className={`text-sm font-mono ${i < currentStep ? "text-white/60" : "text-white"}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/fake-analyzer.tsx
git commit -m "feat: add fake analyzer loading component"
```

---

### Task 5: Horn meter component

**Files:**
- Create: `components/horn-meter.tsx`

**Step 1: Write the component**

```tsx
"use client";

import { useEffect, useState } from "react";

interface Props {
  score: number;
}

export function HornMeter({ score }: Props) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = Math.max(1, Math.floor(score / 40));
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        current = score;
        clearInterval(timer);
      }
      setDisplayScore(current);
    }, 30);
    return () => clearInterval(timer);
  }, [score]);

  const hornCount = Math.ceil(displayScore / 20); // 0-5 horns

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-end justify-between">
        <span className="text-6xl font-bold font-[family-name:var(--font-mono)] text-[var(--neon)]">
          {displayScore}%
        </span>
        <span className="text-3xl">
          {"🐂".repeat(hornCount)}
        </span>
      </div>
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${displayScore}%`,
            background: `linear-gradient(90deg, #39FF14 0%, #FFD700 50%, #FF0000 100%)`,
          }}
        />
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/horn-meter.tsx
git commit -m "feat: add animated horn meter component"
```

---

### Task 6: Share buttons component

**Files:**
- Create: `components/share-buttons.tsx`

**Step 1: Write the component**

```tsx
"use client";

import { useState } from "react";

interface Props {
  score: number;
  level: string;
  username: string;
}

export function ShareButtons({ score, level, username }: Props) {
  const [copied, setCopied] = useState(false);

  const shareText = `Ho analizzato @${username} sul Cuckometro: ${score}% - ${level} 🐂\nScopri il tuo livello:`;
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/?r=${encodeURIComponent(btoa(JSON.stringify({ s: score, u: username })))}`
    : "";

  async function copyLink() {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareWhatsApp() {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      "_blank"
    );
  }

  function shareX() {
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <p className="text-white/40 text-sm font-mono uppercase tracking-wider">Condividi il risultato</p>
      <div className="flex gap-3">
        <button
          onClick={copyLink}
          className="flex-1 py-2 px-4 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-mono hover:bg-white/20 transition-colors"
        >
          {copied ? "Copiato!" : "Copia link"}
        </button>
        <button
          onClick={shareWhatsApp}
          className="flex-1 py-2 px-4 bg-[#25D366]/20 border border-[#25D366]/40 rounded-lg text-[#25D366] text-sm font-mono hover:bg-[#25D366]/30 transition-colors"
        >
          WhatsApp
        </button>
        <button
          onClick={shareX}
          className="flex-1 py-2 px-4 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-mono hover:bg-white/20 transition-colors"
        >
          X
        </button>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/share-buttons.tsx
git commit -m "feat: add share buttons component"
```

---

### Task 7: Result card component

**Files:**
- Create: `components/result-card.tsx`

**Step 1: Write the component**

```tsx
"use client";

import { HornMeter } from "./horn-meter";
import { ShareButtons } from "./share-buttons";
import type { RoastResult } from "@/lib/roasts";

interface Props {
  score: number;
  roast: RoastResult;
  username: string;
  fakeStats: {
    followersSospetti: number;
    commentiFuoco: number;
    storiesNotturne: number;
    dmSospetti: number;
    fotoInDue: number;
  };
  onReset: () => void;
}

export function ResultCard({ score, roast, username, fakeStats, onReset }: Props) {
  return (
    <div className="w-full max-w-md space-y-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center space-y-2">
        <p className="text-4xl">{roast.emoji}</p>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-mono)] text-[var(--neon)]">
          {roast.level}
        </h2>
      </div>

      <HornMeter score={score} />

      <p className="text-white/80 text-center text-lg italic">
        &ldquo;{roast.roast}&rdquo;
      </p>

      <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2 font-mono text-sm">
        <p className="text-white/40 uppercase tracking-wider text-xs mb-3">Analisi dettagliata</p>
        <div className="flex justify-between"><span className="text-white/60">Followers sospetti</span><span className="text-white">{fakeStats.followersSospetti}</span></div>
        <div className="flex justify-between"><span className="text-white/60">Commenti con 🔥</span><span className="text-white">{fakeStats.commentiFuoco}</span></div>
        <div className="flex justify-between"><span className="text-white/60">Stories viste dopo mezzanotte</span><span className="text-white">{fakeStats.storiesNotturne}</span></div>
        <div className="flex justify-between"><span className="text-white/60">DM sospetti stimati</span><span className="text-white">{fakeStats.dmSospetti}</span></div>
        <div className="flex justify-between"><span className="text-white/60">Foto in due (non con te)</span><span className="text-white">{fakeStats.fotoInDue}</span></div>
      </div>

      <ShareButtons score={score} level={roast.level} username={username} />

      <button
        onClick={onReset}
        className="w-full py-3 bg-white/5 border border-white/20 rounded-lg text-white/60 font-mono hover:bg-white/10 hover:text-white transition-colors"
      >
        Analizza un altro profilo
      </button>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/result-card.tsx
git commit -m "feat: add result card component"
```

---

### Task 8: Wire up main page

**Files:**
- Modify: `app/page.tsx`

**Step 1: Write the main page with all three states**

```tsx
"use client";

import { useState, useCallback } from "react";
import { InstagramInput } from "@/components/instagram-input";
import { FakeAnalyzer } from "@/components/fake-analyzer";
import { ResultCard } from "@/components/result-card";
import { getScore, generateFakeStats } from "@/lib/score";
import { getRoast } from "@/lib/roasts";

type AppState = "input" | "analyzing" | "result";

export default function Home() {
  const [state, setState] = useState<AppState>("input");
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);

  function handleSubmit(user: string) {
    setUsername(user);
    setState("analyzing");
  }

  const handleAnalysisComplete = useCallback(() => {
    setScore(getScore(username));
    setState("result");
  }, [username]);

  function handleReset() {
    setState("input");
    setUsername("");
    setScore(0);
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md flex flex-col items-center space-y-8">
        {/* Header - always visible */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-mono)] tracking-tight">
            <span className="text-[var(--neon)]">CUCKO</span>METRO
          </h1>
          {state === "input" && (
            <p className="text-white/50 text-lg">
              Incolla il profilo Instagram. Scopri la verità.
            </p>
          )}
        </div>

        {/* Input state */}
        {state === "input" && (
          <InstagramInput onSubmit={handleSubmit} />
        )}

        {/* Analyzing state */}
        {state === "analyzing" && (
          <FakeAnalyzer username={username} onComplete={handleAnalysisComplete} />
        )}

        {/* Result state */}
        {state === "result" && (
          <ResultCard
            score={score}
            roast={getRoast(score)}
            username={username}
            fakeStats={generateFakeStats(username)}
            onReset={handleReset}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-white/20 text-xs font-mono text-center">
        <p>Ovviamente è tutto finto. O forse no. 🐂</p>
      </footer>
    </main>
  );
}
```

**Step 2: Add fadeIn animation to globals.css**

Append to `app/globals.css`:

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Step 3: Verify it runs end-to-end**

```bash
npm run dev
```

Test: paste `instagram.com/testuser`, watch fake analysis, see result.

**Step 4: Commit**

```bash
git add app/page.tsx app/globals.css
git commit -m "feat: wire up main page with input, analysis, and result states"
```

---

### Task 9: Shareable result URLs

**Files:**
- Modify: `app/page.tsx`

**Step 1: Add URL parameter support**

Update `app/page.tsx` to read `?r=` param on load and show result directly:

Add to the top of the `Home` component, after the state declarations:

```tsx
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
```

Wrap the page content in a `Suspense` boundary (required for `useSearchParams` in App Router), and add this effect inside the component:

```tsx
const searchParams = useSearchParams();

useEffect(() => {
  const encoded = searchParams.get("r");
  if (encoded) {
    try {
      const decoded = JSON.parse(atob(encoded));
      if (decoded.u && typeof decoded.s === "number") {
        setUsername(decoded.u);
        setScore(decoded.s);
        setState("result");
      }
    } catch {}
  }
}, [searchParams]);
```

**Step 2: Verify shared URLs work**

```bash
npm run dev
```

Test: do an analysis, click "Copia link", open the copied URL — should show result directly.

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add shareable result URLs via query param"
```

---

### Task 10: Build verification and deploy prep

**Files:**
- Modify: `next.config.ts` (if needed)

**Step 1: Production build**

```bash
npm run build
```

Fix any TypeScript or build errors.

**Step 2: Test production build locally**

```bash
npm run start
```

Verify full flow works in production mode.

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "chore: fix build issues" # only if there were fixes
```

**Step 4: Deploy to Vercel**

Use the Vercel MCP tool or CLI to deploy.

---
