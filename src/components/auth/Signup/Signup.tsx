"use client";
import { usePost } from "@/src/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SignupForm from "./Form/SignupForm";
import { SignupFormType, signupSchema } from "./Schema";
import LoginBanner from "../Login/LoginBanner";
import AuthCloseButton from "../shared/AuthCloseButton";
import { useRedirectQuery } from "../shared/useRedirectQuery";

const SignupPage = () => {
  const router = useRouter();
  const redirectQuery = useRedirectQuery();
  const methods = useForm<SignupFormType>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
    },
    mode: "onChange",
  });

  const {
    mutateAsync: signup,
    error,
    reset,
    isPending,
  } = usePost("/auth/register");

  const onSubmit = (data: SignupFormType) => {
    signup({
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      password: data.password,
    })
      .then(() => {
        methods.reset();
        reset();
        toast.success("Account created. Log in to continue.");
        // Carry on to wherever sign-in was asked for, e.g. checkout.
        router.push(`/auth/login${redirectQuery}`);
      })
      // The form shows the error; this only stops an unhandled rejection.
      .catch(() => {});
  };

  return (
    <div className="relative min-h-screen grid grid-cols-1 md:grid-cols-2">
      <AuthCloseButton />
      {/* Same banner as the login page, so the two read as one flow. */}
      <LoginBanner />
      <div className="flex items-center justify-center px-6 py-16 md:py-0">
        <FormProvider {...methods}>
          <SignupForm onSubmit={onSubmit} error={error} isPending={isPending} />
        </FormProvider>
      </div>
    </div>
  );
};

export default SignupPage;
