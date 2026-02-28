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
      setError("Enter a valid Instagram profile");
      return;
    }
    setError("");
    onSubmit(username);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(""); }}
          placeholder="instagram.com/username"
          disabled={disabled}
          className="flex-1 min-w-0 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 font-mono text-lg focus:outline-none focus:border-[var(--neon)] focus:ring-1 focus:ring-[var(--neon)] transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled}
          className="px-6 py-3 bg-[var(--neon)] text-black font-bold text-lg rounded-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-mono)] shrink-0"
        >
          SCAN
        </button>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  );
}
