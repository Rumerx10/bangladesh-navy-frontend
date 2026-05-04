import { dummyCategories } from "@/src/data/dummyCategories";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function ProductServiceDropdown() {
  const productServiceLinks = dummyCategories.map((category) => ({
    label: category.name,
    href: `/categories/${category.slug}`,
  }));

  return (
    <li className="relative group">
      <Link
        href="/product-service"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors cursor-pointer py-6"
      >
        Products &amp; Service
        <ChevronDown size={15} className="mt-px" />
      </Link>
      <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 rounded-xl border border-gray-200 bg-white shadow-xl group-hover:block">
        <div className="grid grid-cols-2 gap-1 p-3 min-w-130 max-h-80 overflow-y-auto">
          {productServiceLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}
