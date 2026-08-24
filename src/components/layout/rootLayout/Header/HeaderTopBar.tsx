"use client";
import Logo from "./Logo";
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/src/lib/redux/hooks";
import HeaderTopBarActions from "./HeaderTopBarActions";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavItem, NavigationItems, SubLink } from "@/src/data/navigationItems";
import { useEffect, useRef, useState } from "react";

interface HeaderTopBarProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

// Primary items always shown in the main nav row
const PRIMARY_LABELS = ["Home", "About Us", "Nautical Products"];
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

const HeaderTopBar = ({ menuOpen, setMenuOpen }: HeaderTopBarProps) => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const { userInformation, loading: authLoading } = useAppSelector(
    (state) => state.auth
  );
  const pathname = usePathname();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Click/tap-driven dropdown state — hover-only (`group-hover`) dropdowns
  // never open on touch devices, which is the norm at the narrower widths
  // where the nav collapses into "More". Track the open trigger explicitly
  // so every dropdown works the same way regardless of input method.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const closeMenus = () => {
    setOpenMenu(null);
    setOpenSubMenu(null);
  };

  const toggleMenu = (label: string) => {
    setOpenSubMenu(null);
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  // Close on outside click/tap and on Escape
  useEffect(() => {
    if (!openMenu) return;

    function handlePointerDown(e: MouseEvent | TouchEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMenus();
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenus();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  function isItemActive(item: NavItem) {
    if (item.link === "/") return pathname === "/";
    if (item.link === "#") return false;
    const paths = [item.link, ...(item.activeMatches ?? [])];
    return paths.some((p) => pathname?.startsWith(p));
  }

  function renderSubLinks(subLinks: SubLink[]) {
    return subLinks.map((sub) => {
      if (sub.subLinks) {
        const isSubOpen = openSubMenu === sub.label;
        return (
          <div key={sub.label} className="relative">
            <button
              type="button"
              aria-expanded={isSubOpen}
              onClick={() =>
                setOpenSubMenu((prev) =>
                  prev === sub.label ? null : sub.label
                )
              }
              className={`${subLinkBase} flex items-center justify-between w-full ${subLinkIdle} cursor-pointer`}
            >
              {sub.label}
              <ChevronRight
                size={14}
                className={`ml-2 text-gray-400 shrink-0 transition-transform duration-200 ${isSubOpen ? "rotate-90" : ""}`}
              />
            </button>
            <div
              className={`absolute left-full top-0 z-50 ml-1 min-w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-xl ${isSubOpen ? "block" : "hidden"}`}
            >
              <div className="flex flex-col gap-0.5">
                {sub.subLinks.map((nested) => (
                  <Link
                    key={nested.label}
                    href={nested.link}
                    onClick={closeMenus}
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
          onClick={closeMenus}
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

    const isOpen = openMenu === item.label;
    const chevron = (
      <ChevronDown
        size={14}
        className={`mt-px transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
      />
    );

    return (
      <li key={item.label} className={`relative ${extraLiClass ?? ""}`.trim()}>
        {item.asLink ? (
          <Link
            href={item.link}
            className={triggerClass}
            aria-expanded={isOpen}
            onClick={(e) => {
              // First tap reveals the dropdown instead of navigating away —
              // a second tap (menu already open) lets the label link through.
              if (!isOpen) {
                e.preventDefault();
                toggleMenu(item.label);
              } else {
                closeMenus();
              }
            }}
          >
            {item.label}
            {chevron}
          </Link>
        ) : (
          <button
            type="button"
            className={triggerClass}
            aria-expanded={isOpen}
            onClick={() => toggleMenu(item.label)}
          >
            {item.label}
            {chevron}
          </button>
        )}

        <div
          className={`absolute left-1/2 top-full z-50 -translate-x-1/2 rounded-xl border border-gray-200 bg-white shadow-xl ${isOpen ? "block" : "hidden"}`}
        >
          <div className="flex flex-col gap-0.5 p-2 min-w-52 whitespace-nowrap">
            {renderSubLinks(item.subLinks)}
          </div>
        </div>
      </li>
    );
  }

  return (
    <div className="bg-white border-b border-gray-100 lg:px-4">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex container items-center justify-between gap-4 h-24 px-4 sm:px-0">
        <Logo />

        <nav ref={navRef} className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-0.5">
            {/* Primary items — always visible */}
            {primaryItems.map((item) => renderNavItem(item))}

            {/* "Others" mega-dropdown — visible below 1800 px */}
            <li className="relative min-[1800px]:hidden">
              <button
                type="button"
                aria-expanded={openMenu === "More"}
                onClick={() => toggleMenu("More")}
                className={`${triggerBase} ${triggerIdle}`}
              >
                More
                <ChevronDown
                  size={14}
                  className={`mt-px transition-transform duration-200 shrink-0 ${openMenu === "More" ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute left-1/2 top-full z-50 -translate-x-1/2 rounded-xl border border-gray-200 bg-white shadow-xl ${openMenu === "More" ? "block" : "hidden"}`}
              >
                <div className="flex flex-col p-3 gap-1">
                  {othersItems.map((section, i) => (
                    <div
                      key={section.label}
                      className={`min-w-44 px-2 ${
                        i < othersItems.length - 1
                          ? "border-b border-gray-100 pb-2"
                          : ""
                      }`}
                    >
                      {section.link !== "#" ? (
                        <Link
                          href={section.link}
                          onClick={closeMenus}
                          className="whitespace-nowrap block text-xs font-semibold text-pBlue uppercase tracking-wider mb-2 px-1 hover:text-liteBlue transition-colors"
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
                            const subKey = `${section.label}__${sub.label}`;
                            const isSubOpen = openSubMenu === subKey;
                            return (
                              <div key={sub.label} className="relative">
                                <button
                                  type="button"
                                  aria-expanded={isSubOpen}
                                  onClick={() =>
                                    setOpenSubMenu((prev) =>
                                      prev === subKey ? null : subKey
                                    )
                                  }
                                  className={`${subLinkBase} flex items-center justify-between w-full ${subLinkIdle} cursor-pointer`}
                                >
                                  {sub.label}
                                  <ChevronRight
                                    size={13}
                                    className={`ml-1 text-gray-400 shrink-0 transition-transform duration-200 ${isSubOpen ? "rotate-90" : ""}`}
                                  />
                                </button>
                                <div
                                  className={`absolute left-full top-0 z-50 ml-1 min-w-44 rounded-xl border border-gray-200 bg-white p-2 shadow-xl ${isSubOpen ? "block" : "hidden"}`}
                                >
                                  <div className="flex flex-col gap-0.5">
                                    {sub.subLinks.map((nested) => (
                                      <Link
                                        key={nested.label}
                                        href={nested.link}
                                        onClick={closeMenus}
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
                              onClick={closeMenus}
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
};

export default HeaderTopBar;
