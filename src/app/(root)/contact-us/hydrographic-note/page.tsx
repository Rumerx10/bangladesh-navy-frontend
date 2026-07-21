import { Metadata } from "next";
import HydrographicNote from "@/src/components/hydrographic-note/HydrographicNote";

export const metadata: Metadata = {
  title: "Hydrographic Note | BNHOC",
  description:
    "Submit hydrographic notes and observations to the Bangladesh Navy Hydrographic & Oceanographic Center.",
};

export default function HydrographicNotePage() {
  return <HydrographicNote />;
}
