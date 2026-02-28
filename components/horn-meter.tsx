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
