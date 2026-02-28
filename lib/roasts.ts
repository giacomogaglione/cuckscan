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
