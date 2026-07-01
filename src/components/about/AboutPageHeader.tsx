import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface AboutPageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function AboutPageHeader({
  title,
  subtitle,
  breadcrumbs,
}: AboutPageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-100 py-6 lg:py-8 mt-28 lg:mt-26">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} className="text-gray-400" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-liteBlue transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-pBlue font-medium">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-2xl lg:text-3xl font-bold text-pBlue">
          {title}
        </h1>
        <p className="text-sm lg:text-base text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
