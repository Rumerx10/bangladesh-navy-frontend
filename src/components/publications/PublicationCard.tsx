"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { IPublication } from "@/src/data/publications";

const formatPublicationDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * The whole card links to /how-to-collect — publications aren't downloadable
 * here, mariners are routed to the collection procedure instead.
 */
const PublicationCard = ({ publication }: { publication: IPublication }) => {
  return (
    <Link
      href="/how-to-collect"
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
        <Image
          src={publication.image}
          alt={publication.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-md bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-600">
          {publication.code}
        </span>

        <h3 className="mt-3 line-clamp-2 text-base font-bold leading-snug text-pBlue">
          {publication.title}
        </h3>

        <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-gray-500">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          {formatPublicationDate(publication.date)}
        </span>

        <div className="mt-auto pt-5">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-liteBlue">
            How to Collect
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PublicationCard;
