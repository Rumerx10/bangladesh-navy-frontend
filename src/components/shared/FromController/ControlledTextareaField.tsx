import { cn } from "@/src/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "../../ui/textarea";

interface ControlledTextareaFieldProps {
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const ControlledTextareaField: React.FC<ControlledTextareaFieldProps> = ({
  name,
  placeholder,
  className,
  disabled,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <div>
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                `h-40 ${
                  error
                    ? "border border-rose-500"
                    : "focus:ring-grayDark focus:border-border"
                }  focus:outline-none bg-light`,
                className
              )}
            />
            {error && (
              <div className="text-rose-500 text-xs mt-1 pl-2">
                {error.message}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default ControlledTextareaField;
