"use client";

import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { usePost } from "@/src/hooks/usePost";
import InputLabel from "../shared/InputLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import ControlledInputField from "../shared/FromController/ControlledInputField";
import ControlledTextareaField from "../shared/FromController/ControlledTextareaField";
import {
  ContactFormType,
  contactValidationSchema,
} from "../contact/contactFormSchema";

const QueryForm = () => {
  const { mutateAsync, error, isPending } = usePost(
    "/contact",
    () => {
      console.log("POST success");
    },
    [["contact"]]
  );

  const methods = useForm<ContactFormType>({
    resolver: yupResolver(contactValidationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      contactType: "QUERY_SUGGESTION",
    },
  });

  const onSubmit = (data: ContactFormType) => {
    mutateAsync(data)
      .then(() => {
        toast.success("Query/suggestion sent successfully!");
        methods.reset();
      })
      .catch((error) => {
        console.error("Query form error:", error);
        toast.error(error?.message || "Failed to send message");
      });
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-[#f8fafc] p-6 lg:p-10">
      <div className="mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-pBlue mb-4">
          Query or Suggestion
        </h2>
        <p className="max-w-2xl text-gray-500 text-sm lg:text-base leading-relaxed">
          Have a query or suggestion about our services or resources? Fill out
          the form below and our team will review and respond accordingly.
        </p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <InputLabel label="Name" required />
              <ControlledInputField
                name="name"
                placeholder="Enter your name"
                className="bg-white"
              />
            </div>

            <div>
              <InputLabel label="Email" required />
              <ControlledInputField
                type="email"
                name="email"
                placeholder="Enter your email"
                className="bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <InputLabel label="Phone" required />
              <ControlledInputField
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                className="bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <InputLabel label="Message" required />
              <ControlledTextareaField
                name="message"
                placeholder="Write your query or suggestion here..."
                className="bg-white min-h-40"
              />
            </div>

            {error && (
              <div className="md:col-span-2 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">
                  {error.message || "Failed to send message. Please try again."}
                </p>
              </div>
            )}

            <Button
              disabled={isPending}
              type="submit"
              className="md:col-span-2 capitalize bg-primary text-white rounded-lg px-6 lg:px-10 py-3 h-11 lg:h-12 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:bg-primary/90 transition-colors w-full lg:w-auto"
            >
              {isPending ? "Sending..." : "Submit →"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default QueryForm;
