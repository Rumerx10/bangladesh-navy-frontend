"use client";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  SurveyShipFormValues,
  surveyShipSchema,
} from "../Schema/surveyShipSchema";
import { ISurveyShip } from "../types";
import SurveyShipForm from "./SurveyShipForm";

interface CreateUpdateSurveyShipProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: ISurveyShip;
}

const CreateUpdateSurveyShip = ({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdateSurveyShipProps) => {
  const isUpdate = !!initialValues;

  const methods = useForm<SurveyShipFormValues>({
    resolver: yupResolver(surveyShipSchema) as Resolver<SurveyShipFormValues>,
    defaultValues: {
      nameEn: "",
      nameBn: "",
      descriptionEn: "",
      descriptionBn: "",
      surveyCategoryId: "",
      length: "",
      beam: "",
      draft: "",
      crew: "",
      surveyEquipment: "",
      status: "ACTIVE",
      image: undefined,
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        nameEn: initialValues?.nameEn || "",
        nameBn: initialValues?.nameBn || "",
        descriptionEn: initialValues?.descriptionEn || "",
        descriptionBn: initialValues?.descriptionBn || "",
        surveyCategoryId: initialValues?.surveyCategory?.id || "",
        length: initialValues?.length || "",
        beam: initialValues?.beam || "",
        draft: initialValues?.draft || "",
        crew: initialValues?.crew || "",
        surveyEquipment: initialValues?.surveyEquipment || "",
        status: initialValues?.status || "ACTIVE",
        image: initialValues?.image || undefined,
      });
    } else {
      methods.reset({
        nameEn: "",
        nameBn: "",
        descriptionEn: "",
        descriptionBn: "",
        surveyCategoryId: "",
        length: "",
        beam: "",
        draft: "",
        crew: "",
        surveyEquipment: "",
        status: "ACTIVE",
        image: undefined,
      });
    }
  }, [isOpen, initialValues, methods]);

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
    reset: resetCreateError,
  } = usePost(
    "/survey-ships",
    () => {
      toast.success("Survey ship created successfully!");
      onClose();
    },
    [["survey-ships"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = usePatch(
    () => {
      toast.success("Survey ship updated successfully!");
      onClose();
    },
    [["survey-ships"]]
  );

  const handleClose = () => {
    resetCreateError();
    resetUpdateError();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      resetCreateError();
      resetUpdateError();
    }
  }, [isOpen, resetCreateError, resetUpdateError]);

  const onSubmit = (values: SurveyShipFormValues) => {
    const formData = new FormData();
    formData.append("nameEn", values.nameEn);
    formData.append("nameBn", values.nameBn || "");
    formData.append("descriptionEn", values.descriptionEn);
    formData.append("descriptionBn", values.descriptionBn || "");
    formData.append("surveyCategoryId", values.surveyCategoryId);
    formData.append("length", values.length);
    formData.append("beam", values.beam);
    formData.append("draft", values.draft);
    formData.append("crew", values.crew);
    formData.append("surveyEquipment", values.surveyEquipment);
    formData.append("status", values.status);

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    if (isUpdate && initialValues) {
      updateMutate({
        url: `/survey-ships/${initialValues.id}`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    } else {
      createMutate({
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="bg-white min-w-[65vw] max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-secondary text-xl font-semibold">
            {isUpdate ? "Update" : "Create"} Survey Ship
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 mt-2 pr-2 scrollbar-modern">
          <FormProvider {...methods}>
            <SurveyShipForm
              isEditMode={isUpdate}
              onSubmit={onSubmit}
              onCancel={handleClose}
              isPending={isCreating || isUpdating}
              error={error || updateError}
            />
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateSurveyShip;
