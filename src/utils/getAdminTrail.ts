import getMenuItems from "./getMenuItems";

export interface AdminCrumb {
  label: string;
  /** Absent for menu groups, which have no page of their own. */
  href?: string;
}

interface AdminRoute {
  href: string;
  crumbs: AdminCrumb[];
}

// Record ids, numeric ids and UUIDs tell a reader nothing, so they're dropped.
const ID_SEGMENT = /^(?:[0-9a-f]{24}|[0-9a-f]{8}-[0-9a-f-]{27}|\d+)$/i;

const humanize = (segment: string) => {
  let text = segment;
  try {
    text = decodeURIComponent(segment);
  } catch {
    // A malformed escape is still readable as-is.
  }
  text = text.replace(/[-_]+/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/** Where an admin path sits, named the way the sidebar names it — e.g.
 *  `/admin/news-events/category` → News & Events › Category Settings.
 *  Anything past the deepest menu route (`create`, `edit`) is appended as a
 *  readable crumb, and routes the menu doesn't list fall back to their URL
 *  segments. */
const getAdminTrail = (pathname: string): AdminCrumb[] => {
  const path = pathname.replace(/\/+$/, "");
  if (path === "/admin") return [{ label: "Dashboard", href: "/admin" }];

  const routes = getMenuItems().flatMap((item): AdminRoute[] => {
    if (item.children) {
      return item.children.map((child) => ({
        href: child.href,
        crumbs: [
          { label: item.label },
          { label: child.label, href: child.href },
        ],
      }));
    }
    if (item.href && item.href !== "/admin") {
      return [
        { href: item.href, crumbs: [{ label: item.label, href: item.href }] },
      ];
    }
    return [];
  });

  const match = routes
    .filter(({ href }) => path === href || path.startsWith(`${href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];

  const rest = path
    .slice((match?.href ?? "/admin").length)
    .split("/")
    .filter((segment) => segment && !ID_SEGMENT.test(segment))
    .map((segment) => ({ label: humanize(segment) }));

  return [...(match?.crumbs ?? []), ...rest];
};

export default getAdminTrail;
