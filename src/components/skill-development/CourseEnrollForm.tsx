"use client";

import { usePost } from "@/src/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ControlledInputField from "../shared/FromController/ControlledInputField";
import ControlledSelectField from "../shared/FromController/ControlledSelectField";
import ControlledTextareaField from "../shared/FromController/ControlledTextareaField";
import InputLabel from "../shared/InputLabel";
import { Button } from "../ui/button";
import {
  CourseEnrollFormType,
  courseEnrollSchema,
} from "./schema/CourseEnrollSchema";
import { courses } from "@/src/data/skillCourses";

interface CourseEnrollFormProps {
  open: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

const courseOptions = courses.map((c) => ({
  label: c.title,
  value: c.title,
}));

export default function CourseEnrollForm({
  open,
  onClose,
  defaultCourse,
}: CourseEnrollFormProps) {
  const { mutateAsync, error, isPending } = usePost(
    "/course-enrollment",
    () => {
      console.log("Enrollment POST success");
    },
    [["course-enrollment"]]
  );

  const methods = useForm<CourseEnrollFormType>({
    resolver: yupResolver(courseEnrollSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      contactNumber: "",
      email: "",
      organization: "",
      designation: "",
      selectedCourse: defaultCourse || "",
      reason: "",
      remarks: "",
    },
  });

  // Update selectedCourse when defaultCourse changes
  useEffect(() => {
    if (defaultCourse) {
      methods.setValue("selectedCourse", defaultCourse);
    }
  }, [defaultCourse, methods]);

  const onSubmit = (data: CourseEnrollFormType) => {
    mutateAsync(data)
      .then(() => {
        toast.success("Application submitted successfully!");
        methods.reset();
        onClose();
      })
      .catch((err) => {
        console.error("Enrollment error:", err);
        toast.error(err?.message || "Failed to submit application");
      });
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-pBlue">Course Application</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Fill in your details to apply for enrollment
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <InputLabel label="Full Name" required />
                  <ControlledInputField
                    name="name"
                    placeholder="Enter your full name"
                    className="bg-white"
                  />
                </div>
                <div>
                  <InputLabel label="Contact Number" required />
                  <ControlledInputField
                    name="contactNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="bg-white"
                  />
                </div>
              </div>

              <div>
                <InputLabel label="Email Address" required />
                <ControlledInputField
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <InputLabel label="Organization" required />
                  <ControlledInputField
                    name="organization"
                    placeholder="Your organization name"
                    className="bg-white"
                  />
                </div>
                <div>
                  <InputLabel label="Designation" required />
                  <ControlledInputField
                    name="designation"
                    placeholder="Your current designation"
                    className="bg-white"
                  />
                </div>
              </div>

              <div>
                <InputLabel label="Select Course" required />
                <ControlledSelectField
                  name="selectedCourse"
                  options={courseOptions}
                  placeholder="Choose a course"
                  className="bg-white"
                />
              </div>

              <div>
                <InputLabel label="Reason for Applying" required />
                <ControlledTextareaField
                  name="reason"
                  placeholder="Why do you want to enroll in this course?"
                  className="bg-white min-h-24"
                />
              </div>

              <div>
                <InputLabel label="Additional Remarks" />
                <ControlledTextareaField
                  name="remarks"
                  placeholder="Any additional information (optional)"
                  className="bg-white min-h-20"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">
                    {error.message ||
                      "Failed to submit application. Please try again."}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <Button
                  disabled={isPending}
                  type="submit"
                  className="capitalize bg-liteBlue text-white rounded-lg px-8 py-2.5 h-10 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:bg-pBlue transition-colors"
                >
                  {isPending ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
