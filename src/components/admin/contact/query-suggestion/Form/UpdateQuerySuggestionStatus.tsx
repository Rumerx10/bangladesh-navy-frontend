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
    resolver: yupResolver(querySuggestionSchema) as Resolver<QuerySuggestionFormValues>,
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
      <DialogContent className="bg-white min-w-[40vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-secondary text-xl font-semibold">
            Query / Suggestion Details
          </DialogTitle>
        </DialogHeader>

        {initialValues && (
          <div className="space-y-3 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Name</p>
                <p className="text-sm font-medium text-secondary-dark">{initialValues.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                <p className="text-sm font-medium text-secondary-dark">{initialValues.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                <p className="text-sm font-medium text-secondary-dark">{initialValues.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Submitted</p>
                <p className="text-sm font-medium text-secondary-dark">
                  {new Date(initialValues.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Message</p>
              <p className="text-sm text-secondary-dark bg-white rounded p-3 border border-gray-100">
                {initialValues.message}
              </p>
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
