import { Metadata } from "next";
import { Suspense } from "react";
import SignupPage from "@/src/components/auth/Signup/Signup";

export const metadata: Metadata = {
  title: "Sign Up | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Create a new account.",
  robots: { index: false, follow: false },
};

// The form reads `?redirect=` (useSearchParams), which needs a Suspense
// boundary.
const page = () => {
  return (
    <div>
      <Suspense>
        <SignupPage />
      </Suspense>
    </div>
  );
};

export default page;
