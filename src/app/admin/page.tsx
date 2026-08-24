import { Metadata } from "next";
import Link from "next/link";
import {
  Package,
  Home,
  Info,
  Newspaper,
  GraduationCap,
  Phone,
  Users,
  ArrowRight,
  Compass,
  type LucideIcon,
} from "lucide-react";

interface QuickLink {
  title: string;
  desc: string;
  href: string;
  icon: LucideIcon;
}

const quickLinks: QuickLink[] = [
  {
    title: "Product Management",
    desc: "Manage nautical charts, products and categories.",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Home Content",
    desc: "Hero banners, notices and chief's biography.",
    href: "/admin/home/hero-management",
    icon: Home,
  },
  {
    title: "About Us",
    desc: "History, vision & mission, survey ships and gallery.",
    href: "/admin/about-us/history",
    icon: Info,
  },
  {
    title: "News & Events",
    desc: "Publish announcements and manage categories.",
    href: "/admin/news-events",
    icon: Newspaper,
  },
  {
    title: "Training & Courses",
    desc: "BN Hydrographic Institute courses and programs.",
    href: "/admin/training-courses",
    icon: GraduationCap,
  },
  {
    title: "Contact Management",
    desc: "Contact info, queries and hydrographic notes.",
    href: "/admin/contact-us",
    icon: Phone,
  },
  {
    title: "User Management",
    desc: "View and manage registered users.",
    href: "/admin/users",
    icon: Users,
  },
];

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview and quick access to all admin management areas.",
};

const AdminDashboardPage = () => {
  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-pBlue via-secondary to-liteBlue px-6 py-10 text-white shadow-lg sm:px-10 sm:py-12">
        <Compass
          className="pointer-events-none absolute -top-8 -right-8 h-52 w-52 text-white/10"
          strokeWidth={1}
        />
        <div className="relative max-w-2xl">
          <p className="text-xs font-semibold tracking-widest text-white/70 uppercase sm:text-sm">
            Bangladesh Navy Hydrographic &amp; Oceanographic Centre
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
            Admin Control Panel
          </h1>
          <p className="mt-3 text-sm text-white/80 sm:text-base">
            Manage products, content, news and users for the BNHOC platform —
            everything you need, in one place.
          </p>
        </div>
      </div>

      {/* Quick access */}
      <div>
        <h2 className="text-xl font-bold text-pBlue lg:text-2xl">
          Quick Access
        </h2>
        <p className="mt-1 text-sm text-secondary-gray lg:text-base">
          Jump straight into what you manage most.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {quickLinks.map(({ title, desc, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex flex-col gap-3 rounded-xl border border-light-silver bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-dark">{title}</h3>
                <p className="mt-1 text-sm text-secondary-gray">{desc}</p>
              </div>
              <ArrowRight className="absolute top-5 right-5 h-4 w-4 text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
