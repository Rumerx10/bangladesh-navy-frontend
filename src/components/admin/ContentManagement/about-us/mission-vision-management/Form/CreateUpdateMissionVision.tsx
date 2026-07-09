"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MissionVisionForm from "./MissionVisionForm";
import {
  missionVisionSchema,
  MissionVisionSchemaForm,
} from "../Schema/missionVisionSchema";
import { IMissionVisionManagement } from "../types";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";

interface CreateUpdateMissionVisionProps {
  initialValues?: IMissionVisionManagement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateMissionVision = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdateMissionVisionProps) => {
  const isEditMode = !!initialValues?.title;

  const methods = useForm<MissionVisionSchemaForm>({
    resolver: yupResolver(missionVisionSchema),
    defaultValues: {
      title: initialValues?.title || "",
      subTitle: initialValues?.subTitle || "",
      vision: {
        title: initialValues?.vision?.title || "",
        description: initialValues?.vision?.description || "",
      },
      mission: {
        title: initialValues?.mission?.title || "",
        description: initialValues?.mission?.description || "",
      },
    },
  });

  const { mutate: createMissionVision, isPending: isCreating } = usePost<{
    data: IMissionVisionManagement;
  }>(
    "/mission-vision",
    () => {
      onSuccess?.();
    },
    [["mission-vision"]]
  );

  const { mutate: updateMissionVision, isPending: isUpdating } = usePatch<{
    data: IMissionVisionManagement;
  }>(
    () => {
      onSuccess?.();
    },
    [["mission-vision"]],
    "/mission-vision"
  );

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: MissionVisionSchemaForm) => {
    if (isEditMode && initialValues?.id) {
      updateMissionVision({
        url: `/mission-vision/${initialValues.id}`,
        data,
      });
    } else {
      createMissionVision({
        endpoint: "/mission-vision",
        data,
      });
    }
  };

  const handleCancel = () => {
    methods.reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <MissionVisionForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateMissionVision;
