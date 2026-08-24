import { Metadata } from "next";
import NoticesToMariners from "@/src/components/notices/NoticesToMariners";

export const metadata: Metadata = {
  title: "Notices to Mariners | BNHOC",
  description:
    "Permanent, temporary, preliminary and gun fire notices to mariners issued by the Bangladesh Navy Hydrographic & Oceanographic Centre.",
};

const NoticesToMarinersPage = () => {
  return <NoticesToMariners />;
};

export default NoticesToMarinersPage;
