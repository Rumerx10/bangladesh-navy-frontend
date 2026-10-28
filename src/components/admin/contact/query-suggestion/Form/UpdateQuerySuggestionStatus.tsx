"use client";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { usePatch } from "@/src/hooks/usePatch";
import { IQuerySuggestion } from "../types";
import QuerySuggestionForm from "./QuerySuggestionForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  QuerySuggestionFormValues,
  querySuggestionSchema,
} from "../schema/QuerySuggestionSchema";

interface UpdateQuerySuggestionStatusProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IQuerySuggestion;
}

const UpdateQuerySuggestionStatus = ({
  isOpen,
  onClose,
  initialValues,
}: UpdateQuerySuggestionStatusProps) => {
  const methods = useForm<QuerySuggestionFormValues>({
    resolver: yupResolver(
      querySuggestionSchema
    ) as Resolver<QuerySuggestionFormValues>,
    defaultValues: {
      status: initialValues?.status || "PENDING",
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({ status: initialValues?.status || "PENDING" });
    }
  }, [isOpen, initialValues, methods]);

  const {
    mutate: updateStatus,
    isPending,
    error,
    reset: resetError,
  } = usePatch(() => {
    toast.success("Status updated successfully!");
    onClose();
  }, [["query-suggestion-management"]]);

  const handleClose = () => {
    resetError();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) resetError();
  }, [isOpen, resetError]);

  const onSubmit = (values: QuerySuggestionFormValues) => {
    if (initialValues?.id) {
      updateStatus({
        url: `/contact/${initialValues.id}`,
        data: { status: values.status },
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
      <DialogContent className="bg-card min-w-[40vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-secondary text-xl font-semibold">
            Query / Suggestion Details
          </DialogTitle>
        </DialogHeader>

        {initialValues && (
          <div className="rounded-xl border border-border bg-light p-4 sm:p-5 space-y-5">
            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                { label: "Name", value: initialValues.name },
                { label: "Email", value: initialValues.email },
                { label: "Phone", value: initialValues.phone },
                {
                  label: "Submitted",
                  value: new Date(initialValues.createdAt).toLocaleDateString(),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="min-w-0 rounded-lg border border-border/70 bg-card p-3 sm:p-4"
                >
                  <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
                    {item.label}
                  </p>

                  <p className="text-sm font-medium text-secondary-dark">
                    {item.value || "—"}
                  </p>
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
                Message
              </p>

              <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
                <p className="text-sm leading-6 text-secondary-dark whitespace-pre-wrap">
                  {initialValues.message || "No message provided."}
                </p>
              </div>
            </div>
          </div>
        )}

        <FormProvider {...methods}>
          <QuerySuggestionForm
            onSubmit={onSubmit}
            onCancel={handleClose}
            isPending={isPending}
            error={error}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateQuerySuggestionStatus;
