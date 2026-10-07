"use client";

import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { usePost } from "@/src/hooks/usePost";
import { IMissionVision } from "@/src/components/mission-vision/types";
import {
  MISSION_VISION_ENDPOINT,
  MISSION_VISION_QUERY_KEY,
} from "@/src/components/mission-vision/useMissionVision";
import {
  missionVisionSchema,
  MissionVisionSchemaForm,
} from "../Schema/missionVisionSchema";
import MissionVisionForm from "./MissionVisionForm";

interface CreateUpdateMissionVisionProps {
  initialValues?: IMissionVision;
  /** False while the form is seeded with the fallback copy — first save creates. */
  isEditMode?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateMissionVision = ({
  initialValues,
  isEditMode = false,
  onSuccess,
  onCancel,
}: CreateUpdateMissionVisionProps) => {
  const queryClient = useQueryClient();

  const methods = useForm<MissionVisionSchemaForm>({
    resolver: yupResolver(
      missionVisionSchema
    ) as Resolver<MissionVisionSchemaForm>,
    defaultValues: {
      titleEn: initialValues?.titleEn || "",
      titleBn: initialValues?.titleBn || "",
      subTitleEn: initialValues?.subTitleEn || "",
      subTitleBn: initialValues?.subTitleBn || "",
      missionTitleEn: initialValues?.missionTitleEn || "",
      missionTitleBn: initialValues?.missionTitleBn || "",
      missionDescriptionEn: initialValues?.missionDescriptionEn || "",
      missionDescriptionBn: initialValues?.missionDescriptionBn || "",
      visionTitleEn: initialValues?.visionTitleEn || "",
      visionTitleBn: initialValues?.visionTitleBn || "",
      visionDescriptionEn: initialValues?.visionDescriptionEn || "",
      visionDescriptionBn: initialValues?.visionDescriptionBn || "",
    },
  });

  /**
   * `/mission-vision` is a singleton upsert — POST both creates the record and
   * overwrites it, so there is no PATCH and no id in the URL.
   */
  const {
    mutate: saveMissionVision,
    isPending,
    error,
    reset: resetError,
  } = usePost<IMissionVision>(
    MISSION_VISION_ENDPOINT,
    (saved) => {
      // The upsert echoes back the stored record. Seeding the cache with it
      // means the preview renders what the API actually kept rather than what
      // was typed. `usePost` has already invalidated the key, so the background
      // refetch still confirms this against a fresh GET.
      if (saved?.id) {
        queryClient.setQueryData(MISSION_VISION_QUERY_KEY, { data: saved });
      }

      toast.success(
        isEditMode
          ? "Mission & vision updated successfully!"
          : "Mission & vision saved successfully!"
      );
      onSuccess?.();
    },
    [MISSION_VISION_QUERY_KEY]
  );

  // Optional fields are sent even when blank: the upsert overwrites the stored
  // record, so an omitted field would quietly keep whatever was saved before.
  const onSubmit = (values: MissionVisionSchemaForm) => {
    saveMissionVision({
      data: {
        titleEn: values.titleEn.trim(),
        titleBn: values.titleBn?.trim() || "",
        subTitleEn: values.subTitleEn?.trim() || "",
        subTitleBn: values.subTitleBn?.trim() || "",
        missionTitleEn: values.missionTitleEn.trim(),
        missionTitleBn: values.missionTitleBn?.trim() || "",
        missionDescriptionEn: values.missionDescriptionEn.trim(),
        missionDescriptionBn: values.missionDescriptionBn?.trim() || "",
        visionTitleEn: values.visionTitleEn.trim(),
        visionTitleBn: values.visionTitleBn?.trim() || "",
        visionDescriptionEn: values.visionDescriptionEn.trim(),
        visionDescriptionBn: values.visionDescriptionBn?.trim() || "",
      },
    });
  };

  const handleCancel = () => {
    resetError();
    methods.reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <MissionVisionForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        error={error}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateMissionVision;
