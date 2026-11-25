"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

/** The way out of a full-page auth screen on phones, where there's no header
 *  or banner. Goes back to the previous page, or home when there is none
 *  (the page was opened straight from a link). */
const AuthCloseButton = () => {
  const router = useRouter();

  const handleClose = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleClose}
      aria-label="Close"
      className="md:hidden absolute top-4 right-4 z-10 grid size-10 cursor-pointer place-items-center rounded-full border border-border bg-card text-secondary-foreground shadow-sm transition-colors hover:bg-light hover:text-foreground"
    >
      <X size={18} />
    </button>
  );
};

export default AuthCloseButton;
