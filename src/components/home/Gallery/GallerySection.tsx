"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Maximize2, X } from "lucide-react";
import SectionTitle from "../../SectionTitle";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const MotionLink = motion.create(Link);

const galleryImages = [
  { id: 1, src: "/img4.jpeg", alt: "Survey Operation", size: "large" },
  { id: 2, src: "/newsImages/news2.jpg", alt: "IHO Celebration", size: "small" },
  { id: 3, src: "/newsImages/news3.jpg", alt: "Nautical Charts", size: "small" },
  { id: 4, src: "/img5.jpeg", alt: "Survey Launch", size: "small" },
  { id: 5, src: "/img8.jpeg", alt: "Tide Prediction", size: "small" },
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  const isOpen = lightboxIndex !== null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => {
    setLightboxIndex(null);
    setMainSwiper(null);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white">
                  <Maximize2 size={24} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent text-white">
                <p className="font-bold text-lg">{galleryImages[0].alt}</p>
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
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                    <Maximize2 size={20} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent text-white">
                  <p className="font-semibold text-sm">{image.alt}</p>
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

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/92 backdrop-blur-sm px-2 lg:px-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <div
              className="w-full max-w-5xl flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main swiper */}
              <div className="relative">
                <Swiper
                  spaceBetween={0}
                  loop
                  onSwiper={(s) => {
                    setMainSwiper(s);
                    s.slideTo(lightboxIndex, 0);
                  }}
                  onRealIndexChange={(s) => setLightboxIndex(s.realIndex)}
                  className="w-full h-130 rounded-xl overflow-hidden"
                >
                  {galleryImages.map((image, index) => (
                    <SwiperSlide key={image.id}>
                      <Image
                        height={800}
                        width={1200}
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        priority={index === lightboxIndex}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Prev */}
                <button
                  onClick={() => mainSwiper?.slidePrev()}
                  className="opacity-0 md:opacity-100 absolute left-3 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white transition-colors drop-shadow-lg"
                  aria-label="Previous"
                >
                  <IoIosArrowDropleftCircle size={46} />
                </button>

                {/* Next */}
                <button
                  onClick={() => mainSwiper?.slideNext()}
                  className="opacity-0 md:opacity-100 absolute right-3 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white transition-colors drop-shadow-lg"
                  aria-label="Next"
                >
                  <IoIosArrowDroprightCircle size={46} />
                </button>
              </div>

              {/* Caption + counter centered */}
              <div className="flex flex-col items-center gap-3">
                <p className="text-white font-semibold text-base">
                  {galleryImages[lightboxIndex].alt}
                </p>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm font-medium">
                  {lightboxIndex + 1} / {galleryImages.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
