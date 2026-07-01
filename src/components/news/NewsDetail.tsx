"use client";

import NavyWatermark from "@/src/components/shared/NavyWatermark";
import NewsCard from "@/src/components/home/News/NewsCard";
import { newsItems } from "@/src/data/homeData";
import { INewsItem } from "@/src/components/home/types";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ChevronRight, Home, Share2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NewsDetailProps {
  news: INewsItem;
}

export default function NewsDetail({ news }: NewsDetailProps) {
  // Related news — same category, exclude current
  const relatedNews = newsItems
    .filter((n) => n.category === news.category && n.id !== news.id)
    .slice(0, 3);

  // If not enough related by category, fill with other recent
  const displayRelated =
    relatedNews.length >= 2
      ? relatedNews
      : [
          ...relatedNews,
          ...newsItems.filter((n) => n.id !== news.id && !relatedNews.find((r) => r.id === n.id)).slice(0, 3 - relatedNews.length),
        ];

  return (
    <div className="mt-28 lg:mt-26">
      {/* Hero Image */}
      <section className="relative h-85 lg:h-105 overflow-hidden bg-pBlue">
        <Image
          src={news.image}
          alt={news.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-pBlue via-pBlue/60 to-transparent" />

        {/* Breadcrumb on hero */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container px-4 sm:px-6 lg:px-8 pb-8">
            <nav className="flex items-center gap-1.5 text-sm text-gray-300 mb-4">
              <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
                <Home size={14} /> Home
              </Link>
              <ChevronRight size={14} />
              <Link href="/news" className="hover:text-white transition-colors">
                News
              </Link>
              <ChevronRight size={14} />
              <span className="text-white font-medium truncate max-w-50">{news.title}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-10 lg:py-14 bg-white overflow-hidden">
        <div className="absolute -right-20 top-20 text-pBlue">
          <NavyWatermark variant="lighthouse" size={300} opacity={0.02} animate="drift" />
        </div>

        <div className="relative container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-liteBlue/10 text-liteBlue text-xs font-bold uppercase tracking-wider">
                <Tag size={12} />
                {news.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar size={14} />
                {news.date}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-2xl lg:text-4xl font-bold text-pBlue leading-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {news.title}
            </motion.h1>

            {/* Article content */}
            <motion.article
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {news.content.map((para, i) => (
                <p
                  key={i}
                  className={`text-base leading-relaxed ${
                    i === 0
                      ? "text-gray-800 text-lg font-medium"
                      : "text-gray-600"
                  }`}
                >
                  {para}
                </p>
              ))}
            </motion.article>

            {/* Share & Back */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-100">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-medium text-liteBlue hover:text-[#004d8a] transition-colors"
              >
                <ArrowLeft size={16} />
                Back to All News
              </Link>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: news.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="inline-flex items-center gap-2 px-4 h-11 py-4 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related News */}
      {displayRelated.length > 0 && (
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="container px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl lg:text-2xl font-bold text-pBlue mb-8">
              Related News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayRelated.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <NewsCard item={item} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
