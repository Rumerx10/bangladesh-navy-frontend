"use client";

import Image from "next/image";
import { useGet } from "@/src/hooks/useGet";

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

const NavyHeroCarousel = () => {
  const { data } = useGet<IHeroManagement>("/hero-management", [
    "hero-management",
  ]);

  const heroData = data?.data;
  const imageUrl = heroData?.imageUrls?.[0] || "/heroImages/heroImg1.jpg";

  console.log("Image Url ::: ", imageUrl);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-card">
      {/* Background image */}
      <Image
        src={imageUrl || "/heroImages/heroImg1.jpg"}
        alt={heroData?.titleEn || "Bangladesh Navy Maritime Heritage"}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute top-33 lg:top-0 inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
          {/* Title */}
          <h1 className="text-white text-center font-bold leading-tight tracking-tight mb-4">
            <span className="w-full text-2xl md:text-5xl 2xl:text-7xl max-w-7xl">
              {heroData?.titleEn ||
                "Ensuring Safe & Efficient Marine Activities for Sustainable Bangladesh"}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NavyHeroCarousel;
