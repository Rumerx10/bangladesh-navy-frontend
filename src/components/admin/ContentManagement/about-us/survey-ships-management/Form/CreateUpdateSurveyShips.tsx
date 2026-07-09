"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SurveyShipsForm from "./SurveyShipsForm";
import {
  surveyShipsSchema,
  SurveyShipsSchemaForm,
} from "../Schema/surveyShipsSchema";
import { ISurveyShipsManagement } from "../types";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";

interface CreateUpdateSurveyShipsProps {
  initialValues?: ISurveyShipsManagement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateSurveyShips = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdateSurveyShipsProps) => {
  const isEditMode = !!initialValues?.title;

  const methods = useForm<SurveyShipsSchemaForm>({
    resolver: yupResolver(surveyShipsSchema),
    defaultValues: {
      title: initialValues?.title || "",
      subTitle: initialValues?.subTitle || "",
      shipTypes: initialValues?.shipTypes || [],
      surveyShips: initialValues?.surveyShips || [],
    },
  });

  const { mutate: createSurveyShips, isPending: isCreating } = usePost<{
    data: ISurveyShipsManagement;
  }>(
    "/survey-ships",
    () => {
      onSuccess?.();
    },
    [["survey-ships"]]
  );

  const { mutate: updateSurveyShips, isPending: isUpdating } = usePatch<{
    data: ISurveyShipsManagement;
  }>(
    () => {
      onSuccess?.();
    },
    [["survey-ships"]],
    "/survey-ships"
  );

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: SurveyShipsSchemaForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subTitle", data.subTitle);

    (data.shipTypes || []).forEach((type, i) => {
      formData.append(`shipTypes[${i}]`, type);
    });

    data.surveyShips.forEach((ship, i) => {
      formData.append(`surveyShips[${i}][name]`, ship.name);
      formData.append(`surveyShips[${i}][type]`, ship.type);
      formData.append(`surveyShips[${i}][description]`, ship.description);
      formData.append(
        `surveyShips[${i}][isActive]`,
        String(ship.isActive ?? true)
      );
      formData.append(`surveyShips[${i}][detailsLink]`, ship.detailsLink || "");
      formData.append(
        `surveyShips[${i}][basicInformation][length]`,
        ship.basicInformation.length
      );
      formData.append(
        `surveyShips[${i}][basicInformation][beam]`,
        ship.basicInformation.beam
      );
      formData.append(
        `surveyShips[${i}][basicInformation][draft]`,
        ship.basicInformation.draft
      );
      formData.append(
        `surveyShips[${i}][basicInformation][crew]`,
        ship.basicInformation.crew
      );

      if (ship.image instanceof File) {
        formData.append(`surveyShips[${i}][image]`, ship.image);
      } else if (typeof ship.image === "string" && ship.image.trim()) {
        formData.append(`surveyShips[${i}][existingImage]`, ship.image);
      }

      (ship.surveyEquipment || []).forEach((eq, j) => {
        formData.append(`surveyShips[${i}][surveyEquipment][${j}]`, eq);
      });
    });

    if (isEditMode && initialValues?.id) {
      updateSurveyShips({
        url: `/survey-ships/${initialValues.id}`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    } else {
      createSurveyShips({
        endpoint: "/survey-ships",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    }
  };

  const handleCancel = () => {
    methods.reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <SurveyShipsForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateSurveyShips;
