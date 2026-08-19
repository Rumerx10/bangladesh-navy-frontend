import { Metadata } from "next";
import AlumniDirectory from "@/src/components/alumni/AlumniDirectory";

export const metadata: Metadata = {
  title: "Alumni | BNHOC",
  description:
    "Officers trained at the Bangladesh Navy Hydrographic & Oceanographic Centre, listed batch by batch with rank, personal number and parent organization.",
};

export default function AlumniPage() {
  return <AlumniDirectory />;
}
