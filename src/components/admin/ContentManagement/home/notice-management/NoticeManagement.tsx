"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import CreateUpdateNoticeManagement from "./Form/CreateUpdateNoticeManagement";
import { INoticeManagement } from "./types";
import NoticePreview from "./NoticePreview";
import NoticePreviewSkeleton from "./Skeleton/NoticePreviewSkeleton";

const DUMMY_NOTICE_DATA: INoticeManagement = {
  id: "dummy-notice-123",
  notices: [
    { message: "Fleet exercise scheduled for next week.", isActive: true },
    {
      message: "Maintenance window on Saturday 02:00–04:00 BDT.",
      isActive: true,
    },
  ],
};

const NoticeManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<INoticeManagement>("/notice-management", [
    "notice-management",
  ]);

  const noticeData = data?.data || DUMMY_NOTICE_DATA;

  if (isLoading) {
    return <NoticePreviewSkeleton />;
  }

  if (noticeData && !isEditMode) {
    return (
      <NoticePreview data={noticeData} onEdit={() => setIsEditMode(true)} />
    );
  }

  return (
    <CreateUpdateNoticeManagement
      initialValues={noticeData}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default NoticeManagement;
