import Cookies from "js-cookie";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/** Store a new token pair and tell UserFetcher to re-sync. Used by login and
 *  by password change, which retires older refresh tokens and hands this
 *  session a fresh pair. */
export const storeAuthTokens = ({ accessToken, refreshToken }: AuthTokens) => {
  Cookies.set("accessToken", accessToken, { expires: 1 });
  Cookies.set("refreshToken", refreshToken, { expires: 2 });
  window.dispatchEvent(new Event("auth-token-updated"));
};
