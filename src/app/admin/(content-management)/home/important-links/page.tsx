import { Metadata } from "next";
import ImportantLinksManagement from "@/src/components/admin/ContentManagement/home/important-links/ImportantLinksManagement";

export const metadata: Metadata = {
  title: "Important Links",
  description: "Manage important links shown on the homepage.",
};

const ImportantLinksPage = () => {
  return <ImportantLinksManagement />;
};

export default ImportantLinksPage;
