"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const OFFER_DURATION_MS = 10 * 60 * 1000; // 10 minutes
const STORAGE_KEY = "rwp_offer_start";

export function useCountdown() {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    // Get or initialise the offer start time
    let startTime = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem(STORAGE_KEY, startTime.toString());
    }

    const calc = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, Math.floor((OFFER_DURATION_MS - elapsed) / 1000));
      setSecondsLeft(remaining);
    };

    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  const expired = secondsLeft === 0;
  const minutes = secondsLeft !== null ? Math.floor(secondsLeft / 60) : 10;
  const seconds = secondsLeft !== null ? secondsLeft % 60 : 0;

  return { secondsLeft, expired, minutes, seconds };
}

interface CountdownTimerProps {
  variant?: "banner" | "inline";
}

export default function CountdownTimer({ variant = "banner" }: CountdownTimerProps) {
  const { expired, minutes, seconds, secondsLeft } = useCountdown();

  if (secondsLeft === null) return null;

  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        {expired ? (
          <span style={{ color: "#ef4444" }}>Offer expired</span>
        ) : (
          <>
            <Clock size={14} style={{ color: "#f59e0b" }} />
            <span style={{ color: "#f59e0b" }}>
              Offer ends in{" "}
              <span className="font-black tabular-nums">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </span>
          </>
        )}
      </div>
    );
  }

  // Banner variant
  return (
    <div
      className="w-full py-2.5 px-4 text-center text-sm font-semibold"
      style={{
        backgroundColor: expired ? "#1f1f1f" : "#fffbeb",
        borderBottom: `1px solid ${expired ? "#333" : "#fde68a"}`,
        color: expired ? "#9ca3af" : "#92400e",
      }}
    >
      {expired ? (
        "Early bird offer has expired — regular price applies"
      ) : (
        <span className="flex items-center justify-center gap-2">
          <Clock size={14} style={{ color: "#d97706" }} />
          Early bird price of{" "}
          <strong style={{ color: "#b45309" }}>&#8377;249</strong> expires in{" "}
          <span
            className="font-black tabular-nums px-1.5 py-0.5 rounded"
            style={{ backgroundColor: "#fde68a", color: "#92400e" }}
          >
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          &mdash; regular price is &#8377;1,599
        </span>
      )}
    </div>
  );
}
