"use client";

import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import { usePost } from "@/src/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SignupFormType, signupSchema } from "../Signup/Schema";

interface ModalSignupFormProps {
  /** Called with the new account's email once it's created. */
  onSuccess: (email: string) => void;
}

const labelClass = "block text-xs font-semibold text-foreground mb-1";

/** The sign-up view of the login modal — same schema and endpoint as the
 *  /auth/signup page, laid out to match the modal's login form. */
const ModalSignupForm = ({ onSuccess }: ModalSignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

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

  const { mutateAsync: signup, error, isPending } = usePost("/auth/register");

  const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
    const email = data.email.trim();
    try {
      await signup({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email,
        password: data.password,
      });
    } catch {
      // The form shows the error; this only stops an unhandled rejection.
      return;
    }
    toast.success("Account created. Log in to continue.");
    onSuccess(email);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-3"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
          <div>
            <label className={labelClass}>
              First name <span className="text-red-500">*</span>
            </label>
            <ControlledInputField
              name="firstName"
              type="text"
              placeholder="First name"
            />
          </div>
          <div>
            <label className={labelClass}>
              Last name <span className="text-red-500">*</span>
            </label>
            <ControlledInputField
              name="lastName"
              type="text"
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Email <span className="text-red-500">*</span>
          </label>
          <ControlledInputField
            name="email"
            type="email"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label className={labelClass}>
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <ControlledInputField
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide passwords" : "Show passwords"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Confirm password <span className="text-red-500">*</span>
          </label>
          {/* Follows the eye toggle above, so both read the same way. */}
          <ControlledInputField
            name="rePassword"
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter your password"
          />
        </div>

        {error && <ErrorMessage error={error} />}

        <button
          className="w-full py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isPending}
        >
          <span className="flex items-center justify-center gap-2">
            {isPending ? (
              "Creating account..."
            ) : (
              <>
                <UserPlus size={15} />
                Create account
              </>
            )}
          </span>
        </button>
      </form>
    </FormProvider>
  );
};

export default ModalSignupForm;
