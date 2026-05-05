interface NavyWatermarkProps {
  variant?: "ship" | "anchor" | "compass" | "waves" | "helm" | "lighthouse";
  className?: string;
  opacity?: number;
  size?: number;
}

export default function NavyWatermark({
  variant = "ship",
  className = "",
  opacity = 0.04,
  size = 300,
}: NavyWatermarkProps) {
  const svgProps = {
    width: size,
    height: size,
    viewBox: "0 0 200 200",
    fill: "currentColor",
    className: `pointer-events-none select-none ${className}`,
    style: { opacity },
  };

  switch (variant) {
    case "ship":
      return (
        <svg {...svgProps}>
          {/* Navy ship silhouette */}
          <path d="M100 20 L95 50 L60 55 L55 65 L50 55 L40 58 L35 80 L30 78 L25 85 L20 100 L25 100 L30 95 L40 100 L180 100 L175 85 L170 95 L165 90 L160 80 L155 58 L145 55 L140 65 L135 55 L100 50 Z" />
          {/* Hull */}
          <path d="M15 105 L185 105 L170 140 L160 155 L40 155 L30 140 Z" />
          {/* Water line */}
          <path d="M10 162 Q30 155 50 165 Q70 175 90 165 Q110 155 130 165 Q150 175 170 165 Q190 155 200 162" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M5 175 Q25 168 45 178 Q65 188 85 178 Q105 168 125 178 Q145 188 165 178 Q185 168 200 175" fill="none" stroke="currentColor" strokeWidth="2" />
          {/* Mast */}
          <rect x="97" y="10" width="6" height="45" />
          {/* Flag */}
          <path d="M103 12 L130 20 L103 28 Z" />
        </svg>
      );

    case "anchor":
      return (
        <svg {...svgProps}>
          {/* Ring */}
          <circle cx="100" cy="35" r="15" fill="none" stroke="currentColor" strokeWidth="6" />
          {/* Shank */}
          <rect x="96" y="48" width="8" height="90" />
          {/* Cross bar */}
          <rect x="65" y="65" width="70" height="8" rx="4" />
          {/* Crown */}
          <path d="M100 138 L60 170 Q55 175 60 180 L70 175 L100 148 L130 175 L140 180 Q145 175 140 170 Z" />
          {/* Flukes */}
          <path d="M55 170 L40 185 Q38 190 45 190 L65 175 Z" />
          <path d="M145 170 L160 185 Q162 190 155 190 L135 175 Z" />
        </svg>
      );

    case "compass":
      return (
        <svg {...svgProps}>
          {/* Outer circle */}
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Cardinal points */}
          <text x="100" y="28" textAnchor="middle" fontSize="14" fontWeight="bold">N</text>
          <text x="100" y="188" textAnchor="middle" fontSize="14" fontWeight="bold">S</text>
          <text x="12" y="105" textAnchor="middle" fontSize="14" fontWeight="bold">W</text>
          <text x="188" y="105" textAnchor="middle" fontSize="14" fontWeight="bold">E</text>
          {/* Compass rose */}
          <polygon points="100,30 108,90 100,75 92,90" />
          <polygon points="100,170 108,110 100,125 92,110" opacity="0.5" />
          <polygon points="30,100 90,92 75,100 90,108" opacity="0.5" />
          <polygon points="170,100 110,92 125,100 110,108" opacity="0.5" />
          {/* Center */}
          <circle cx="100" cy="100" r="6" />
          {/* Tick marks */}
          {[0, 30, 60, 120, 150, 210, 240, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 100 + 75 * Math.sin(rad);
            const y1 = 100 - 75 * Math.cos(rad);
            const x2 = 100 + 82 * Math.sin(rad);
            const y2 = 100 - 82 * Math.cos(rad);
            return (
              <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" />
            );
          })}
        </svg>
      );

    case "waves":
      return (
        <svg {...svgProps} viewBox="0 0 300 200">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M-10 ${60 + i * 30} Q30 ${45 + i * 30} 70 ${60 + i * 30} Q110 ${75 + i * 30} 150 ${60 + i * 30} Q190 ${45 + i * 30} 230 ${60 + i * 30} Q270 ${75 + i * 30} 310 ${60 + i * 30}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
          ))}
        </svg>
      );

    case "helm":
      return (
        <svg {...svgProps}>
          {/* Outer ring */}
          <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="5" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" strokeWidth="2" />
          {/* Inner hub */}
          <circle cx="100" cy="100" r="18" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="100" cy="100" r="8" />
          {/* Spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 100 + 20 * Math.sin(rad);
            const y1 = 100 - 20 * Math.cos(rad);
            const x2 = 100 + 63 * Math.sin(rad);
            const y2 = 100 - 63 * Math.cos(rad);
            return (
              <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            );
          })}
          {/* Handle knobs */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 100 + 75 * Math.sin(rad);
            const cy = 100 - 75 * Math.cos(rad);
            return <circle key={deg} cx={cx} cy={cy} r="8" />;
          })}
        </svg>
      );

    case "lighthouse":
      return (
        <svg {...svgProps}>
          {/* Light beams */}
          <path d="M100 45 L40 20 L60 50 Z" opacity="0.3" />
          <path d="M100 45 L160 20 L140 50 Z" opacity="0.3" />
          {/* Top dome */}
          <path d="M85 50 Q100 35 115 50 Z" />
          {/* Lamp room */}
          <rect x="82" y="50" width="36" height="18" rx="2" />
          {/* Gallery */}
          <rect x="78" y="66" width="44" height="6" rx="1" />
          {/* Tower */}
          <path d="M82 72 L78 160 L122 160 L118 72 Z" />
          {/* Stripes */}
          <rect x="80" y="90" width="40" height="12" opacity="0.4" />
          <rect x="79" y="120" width="42" height="12" opacity="0.4" />
          {/* Base */}
          <rect x="70" y="158" width="60" height="10" rx="2" />
          {/* Rocks */}
          <ellipse cx="100" cy="178" rx="50" ry="12" opacity="0.3" />
        </svg>
      );

    default:
      return null;
  }
}
