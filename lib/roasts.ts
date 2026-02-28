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
    level: "Untouchable",
    emoji: "😇",
    roast: "Clean. Either she's an angel, or you don't know how to use Instagram.",
  },
  {
    minScore: 11, maxScore: 20,
    level: "Safe",
    emoji: "😌",
    roast: "Relax, for now. But keep your eyes open.",
  },
  {
    minScore: 21, maxScore: 30,
    level: "Almost Safe",
    emoji: "🤔",
    roast: "All good... but that 'best friend' comments way too much.",
  },
  {
    minScore: 31, maxScore: 40,
    level: "Doubtful",
    emoji: "😐",
    roast: "Something doesn't add up. Trust your gut.",
  },
  {
    minScore: 41, maxScore: 50,
    level: "Suspicious",
    emoji: "🤨",
    roast: "Hmm. That story at 2 AM didn't view itself.",
  },
  {
    minScore: 51, maxScore: 60,
    level: "Concerning",
    emoji: "😬",
    roast: "The signs are there. You're choosing not to see them.",
  },
  {
    minScore: 61, maxScore: 70,
    level: "Critical",
    emoji: "😰",
    roast: "More red flags here than a soccer match.",
  },
  {
    minScore: 71, maxScore: 80,
    level: "Probably Cucked",
    emoji: "🐂",
    roast: "Bro, the horns are visible from satellite.",
  },
  {
    minScore: 81, maxScore: 85,
    level: "Certified Cuck",
    emoji: "🐂🐂",
    roast: "Didn't need AI for this. Everyone knew except you.",
  },
  {
    minScore: 86, maxScore: 90,
    level: "Legendary Cuck",
    emoji: "🐂🐂🐂",
    roast: "The horns are visible on Google Maps. You're a landmark.",
  },
  {
    minScore: 91, maxScore: 95,
    level: "Cosmic Cuck",
    emoji: "🐂🐂🐂🐂",
    roast: "NASA called. Your horns are interfering with the satellites.",
  },
  {
    minScore: 96, maxScore: 100,
    level: "King of Cucks",
    emoji: "👑🐂👑",
    roast: "At this point, start a bull farm. You're the undisputed king.",
  },
];

export function getRoast(score: number): RoastResult {
  return roasts.find((r) => score >= r.minScore && score <= r.maxScore) ?? roasts[roasts.length - 1];
}
