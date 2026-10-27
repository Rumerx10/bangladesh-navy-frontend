"use client";

import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import TiffPreview from "../TiffPreview";

interface ProductImageCarouselProps {
  images: string[];
  alt: string;
}

const isTiffUrl = (src: string) => /\.(tif|tiff)$/i.test(src);

const ProductImage = ({ src, alt }: { src: string; alt: string }) =>
  isTiffUrl(src) ? (
    <TiffPreview src={src} className="w-full h-full object-cover" />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      className="object-fill w-full h-full"
    />
  );

/**
 * One image renders as-is; two or more become an autoplaying, looping
 * carousel with prev/next controls. Fills its parent, which sets the size.
 */
const ProductImageCarousel = ({ images, alt }: ProductImageCarouselProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);


  if (images.length <= 1) {
    return <ProductImage src={images[0] ?? "/img1.jpeg"} alt={alt} />;
  }

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        loop
        spaceBetween={0}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={setSwiper}
        onRealIndexChange={(s) => setActiveIndex(s.realIndex)}
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={`${src}-${index}`} className="h-full! border-2 rounded-lg lg:rounded-none overflow-hidden">
            <ProductImage src={src} alt={`${alt} — image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        onClick={() => swiper?.slidePrev()}
        className="absolute hidden lg:block left-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-brand-navy/70 hover:text-brand-navy transition-colors drop-shadow-lg"
        aria-label="Previous image"
      >
        <IoIosArrowDropleftCircle size={40} />
      </button>
      <button
        type="button"
        onClick={() => swiper?.slideNext()}
        className="absolute hidden lg:block right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-brand-navy/70 hover:text-brand-navy transition-colors drop-shadow-lg"
        aria-label="Next image"
      >
        <IoIosArrowDroprightCircle size={40} />
      </button>

      <span className="absolute bottom-4 right-4 z-10 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white text-xs font-medium tabular-nums">
        {activeIndex + 1} / {images.length}
      </span>
    </>
  );
};

export default ProductImageCarousel;
