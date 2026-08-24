import { cn } from "@/src/lib/utils";
import React from "react";

type TextProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const Text = ({ children, className, as: Tag = "h1" }: TextProps) => {
  return (
    <Tag
      className={cn(
        "text-xl md:text-2xl lg:text-3xl xl:text-[46px] font-semibold text-secondary-dark",
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Text;
