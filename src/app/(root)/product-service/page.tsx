import { dummyCategories } from "@/src/data/dummyCategories";
import Link from "next/link";

export default function ProductServicePage() {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Products & Service
        </h1>
        <p className="text-sm lg:text-base text-muted-foreground mt-2">
          Explore all product service categories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        {dummyCategories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
