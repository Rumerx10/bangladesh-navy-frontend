"use client";

import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";

/** Looping animation props, dropped entirely when the visitor prefers reduced motion. */
const loop = (
  reduce: boolean | null,
  animate: TargetAndTransition,
  transition: Transition
) =>
  reduce ? {} : { animate, transition: { repeat: Infinity, ...transition } };

/** Filled wave band from `y` down to `bottom` (default: the foot of the 240-high viewBox). The
 *  pattern repeats every `period`, so translating it by one period loops seamlessly. */
const waveD = (y: number, amp: number, bottom = 240, period = 80) => {
  const from = -160;
  const to = 560;
  return `M${from} ${y} Q${from + period / 4} ${y - amp} ${from + period / 2} ${y} T${Array.from(
    { length: (to - from) / (period / 2) - 1 },
    (_, i) => `${from + period + (i * period) / 2} ${y}`
  ).join(" T")} L${to} ${bottom} L${from} ${bottom} Z`;
};

const STARS = [
  [36, 28, 2.6],
  [84, 58, 3.4],
  [180, 22, 2.2],
  [236, 46, 3],
  [292, 18, 2.8],
  [352, 36, 3.6],
  [62, 104, 3.2],
  [372, 92, 2.4],
] as const;

/** Vision — a lighthouse sweeping its beam over a boat at sea: safe passage. */
export const LighthouseScene = ({ className }: { className?: string }) => {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vm-lh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#001836" />
          <stop offset="1" stopColor="#0b3a6b" />
        </linearGradient>
        <linearGradient id="vm-lh-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffe7a3" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ffe7a3" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="vm-lh-glow">
          <stop offset="0" stopColor="#ffe7a3" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe7a3" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="240" fill="url(#vm-lh-sky)" />

      {STARS.map(([cx, cy, duration]) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={1.3}
          fill="#ffffff"
          opacity={0.6}
          {...loop(
            reduce,
            { opacity: [0.2, 0.9, 0.2] },
            { duration, ease: "easeInOut" }
          )}
        />
      ))}

      {/* Beam — rotates around the lamp at (130, 86) */}
      <motion.polygon
        points="130,86 430,36 430,136"
        fill="url(#vm-lh-beam)"
        style={{ originX: 0, originY: 0.5 }}
        {...loop(
          reduce,
          { rotate: [-12, 10, -12] },
          { duration: 7, ease: "easeInOut" }
        )}
      />
      <motion.circle
        cx={130}
        cy={86}
        r={22}
        fill="url(#vm-lh-glow)"
        {...loop(
          reduce,
          { opacity: [0.6, 1, 0.6] },
          { duration: 2.4, ease: "easeInOut" }
        )}
      />

      {/* Rock */}
      <path
        d="M66 202 Q86 170 118 172 Q150 164 176 182 Q192 192 200 202 Z"
        fill="#0a2747"
      />

      {/* Lighthouse */}
      <polygon points="117,178 143,178 137,96 123,96" fill="#f4f7fb" />
      <polygon
        points="118.3,160 141.7,160 140.8,148 119.2,148"
        fill="#c8323c"
      />
      <polygon
        points="120.7,128 139.3,128 138.5,116 121.5,116"
        fill="#c8323c"
      />
      <rect x="127" y="168" width="6" height="10" rx="3" fill="#0a2747" />
      <rect x="119" y="92" width="22" height="4" rx="1" fill="#dfe7f1" />
      <rect x="123" y="78" width="14" height="14" fill="#ffd76a" />
      <path d="M130 78 V92" stroke="#e0b64a" strokeWidth="1" />
      <polygon points="120,78 140,78 130,66" fill="#c8323c" />
      <circle cx="130" cy="65" r="1.6" fill="#c8323c" />

      {/* Back wave */}
      <motion.path
        d={waveD(198, 4)}
        fill="#0b3a6b"
        {...loop(reduce, { x: [0, -80] }, { duration: 6, ease: "linear" })}
      />

      {/* Boat, sailing safely in the light */}
      <motion.g
        {...loop(
          reduce,
          { y: [0, -2.5, 0], rotate: [-2, 2, -2] },
          { duration: 3.6, ease: "easeInOut" }
        )}
      >
        <path d="M284 196 L316 196 L310 204 L290 204 Z" fill="#f4f7fb" />
        <path d="M300 196 V170" stroke="#f4f7fb" strokeWidth="1.5" />
        <polygon points="301.5,172 301.5,193 316,193" fill="#dbe6f2" />
        <polygon points="298.5,176 298.5,193 288,193" fill="#c9d8e8" />
      </motion.g>

      {/* Front wave */}
      <motion.path
        d={waveD(208, 3)}
        fill="#072a50"
        {...loop(reduce, { x: [-80, 0] }, { duration: 4.5, ease: "linear" })}
      />
    </svg>
  );
};

/** Sounding points where the sonar meets the seabed, with their depths. */
const SOUNDINGS = [
  { x: 104, y: 207, depth: "18 m", delay: 0.9 },
  { x: 209, y: 196, depth: "14 m", delay: 0.6 },
  { x: 300, y: 213, depth: "21 m", delay: 1.1 },
] as const;

const SEABED =
  "M0 200 C50 190 90 214 140 206 S230 188 270 204 S350 220 400 198";

/** Mission — a survey ship sounding the seabed and turning it into a chart. */
export const SurveyShipScene = ({ className }: { className?: string }) => {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vm-ss-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b3a6b" />
          <stop offset="1" stopColor="#2a6a9c" />
        </linearGradient>
        <linearGradient id="vm-ss-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a3866" />
          <stop offset="1" stopColor="#031a33" />
        </linearGradient>
        <linearGradient id="vm-ss-fan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fe3f0" stopOpacity="0.3" />
          <stop offset="1" stopColor="#7fe3f0" stopOpacity="0.04" />
        </linearGradient>
        <clipPath id="vm-ss-fan-clip">
          <polygon points="200,104 40,240 360,240" />
        </clipPath>
      </defs>

      <rect width="400" height="100" fill="url(#vm-ss-sky)" />
      <rect y="94" width="400" height="146" fill="url(#vm-ss-water)" />

      {/* Sonar fan + outgoing pings */}
      <polygon points="200,104 40,240 360,240" fill="url(#vm-ss-fan)" />
      <g clipPath="url(#vm-ss-fan-clip)">
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={200}
            cy={104}
            r={reduce ? 40 + i * 40 : 4}
            fill="none"
            stroke="#7fe3f0"
            strokeWidth={1.5}
            opacity={reduce ? 0.35 : 0}
            {...loop(
              reduce,
              { r: [4, 150], opacity: [0.9, 0] },
              { duration: 2.4, ease: "easeOut", delay: i * 0.8 }
            )}
          />
        ))}
      </g>

      {/* Seabed */}
      <path d={`${SEABED} L400 240 L0 240 Z`} fill="#021327" />

      {/* Chart line being drawn from the soundings */}
      <motion.path
        d={SEABED}
        fill="none"
        stroke="#7fe3f0"
        strokeWidth={2}
        strokeLinecap="round"
        {...(reduce
          ? {}
          : {
              initial: { pathLength: 0 },
              animate: { pathLength: [0, 1, 1], opacity: [1, 1, 0] },
              transition: {
                duration: 4.8,
                times: [0, 0.75, 1],
                ease: "easeInOut",
                repeat: Infinity,
              },
            })}
      />

      {SOUNDINGS.map(({ x, y, depth, delay }) => (
        <g key={depth}>
          <motion.circle
            cx={x}
            cy={y}
            r={3}
            fill="#ffd76a"
            opacity={reduce ? 1 : 0}
            {...loop(
              reduce,
              { opacity: [0, 1, 1, 0] },
              { duration: 2.4, times: [0, 0.15, 0.7, 1], delay }
            )}
          />
          <text
            x={x}
            y={y - 9}
            textAnchor="middle"
            fontSize="9"
            fontWeight="500"
            fill="#bfe9ff"
          >
            {depth}
          </text>
        </g>
      ))}

      {/* Survey ship */}
      <motion.g
        {...loop(
          reduce,
          { y: [0, -2, 0], rotate: [-1, 1, -1] },
          { duration: 3.2, ease: "easeInOut" }
        )}
      >
        <path d="M201 72 V58" stroke="#e3eaf3" strokeWidth="1.5" />
        <path d="M196 61 H206" stroke="#e3eaf3" strokeWidth="1.5" />
        <rect x="191" y="72" width="20" height="9" rx="1.5" fill="#e3eaf3" />
        <rect x="194" y="74.5" width="3" height="3" fill="#0b3a6b" />
        <rect x="199.5" y="74.5" width="3" height="3" fill="#0b3a6b" />
        <rect x="205" y="74.5" width="3" height="3" fill="#0b3a6b" />
        <rect x="182" y="81" width="38" height="11" rx="1.5" fill="#f4f7fb" />
        <path d="M164 92 L236 92 L227 104 L174 104 Z" fill="#f4f7fb" />
        <path d="M169 98 L232 98 L227 104 L174 104 Z" fill="#c8323c" />
        <circle cx="200" cy="104" r="2.2" fill="#7fe3f0" />
      </motion.g>

      {/* Water surface, slightly see-through so the hull sits in it */}
      <motion.path
        d={waveD(97, 3, 106)}
        fill="#0a3866"
        opacity={0.55}
        {...loop(reduce, { x: [0, -80] }, { duration: 5, ease: "linear" })}
      />
    </svg>
  );
};
