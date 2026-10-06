export const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://bnhocapi.static-cdn-host.com/api/v1";

export const getBaseUrl = (): string => {
  return baseURL;
};

export const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
