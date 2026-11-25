"use client";

import { useEffect, useRef } from "react";

/** Flow direction at (x, y) and time t: a smooth current field that slowly
 *  shifts, so the drift paths keep changing. */
const angleAt = (x: number, y: number, t: number) =>
  Math.sin(x / 320 + t * 0.00011) * 1.3 +
  Math.cos(y / 260 - t * 0.00008) * 1.1 +
  Math.sin((x + y) / 700) * 0.6;

interface Drifter {
  x: number;
  y: number;
  age: number;
  life: number;
}

/** Hundreds of drifters carried on a moving current field, each leaving a
 *  fading trail, over pale water (deep navy in dark mode). Drawn on a
 *  canvas, so it stays smooth. */
const Drifters = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let drifters: Drifter[] = [];
    const spawn = (): Drifter => ({
      x: Math.random() * width,
      y: Math.random() * height,
      age: 0,
      life: 60 + Math.random() * 140,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // About one drifter per 2,600 px², capped for very large screens
      const count = Math.min(900, Math.round((width * height) / 2600));
      drifters = Array.from({ length: count }, spawn);
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    const draw = (t: number) => {
      const dark = document.documentElement.classList.contains("dark");
      // Fade the last frame towards transparent: that's the trail
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      ctx.strokeStyle = dark
        ? "rgba(103, 232, 249, 0.5)"
        : "rgba(3, 105, 161, 0.3)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      for (const d of drifters) {
        const a = angleAt(d.x, d.y, t);
        const nx = d.x + Math.cos(a) * 1.4;
        const ny = d.y + Math.sin(a) * 1.4;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(nx, ny);
        d.x = nx;
        d.y = ny;
        d.age += 1;
        const gone =
          d.age > d.life ||
          nx < -10 ||
          ny < -10 ||
          nx > width + 10 ||
          ny > height + 10;
        if (gone) Object.assign(d, spawn());
      }
      ctx.stroke();
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    // No drawing in a hidden tab
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(170deg,#f3f9fc,#e5f1f8)] dark:bg-[linear-gradient(170deg,oklch(0.16_0.04_232),oklch(0.12_0.045_246))]" />
      <div className="absolute top-[30%] -left-24 size-144 rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-400/8" />
      <div className="absolute right-[-6%] bottom-[8%] size-160 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-500/8" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </>
  );
};

export default Drifters;
