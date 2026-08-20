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

  // ✅ add this
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ControlledInputField: React.FC<ControlledInputFieldProps> = ({
  name,
  type,
  placeholder,
  className,
  disabled,
  icon,
  list,
  onKeyDown,
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
            showErrorMessage={!!error}
            onKeyDown={onKeyDown}
          />
        )}
      />
    </div>
  );
};

export default ControlledInputField;
