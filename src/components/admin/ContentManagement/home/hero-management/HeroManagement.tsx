"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet"; // ✅ Correct import
import CreateUpdateHeroManagement from "./Form/CreateUpdateHeroManagement";
import { IHeroManagement } from "./types";
import HeroPreview from "./HeroPreview";
import HeroPreviewSkeleton from "./Skeleton/HeroPreviewSkeleton";

// src/modules/admin/hero-management/components/HeroManagement.tsx
const DUMMY_HERO_DATA: IHeroManagement = {
  id: "dummy-123",
  title: "Your Health, Our Priority",
  slogan: "Quality Care You Can Trust",
  description:
    "We provide comprehensive healthcare services with state-of-the-art facilities and experienced medical professionals dedicated to your well-being.",
  images: [
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    "https://images.unsplash.com/photo-1579684385128-1ef15d508118?w=800",
  ],
};

const HeroManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<IHeroManagement>(`/hero-management`, [
    "hero-management",
  ]);

  const heroData = data?.data || DUMMY_HERO_DATA;

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
