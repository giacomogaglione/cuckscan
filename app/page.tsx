"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { InstagramInput } from "@/components/instagram-input";
import { FakeAnalyzer } from "@/components/fake-analyzer";
import { ResultCard } from "@/components/result-card";
import { RecentlyChecked } from "@/components/recently-checked";
import { getScore, generateFakeStats } from "@/lib/score";
import { getRoast } from "@/lib/roasts";

type AppState = "input" | "analyzing" | "result";

function CuckometroApp() {
  const [state, setState] = useState<AppState>("input");
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
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
      } catch {
        // Invalid param, ignore
      }
    }
  }, [searchParams]);

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
    // Clear URL params
    window.history.replaceState({}, "", "/");
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <div className="w-full max-w-md flex flex-col items-center space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-7xl font-bold font-[family-name:var(--font-mono)] tracking-tight">
            <span className="text-[var(--neon)]">CUCK</span>SCAN
          </h1>
          {state === "input" && (
            <p className="text-white/50 text-lg">
              Drop the Instagram username. Find out the truth.
            </p>
          )}
        </div>

        {/* Input state */}
        {state === "input" && (
          <>
            <InstagramInput onSubmit={handleSubmit} />
          </>
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

      {/* Recently checked marquee */}
      {state === "input" && <RecentlyChecked />}

    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <CuckometroApp />
    </Suspense>
  );
}
