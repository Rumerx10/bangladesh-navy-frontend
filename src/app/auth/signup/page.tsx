import { Metadata } from "next";
import SignupPage from "@/src/components/auth/Signup/Signup";

export const metadata: Metadata = {
  title: "Sign Up | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Create a new account.",
  robots: { index: false, follow: false },
};

export default function page() {
  return (
    <div>
      <SignupPage />
    </div>
  );
}
