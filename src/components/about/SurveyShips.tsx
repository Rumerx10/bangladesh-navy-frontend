"use client";

import ShipCard from "./ShipCard";
import { useGet } from "@/src/hooks/useGet";
import { SurveyShipItem } from "@/src/types/global/global.types";

// Collapsed limits — keep every card roughly the same height as its image

const SurveyShips = () => {
  const { data, isLoading } = useGet<SurveyShipItem[]>("/survey-ships/list", [
    "survey-ships-list",
  ]);

  const ships: SurveyShipItem[] = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) {
    return (
      <section className="py-8 lg:py-20">
        <div className="container px-4 sm:px-6 lg:px-8 space-y-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white h-64 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {ships.map((ship, i) => (
            <ShipCard key={ship.id} ship={ship} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SurveyShips;
