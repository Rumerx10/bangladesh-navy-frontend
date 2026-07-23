"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import { IHeroManagement } from "./types";
import HeroPreview from "./HeroPreview";
import HeroPreviewSkeleton from "./Skeleton/HeroPreviewSkeleton";
import CreateUpdateHeroManagement from "./Form/CreateUpdateHeroManagement";

const HeroManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<IHeroManagement>(
    "/hero-management",
    ["hero-management"]
  );

  const heroData = data?.data;

  if (isLoading) {
    return <HeroPreviewSkeleton />;
  }

  if (heroData && !isEditMode) {
    return <HeroPreview data={heroData} onEdit={() => setIsEditMode(true)} />;
  }

  return (
    <CreateUpdateHeroManagement
      initialValues={heroData}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default HeroManagement;