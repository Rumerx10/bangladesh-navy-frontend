export const siteConfig = {
  name:
    process.env.NEXT_PUBLIC_SITE_NAME ||
    "Bangladesh Navy",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Hydrographic & Oceanographic Center",
  address:
    process.env.NEXT_PUBLIC_ADDRESS ||
    "BNHOC, Chittagong, Bangladesh",
  phone1: process.env.NEXT_PUBLIC_PHONE_1 || "+880-xxx-xxxx",
  phone2: process.env.NEXT_PUBLIC_PHONE_2 || "+880-xxx-xxxx",
  email: process.env.NEXT_PUBLIC_EMAIL || "info@bnhoc.mil.bd",
  currency: process.env.NEXT_PUBLIC_CURRENCY || "BDT",
  currencySymbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "৳",
};
