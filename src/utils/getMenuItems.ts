import {
  AlertTriangle,
  BookOpen,
  GraduationCap,
  Home,
  Info,
  LayoutDashboard,
  Megaphone,
  Package,
  Phone,
  Users,
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
const getMenuItems = (): MenuItem[] => {
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
        { label: "Important Links", href: "/admin/home/important-links" },
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
      segment: "Content Management",
      label: "News & Events",
      icon: AlertTriangle,
      href: "/admin/news-events",
      children: [
        { label: "News and Events", href: "/admin/news-events" },
        {
          label: "Category Settings",
          href: "/admin/news-events/category",
        },
      ],
    },
    {
      segment: "Content Management",
      label: "Notices to Mariners",
      icon: Megaphone,
      href: "/admin/notices",
    },
    {
      segment: "Content Management",
      label: "Publications",
      icon: BookOpen,
      href: "/admin/publications",
    },
    {
      segment: "Training Management",
      label: "Training & Courses",
      icon: GraduationCap,
      href: "/admin/training-courses",
      children: [
        {
          label: "BN Hydrographic Institute",
          href: "/admin/training-courses",
        },
        { label: "Courses", href: "/admin/training-courses/courses" },
        { label: "Alumni", href: "/admin/training-courses/alumni" },
      ],
    },
    {
      segment: "Contact Management",
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
      segment: "Product Management",
      label: "Manage Product",
      icon: Package,
      href: "/admin/products",
      children: [
        { label: "All Products", href: "/admin/products" },
        { label: "Tidal Stations", href: "/admin/products/tidal-stations" },
      ],
    },
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
};

export default getMenuItems;
