"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { cn } from "@/src/lib/utils";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { ToolbarTooltip, toolbarButtonClass } from "../Toolbar";

const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32];

// Radix menu items can't use "" as a value, so the unset state needs a name.
const DEFAULT_SIZE = "default";

const FontSizeSelector = ({
  currentFontSize,
  setFontSize,
}: {
  currentFontSize: string;
  setFontSize: (fontSize: string) => void;
}) => {
  // Picking a size hands focus back to the editor; the menu must not then
  // pull it onto its trigger. Escape still returns focus to the trigger.
  const pickedRef = useRef(false);

  return (
    <DropdownMenu modal={false}>
      <ToolbarTooltip label="Font size">
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Font size"
            className={cn(
              toolbarButtonClass(),
              "w-[5.5rem] justify-between pl-2.5 pr-2 text-sm font-medium tabular-nums"
            )}
          >
            <span
              className={cn(
                !currentFontSize && "font-normal text-muted-foreground"
              )}
            >
              {currentFontSize ? `${currentFontSize}px` : "Default"}
            </span>
            <ChevronDown className="size-3.5 opacity-60" />
          </button>
        </DropdownMenuTrigger>
      </ToolbarTooltip>

      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="w-40 rounded-lg"
        onCloseAutoFocus={(event) => {
          if (!pickedRef.current) return;
          event.preventDefault();
          pickedRef.current = false;
        }}
      >
        <DropdownMenuRadioGroup
          value={currentFontSize || DEFAULT_SIZE}
          onValueChange={(value) => {
            pickedRef.current = true;
            setFontSize(value === DEFAULT_SIZE ? "" : value);
          }}
        >
          <DropdownMenuRadioItem value={DEFAULT_SIZE}>
            Default
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          {FONT_SIZES.map((size) => (
            <DropdownMenuRadioItem
              key={size}
              value={String(size)}
              className="justify-between"
            >
              <span className="tabular-nums">{size}px</span>
              <span
                aria-hidden
                className="leading-none text-muted-foreground"
                style={{ fontSize: Math.min(size, 22) }}
              >
                Aa
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontSizeSelector;
