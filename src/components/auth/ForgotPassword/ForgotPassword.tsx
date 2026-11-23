"use client";

import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledPasswordField from "@/src/components/shared/FromController/ControlledPasswordField";
import InputLabel from "@/src/components/shared/InputLabel";
import { Button } from "@/src/components/ui/button";
import { usePost } from "@/src/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoginBanner from "../Login/LoginBanner";
import {
  ForgotPasswordValues,
  forgotPasswordSchema,
  ResetPasswordValues,
  resetPasswordSchema,
} from "../shared/passwordSchema";

/** The API allows one code per email every 60 seconds. */
const RESEND_COOLDOWN_SECONDS = 60;

const ForgotPassword = () => {
  const router = useRouter();
  // The email the code was sent to; null while still on the first step.
  const [email, setEmail] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const emailForm = useForm<ForgotPasswordValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });
  const resetForm = useForm<ResetPasswordValues>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: { otp: "", newPassword: "", confirmPassword: "" },
  });

  const requestCode = usePost("/auth/forgot-password");
  const resendCode = usePost("/auth/reset-password/resend-otp", () => {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    toast.success("A new code is on its way");
  });
  const resetPassword = usePost("/auth/reset-password", () => {
    toast.success("Password reset. Log in with your new password.");
    router.push("/auth/login");
  });

  const sendCode = ({ email: value }: ForgotPasswordValues) => {
    const address = value.trim();
    requestCode.mutate(
      { data: { email: address } },
      {
        onSuccess: () => {
          setEmail(address);
          setCooldown(RESEND_COOLDOWN_SECONDS);
        },
      }
    );
  };

  const submitReset = (values: ResetPasswordValues) => {
    if (!email) return;
    resetPassword.mutate({
      data: {
        email,
        otp: values.otp.trim(),
        newPassword: values.newPassword,
      },
    });
  };

  const startOver = () => {
    setEmail(null);
    resetForm.reset();
    resetPassword.reset();
    resendCode.reset();
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12">
        {email === null ? (
          <FormProvider {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(sendCode)}
              className="w-full max-w-md"
              noValidate
            >
              <h2 className="mb-2 text-[32px] font-semibold text-primary">
                Reset your password
              </h2>
              <p className="mb-6 text-sm text-secondary-foreground">
                Enter the email for your account and we&apos;ll send you a code
                to set a new password.
              </p>

              <InputLabel label="Email" required />
              <ControlledInputField
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
              />

              <div className="mt-3">
                <ErrorMessage error={requestCode.error} />
              </div>

              <Button
                type="submit"
                disabled={requestCode.isPending}
                className="mt-4 w-full bg-primary text-white hover:bg-primary/90"
              >
                {requestCode.isPending ? "Sending…" : "Send code"}
              </Button>

              <Link
                href="/auth/login"
                className="mt-4 block text-center text-sm font-medium text-primary hover:underline"
              >
                Back to log in
              </Link>
            </form>
          </FormProvider>
        ) : (
          <FormProvider {...resetForm}>
            <form
              onSubmit={resetForm.handleSubmit(submitReset)}
              className="w-full max-w-md"
              noValidate
            >
              <h2 className="mb-2 text-[32px] font-semibold text-primary">
                Enter the code
              </h2>
              <p className="mb-6 text-sm text-secondary-foreground">
                If <span className="font-medium text-foreground">{email}</span>{" "}
                has an account, a code is on its way. It expires in 5 minutes
                and can be tried 3 times.
              </p>

              <div className="space-y-5">
                <div>
                  <InputLabel label="Code" required />
                  <ControlledInputField
                    name="otp"
                    placeholder="6-digit code"
                    autoComplete="one-time-code"
                    maxLength={8}
                  />
                </div>
                <div>
                  <InputLabel label="New password" required />
                  <ControlledPasswordField
                    name="newPassword"
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <InputLabel label="Confirm new password" required />
                  <ControlledPasswordField
                    name="confirmPassword"
                    placeholder="Re-enter the new password"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div className="mt-3">
                <ErrorMessage error={resetPassword.error ?? resendCode.error} />
              </div>

              <Button
                type="submit"
                disabled={resetPassword.isPending}
                className="mt-4 w-full bg-primary text-white hover:bg-primary/90"
              >
                {resetPassword.isPending ? "Saving…" : "Reset password"}
              </Button>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
                <button
                  type="button"
                  disabled={cooldown > 0 || resendCode.isPending}
                  onClick={() => resendCode.mutate({ data: { email } })}
                  className="cursor-pointer font-medium text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
                >
                  {cooldown > 0
                    ? `Send a new code in ${cooldown}s`
                    : "Send a new code"}
                </button>
                <button
                  type="button"
                  onClick={startOver}
                  className="cursor-pointer text-secondary-foreground hover:text-foreground hover:underline"
                >
                  Use a different email
                </button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
      <LoginBanner />
    </div>
  );
};

export default ForgotPassword;
