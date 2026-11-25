"use client";

import { useAppSelector } from "@/src/lib/redux/hooks";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export type AccountStatus = "signed-in" | "loading" | "visitor";

/** Whether the header should show the account menu, a placeholder, or the
 *  log-in controls. A stored session counts as "loading" until its profile
 *  arrives, so a signed-in visitor never sees "Log in" flash past. */
export function useAccountStatus(): AccountStatus {
  const { userInformation, loading } = useAppSelector((state) => state.auth);
  // Read after mount: the cookie isn't visible to the server render.
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const sync = () => setHasSession(Boolean(Cookies.get("accessToken")));
    sync();
    window.addEventListener("auth-token-updated", sync);
    return () => window.removeEventListener("auth-token-updated", sync);
  }, []);

  if (userInformation.id) return "signed-in";
  if (loading || hasSession) return "loading";
  return "visitor";
}
