import ChangePassword from "@/src/components/account/ChangePassword/ChangePassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Change Password | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Change the password for your account.",
  robots: { index: false, follow: false },
};

const ChangePasswordPage = () => <ChangePassword />;

export default ChangePasswordPage;
