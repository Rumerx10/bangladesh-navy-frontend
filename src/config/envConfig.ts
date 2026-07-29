export const baseURL = "http://202.51.176.30:8003/api/v1";
// export const baseURL =
// process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.100.244:8001/api/v1";

export const getBaseUrl = (): string => {
  return baseURL;
};

export const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
