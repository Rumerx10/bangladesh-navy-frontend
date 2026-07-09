"use client";

import Image from "next/image";
import Link from "next/link";

export default function NavyHeroCarousel() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Background image */}
      <Image
        src="/heroImages/heroImg1.jpg"
        alt="Bangladesh Navy Maritime Heritage"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/20 to-transparent" />
      {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" /> */}

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-amber-400" />
            <span className="text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase">
              Excellence in Maritime Service
            </span>
          </div>

          {/* Title */}
          <h1 className="text-white font-bold leading-tight tracking-tight mb-4">
            <span className="block text-4xl md:text-6xl lg:text-7xl">
              Guardians of the
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl text-amber-400 mt-1">
              Bay of Bengal
            </span>
          </h1>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <span className="h-0.5 w-12 bg-amber-400" />
            <span className="h-0.5 w-4 bg-amber-400/40" />
          </div>

          {/* Description */}
          <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl font-light">
            Bangladesh Navy stands as the premier maritime defense force,
            protecting our sovereign waters and advancing naval excellence
            across the Indo-Pacific region.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-semibold tracking-wider uppercase transition-colors duration-200"
            >
              Explore Our Fleet
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/skill-development"
              className="inline-flex backdrop-blur-sm items-center justify-center gap-2 px-8 py-4 border border-white/40 hover:border-white text-white text-sm font-semibold tracking-wider uppercase transition-colors duration-200"
            >
              Join the Navy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
