"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

export interface ILightboxImage {
  id: string | number;
  src: string;
  alt: string;
}

interface GalleryLightboxProps {
  images: ILightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const GalleryLightbox = ({
  images,
  activeIndex,
  onClose,
  onIndexChange,
}: GalleryLightboxProps) => {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const isOpen = activeIndex !== null;

  const handleClose = () => {
    setMainSwiper(null);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && activeIndex !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/92 backdrop-blur-sm px-2 lg:px-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            onClick={handleClose}
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
                  s.slideTo(activeIndex, 0);
                }}
                onRealIndexChange={(s) => onIndexChange(s.realIndex)}
                className="w-full h-130 rounded-xl overflow-hidden"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={image.id}>
                    <Image
                      height={800}
                      width={1200}
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      priority={index === activeIndex}
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
                {images[activeIndex]?.alt}
              </p>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm font-medium">
                {activeIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryLightbox;
