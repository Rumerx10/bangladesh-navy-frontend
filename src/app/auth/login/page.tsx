import { Suspense } from "react";
import Login from "@/src/components/auth/Login/Login";

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
