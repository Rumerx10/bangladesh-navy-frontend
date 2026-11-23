import { useSearchParams } from "next/navigation";

/** The `?redirect=` of the current auth page, ready to append to a link to
 *  the other auth page — so someone sent to log in from checkout who signs up
 *  instead still ends up back at checkout. Only same-site paths are passed
 *  on. Needs a Suspense boundary above it (useSearchParams). */
export const useRedirectQuery = () => {
  const redirect = useSearchParams().get("redirect");
  const isSafe =
    !!redirect && redirect.startsWith("/") && !redirect.startsWith("//");
  return isSafe ? `?redirect=${encodeURIComponent(redirect)}` : "";
};
