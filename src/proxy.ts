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

  // The cookie outlives the JWT inside it — the cookie is kept for a day while
  // the token expires in an hour — so presence alone is not a session. Treating
  // it as one locked people out: an expired token still redirected /auth/login
  // to /admin, where every API call 401'd, leaving no way back to the sign-in
  // form.
  const expiresAt =
    typeof decoded?.exp === "number" ? decoded.exp * 1000 : undefined;
  const isExpired = expiresAt !== undefined && expiresAt <= Date.now();

  // An expired access token still counts while a refreshToken survives: the
  // axios interceptor trades it for a fresh one on the first API call. The
  // refresh cookie is the shorter-lived of the two (2 days against the refresh
  // token's 7), so if it is present it is still good.
  const canRefresh = Boolean(request.cookies.get("refreshToken")?.value);
  const isLoggedIn = Boolean(accessToken) && (!isExpired || canRefresh);
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
