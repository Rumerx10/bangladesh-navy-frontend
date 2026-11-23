"use client";

import { openLoginModal } from "@/src/lib/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import Cookies from "js-cookie";
import { LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { ProfileDropdown } from "./ProfileDropdown";
import ProfileDropdownSkeleton from "./Skeleton/ProfileDropdownSkeleton";

/** The header's account control: a "Log in" button for visitors, the
 *  account menu once signed in. While a stored session's profile is still
 *  loading it shows a placeholder, so a signed-in visitor never sees "Log in"
 *  flash past. */
const HeaderAccount = ({ compact = false }: { compact?: boolean }) => {
  const dispatch = useAppDispatch();
  const { userInformation, loading } = useAppSelector((state) => state.auth);
  // Read after mount: the cookie isn't visible to the server render.
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const sync = () => setHasSession(Boolean(Cookies.get("accessToken")));
    sync();
    window.addEventListener("auth-token-updated", sync);
    return () => window.removeEventListener("auth-token-updated", sync);
  }, []);

  if (userInformation.id) return <ProfileDropdown compact={compact} />;

  if (loading || hasSession) return <ProfileDropdownSkeleton />;

  return (
    <button
      type="button"
      onClick={() => dispatch(openLoginModal())}
      className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-nav-hairline px-3 text-sm font-medium text-nav-ink transition-colors hover:bg-nav-wash focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
    >
      <LogIn size={16} />
      <span className={compact ? "sr-only" : undefined}>Log in</span>
    </button>
  );
};

export default HeaderAccount;
