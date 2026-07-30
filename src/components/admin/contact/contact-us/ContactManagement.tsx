"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import { IContactInfo } from "./types";
import ContactPreview from "./ContactPreview";
import ContactInfoPreviewSkeleton from "./Skeleton/ContactInfoPreviewSkeleton";
import CreateUpdateContactInfo from "./Form/CreateUpdateContactInfo";

const ContactManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<IContactInfo | null>("/contact-info", [
    "contact-info",
  ]);

  const contactInfo = data?.data;

  if (isLoading) {
    return <ContactInfoPreviewSkeleton />;
  }

  if (contactInfo && !isEditMode) {
    return (
      <ContactPreview data={contactInfo} onEdit={() => setIsEditMode(true)} />
    );
  }

  return (
    <CreateUpdateContactInfo
      initialValues={contactInfo || undefined}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default ContactManagement;
