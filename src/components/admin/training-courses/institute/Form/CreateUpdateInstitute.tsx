"use client";

import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { usePost } from "@/src/hooks/usePost";
import { IAboutInstitute } from "@/src/components/about-institute/types";
import {
  ABOUT_INSTITUTE_ENDPOINT,
  ABOUT_INSTITUTE_QUERY_KEY,
} from "@/src/components/about-institute/useAboutInstitute";
import {
  instituteSchema,
  InstituteSchemaForm,
} from "../Schema/instituteSchema";
import InstituteForm from "./InstituteForm";

interface CreateUpdateInstituteProps {
  initialValues?: IAboutInstitute;
  /** False while the form is seeded with the fallback copy — first save creates. */
  isEditMode?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateInstitute = ({
  initialValues,
  isEditMode = false,
  onSuccess,
  onCancel,
}: CreateUpdateInstituteProps) => {
  const queryClient = useQueryClient();

  const methods = useForm<InstituteSchemaForm>({
    resolver: yupResolver(instituteSchema) as Resolver<InstituteSchemaForm>,
    defaultValues: {
      titleEn: initialValues?.titleEn || "",
      titleBn: initialValues?.titleBn || "",
      subTitleEn: initialValues?.subTitleEn || "",
      subTitleBn: initialValues?.subTitleBn || "",
      aboutParagraphsEn: initialValues?.aboutParagraphsEn || [],
      aboutParagraphsBn: initialValues?.aboutParagraphsBn || [],
      visionTitleEn: initialValues?.visionTitleEn || "",
      visionTitleBn: initialValues?.visionTitleBn || "",
      visionDescriptionEn: initialValues?.visionDescriptionEn || "",
      visionDescriptionBn: initialValues?.visionDescriptionBn || "",
      missionTitleEn: initialValues?.missionTitleEn || "",
      missionTitleBn: initialValues?.missionTitleBn || "",
      missionPointsEn: initialValues?.missionPointsEn || [],
      missionPointsBn: initialValues?.missionPointsBn || [],
      trainingOverviewTitleEn: initialValues?.trainingOverviewTitleEn || "",
      trainingOverviewTitleBn: initialValues?.trainingOverviewTitleBn || "",
      trainingOverviewParagraphsEn:
        initialValues?.trainingOverviewParagraphsEn || [],
      trainingOverviewParagraphsBn:
        initialValues?.trainingOverviewParagraphsBn || [],
    },
  });

  /**
   * `/about-institute` is a singleton upsert — POST both creates the record and
   * overwrites it, so there is no PATCH and no id in the URL.
   */
  const {
    mutate: saveInstitute,
    isPending,
    error,
    reset: resetError,
  } = usePost<IAboutInstitute>(
    ABOUT_INSTITUTE_ENDPOINT,
    (saved) => {
      // The upsert echoes back the stored record. Seeding the cache with it
      // means the preview renders what the API actually kept rather than what
      // was typed. `usePost` has already invalidated the key, so the background
      // refetch still confirms this against a fresh GET.
      if (saved?.id) {
        queryClient.setQueryData(ABOUT_INSTITUTE_QUERY_KEY, { data: saved });
      }

      toast.success(
        isEditMode
          ? "Institute content updated successfully!"
          : "Institute content saved successfully!"
      );
      onSuccess?.();
    },
    [ABOUT_INSTITUTE_QUERY_KEY]
  );

  // Optional fields are sent even when blank: the upsert overwrites the stored
  // record, so an omitted field would quietly keep whatever was saved before.
  const onSubmit = (values: InstituteSchemaForm) => {
    saveInstitute({
      data: {
        titleEn: values.titleEn.trim(),
        titleBn: values.titleBn?.trim() || "",
        subTitleEn: values.subTitleEn?.trim() || "",
        subTitleBn: values.subTitleBn?.trim() || "",
        aboutParagraphsEn: values.aboutParagraphsEn,
        aboutParagraphsBn: values.aboutParagraphsBn || [],
        visionTitleEn: values.visionTitleEn.trim(),
        visionTitleBn: values.visionTitleBn?.trim() || "",
        visionDescriptionEn: values.visionDescriptionEn.trim(),
        visionDescriptionBn: values.visionDescriptionBn?.trim() || "",
        missionTitleEn: values.missionTitleEn.trim(),
        missionTitleBn: values.missionTitleBn?.trim() || "",
        missionPointsEn: values.missionPointsEn,
        missionPointsBn: values.missionPointsBn || [],
        trainingOverviewTitleEn: values.trainingOverviewTitleEn.trim(),
        trainingOverviewTitleBn: values.trainingOverviewTitleBn?.trim() || "",
        trainingOverviewParagraphsEn: values.trainingOverviewParagraphsEn,
        trainingOverviewParagraphsBn: values.trainingOverviewParagraphsBn || [],
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
      <InstituteForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        error={error}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateInstitute;
