"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { NoticeFormValues } from "../Schema/noticeManagementSchema";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

interface NoticeFormProps {
  isEditMode: boolean;
  onSubmit: (values: NoticeFormValues) => void;
  onCancel: () => void;
  isPending: boolean;
  error: ApiError | null;
}

const NoticeForm = ({
  isEditMode,
  onSubmit,
  onCancel,
  isPending,
  error,
}: NoticeFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<NoticeFormValues>();

  const status = watch("status");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-secondary-dark">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter notice name"
          className="h-11"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-secondary-dark">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter notice description"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status" className="text-sm font-medium text-secondary-dark">
          Status <span className="text-red-500">*</span>
        </Label>
        <Select
          value={status}
          onValueChange={(value) =>
            setValue("status", value as "ACTIVE" | "INACTIVE")
          }
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          {error?.response?.data?.message || error?.message || "Something went wrong"}
        </p>
      )}

      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          className="h-11 px-6"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="h-11 px-6 bg-primary hover:bg-primary/70 text-white"
        >
          {isPending
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
            ? "Update"
            : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default NoticeForm;