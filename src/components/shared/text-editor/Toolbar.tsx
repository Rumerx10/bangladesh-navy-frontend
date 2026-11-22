"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { cn } from "@/src/lib/utils";
import { ToolbarButtonProps } from "./types/editor";

const isApplePlatform = () =>
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

/** Shows TipTap's key names ("Mod", "Shift") as the keys printed on the
 *  admin's own keyboard. */
const formatKey = (key: string) => {
  const apple = isApplePlatform();
  if (key === "Mod") return apple ? "⌘" : "Ctrl";
  if (key === "Shift") return apple ? "⇧" : "Shift";
  return key;
};

/** One look for every toolbar control — menu triggers included — so a
 *  dropdown can't drift from a plain button. `aria-expanded` rather than
 *  `data-state` marks an open menu, because the tooltip wrapped around a
 *  trigger overwrites `data-state` with its own. */
export const toolbarButtonClass = (isActive?: boolean) =>
  cn(
    "inline-flex h-8 min-w-8 shrink-0 items-center justify-center gap-1 rounded-md px-1.5",
    "text-secondary-foreground cursor-pointer select-none outline-none",
    "transition-[background-color,color,box-shadow,scale] duration-150 ease-out",
    "hover:bg-light-dark hover:text-foreground active:scale-[0.94]",
    "focus-visible:ring-2 focus-visible:ring-ring",
    "aria-expanded:bg-light-dark aria-expanded:text-foreground",
    "disabled:pointer-events-none disabled:opacity-45",
    "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    isActive &&
      "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
  );

export const ToolbarTooltip = ({
  label,
  shortcut,
  children,
}: {
  label: string;
  shortcut?: readonly string[];
  children: React.ReactNode;
}) => (
  <Tooltip delayDuration={350}>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent
      side="top"
      sideOffset={6}
      className="flex items-center gap-2 px-2.5 py-1.5"
    >
      <span>{label}</span>
      {shortcut && (
        <span className="flex items-center gap-0.5">
          {shortcut.map((key) => (
            <kbd
              key={key}
              className="min-w-4 rounded bg-background/15 px-1 text-center font-sans text-[10px] font-medium leading-4"
            >
              {formatKey(key)}
            </kbd>
          ))}
        </span>
      )}
    </TooltipContent>
  </Tooltip>
);

export const ToolbarDivider = () => (
  <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-light-silver" />
);

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive,
  children,
  title,
  shortcut,
  disabled = false,
  className,
}) => {
  const button = (
    <button
      type="button"
      onClick={onClick}
      // Keeps focus — and with it the selection — inside the editor, so the
      // command lands on what the admin highlighted without a blur flicker.
      onMouseDown={(event) => event.preventDefault()}
      disabled={disabled}
      aria-label={title}
      aria-pressed={isActive}
      className={cn(toolbarButtonClass(isActive), className)}
    >
      {children}
    </button>
  );

  if (!title) return button;

  return (
    <ToolbarTooltip label={title} shortcut={shortcut}>
      {button}
    </ToolbarTooltip>
  );
};

export default ToolbarButton;
