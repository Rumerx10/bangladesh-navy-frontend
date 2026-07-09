"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import CreateUpdateNotices from "./Form/CreateUpdateNotices";
import { INoticesManagement } from "./types";
import NoticesPreview from "./NoticesPreview";
import NoticesPreviewSkeleton from "./Skeleton/NoticesPreviewSkeleton";

const DUMMY_NOTICES_DATA: INoticesManagement = {
  id: "dummy-notices-123",
  title: "Important Notices",
  subTitle:
    "Stay updated with the latest hydrographic notices, maritime advisories and publications",
  categories: [
    "Hydrographic Notes",
    "Notices to Mariners",
    "Survey",
    "Events",
    "Notices",
    "Publications",
  ],
  news: [
    {
      category: "Notices to Mariners",
      title:
        "Notice to Mariners No. 12/2024 – Depth Changes in Chittagong Approach Channel",
      date: "2024-06-15",
      shortDescription:
        "Important update regarding depth changes in the northern approach channel to Chittagong Port following recent hydrographic survey.",
      description:
        "Mariners are hereby informed that following a hydrographic survey conducted in May 2024, significant depth changes have been recorded in the northern approach channel to Chittagong Port. All vessels are advised to exercise extreme caution and consult the latest chart updates before transiting this area.",
      image:
        "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800",
    },
    {
      category: "Hydrographic Notes",
      title: "Hydrographic Survey Completed – Cox's Bazar Coastal Area",
      date: "2024-05-20",
      shortDescription:
        "Bangladesh Navy Hydrographic Department has successfully completed a comprehensive survey of Cox's Bazar coastal waters.",
      description:
        "The Bangladesh Navy Hydrographic Department has completed a multi-month comprehensive survey of the Cox's Bazar coastal area. The survey utilized state-of-the-art multibeam echosounder equipment and the results will be incorporated into updated nautical charts available later this year.",
      image:
        "https://images.unsplash.com/photo-1476158085676-e67f57ed9ed7?w=800",
    },
  ],
};

const NoticesManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<INoticesManagement>(`/notices`, [
    "notices",
  ]);

  const noticesData = data?.data || DUMMY_NOTICES_DATA;

  if (isLoading) {
    return <NoticesPreviewSkeleton />;
  }

  if (noticesData && !isEditMode) {
    return (
      <NoticesPreview data={noticesData} onEdit={() => setIsEditMode(true)} />
    );
  }

  return (
    <CreateUpdateNotices
      initialValues={noticesData}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default NoticesManagement;
