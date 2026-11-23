import * as Yup from "yup";

/** New-password rules, mirroring the API's 8–72 character limit. */
export const newPasswordField = Yup.string()
  .required("Enter a new password")
  .min(8, "Use at least 8 characters")
  .max(72, "Use 72 characters or fewer");

export const confirmPasswordField = Yup.string()
  .required("Re-enter the new password")
  .oneOf([Yup.ref("newPassword")], "Passwords don't match");

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("Enter your email")
    .email("Enter a valid email address"),
});

export const resetPasswordSchema = Yup.object({
  otp: Yup.string()
    .trim()
    .required("Enter the code from the email")
    .matches(/^\d{4,8}$/, "The code is the number in the email"),
  newPassword: newPasswordField,
  confirmPassword: confirmPasswordField,
});

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Enter your current password"),
  newPassword: newPasswordField.notOneOf(
    [Yup.ref("oldPassword")],
    "Choose a password different from the current one"
  ),
  confirmPassword: confirmPasswordField,
});

export type ForgotPasswordValues = Yup.InferType<typeof forgotPasswordSchema>;
export type ResetPasswordValues = Yup.InferType<typeof resetPasswordSchema>;
export type ChangePasswordValues = Yup.InferType<typeof changePasswordSchema>;
