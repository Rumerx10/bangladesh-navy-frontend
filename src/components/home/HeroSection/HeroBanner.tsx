"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    image: "/banners/hero-1.png",
    alt: "Autumn Elegance Collection",
  },
  {
    id: 2,
    image: "/banners/hero-2.png",
    alt: "Summer Sale - Up to 50% Off",
  },
  {
    id: 3,
    image: "/banners/hero-3.png",
    alt: "New Arrivals - Winter Collection",
  },
];

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.7 } },
  exit: { opacity: 0, transition: { duration: 0.7 } },
};

const flipVariants = {
  enter: {
    rotateY: 90,
    opacity: 0,
    transition: { duration: 0 },
  },
  center: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    rotateY: -90,
    opacity: 0,
    transition: { duration: 0.35, ease: "easeIn" },
  },
};

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isFlip, setIsFlip] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => {
      const wrap = prev === banners.length - 1;
      setIsFlip(wrap);
      return (prev + 1) % banners.length;
    });
  }, []);

  const prev = useCallback(() => {
    setIsFlip(false);
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div
      className="relative w-full rounded-lg bg-gray-100 group overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Slides */}
      <div className="relative w-full aspect-[16/7] sm:aspect-[16/6]">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={current}
            variants={isFlip ? flipVariants : fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Ken Burns zoom */}
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={banners[current].image}
                alt={banners[current].alt}
                fill
                priority={current === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 70vw"
              />
            </motion.div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrow navigation */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsFlip(false);
              setCurrent(index);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
