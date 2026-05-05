import NewsDetail from "@/src/components/news/NewsDetail";
import { newsItems } from "@/src/data/homeData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = newsItems.find((n) => n.slug === slug);

  if (!news) {
    return { title: "News Not Found — BNHOC" };
  }

  return {
    title: `${news.title} — BNHOC`,
    description: news.description,
  };
}

export function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }));
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const news = newsItems.find((n) => n.slug === slug);

  if (!news) {
    notFound();
  }

  return <NewsDetail news={news} />;
}
