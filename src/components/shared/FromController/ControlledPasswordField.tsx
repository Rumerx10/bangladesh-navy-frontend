"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import ControlledInputField from "./ControlledInputField";

/** ControlledInputField for passwords, with a show/hide toggle. */
const ControlledPasswordField = ({
  name,
  placeholder,
  autoComplete,
  className,
}: {
  name: string;
  placeholder?: string;
  autoComplete?: "current-password" | "new-password";
  className?: string;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <ControlledInputField
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={72}
        className={`pr-10 ${className ?? ""}`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute top-0 right-1 grid h-10 w-9 cursor-pointer place-items-center text-muted-foreground transition-colors hover:text-foreground"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

export default ControlledPasswordField;
