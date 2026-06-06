"use client";

import { Star } from "lucide-react";

export default function ReviewSocialProof() {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Avatar stack + stars row */}
      <div className="flex items-center gap-3">
        {/* Fake avatar stack */}
        <div className="flex -space-x-2">
          {["P", "A", "N", "R", "S"].map((initial, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-2"
              style={{
                backgroundColor: [
                  "#7c3aed","#0d9488","#6d28d9","#a78bfa","#4f46e5"
                ][i],
                color: "#fff",
                boxShadow: "0 0 0 2px #0f0a1e",
              }}
            >
              {initial}
            </div>
          ))}
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} size={16} fill="#f59e0b" style={{ color: "#f59e0b" }} />
          ))}
          {/* Partial star for 4.6 */}
          <div className="relative" style={{ width: 16, height: 16 }}>
            <Star size={16} style={{ color: "#4b5563" }} />
            <div className="absolute inset-0 overflow-hidden" style={{ width: "60%" }}>
              <Star size={16} fill="#f59e0b" style={{ color: "#f59e0b" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Rating text */}
      <p className="text-sm" style={{ color: "#9ca3af" }}>
        <span className="font-bold text-white">4.6</span> stars &nbsp;&middot;&nbsp;
        <span className="font-bold text-white">567</span> reviews
      </p>
    </div>
  );
}
