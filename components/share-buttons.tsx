"use client";

import { useState } from "react";

interface Props {
  score: number;
  level: string;
  username: string;
}

export function ShareButtons({ score, level, username }: Props) {
  const [copied, setCopied] = useState(false);

  const shareText = `I scanned @${username} on CuckScan: ${score}% - ${level} 🐂\nFind out yours:`;
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
      <p className="text-white/40 text-sm font-mono uppercase tracking-wider">Share result</p>
      <div className="flex gap-3">
        <button
          onClick={copyLink}
          className="flex-1 py-2 px-4 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-mono hover:bg-white/20 transition-colors"
        >
          {copied ? "Copied!" : "Copy link"}
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
