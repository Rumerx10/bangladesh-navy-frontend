"use client";

import { navyCategories } from "@/src/data/navyCategories";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderTopBarActions from "./HeaderTopBarActions";
import Logo from "./Logo";
import MobileHeader from "./MobileHeader";

interface HeaderTopBarProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

interface NestedSubLink {
  label: string;
  link: string;
}

interface SubLink {
  label: string;
  link: string;
  subLinks?: NestedSubLink[];
}

interface NavItem {
  label: string;
  link: string;
  /** Render the trigger as a <Link> so clicking it navigates */
  asLink?: boolean;
  /** Extra path prefixes that count as active */
  activeMatches?: string[];
  subLinks?: SubLink[];
}

const NavigationData: NavItem[] = [
  { label: "Home", link: "/" },
  {
    label: "About Us",
    link: "/about",
    subLinks: [
      { label: "History", link: "/about/history" },
      { label: "Vision & Mission", link: "/about/vision-mission" },
      { label: "Organogram", link: "/about/organogram" },
      { label: "Survey Ships", link: "/about/survey-ships" },
      { label: "Gallery", link: "/about/gallery" },
    ],
  },
  {
    label: "Products & Services",
    link: "/product-service",
    asLink: true,
    activeMatches: ["/notices-mariners", "/how-to-pay"],
    subLinks: [
      ...navyCategories.map((cat) => ({
        label: cat.nameEn,
        link: `/product-service?category=${cat.slug}`,
      })),
      { label: "How to Pay", link: "/how-to-pay" },
    ],
  },
  {
    label: "Training and Courses",
    link: "/skill-development",
    subLinks: [
      { label: "BN Hydrographic Institute", link: "/skill-development" },
      { label: "Courses", link: "/skill-development/courses" },
    ],
  },
  {
    label: "Contact",
    link: "/contact-us",
    subLinks: [
      { label: "Contact Information", link: "/contact-us" },
      { label: "Query & Suggestion", link: "/contact-us/query-suggestion" },
    ],
  },
  {
    label: "Important Notice",
    link: "#",
    subLinks: [
      { label: "Hydrographic Notes", link: "/contact-us/query-suggestion" },

      {
        label: "Notices to Mariners",
        link: "#",
        subLinks: [
          {
            label: "Publications",
            link: "/product-service?category=publications",
          },
          {
            label: "Notices",
            link: "/product-service?category=notices-to-mariners",
          },
          {
            label: "Hydrographic Note",
            link: "/contact-us/hydrographic-note",
          },
        ],
      },
    ],
  },
];

const triggerBase =
  "inline-flex items-center gap-1.5 px-3 py-2 text-base font-medium rounded-md transition-colors cursor-pointer";
const triggerActive = "text-[#003f71] bg-[#003f71]/5";
const triggerIdle = "text-gray-700 hover:text-[#003f71] hover:bg-gray-50";

const subLinkBase = "rounded-md px-3 py-2.5 text-sm transition-colors";
const subLinkActive = "text-[#003f71] bg-[#003f71]/5 font-medium";
const subLinkIdle = "text-gray-700 hover:bg-gray-50 hover:text-[#003f71]";

export default function HeaderTopBar({
  menuOpen,
  setMenuOpen,
}: HeaderTopBarProps) {
  const cartItems = useAppSelector((state) => state.cart.items);
  const { userInformation, loading: authLoading } = useAppSelector(
    (state) => state.auth
  );
  const pathname = usePathname();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function isItemActive(item: NavItem) {
    if (item.link === "/") return pathname === "/";
    const paths = [item.link, ...(item.activeMatches ?? [])];
    return paths.some((p) => pathname?.startsWith(p));
  }

  return (
    <div className="bg-white border-b border-gray-100">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex container items-center justify-between gap-8 h-24 px-4 sm:px-0">
        <Logo />

        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-1 xl:gap-2">
            {NavigationData.map((item) => {
              const active = isItemActive(item);
              const triggerClass = `${triggerBase} ${active ? triggerActive : triggerIdle}`;

              if (!item.subLinks) {
                return (
                  <li key={item.label}>
                    <Link href={item.link} className={triggerClass}>
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const chevron = (
                <ChevronDown
                  size={14}
                  className="mt-px transition-transform group-hover:rotate-180 duration-200"
                />
              );

              return (
                <li key={item.label} className="relative group">
                  {item.asLink ? (
                    <Link href={item.link} className={triggerClass}>
                      {item.label}
                      {chevron}
                    </Link>
                  ) : (
                    <button type="button" className={triggerClass}>
                      {item.label}
                      {chevron}
                    </button>
                  )}

                  <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 rounded-xl border border-gray-200 bg-white shadow-xl group-hover:block">
                    <div className="flex flex-col gap-0.5 p-2 min-w-55">
                      {item.subLinks.map((sub) => {
                        if (sub.subLinks) {
                          return (
                            <div key={sub.label} className="relative group/sub">
                              <button
                                type="button"
                                className={`${subLinkBase} flex items-center justify-between w-full font-medium ${subLinkIdle} cursor-pointer`}
                              >
                                {sub.label}
                                <ChevronRight
                                  size={14}
                                  className="ml-2 text-gray-400"
                                />
                              </button>
                              <div className="absolute left-full top-0 z-50 hidden ml-1 min-w-50 rounded-xl border border-gray-200 bg-white p-2 shadow-xl group-hover/sub:block">
                                <div className="flex flex-col gap-0.5">
                                  {sub.subLinks.map((nested) => (
                                    <Link
                                      key={nested.label}
                                      href={nested.link}
                                      className={`${subLinkBase} ${subLinkIdle}`}
                                    >
                                      {nested.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={sub.label}
                            href={sub.link}
                            className={`${subLinkBase} ${pathname === sub.link ? subLinkActive : subLinkIdle}`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <HeaderTopBarActions
          cartCount={cartCount}
          userInformation={userInformation}
          authLoading={authLoading}
        />
      </div>

      {/* Mobile Header */}
      <MobileHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
}
