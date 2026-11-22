"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";

/** E.164 caps a full international number at 15 digits. */
export const PHONE_MAX_DIGITS = 15;

/**
 * Keeps only what a phone number can contain: digits, plus a single "+" at
 * the very start. Letters, spaces and other symbols are dropped (also from
 * pasted text), and digits beyond PHONE_MAX_DIGITS are cut off.
 */
export const sanitizePhone = (raw: string) => {
  const value = raw.trimStart();
  const plus = value.startsWith("+") ? "+" : "";
  const digits = value.replace(/\D/g, "").slice(0, PHONE_MAX_DIGITS);
  return plus + digits;
};

interface ControlledPhoneFieldProps {
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  /** Defaults to "tel"; pass "off" for numbers that aren't the user's own
   * phone (e.g. a fax) so the browser doesn't autofill it. */
  autoComplete?: string;
}

const ControlledPhoneField = ({
  name,
  placeholder = "e.g. 01712345678 or +8801712345678",
  className,
  disabled,
  autoComplete = "tel",
}: ControlledPhoneFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          type="tel"
          inputMode="tel"
          autoComplete={autoComplete}
          value={field.value ?? ""}
          onChange={(e) => field.onChange(sanitizePhone(e.target.value))}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          error={error?.message}
          showErrorMessage={!!error}
          className={className}
        />
      )}
    />
  );
};

export default ControlledPhoneField;
