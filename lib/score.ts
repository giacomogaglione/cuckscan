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
  return hash % 101; // 0-100
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
