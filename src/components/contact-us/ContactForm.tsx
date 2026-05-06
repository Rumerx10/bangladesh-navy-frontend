"use client";

import { usePost } from "@/src/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ControlledInputField from "../shared/FromController/ControlledInputField";
import ControlledTextareaField from "../shared/FromController/ControlledTextareaField";
import InputLabel from "../shared/InputLabel";
import Text from "../shared/Text";
import { Button } from "../ui/button";
import {
  ContactFormType,
  contactValidationSchema,
} from "./schema/ContactSchema";

export default function ContactForm() {
  const { mutateAsync, error, isPending } = usePost(
    "/contact-support",
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
    },
  });

  const onSubmit = (data: ContactFormType) => {
    mutateAsync(data)
      .then(() => {
        toast.success("Message sent successfully!");
        methods.reset();
      })
      .catch((error) => {
        console.error("Contact form error:", error);
        toast.error(error?.message || "Failed to send message");
      });
  };

  return (
    <div className="bg-white">
      <div className="mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#001836] mb-4">
          Send us a Message
        </h2>
        <p className="text-gray-500 text-sm lg:text-base leading-relaxed">
          Have a question about our products or services? Fill out the form below and our team will get back to you shortly.
        </p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-5">
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

            <div>
              <InputLabel label="Phone" required />
              <ControlledInputField
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                className="bg-white"
              />
            </div>

            <div>
              <InputLabel label="Message" required />
              <ControlledTextareaField
                name="message"
                placeholder="Write your message here..."
                className="bg-white min-h-30"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">
                  {error.message || "Failed to send message. Please try again."}
                </p>
              </div>
            )}

            <Button
              disabled={isPending}
              type="submit"
              className="capitalize bg-primary text-white rounded-lg px-6 lg:px-10 py-3 h-11 lg:h-12 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:bg-primary/90 transition-colors w-full lg:w-auto"
            >
              {isPending ? "Sending..." : "Send Message →"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
