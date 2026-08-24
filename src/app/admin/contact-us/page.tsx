import { Metadata } from "next";
import ContactManagement from "@/src/components/admin/contact/contact-us/ContactManagement";

export const metadata: Metadata = {
  title: "Contact Submissions",
  description: "Manage contact information and submitted inquiries.",
};

const page = () => {
  return <ContactManagement />;
};

export default page;
