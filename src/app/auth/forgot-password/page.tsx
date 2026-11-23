import ForgotPassword from "@/src/components/auth/ForgotPassword/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Reset the password for your account.",
  robots: { index: false, follow: false },
};

const ForgotPasswordPage = () => <ForgotPassword />;

export default ForgotPasswordPage;
