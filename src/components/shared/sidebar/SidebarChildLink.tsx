import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface SidebarChildLinkProps {
  label: string;
  href: string;
  isActive: boolean;
  onNavigate: () => void;
  /** Rendered at the right edge, e.g. a notification count. */
  badge?: ReactNode;
}

const SidebarChildLink = ({
  label,
  href,
  isActive,
  onNavigate,
  badge,
}: SidebarChildLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center mt-1 h-10 px-3 rounded-sm text-sm transition-colors",
        isActive
          ? "text-primary font-medium bg-[#EAF6FB]"
          : "text-secondary-foreground hover:text-primary hover:bg-[#EAF6FB]"
      )}
    >
      <span className="truncate">{label}</span>
      {badge}
    </Link>
  );
};

export default SidebarChildLink;
