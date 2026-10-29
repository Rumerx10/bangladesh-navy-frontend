import React, { ReactElement } from "react";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";

interface ControlledInputFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  icon?: ReactElement;
  /** id of a <datalist> rendered alongside the field, for free-text suggestions */
  list?: string;
  /** Hard cap on typed characters (the browser stops input at this length). */
  maxLength?: number;
  /** Upper bound for date/number inputs, e.g. today's date. */
  max?: string;
  autoComplete?: string;

  // ✅ add this
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Tidies the value when the field loses focus, e.g. "22 29 N" → "22°29.00'N".
   * Return the input unchanged when it can't be read, so validation can say why.
   */
  formatOnBlur?: (value: string) => string;
}

const ControlledInputField: React.FC<ControlledInputFieldProps> = ({
  name,
  type,
  placeholder,
  className,
  disabled,
  icon,
  list,
  maxLength,
  max,
  autoComplete,
  onKeyDown,
  formatOnBlur,
}) => {
  const { control } = useFormContext();

  return (
    <div className="relative">
      {icon && <span>{icon}</span>}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type={type}
            value={field.value ?? ""}
            placeholder={placeholder}
            error={error?.message}
            className={className}
            disabled={disabled}
            list={list}
            maxLength={maxLength}
            max={max}
            autoComplete={autoComplete}
            aria-invalid={!!error}
            showErrorMessage={!!error}
            onKeyDown={onKeyDown}
            onBlur={() => {
              if (
                formatOnBlur &&
                typeof field.value === "string" &&
                field.value.trim()
              ) {
                const formatted = formatOnBlur(field.value);
                if (formatted !== field.value) field.onChange(formatted);
              }
              field.onBlur();
            }}
          />
        )}
      />
    </div>
  );
};

export default ControlledInputField;
