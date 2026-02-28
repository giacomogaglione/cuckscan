"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Accessing profile...",
  "Analyzing suspicious following...",
  "Scanning comments...",
  "Checking late-night likes...",
  "Analyzing recent stories...",
  "Processing cuck level...",
];

const STEP_DELAY = 1200;

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
        Scanning <span className="text-[var(--neon)]">@{username}</span>
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
