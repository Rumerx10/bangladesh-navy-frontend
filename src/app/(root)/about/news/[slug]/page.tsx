import { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsDetail from "@/src/components/news/NewsDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `News Detail — BNHOC`,
    description: `Read the full news article`,
  };
}

const NewsDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  return <NewsDetail slug={slug} />;
};

export default NewsDetailPage;
