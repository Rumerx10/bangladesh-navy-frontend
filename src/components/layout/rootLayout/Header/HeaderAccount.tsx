"use client";

import { openLoginModal } from "@/src/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { LogIn } from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";
import ProfileDropdownSkeleton from "./Skeleton/ProfileDropdownSkeleton";
import { useAccountStatus } from "./useAccountStatus";

/** The header's account control: a "Log in" button for visitors, the
 *  account menu once signed in. While a stored session's profile is still
 *  loading it shows a placeholder, so a signed-in visitor never sees "Log in"
 *  flash past. */
const HeaderAccount = ({ compact = false }: { compact?: boolean }) => {
  const dispatch = useAppDispatch();
  const status = useAccountStatus();

  if (status === "signed-in") return <ProfileDropdown compact={compact} />;

  if (status === "loading") return <ProfileDropdownSkeleton />;

  return (
    <button
      type="button"
      onClick={() => dispatch(openLoginModal())}
      className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-nav-hairline px-3 text-sm font-medium text-nav-ink transition-colors hover:bg-nav-wash focus-visible:ring-2 focus-visible:ring-nav-ink/60 focus-visible:outline-none"
    >
      <LogIn size={16} />
      <span className={compact ? "sr-only" : undefined}>Log in</span>
    </button>
  );
};

export default HeaderAccount;
