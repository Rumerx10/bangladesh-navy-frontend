import ContactUs from "@/src/components/contact-us/ContactUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Get in touch with the Bangladesh Navy Hydrographic & Oceanographic Center for inquiries, support, and services.",
};

export default function ContactUsPage() {
  return <ContactUs />;
}
