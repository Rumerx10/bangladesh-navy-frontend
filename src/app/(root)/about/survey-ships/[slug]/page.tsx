import SurveyShipDetail from "@/src/components/about/SurveyShipDetail";
import { surveyShips } from "@/src/data/aboutData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ship = surveyShips.find((s) => s.slug === slug);

  if (!ship) {
    return { title: "Ship Not Found — BNHOC" };
  }

  return {
    title: `${ship.name} — Survey Ships — BNHOC`,
    description: ship.description,
  };
}

export function generateStaticParams() {
  return surveyShips.map((ship) => ({
    slug: ship.slug,
  }));
}

export default async function SurveyShipDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ship = surveyShips.find((s) => s.slug === slug);

  if (!ship) {
    notFound();
  }

  return (
    <>
      <SurveyShipDetail ship={ship} />
    </>
  );
}
