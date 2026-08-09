"use client";

import { usePost } from "@/src/hooks/usePost";
import { IContactInfo } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import ContactInfoForm from "./ContactInfoForm";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import {
  ContactInfoFormValues,
  contactInfoSchema,
} from "../Schema/contactInfoSchema";

interface CreateUpdateContactInfoProps {
  initialValues?: IContactInfo;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateContactInfo = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdateContactInfoProps) => {
  const isEditMode = !!initialValues?.id;

  const methods = useForm<ContactInfoFormValues>({
    resolver: yupResolver(contactInfoSchema) as Resolver<ContactInfoFormValues>,
    defaultValues: {
      phones: initialValues?.phones || [],
      emails: initialValues?.emails || [],
      office_hour: initialValues?.office_hour || "",
    },
  });

  const {
    mutate: saveContactInfo,
    isPending,
    error,
    reset: resetError,
  } = usePost<{ data: IContactInfo }>(
    "/contact-info",
    () => {
      onSuccess?.();
    },
    [["contact-info"]]
  );

  const onSubmit = (data: ContactInfoFormValues) => {
    saveContactInfo({
      data: {
        phones: data.phones,
        emails: data.emails,
        office_hour: data.office_hour,
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
      <ContactInfoForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
        error={error}
      />
    </FormProvider>
  );
};

export default CreateUpdateContactInfo;
