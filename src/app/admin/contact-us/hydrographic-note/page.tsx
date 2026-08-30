import { Metadata } from "next";
import HydrographicNoteManagement from "@/src/components/admin/contact/hydrographic-note/HydrographicNoteManagement";

export const metadata: Metadata = {
  title: "Hydrographic Note Submissions",
  description: "Review hydrographic note requests submitted by users.",
};

const page = () => {
  return <HydrographicNoteManagement />;
};

export default page;
