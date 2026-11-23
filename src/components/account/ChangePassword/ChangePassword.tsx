"use client";

import {
  ChangePasswordValues,
  changePasswordSchema,
} from "@/src/components/auth/shared/passwordSchema";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledPasswordField from "@/src/components/shared/FromController/ControlledPasswordField";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { usePost } from "@/src/hooks/usePost";
import { AuthTokens, storeAuthTokens } from "@/src/utils/authTokens";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EMPTY: ChangePasswordValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const methods = useForm<ChangePasswordValues>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: EMPTY,
  });

  const { mutate, isPending, error } = usePost<Partial<AuthTokens>>(
    "/auth/change-password",
    (data) => {
      // The change retires older refresh tokens; this session gets new ones.
      if (data?.accessToken && data?.refreshToken) {
        storeAuthTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      }
      methods.reset(EMPTY);
      toast.success("Password changed");
    }
  );

  const onSubmit = ({ oldPassword, newPassword }: ChangePasswordValues) =>
    mutate({ data: { oldPassword, newPassword } });

  return (
    <div className="space-y-6 rounded-xl bg-light p-5">
      <div className="rounded-xl bg-primary/10 p-3">
        <h1 className="text-xl font-bold text-foreground lg:text-2xl">
          Change Password
        </h1>
        <p className="mt-1 text-sm text-secondary-foreground">
          Other devices signed in to your account will need to log in again.
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-md space-y-5 rounded-xl border border-border bg-card p-5 sm:p-6"
          noValidate
        >
          <div>
            <InputLabel label="Current password" required />
            <ControlledPasswordField
              name="oldPassword"
              autoComplete="current-password"
            />
            <Link
              href="/auth/forgot-password"
              className="mt-1.5 inline-block text-xs text-primary hover:underline"
            >
              Forgot your current password?
            </Link>
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

          <ErrorMessage error={error} />

          <SubmitButton isLoading={isPending} label="Change password" />
        </form>
      </FormProvider>
    </div>
  );
};

export default ChangePassword;
