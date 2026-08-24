"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";

interface FormSectionHeaderProps {
  label: string;
  description?: string;
  onCancel?: () => void;
  showCancel?: boolean;
}

/** Card header shared by the Institute and Courses content forms. */
const FormSectionHeader = ({
  label,
  description,
  onCancel,
  showCancel = false,
}: FormSectionHeaderProps) => {
  const [iconLoaded, setIconLoaded] = useState(false);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
          <Image
            src="/icons/media.svg"
            alt={label}
            width={36}
            height={36}
            className={cn(
              "w-4 transition-opacity duration-700 ease-in-out",
              iconLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIconLoaded(true)}
            onError={() => setIconLoaded(true)}
          />
        </div>
        <div>
          <Paragraph className="xl:text-lg font-medium text-pBlue">
            {label}
          </Paragraph>
          {description && (
            <Paragraph className="text-xs! text-gray-500">
              {description}
            </Paragraph>
          )}
        </div>
      </div>

      {showCancel && (
        <Button
          type="button"
          onClick={onCancel}
          className="text-secondary-foreground bg-transparent hover:bg-gray-100 duration-300 border hover:shadow cursor-pointer"
        >
          Cancel
        </Button>
      )}
    </div>
  );
};

export default FormSectionHeader;
