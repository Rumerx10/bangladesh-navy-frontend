"use client";

interface ChartHoverTagProps {
  /** Viewport coordinates of the cursor. */
  x: number;
  y: number;
  /** Small uppercase kicker — "Paper Chart", "ENC Cell". */
  eyebrow: string;
  label: string;
  sublabel?: string;
}

/**
 * Cursor-following identifier for a hovered hotspot. Rendered `fixed`, so the
 * coordinates are viewport-relative and it is never clipped by the map's own
 * overflow.
 */
const ChartHoverTag = ({
  x,
  y,
  eyebrow,
  label,
  sublabel,
}: ChartHoverTagProps) => {
  // Flip across the cursor near the viewport edges rather than letting the tag
  // run off-screen. Hover only ever happens client-side, but the guard keeps
  // the component safe to render during hydration.
  const hasWindow = typeof window !== "undefined";
  const flipX = hasWindow && x > window.innerWidth - 260;
  const flipY = hasWindow && y > window.innerHeight - 160;

  return (
    <div
      className="animate-in fade-in zoom-in-95 pointer-events-none fixed z-40 max-w-60 duration-100"
      style={{
        left: x + (flipX ? -14 : 18),
        top: y + (flipY ? -14 : 18),
        transform: `translate(${flipX ? "-100%" : "0"}, ${flipY ? "-100%" : "0"})`,
      }}
    >
      <div className="rounded-xl border border-white/10 bg-brand-navy/95 px-3.5 py-2.5 shadow-2xl shadow-brand-navy/30">
        <p className="text-[10px] font-semibold tracking-[0.12em] text-white/55 uppercase">
          {eyebrow}
        </p>
        <p className="mt-0.5 text-sm leading-tight font-bold text-white">
          {label}
        </p>
        {sublabel && (
          <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/70">
            {sublabel}
          </p>
        )}
        <p className="mt-2 border-t border-white/10 pt-1.5 text-[10px] font-medium text-white/50">
          Click for details
        </p>
      </div>
    </div>
  );
};

export default ChartHoverTag;
