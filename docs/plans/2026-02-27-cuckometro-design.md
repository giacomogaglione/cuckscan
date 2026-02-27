# cuckometro.it Design

**Date:** 2026-02-27
**Status:** Approved

## Overview

Satirical meme website. User pastes an Instagram profile URL, a dramatic fake analysis runs, then a random brutal roast result is displayed with a shareable score.

No real Instagram API is used — results are entirely random/fake for humor.

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- TypeScript
- Vercel deployment

## UX Flow

1. **Landing**: Dark page, bold headline "Quanto sei cornuto?", subtitle, single input field
2. **Input**: User pastes IG profile URL (e.g. `instagram.com/username`), clicks "Analizza"
3. **Fake analysis** (5-8 seconds total, sequential steps):
   - "Accesso al profilo..."
   - "Analisi following sospetti..."
   - "Scansione commenti..."
   - "Controllo likes notturni..."
   - "Elaborazione livello di corna..."
4. **Result**: Score card with percentage meter (0-100%), horn emojis scaling with score, brutal one-liner, fake detail breakdown, share button

## Design: Dark/Brutalist

- Background: black (#000) or near-black
- Text: white + neon green (#39FF14) accents
- Font: bold mono/grotesque for headlines, clean sans for body
- Horn meter: animated bar with emoji scale (no horns → full horns)
- Glitch/shake effect on result reveal
- Mobile-first (most traffic from social shares)

## Page Structure

Single page app with 3 states:

```
[INPUT] → [ANALYZING] → [RESULT]
```

### Input State
- Logo/title
- Tagline: "Incolla il profilo Instagram. Scopri la verità."
- Input field with placeholder "instagram.com/..."
- CTA button: "ANALIZZA"
- Basic URL validation (must contain instagram.com/ or just a username)

### Analyzing State
- Same page, input fades/locks
- Step-by-step progress with fake loading indicators
- Each step takes 1-1.5 seconds
- Typewriter/reveal effect for each step

### Result State
- Score percentage: large, animated count-up
- Horn meter: visual bar with 🐂 scaling
- Level label: "Sicuro" / "Sospetto" / "Preoccupante" / "Cornuto Certificato" / "Le corna si vedono da Google Maps"
- Roast one-liner (random from curated list)
- Fake breakdown: "Followers sospetti: 847", "Commenti con emoji fuoco: 23", "Stories viste alle 2 di notte: 14"
- Share buttons: "Condividi" → copy link, X, WhatsApp
- "Analizza un altro" button to reset

## Curated Roast Results (~15)

Each result includes a score range, level, one-liner, and fake stats. Examples:

- 15%: "Tranquillo, per ora. Ma tieni gli occhi aperti."
- 43%: "Hmm. Quella storia alle 2 di notte non si è vista da sola."
- 67%: "Ci sono più red flags qui che in una partita di calcio."
- 89%: "Fratello, le corna si vedono dal satellite."
- 97%: "A questo punto apriti un allevamento di tori. Sei il re."

## Shareability

- OG meta tags with provocative preview: "Ho appena scoperto il mio livello di corna 🐂"
- Result URL: `cuckometro.it/?r=<encoded-score>` so shared links show the result directly
- WhatsApp/X share pre-fills a funny message

## No Backend

Everything client-side. The "analysis" is purely cosmetic. Score is random (seeded from username hash so same username = same result = more believable).

## File Structure

```
cuckometro/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── opengraph-image.tsx
├── components/
│   ├── instagram-input.tsx
│   ├── fake-analyzer.tsx
│   ├── result-card.tsx
│   ├── horn-meter.tsx
│   └── share-buttons.tsx
├── lib/
│   ├── roasts.ts          # Curated results array
│   └── score.ts           # Username → deterministic score
├── public/
│   └── og-image.png
├── tailwind.config.ts
├── next.config.ts
└── package.json
```
