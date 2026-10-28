import * as React from "react";

import { cn } from "@/src/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // The track's vertical margin keeps the scrollbar clear of the
        // rounded corners — without it the track runs the full height and
        // pokes out past the curve at the top and bottom right.
        "flex min-h-15 w-full rounded-md border overflow-y-auto scrollbar-modern [&::-webkit-scrollbar-track]:my-2 [&::-webkit-scrollbar-track]:bg-transparent border-light-silver bg-card px-3 py-2 text-base transition-colors file:border-0 focus:outline-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
