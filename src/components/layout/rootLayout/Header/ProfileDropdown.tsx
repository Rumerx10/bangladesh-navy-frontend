"use client";

import { logoutUser } from "@/src/lib/redux/features/auth/authSlice";
import { selectCanAccessAdmin } from "@/src/lib/redux/features/permission/permissionSelectors";
import { clearRolePermissions } from "@/src/lib/redux/features/permission/permissionSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import { cn } from "@/src/lib/utils";
import { ChevronDown, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import {
  adminMenuItems,
  userMenuItems,
} from "../../../../utils/profileMenuItems";

/** Profile photo, or the first initial when there isn't one. Painted in nav
 *  ink for the header band; pass `className` to recolour it elsewhere. */
export const Avatar = ({
  src,
  name,
  size,
  className,
}: {
  src: string | null;
  name: string;
  size: number;
  className?: string;
}) =>
  src ? (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={cn(
        "shrink-0 rounded-full object-cover ring-2 ring-nav-ink/25",
        className
      )}
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-nav-ink/15 text-sm font-semibold text-nav-ink uppercase",
        className
      )}
      style={{ width: size, height: size }}
    >
      {name.trim().charAt(0) || <User size={16} />}
    </span>
  );

/** The signed-in visitor's account menu: their pages (or, for admins, the
 *  admin shortcuts), their name, and log out. Shared by the header dropdown
 *  and the mobile nav drawer. */
export const useAccountMenu = () => {
  const dispatch = useAppDispatch();
  const { userInformation } = useAppSelector((state) => state.auth);
  const isAdmin = useAppSelector(selectCanAccessAdmin);
  const fullName = [userInformation.firstName, userInformation.lastName]
    .filter(Boolean)
    .join(" ");

  return {
    userInformation,
    fullName,
    menuItems: isAdmin ? adminMenuItems : userMenuItems,
    logout: () => {
      dispatch(clearRolePermissions());
      dispatch(logoutUser());
    },
  };
};

/** Account menu for a signed-in visitor: their pages (orders, addresses,
 *  password…) or, for admins, the admin shortcuts — and log out. */
export const ProfileDropdown = ({ compact = false }: { compact?: boolean }) => {
  const {
    userInformation,
    fullName,
    menuItems,
    logout: handleLogout,
  } = useAccountMenu();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open account menu"
          className="flex h-9 cursor-pointer items-center gap-2 rounded-full bg-nav-wash pr-2 pl-0.5 text-nav-ink transition-colors hover:bg-nav-wash-strong focus-visible:ring-2 focus-visible:ring-nav-ink/60 focus-visible:outline-none aria-expanded:bg-nav-wash-strong"
        >
          <Avatar
            src={userInformation.profilePicture}
            name={userInformation.firstName}
            size={32}
          />
          {!compact && (
            <span className="hidden max-w-28 truncate text-sm font-medium xl:block">
              {userInformation.firstName || "Account"}
            </span>
          )}
          <ChevronDown size={14} className="opacity-70" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-9999 w-64 overflow-hidden rounded-xl border border-border bg-card p-0 shadow-xl"
      >
        <DropdownMenuLabel className="bg-light/80 px-4 py-3">
          <p className="truncate text-sm font-semibold text-foreground">
            {fullName || "My account"}
          </p>
          <p className="truncate text-xs font-normal text-secondary-foreground">
            {userInformation.email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="m-0" />

        <div className="py-1">
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-secondary-foreground transition-colors hover:bg-primary/5 hover:text-primary"
              >
                <item.icon size={16} className="shrink-0" />
                <span className="text-sm">{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator className="m-0" />

        <div className="py-1">
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
          >
            <LogOut size={16} className="shrink-0" />
            <span className="text-sm font-medium">Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
