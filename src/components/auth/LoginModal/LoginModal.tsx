"use client";

import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import { useAuth } from "@/src/hooks/useAuth";
import {
  closeLoginModal,
  setUserInformation,
} from "@/src/lib/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import { isAdminRole } from "@/src/utils/UserRoleEnum";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, Lock, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../../shared/Errors/ErrorMessage";
import { LoginFormType, loginSchema } from "../Login/Schema";
import ModalSignupForm from "./ModalSignupForm";

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const isLoginModalOpen = useAppSelector(
    (state) => state.auth.isLoginModalOpen
  );
  const router = useRouter();
  // Log in and sign up both happen here, so the visitor stays on their page.
  const [view, setView] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, reset, setValue } = methods;

  const resetForm = useCallback(() => {
    reset();
    setShowPassword(false);
    setView("login");
  }, [reset]);

  const {
    mutateAsync: loginAsync,
    isPending,
    error,
    reset: resetAuthError,
  } = useAuth((data, role) => {
    if (data.user) {
      dispatch(setUserInformation(data.user));
    }

    dispatch(closeLoginModal());
    resetForm();
    if (isAdminRole(role)) {
      router.push("/admin");
    }
  });

  const handleCloseModal = useCallback(() => {
    dispatch(closeLoginModal());
    resetForm();
    resetAuthError();
  }, [dispatch, resetAuthError, resetForm]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
    };
    if (isLoginModalOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isLoginModalOpen, handleCloseModal]);

  if (!isLoginModalOpen) return null;

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    await loginAsync(data);
  };

  const switchView = (next: "login" | "signup") => {
    resetAuthError();
    setView(next);
  };

  // A new account lands back on log in with its email filled in.
  const handleSignedUp = (email: string) => {
    switchView("login");
    setValue("email", email);
  };

  const isSignup = view === "signup";

  return (
    // The backdrop scrolls, so the taller sign-up form isn't clipped on short
    // phone screens; the inner wrapper keeps it centred when it does fit.
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div
        className="flex min-h-full items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleCloseModal();
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
          className="relative w-full max-w-sm bg-card rounded-2xl shadow-2xl p-6 flex flex-col gap-4"
        >
          {/* Close */}
          <button
            className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            onClick={handleCloseModal}
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div className="text-center">
            <h2
              id="auth-modal-title"
              className="text-lg font-bold text-foreground"
            >
              {isSignup ? "Create an account" : "Welcome back"}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {isSignup ? "Sign up to place orders" : "Sign in to continue"}
            </p>
          </div>

          {/* Google Sign In */}
          {/* <div>
          <GoogleSignInButton
            label="Continue with Google"
            onSuccess={(role) => {
              handleCloseModal();
              if (isAdminRole(role)) {
                router.push("/admin");
                return;
              }
              resetAuthError();
            }}
          />
        </div> */}

          {/* Divider */}
          {/* <div className="flex items-center gap-3">
          <span className="flex-1 h-px bg-border" />
          <span className="text-[11px] text-muted-foreground">
            or sign in with email
          </span>
          <span className="flex-1 h-px bg-border" />
        </div> */}

          {/* Form */}
          {isSignup ? (
            <ModalSignupForm onSuccess={handleSignedUp} />
          ) : (
            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <ControlledInputField
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <ControlledInputField
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[11px] text-primary hover:underline mt-1 inline-block"
                    onClick={handleCloseModal}
                  >
                    Forgot password?
                  </Link>
                </div>
                {error && <ErrorMessage error={error} />}
                <button
                  className="w-full py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isPending}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isPending ? (
                      "Signing in..."
                    ) : (
                      <>
                        <Lock size={15} />
                        Sign In
                      </>
                    )}
                  </span>
                </button>
              </form>
            </FormProvider>
          )}

          {/* Footer — switches view in place instead of leaving the page */}
          <p className="text-center text-xs text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => switchView(isSignup ? "login" : "signup")}
              className="text-primary font-semibold hover:underline cursor-pointer"
            >
              {isSignup ? "Log in" : "Sign up"}
            </button>
          </p>

          {/* Trust */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck size={13} />
            <span>Secure, encrypted connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
