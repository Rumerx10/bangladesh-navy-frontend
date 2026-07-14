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

export interface NestedSubLink {
  label: string;
  link: string;
}

export interface SubLink {
  label: string;
  link: string;
  subLinks?: NestedSubLink[];
}

export interface NavItem {
  label: string;
  link: string;
  asLink?: boolean;
  activeMatches?: string[];
  subLinks?: SubLink[];
}

export const NavigationItems: NavItem[] = [
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
    activeMatches: ["/notices-mariners", "/how-to-collect"],
    subLinks: [
      ...navyCategories.map((cat) => ({
        label: cat.nameEn,
        link: `/product-service?category=${cat.slug}`,
      })),
      { label: "How to Collect", link: "/how-to-collect" },
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

// Primary items always shown in the main nav row
const PRIMARY_LABELS = ["Home", "About Us", "Products & Services"];
// Items collapsed into "Others" below 1800 px
const OTHERS_LABELS = ["Training and Courses", "Contact", "Important Notice"];

const primaryItems = NavigationItems.filter((item) =>
  PRIMARY_LABELS.includes(item.label)
);
const othersItems = NavigationItems.filter((item) =>
  OTHERS_LABELS.includes(item.label)
);

const triggerBase =
  "inline-flex items-center gap-1 px-2.5 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap";
const triggerActive = "text-liteBlue bg-liteBlue/5";
const triggerIdle = "text-gray-700 hover:text-liteBlue hover:bg-gray-50";

const subLinkBase = "block rounded-md px-3 py-2.5 text-sm transition-colors";
const subLinkActive = "text-liteBlue bg-liteBlue/5 font-medium";
const subLinkIdle = "text-gray-700 hover:bg-gray-50 hover:text-liteBlue";

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
    if (item.link === "#") return false;
    const paths = [item.link, ...(item.activeMatches ?? [])];
    return paths.some((p) => pathname?.startsWith(p));
  }

  function renderSubLinks(subLinks: SubLink[]) {
    return subLinks.map((sub) => {
      if (sub.subLinks) {
        return (
          <div key={sub.label} className="relative group/sub">
            <button
              type="button"
              className={`${subLinkBase} flex items-center justify-between w-full ${subLinkIdle} cursor-pointer`}
            >
              {sub.label}
              <ChevronRight size={14} className="ml-2 text-gray-400 shrink-0" />
            </button>
            <div className="absolute left-full top-0 z-50 hidden ml-1 min-w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-xl group-hover/sub:block">
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
    });
  }

  function renderNavItem(item: NavItem, extraLiClass?: string) {
    const active = isItemActive(item);
    const triggerClass = `${triggerBase} ${active ? triggerActive : triggerIdle}`;

    if (!item.subLinks) {
      return (
        <li key={item.label} className={extraLiClass ?? ""}>
          <Link href={item.link} className={triggerClass}>
            {item.label}
          </Link>
        </li>
      );
    }

    const chevron = (
      <ChevronDown
        size={14}
        className="mt-px transition-transform group-hover:rotate-180 duration-200 shrink-0"
      />
    );

    return (
      <li
        key={item.label}
        className={`relative group ${extraLiClass ?? ""}`.trim()}
      >
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
          <div className="flex flex-col gap-0.5 p-2 min-w-52">
            {renderSubLinks(item.subLinks)}
          </div>
        </div>
      </li>
    );
  }

  return (
    <div className="bg-white border-b border-gray-100">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex container items-center justify-between gap-4 h-24 px-4 sm:px-0">
        <Logo />

        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-0.5">
            {/* Primary items — always visible */}
            {primaryItems.map((item) => renderNavItem(item))}

            {/* "Others" mega-dropdown — visible below 1800 px */}
            <li className="relative group min-[1800px]:hidden">
              <button type="button" className={`${triggerBase} ${triggerIdle}`}>
                Others
                <ChevronDown
                  size={14}
                  className="mt-px transition-transform group-hover:rotate-180 duration-200 shrink-0"
                />
              </button>

              <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 rounded-xl border border-gray-200 bg-white shadow-xl group-hover:block">
                <div className="flex p-3 gap-1">
                  {othersItems.map((section, i) => (
                    <div
                      key={section.label}
                      className={`min-w-44 px-2 ${
                        i < othersItems.length - 1
                          ? "border-r border-gray-100 pr-4"
                          : ""
                      }`}
                    >
                      {section.link !== "#" ? (
                        <Link
                          href={section.link}
                          className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1 hover:text-liteBlue transition-colors"
                        >
                          {section.label}
                        </Link>
                      ) : (
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
                          {section.label}
                        </p>
                      )}
                      <div className="flex flex-col gap-0.5">
                        {section.subLinks?.map((sub) => {
                          if (sub.subLinks) {
                            return (
                              <div
                                key={sub.label}
                                className="relative group/othersub"
                              >
                                <button
                                  type="button"
                                  className={`${subLinkBase} flex items-center justify-between w-full ${subLinkIdle} cursor-pointer`}
                                >
                                  {sub.label}
                                  <ChevronRight
                                    size={13}
                                    className="ml-1 text-gray-400 shrink-0"
                                  />
                                </button>
                                <div className="absolute left-full top-0 z-50 hidden ml-1 min-w-44 rounded-xl border border-gray-200 bg-white p-2 shadow-xl group-hover/othersub:block">
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
                              className={`${subLinkBase} ${
                                pathname === sub.link
                                  ? subLinkActive
                                  : subLinkIdle
                              }`}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            {/* Individual "others" items — only shown at 1800 px+ */}
            {othersItems.map((item) =>
              renderNavItem(item, "hidden min-[1800px]:block")
            )}
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
