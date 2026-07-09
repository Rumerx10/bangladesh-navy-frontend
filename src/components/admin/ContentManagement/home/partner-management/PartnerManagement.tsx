"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import CreateUpdatePartnerManagement from "./Form/CreateUpdatePartnerManagement";
import { IPartnerManagement } from "./types";
import PartnerPreview from "./PartnerPreview";
import PartnerPreviewSkeleton from "./Skeleton/PartnerPreviewSkeleton";

const DUMMY_PARTNER_DATA: IPartnerManagement = {
  id: "dummy-123",
  title: "Our Trusted Partners",
  description:
    "Empowering maritime safety and oceanographic research through strategic collaborations with national and international stakeholders.",
  partners: [
    {
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100",
      name: "BIMCO",
      isActive: true,
    },
    {
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100",
      name: "IMO",
      isActive: true,
    },
  ],
};

const PartnerManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<IPartnerManagement>(
    `/partner-management`,
    ["partner-management"]
  );

  const partnerData = data?.data || DUMMY_PARTNER_DATA;

  if (isLoading) {
    return <PartnerPreviewSkeleton />;
  }

  if (partnerData && !isEditMode) {
    return (
      <PartnerPreview data={partnerData} onEdit={() => setIsEditMode(true)} />
    );
  }

  return (
    <CreateUpdatePartnerManagement
      initialValues={partnerData}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default PartnerManagement;
