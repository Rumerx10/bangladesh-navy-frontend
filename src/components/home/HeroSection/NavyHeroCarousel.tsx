"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGet } from "@/src/hooks/useGet";
import { cn } from "@/src/lib/utils";

interface IHeroManagement {
  id: string;
  titleEn: string;
  titleBn: string;
  subTitleEn: string;
  subTitleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  imageUrls: string[];
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

/** Only used when the hero record can't be loaded or doesn't exist yet. */
const FALLBACK_IMAGE = "/heroImages/heroImg1.jpg";
const FALLBACK_TITLE =
  "Ensuring Safe & Efficient Marine Activities for Sustainable Bangladesh";

const NavyHeroCarousel = () => {
  const { data, isLoading } = useGet<IHeroManagement>("/hero-management", [
    "hero-management",
  ]);

  const heroData = data?.data;

  // While the request is in flight nothing is shown but a navy placeholder.
  // Filling that gap with the fallback photo and headline is what made a
  // refresh flash unrelated content before the real hero replaced it.
  const imageUrl =
    heroData?.imageUrls?.[0]?.trim() || (isLoading ? null : FALLBACK_IMAGE);
  const title = heroData?.titleEn?.trim() || (isLoading ? "" : FALLBACK_TITLE);

  // Fade the photo in once it has actually decoded, rather than letting it
  // paint in top-down over the placeholder.
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const imageReady = imageUrl !== null && loadedSrc === imageUrl;

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-brand-navy"
      aria-busy={isLoading}
    >
      {/* Placeholder: a soft shimmer on the brand navy until the photo is in */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-linear-to-br from-brand-navy via-brand-blue/70 to-brand-navy transition-opacity duration-700",
          imageReady ? "opacity-0" : "opacity-100 animate-pulse"
        )}
      />

      {/* Background image */}
      {imageUrl && (
        <Image
          key={imageUrl}
          src={imageUrl}
          alt={title || "Bangladesh Navy Maritime Heritage"}
          fill
          priority
          onLoad={() => setLoadedSrc(imageUrl)}
          className={cn(
            "object-cover object-center transition-opacity duration-700 ease-out",
            imageReady ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute top-33 lg:top-0 inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
          {title ? (
            <motion.h1
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-4 hero-headline w-full text-2xl leading-[1.16] md:text-5xl 2xl:text-7xl"
            >
              {title}
            </motion.h1>
          ) : (
            // Headline-shaped skeleton while the title loads.
            <div
              aria-hidden="true"
              className="mx-auto flex max-w-3xl flex-col items-center gap-3 md:gap-4"
            >
              <div className="h-7 w-11/12 animate-pulse rounded-lg bg-white/15 md:h-20" />
              <div className="h-7 w-2/3 animate-pulse rounded-lg bg-white/10 md:h-12" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavyHeroCarousel;
