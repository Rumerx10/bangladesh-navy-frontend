import { NextRequest, NextResponse } from "next/server";
import { isAdminRole } from "@/src/utils/UserRoleEnum";

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    const decoded = Buffer.from(payload, "base64").toString("utf-8");
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

const AUTH_PAGE_PREFIXES = ["/auth/login", "/auth/signup"];
const CUSTOMER_ONLY_PREFIXES = [
  "/cart",
  "/checkout",
  "/orders",
  "/account/orders",
];

const matchesPrefix = (pathname: string, prefixes: string[]) =>
  prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const decoded = accessToken ? decodeJwtPayload(accessToken) : null;
  const role = (decoded?.role as string) ?? undefined;
  const isLoggedIn = Boolean(accessToken);
  const isAdmin = isAdminRole(role);

  // Admin panel: only ADMIN / SUPER_ADMIN may enter.
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Login / signup: already-authenticated users shouldn't see these.
  if (matchesPrefix(pathname, AUTH_PAGE_PREFIXES)) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(isAdmin ? "/admin" : "/", request.url)
      );
    }
    return NextResponse.next();
  }

  // Cart / checkout / orders: signed-in customers only (admins manage
  // orders from the admin panel, not the storefront).
  if (matchesPrefix(pathname, CUSTOMER_ONLY_PREFIXES)) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)"],
};
