import {
  Home,
  Layers,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Info,
  GraduationCap,
  Phone,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
  segment?: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  matchRoutes?: string[];
  children?: { label: string; href: string; matchRoutes?: string[] }[];
}
export function getMenuItems(): MenuItem[] {
  const menuItems: (MenuItem | false)[] = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    {
      segment: "Content Management",
      label: "Home",
      icon: Home,
      href: "/admin/hero-management",
      children: [
        { label: "Hero", href: "/admin/home/hero-management" },
        { label: "Notices", href: "/admin/home/notice-management" },
        { label: "Chief's Biography", href: "/admin/home/biography" },
        { label: "Partner Management", href: "/admin/home/partner" },
      ],
    },
    {
      segment: "Content Management",
      label: "About Us",
      icon: Info,
      href: "/admin/about",
      children: [
        { label: "History", href: "/admin/about-us/history" },
        { label: "Vision & Mission", href: "/admin/about-us/mission-vision" },
        { label: "Organogram", href: "/admin/about-us/organogram" },
        { label: "Survey Ships", href: "/admin/about-us/survey-ships" },
        { label: "Gallery", href: "/admin/about-us/gallery" },
      ],
    },
    {
      segment: "Training Management",
      label: "Training & Courses",
      icon: GraduationCap,
      href: "/admin/skill-development",
      children: [
        {
          label: "BN Hydrographic Institute",
          href: "/admin/skill-development",
        },
        { label: "Courses", href: "/admin/skill-development/courses" },
      ],
    },
    {
      segment: "Content Management",
      label: "Contact",
      icon: Phone,
      href: "/admin/contact-us",
      children: [
        { label: "Contact Information", href: "/admin/contact-us" },
        {
          label: "Query & Suggestion",
          href: "/admin/contact-us/query-suggestion",
        },
        {
          label: "Hydrographic Note",
          href: "/admin/contact-us/hydrographic-note",
        },
      ],
    },
    {
      segment: "Content Management",
      label: "News & Events",
      icon: AlertTriangle,
      href: "/admin/notices",
    },
    // {
    //   segment: "Product Management",
    //   label: "Manage Product",
    //   icon: Package,
    //   children: [
    //     { label: "All Products", href: "/admin/products" },
    //     { label: "How to Collect", href: "/admin/how-to-collect" },
    //     { label: "Category Management", href: "/admin/category" },
    //   ],
    // },
    // {
    //   segment: "Order Management",
    //   label: "Orders",
    //   icon: ShoppingCart,
    //   children: [{ label: "All Orders", href: "/admin/orders" }],
    // },
    {
      segment: "User Management",
      label: "Users",
      icon: Users,
      href: "/admin/users",
    },
    // {
    //   label: "Admin",
    //   icon: Settings,
    //   href: "/admin/admin",
    // },
  ];

  return menuItems.filter(Boolean) as MenuItem[];
}
