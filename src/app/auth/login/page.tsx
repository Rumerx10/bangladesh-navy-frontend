import { Metadata } from "next";
import { Suspense } from "react";
import Login from "@/src/components/auth/Login/Login";

export const metadata: Metadata = {
  title: "Sign In | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Sign in to your account.",
  robots: { index: false, follow: false },
};

const page = () => {
  return (
    <div>
      <Suspense>
        <Login />
      </Suspense>
    </div>
  );
};

export default page;
