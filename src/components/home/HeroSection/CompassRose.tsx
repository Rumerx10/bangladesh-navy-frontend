"use client";

import { motion } from "framer-motion";

export default function CompassRose() {
  return (
    <div className="relative w-[280px] h-[280px] lg:w-[360px] lg:h-[360px]">
      {/* Outer glowing ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-amber-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Middle ring with dashes */}
      <div className="absolute inset-4 rounded-full border border-dashed border-amber-400/20" />

      {/* Compass directions */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* N */}
        <span className="absolute top-6 left-1/2 -translate-x-1/2 text-amber-400 font-bold text-lg">
          N
        </span>
        {/* S */}
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-amber-400/60 font-bold text-lg">
          S
        </span>
        {/* E */}
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-amber-400/60 font-bold text-lg">
          E
        </span>
        {/* W */}
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-400/60 font-bold text-lg">
          W
        </span>
      </div>

      {/* Inner circle with anchor */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-amber-400/10 border-2 border-amber-400/40 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Anchor icon */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-400"
          >
            <circle cx="12" cy="5" r="3" />
            <line x1="12" y1="22" x2="12" y2="8" />
            <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
          </svg>
        </motion.div>
      </div>

      {/* Compass cross lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 360 360"
        fill="none"
      >
        {/* Vertical line */}
        <line
          x1="180"
          y1="40"
          x2="180"
          y2="140"
          stroke="rgba(251,191,36,0.3)"
          strokeWidth="1"
        />
        <line
          x1="180"
          y1="220"
          x2="180"
          y2="320"
          stroke="rgba(251,191,36,0.3)"
          strokeWidth="1"
        />
        {/* Horizontal line */}
        <line
          x1="40"
          y1="180"
          x2="140"
          y2="180"
          stroke="rgba(251,191,36,0.3)"
          strokeWidth="1"
        />
        <line
          x1="220"
          y1="180"
          x2="320"
          y2="180"
          stroke="rgba(251,191,36,0.3)"
          strokeWidth="1"
        />
        {/* Diagonal lines */}
        <line
          x1="80"
          y1="80"
          x2="140"
          y2="140"
          stroke="rgba(251,191,36,0.15)"
          strokeWidth="1"
        />
        <line
          x1="280"
          y1="80"
          x2="220"
          y2="140"
          stroke="rgba(251,191,36,0.15)"
          strokeWidth="1"
        />
        <line
          x1="80"
          y1="280"
          x2="140"
          y2="220"
          stroke="rgba(251,191,36,0.15)"
          strokeWidth="1"
        />
        <line
          x1="280"
          y1="280"
          x2="220"
          y2="220"
          stroke="rgba(251,191,36,0.15)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
