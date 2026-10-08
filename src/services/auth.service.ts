import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { removeAuthCookies } from "../actions/cookiesAction";
import { getBaseUrl } from "../config/envConfig";
import { authKey } from "../constants/auth/storageKey";
import { getFromLocalStorage, setToLocalStorage } from "../utils/local-storage";
import { decodedToken } from "./jwt";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  // console.log(authToken);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export async function logout() {
  // Remove all auth cookies (httpOnly + regular) via server action. Wrapped
  // because every caller is client-side: if the action rejects, the local
  // cleanup below still has to run or the browser keeps a dead session.
  try {
    await removeAuthCookies();
  } catch (error) {
    console.error("Failed to clear auth cookies", error);
  }

  if (typeof window !== "undefined") {
    // `accessToken` / `refreshToken` are written here by js-cookie, so clear
    // them here as well rather than relying on the server action's Set-Cookie.
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    // Remove user-specific information from localStorage
    removeUserInfo("accessToken");

    // `redirect()` only works while rendering on the server. All three call
    // sites are in the browser (the axios interceptor and the auth slice),
    // where it throws NEXT_REDIRECT and never navigates — which is why a
    // forced logout used to leave the user stranded on a dead page. A hard
    // navigation also drops any stale Redux / react-query state.
    window.location.href = "/";
    return;
  }

  redirect("/");
}

export const getNewAccessToken = async () => {
  const refreshToken = Cookies.get("refreshToken");
  console.log("refreshToken", refreshToken);
  if (!refreshToken) {
    throw new Error("Refresh token expired");
  }

  const response = await axios.post(
    `${getBaseUrl()}/auth/refresh-token`,
    {
      refreshToken: refreshToken,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
