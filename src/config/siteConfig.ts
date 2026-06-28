export const siteConfig = {
  name:
    process.env.NEXT_PUBLIC_SITE_NAME ||
    "Bangladesh Navy",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Hydrographic & Oceanographic Centre",
  address:
    process.env.NEXT_PUBLIC_ADDRESS ||
    "BNHOC, Chittagong, Bangladesh",
  phone1: process.env.NEXT_PUBLIC_PHONE_1 || "+8801769722446",
  phone2: process.env.NEXT_PUBLIC_PHONE_2 || "0233334250030",
  email: process.env.NEXT_PUBLIC_EMAIL || "bnhoc@navy.mil.bd",
  currency: process.env.NEXT_PUBLIC_CURRENCY || "BDT",
  currencySymbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "৳",
};
