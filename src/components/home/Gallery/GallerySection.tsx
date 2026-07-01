"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Maximize2 } from "lucide-react";
import SectionTitle from "../../SectionTitle";

const MotionLink = motion.create(Link);

const galleryImages = [
  { id: 1, src: "/img4.jpeg", alt: "Survey Operation", size: "large" },
  {
    id: 2,
    src: "/newsImages/news2.jpg",
    alt: "IHO Celebration",
    size: "small",
  },
  {
    id: 3,
    src: "/newsImages/news3.jpg",
    alt: "Nautical Charts",
    size: "small",
  },
  { id: 4, src: "/img5.jpeg", alt: "Survey Launch", size: "small" },
  { id: 5, src: "/img8.jpeg", alt: "Tide Prediction", size: "small" },
];

export default function GallerySection() {
  return (
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
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
              className="relative group overflow-hidden rounded-2xl shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
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
  );
}
