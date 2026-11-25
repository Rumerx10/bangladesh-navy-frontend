import {
  BookOpenIcon,
  Building2Icon,
  FileTextIcon,
  GraduationCapIcon,
  HistoryIcon,
  ImagesIcon,
  LayoutGridIcon,
  MapIcon,
  MegaphoneIcon,
  MessageSquareIcon,
  MonitorIcon,
  NetworkIcon,
  NewspaperIcon,
  NotebookPenIcon,
  PackageCheckIcon,
  PhoneIcon,
  QuoteIcon,
  ShipIcon,
  TargetIcon,
  UsersIcon,
  WavesIcon,
  type LucideIcon,
} from "lucide-react";
import { navyCategories } from "@/src/data/navigationItems";

interface LinkMeta {
  icon: LucideIcon;
  description: string;
}

const categoryDescription = (slug: string) =>
  navyCategories.find((category) => category.slug === slug)?.description ?? "";

/** Icon and one-line description per nav link, for the menus that show them. */
const LINK_META: Record<string, LinkMeta> = {
  "/about/chief-hydrographer-message": {
    icon: QuoteIcon,
    description: "A message from the Chief Hydrographer",
  },
  "/about/history": {
    icon: HistoryIcon,
    description: "How the centre began and grew",
  },
  "/about/vision-mission": {
    icon: TargetIcon,
    description: "What the centre works towards",
  },
  "/about/organogram": {
    icon: NetworkIcon,
    description: "How the centre is organised",
  },
  "/about/survey-ships": {
    icon: ShipIcon,
    description: "The ships that carry out our surveys",
  },
  "/about/news": {
    icon: NewspaperIcon,
    description: "Latest news and events",
  },
  "/about/gallery": {
    icon: ImagesIcon,
    description: "Photos from surveys and events",
  },
  "/product-service": {
    icon: LayoutGridIcon,
    description: "Every chart and publication",
  },
  "/product-service/paper-charts": {
    icon: MapIcon,
    description: categoryDescription("paper-charts"),
  },
  "/product-service/electronic-navigational-charts": {
    icon: MonitorIcon,
    description: categoryDescription("electronic-navigational-charts"),
  },
  "/product-service/tide-tables": {
    icon: WavesIcon,
    description: categoryDescription("tide-tables"),
  },
  "/how-to-collect": {
    icon: PackageCheckIcon,
    description: "Ordering and collecting products",
  },
  "/important-notice/notices": {
    icon: MegaphoneIcon,
    description: "Latest navigational notices",
  },
  "/important-notice/publications": {
    icon: BookOpenIcon,
    description: "Nautical publications",
  },
  "/important-notice/hydrographic-note": {
    icon: NotebookPenIcon,
    description: "Hydrographic notes for mariners",
  },
  "/training-courses": {
    icon: Building2Icon,
    description: "The BN Hydrographic Institute",
  },
  "/training-courses/courses": {
    icon: GraduationCapIcon,
    description: "Courses the institute runs",
  },
  "/training-courses/alumni": {
    icon: UsersIcon,
    description: "Graduates of the institute",
  },
  "/contact-us": {
    icon: PhoneIcon,
    description: "Phone, email and address",
  },
  "/contact-us/query-suggestion": {
    icon: MessageSquareIcon,
    description: "Ask a question or send feedback",
  },
};

export const getLinkMeta = (href: string): LinkMeta =>
  LINK_META[href] ?? { icon: FileTextIcon, description: "" };
