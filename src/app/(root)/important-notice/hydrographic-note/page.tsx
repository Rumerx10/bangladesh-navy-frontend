import { Metadata } from "next";
import HydrographicNote from "@/src/components/admin/contact/hydrographic-note/HydrographicNote";

export const metadata: Metadata = {
  title: "Hydrographic Note | BNHOC",
  description:
    "Submit hydrographic notes and observations to the Bangladesh Navy Hydrographic & Oceanographic Center.",
};

const HydrographicNotePage = () => {
  return <HydrographicNote />;
};

export default HydrographicNotePage;
