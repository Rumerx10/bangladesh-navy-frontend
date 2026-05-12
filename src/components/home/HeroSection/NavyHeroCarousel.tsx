"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface HeroButton {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
  subtitle: string;
  title: string;
  description: string;
  buttons: HeroButton[];
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/heroImages/home/img1.jpeg",
    alt: "Bangladesh Navy Maritime Heritage",
    subtitle: "Hydrographic & Oceanographic Center",
    title: "Bangladesh Navy",
    description:
      "Charting the waters of Bangladesh for safe maritime navigation. Access official nautical charts, tide tables, and navigational publications.",
    buttons: [
      { text: "Browse Products", href: "/product-service", variant: "primary" },
      { text: "Latest Notices", href: "#latest-notices", variant: "secondary" },
    ],
  },
  {
    id: 2,
    image: "/heroImages/home/img2.jpeg",
    alt: "Hydrographic Charting Services",
    subtitle: "Maritime Safety Solutions",
    title: "Hydrographic Services",
    description:
      "Professional maritime charts and navigational data for secure sea operations across Bangladesh waters.",
    buttons: [
      { text: "View Charts", href: "/product-service", variant: "primary" },
      { text: "Get Updates", href: "#latest-notices", variant: "secondary" },
    ],
  },
  {
    id: 3,
    image: "/heroImages/home/img3.jpeg",
    alt: "Oceanographic Research and Navigation",
    subtitle: "Ocean Research & Development",
    title: "Oceanographic Research",
    description:
      "Advanced oceanographic research and analysis for maritime navigation and environmental monitoring.",
    buttons: [
      { text: "Explore Services", href: "/product-service", variant: "primary" },
      { text: "Contact Us", href: "#latest-notices", variant: "secondary" },
    ],
  },
];

export default function NavyHeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 group">
      {/* Carousel Container — Background Images */}
      <motion.div
        className="relative w-full h-full flex"
        animate={{ x: `-${current * 100}%` }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {heroSlides.map((slide) => (
          <div key={slide.id} className="relative min-w-full w-full h-full shrink-0">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={slide.id === 1}
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark Gradient Overlay */}
            {/* <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" /> */}
          </div>
        ))}
      </motion.div>

      {/* Content Overlay — Carousel */}
      {/* <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative w-full h-full flex"
          animate={{ x: `-${current * 100}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {heroSlides.map((slide) => (
            <div
              key={slide.id}
              className="relative min-w-full w-full h-full flex items-center justify-center shrink-0"
            >
              <div className="container px-4 lg:px-6 lg:mt-10">
                <div className="max-w-2xl mx-auto text-center text-white">
                  <motion.p
                    className="text-sm md:text-base font-semibold text-blue-300 mb-2 md:mb-3 uppercase tracking-widest"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    key={`subtitle-${slide.id}-${current}`}
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    key={`title-${slide.id}-${current}`}
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-gray-100 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    key={`desc-${slide.id}-${current}`}
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    key={`buttons-${slide.id}-${current}`}
                  >
                    {slide.buttons.map((button, index) => (
                      <Link
                        key={index}
                        href={button.href}
                        className={`inline-flex items-center justify-center px-6 md:px-8 h-[54px] py-[16px] font-medium text-base rounded-lg transition-colors duration-200 w-full sm:w-auto text-center ${
                          button.variant === "secondary"
                            ? "bg-white/20 hover:bg-white/30 border border-white/40"
                            : "bg-primary hover:bg-primary/80"
                        } text-white`}
                      >
                        {button.text}
                      </Link>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div> */}

      {/* Arrow Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/40 shadow-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/40 shadow-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              index === current
                ? "bg-white w-3 h-3"
                : "bg-white/50 hover:bg-white/80 w-2.5 h-2.5"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
