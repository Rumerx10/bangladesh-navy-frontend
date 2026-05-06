"use client";

import { navyCategories } from "@/src/data/navyCategories";
import { logoutUser } from "@/src/lib/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import {
  ChevronDown,
  ChevronRight,
  Home,
  LayoutGrid,
  LogOut,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const aboutLinks = [
  { label: "History", href: "/about/history" },
  { label: "Vision & Mission", href: "/about/vision-mission" },
  { label: "Organization", href: "/about/organization" },
  { label: "Survey Ships", href: "/about/survey-ships" },
  { label: "Gallery", href: "/about/gallery" },
];

interface MobileNavProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function MobileNav({ open, setOpen }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { userInformation } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!userInformation?.firstName;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [productsOpen, setProductsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      {/* Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around h-14">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[60px] py-1 ${
              pathname === "/" ? "text-[#003f71]" : "text-gray-500"
            }`}
          >
            <Home size={22} strokeWidth={pathname === "/" ? 2.5 : 1.5} />
            <span className="text-[10px] font-medium">Home</span>
          </Link>

          <button
            onClick={() => setOpen(true)}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[60px] py-1 ${
              open ? "text-[#003f71]" : "text-gray-500"
            }`}
          >
            <LayoutGrid size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">Menu</span>
          </button>

          <Link
            href="/cart"
            className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[60px] py-1 ${
              pathname === "/cart" ? "text-[#003f71]" : "text-gray-500"
            }`}
          >
            <ShoppingCart size={22} strokeWidth={pathname === "/cart" ? 2.5 : 1.5} />
            <span className="text-[10px] font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-2 min-w-4 h-4 flex items-center justify-center rounded-full bg-[#003f71] text-white text-[9px] font-bold px-0.5">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[60px] py-1 ${
              pathname?.startsWith("/account") ? "text-[#003f71]" : "text-gray-500"
            }`}
          >
            {isLoggedIn && userInformation.profilePicture ? (
              <Image
                src={userInformation.profilePicture}
                alt={userInformation.firstName}
                width={24}
                height={24}
                className={`w-6 h-6 rounded-full object-cover ${
                  pathname?.startsWith("/account") ? "ring-2 ring-[#003f71]" : "ring-1 ring-gray-200"
                }`}
              />
            ) : (
              <User size={22} strokeWidth={pathname?.startsWith("/account") ? 2.5 : 1.5} />
            )}
            <span className="text-[10px] font-medium">
              {isLoggedIn ? userInformation.firstName : "Account"}
            </span>
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-60" onClick={() => setOpen(false)} />
      )}

      {/* Close Button */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed z-80 top-3 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-gray-200"
          style={{ left: "calc(min(320px, 85vw) + 8px)" }}
          aria-label="Close menu"
        >
          <X size={18} className="text-gray-600" />
        </button>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-70 h-screen w-80 max-w-[85vw] bg-white transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-0.5">
          {/* Home */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`py-2.5 px-3 rounded-md text-sm font-medium ${
              pathname === "/" ? "text-[#003f71] bg-[#003f71]/5" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Home
          </Link>

          {/* Products & Services */}
          <div>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex items-center justify-between w-full py-2.5 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Products & Services
              {productsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {productsOpen && (
              <div className="ml-3 pl-3 border-l border-gray-100 flex flex-col gap-0.5">
                {navyCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/product-service?category=${cat.slug}`}
                    onClick={() => setOpen(false)}
                    className="py-2 px-3 text-sm text-gray-600 hover:text-[#003f71] rounded-md hover:bg-gray-50"
                  >
                    {cat.nameEn}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About Us */}
          <div>
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              className="flex items-center justify-between w-full py-2.5 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              About Us
              {aboutOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {aboutOpen && (
              <div className="ml-3 pl-3 border-l border-gray-100 flex flex-col gap-0.5">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="py-2 px-3 text-sm text-gray-600 hover:text-[#003f71] rounded-md hover:bg-gray-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other Links */}
          <Link
            href="/skill-development"
            onClick={() => setOpen(false)}
            className={`py-2.5 px-3 rounded-md text-sm font-medium ${
              pathname.startsWith("/skill-development")
                ? "text-[#003f71] bg-[#003f71]/5"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Skill Development
          </Link>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="py-2.5 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Contact
          </Link>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {userInformation.profilePicture ? (
                <Image
                  src={userInformation.profilePicture}
                  alt={userInformation.firstName}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#003f71]/20"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#003f71]/10 flex items-center justify-center">
                  <User size={16} className="text-[#003f71]" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {userInformation.firstName} {userInformation.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{userInformation.email}</p>
              </div>
              <button
                onClick={() => {
                  dispatch(logoutUser());
                  setOpen(false);
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                router.push("/auth/login");
              }}
              className="w-full bg-[#003f71] text-white text-center rounded-md py-2.5 font-medium text-sm"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </>
  );
}
