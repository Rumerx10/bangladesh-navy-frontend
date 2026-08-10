import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Search nautical charts, publications, and services.",
};

export default function SearchPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold">Search Results</h1>
      <p className="text-muted-foreground mt-2">
        Find what you&apos;re looking for
      </p>
    </div>
  );
}
