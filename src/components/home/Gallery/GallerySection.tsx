"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Maximize2, ImageOff } from "lucide-react";
import SectionTitle from "../../SectionTitle";
import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import GalleryLightbox from "@/src/components/shared/GalleryLightbox";
import { IGalleryItem } from "./types";

const MotionLink = motion.create(Link);

const GallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data, isLoading } = useGet<IGalleryItem[]>("/gallery/list", [
    "gallery-list",
  ]);

  const galleryImages = (Array.isArray(data?.data) ? data.data : []).slice(
    0,
    5
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-[#f8fafc]">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <SectionTitle title="Gallery" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-200 md:h-150 lg:h-175">
            <div className="md:col-span-2 md:row-span-2 rounded-2xl bg-gray-200 animate-pulse" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (galleryImages.length === 0) {
    return (
      <section className="py-20 lg:py-28 bg-[#f8fafc]">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <SectionTitle title="Gallery" />
          </div>
          <div className="text-center py-10">
            <ImageOff size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No gallery images available.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 lg:py-28 bg-[#f8fafc]">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <SectionTitle title="Gallery" />
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-200 md:h-150 lg:h-175">
            {/* Main Large Image */}
            <motion.div
              className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => openLightbox(0)}
            >
              <Image
                src={galleryImages[0].imageUrl}
                alt={galleryImages[0].titleEn}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white">
                  <Maximize2 size={24} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent text-white">
                <p className="font-bold text-lg">{galleryImages[0].titleEn}</p>
              </div>
            </motion.div>

            {/* Smaller Images */}
            {galleryImages.slice(1).map((image, index) => (
              <motion.div
                key={image.id}
                className="relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                onClick={() => openLightbox(index + 1)}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                    <Maximize2 size={20} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent text-white">
                  <p className="font-semibold text-sm">{image.titleEn}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <MotionLink
              href="/about/gallery"
              className="inline-block px-8 py-3 bg-pBlue text-white rounded-full font-semibold hover:bg-liteBlue transition-colors shadow-lg hover:shadow-xl cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Full Gallery
            </MotionLink>
          </div>
        </div>
      </section>

      <GalleryLightbox
        images={galleryImages.map((image) => ({
          id: image.id,
          src: image.imageUrl,
          alt: image.titleEn,
        }))}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
};

export default GallerySection;
