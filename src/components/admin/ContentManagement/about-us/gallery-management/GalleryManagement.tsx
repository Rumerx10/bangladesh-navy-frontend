"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import CreateUpdateGallery from "./Form/CreateUpdateGallery";
import { IGalleryManagement } from "./types";
import GalleryPreview from "./GalleryPreview";
import GalleryPreviewSkeleton from "./Skeleton/GalleryPreviewSkeleton";

const DUMMY_GALLERY_DATA: IGalleryManagement = {
  id: "dummy-123",
  title: "Photo Gallery",
  subTitle: "Glimpses of Bangladesh Navy operations and activities",
  categories: ["All", "Ships", "Survey", "Operations", "Training"],
  galleryItems: [
    {
      image:
        "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400",
      title: "Survey Vessel at Sea",
      category: "Ships",
    },
    {
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
      title: "Hydrographic Survey Operation",
      category: "Survey",
    },
  ],
};

const GalleryManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<IGalleryManagement>(`/gallery`, [
    "gallery",
  ]);

  const galleryData = data?.data || DUMMY_GALLERY_DATA;

  if (isLoading) {
    return <GalleryPreviewSkeleton />;
  }

  if (galleryData && !isEditMode) {
    return (
      <GalleryPreview data={galleryData} onEdit={() => setIsEditMode(true)} />
    );
  }

  return (
    <CreateUpdateGallery
      initialValues={galleryData}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default GalleryManagement;
