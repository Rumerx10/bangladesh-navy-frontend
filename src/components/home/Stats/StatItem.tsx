"use client";

import { IStatItem } from "@/src/types/home";
import { useEffect, useRef, useState } from "react";

interface StatItemProps {
  stat: IStatItem;
}

export default function StatItem({ stat }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = stat.value / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= stat.value) {
              setCount(stat.value);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.value, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
        {count}
        <span className="text-amber-400">{stat.suffix}</span>
      </div>
      <p className="mt-1 text-sm text-gray-400 font-medium">{stat.label}</p>
    </div>
  );
}
