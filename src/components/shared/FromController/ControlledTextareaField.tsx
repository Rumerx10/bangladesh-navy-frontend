import { cn } from "@/src/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "../../ui/textarea";

interface ControlledTextareaFieldProps {
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  /** Caps typed characters and shows a live "used / max" counter. */
  maxLength?: number;
}

const ControlledTextareaField: React.FC<ControlledTextareaFieldProps> = ({
  name,
  placeholder,
  className,
  disabled,
  maxLength,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const length = String(field.value ?? "").length;
        return (
          <div>
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              aria-invalid={!!error}
              className={cn(
                `h-40 ${
                  error
                    ? "border border-rose-500"
                    : "focus:ring-grayDark focus:border-border"
                }  focus:outline-none bg-light`,
                className
              )}
            />
            {(error || maxLength) && (
              <div className="mt-1 flex items-start justify-between gap-3 pl-2 text-xs">
                <span className="text-rose-500 wrap-break-word">
                  {error?.message}
                </span>
                {maxLength && (
                  <span
                    className={cn(
                      "shrink-0 tabular-nums",
                      length >= maxLength
                        ? "text-rose-500"
                        : "text-muted-foreground"
                    )}
                  >
                    {length.toLocaleString()} / {maxLength.toLocaleString()}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default ControlledTextareaField;
