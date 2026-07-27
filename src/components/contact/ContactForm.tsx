"use client";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import SectionTitle from "../SectionTitle";
import InputLabel from "../shared/InputLabel";
import { usePost } from "@/src/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { ContactFormType, contactValidationSchema } from "./contactFormSchema";
import ControlledInputField from "../shared/FromController/ControlledInputField";
import ControlledTextareaField from "../shared/FromController/ControlledTextareaField";

const ContactForm = () => {
  const methods = useForm<ContactFormType>({
    resolver: yupResolver(contactValidationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      contactType: "CONTACT_INFORMATION",
    },
  });

  const { mutateAsync, error, isPending } = usePost(
    "/contact",
    () => {
      toast.success("Message sent successfully!");
      methods.reset();
    },
    [["contact"]]
  );

  const onSubmit = (data: ContactFormType) => {
    mutateAsync({ data });
  };

  return (
    <div className="bg-white">
      <div className="mb-10">
        <SectionTitle
          title="Send us a Message"
          desc="Have a question about our products or services? Fill out the form below and our team will get back to you shortly."
          position="start"
        />
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
};

export default ContactForm;
