"use client";
import { useAuth } from "@/src/hooks/useAuth";
import { isAdminRole } from "@/src/utils/UserRoleEnum";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import LoginForm from "./Form/LoginForm";
import LoginBanner from "./LoginBanner";
import AuthCloseButton from "../shared/AuthCloseButton";
import { LoginFormType, loginSchema } from "./Schema";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const methods = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutateAsync: login,
    isPending,
    error,
  } = useAuth((_data, role: string) => {
    const redirect = searchParams.get("redirect");
    // Same-site paths only, so a crafted link can't send a fresh login
    // off-site.
    if (redirect?.startsWith("/") && !redirect.startsWith("//")) {
      router.push(redirect);
    } else if (isAdminRole(role)) {
      router.push("/admin");
    } else {
      router.push("/");
    }
  });

  const onSubmit = (data: LoginFormType) => {
    login(data).then(() => {
      methods.reset();
    });
  };

  const handleGoogleSuccess = (role: string) => {
    if (isAdminRole(role)) {
      router.push("/admin");
      return;
    }

    router.push("/");
  };

  return (
    <div className="relative min-h-screen grid grid-cols-1 md:grid-cols-2">
      <AuthCloseButton />
      <div className="flex items-center justify-center px-6 py-16 md:py-0">
        <FormProvider {...methods}>
          <LoginForm
            onSubmit={onSubmit}
            onGoogleSuccess={handleGoogleSuccess}
            error={error}
            isPending={isPending}
          />
        </FormProvider>
      </div>
      <LoginBanner />
    </div>
  );
};

export default LoginPage;
