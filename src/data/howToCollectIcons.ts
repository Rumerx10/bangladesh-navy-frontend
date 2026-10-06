import {
  Anchor,
  BadgeCheck,
  Banknote,
  BookOpen,
  Building2,
  CalendarDays,
  ClipboardList,
  Clock,
  CreditCard,
  Download,
  FileText,
  Globe,
  Info,
  Landmark,
  LayoutGrid,
  Mail,
  MapPin,
  MousePointerClick,
  PackageCheck,
  PhoneCall,
  Printer,
  Receipt,
  Search,
  Ship,
  ShieldCheck,
  ShoppingCart,
  Truck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * The `/how-to-collect` API stores `icon` as a free-text identifier (max 80
 * chars) and leaves rendering to the frontend. This registry is the single
 * source of truth for which identifiers are valid: the admin icon picker
 * offers exactly these, and the public page resolves them back to a
 * component. Identifiers are lucide kebab-case names so they stay readable
 * in the database and in API responses.
 */
export interface IStepIconOption {
  value: string;
  label: string;
  Icon: LucideIcon;
}

export const STEP_ICON_OPTIONS: IStepIconOption[] = [
  { value: "layout-grid", label: "Catalogue", Icon: LayoutGrid },
  { value: "search", label: "Search", Icon: Search },
  { value: "mouse-pointer-click", label: "Click", Icon: MousePointerClick },
  { value: "shopping-cart", label: "Cart", Icon: ShoppingCart },
  { value: "file-text", label: "Document", Icon: FileText },
  { value: "clipboard-list", label: "Form", Icon: ClipboardList },
  { value: "landmark", label: "Bank", Icon: Landmark },
  { value: "credit-card", label: "Card Payment", Icon: CreditCard },
  { value: "banknote", label: "Cash", Icon: Banknote },
  { value: "receipt", label: "Receipt", Icon: Receipt },
  { value: "phone-call", label: "Phone", Icon: PhoneCall },
  { value: "mail", label: "Email", Icon: Mail },
  { value: "map-pin", label: "Location", Icon: MapPin },
  { value: "building-2", label: "Office", Icon: Building2 },
  { value: "user-check", label: "Verification", Icon: UserCheck },
  { value: "shield-check", label: "Secure", Icon: ShieldCheck },
  { value: "badge-check", label: "Approved", Icon: BadgeCheck },
  { value: "package-check", label: "Packed", Icon: PackageCheck },
  { value: "truck", label: "Delivery", Icon: Truck },
  { value: "ship", label: "Ship", Icon: Ship },
  { value: "anchor", label: "Anchor", Icon: Anchor },
  { value: "clock", label: "Office Address", Icon: Clock },
  { value: "calendar-days", label: "Schedule", Icon: CalendarDays },
  { value: "download", label: "Download", Icon: Download },
  { value: "printer", label: "Print", Icon: Printer },
  { value: "book-open", label: "Publication", Icon: BookOpen },
  { value: "globe", label: "Website", Icon: Globe },
  { value: "info", label: "Information", Icon: Info },
];

const ICON_BY_VALUE = new Map(
  STEP_ICON_OPTIONS.map((option) => [option.value, option.Icon])
);

/** Falls back to a neutral info glyph so an unknown identifier coming back
 * from the API never breaks the page. */
export const getStepIcon = (icon?: string | null): LucideIcon =>
  (icon && ICON_BY_VALUE.get(icon)) || Info;
