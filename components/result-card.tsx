"use client";

import { HornMeter } from "./horn-meter";
import { ShareButtons } from "./share-buttons";
import type { RoastResult } from "@/lib/roasts";

interface Props {
  score: number;
  roast: RoastResult;
  username: string;
  fakeStats: {
    suspiciousFollowers: number;
    fireComments: number;
    lateNightStories: number;
    suspiciousDMs: number;
    couplesPhotos: number;
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
        <p className="text-white/40 uppercase tracking-wider text-xs mb-3">Detailed analysis</p>
        <div className="flex justify-between"><span className="text-white/60">Suspicious followers</span><span className="text-white">{fakeStats.suspiciousFollowers}</span></div>
        <div className="flex justify-between"><span className="text-white/60">Comments with 🔥</span><span className="text-white">{fakeStats.fireComments}</span></div>
        <div className="flex justify-between"><span className="text-white/60">Stories viewed after midnight</span><span className="text-white">{fakeStats.lateNightStories}</span></div>
        <div className="flex justify-between"><span className="text-white/60">Estimated suspicious DMs</span><span className="text-white">{fakeStats.suspiciousDMs}</span></div>
        <div className="flex justify-between"><span className="text-white/60">Couple photos (not with you)</span><span className="text-white">{fakeStats.couplesPhotos}</span></div>
      </div>

      <ShareButtons score={score} level={roast.level} username={username} />

      <button
        onClick={onReset}
        className="w-full py-3 bg-white/5 border border-white/20 rounded-lg text-white/60 font-mono hover:bg-white/10 hover:text-white transition-colors"
      >
        Scan another profile
      </button>
    </div>
  );
}
