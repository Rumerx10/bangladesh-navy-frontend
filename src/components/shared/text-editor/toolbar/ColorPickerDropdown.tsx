"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";
import { type Editor } from "@tiptap/core";
import { Check, ChevronDown, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import { ToolbarTooltip, toolbarButtonClass } from "../Toolbar";

/** `light` swatches get a dark check mark so it stays visible on them. */
const PALETTE: { value: string; name: string; light?: boolean }[] = [
  { value: "#0F0E40", name: "Midnight" },
  { value: "#003F71", name: "Navy" },
  { value: "#5C5C5C", name: "Graphite" },
  { value: "#BDBDBD", name: "Silver", light: true },
  { value: "#3398FF", name: "Sky" },
  { value: "#3FD88C", name: "Sea green", light: true },
  { value: "#FFD47F", name: "Sand", light: true },
  { value: "#FF9800", name: "Amber", light: true },
  { value: "#F44336", name: "Red" },
  { value: "#FF55A9", name: "Pink" },
];

/** Content loaded from saved HTML reports its colour the way the browser
 *  parsed it — `rgb(92, 92, 92)` — while the palette is written in hex. */
const toHex = (color: string | null) => {
  if (!color) return null;
  const rgb = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!rgb) return color.toUpperCase();
  return (
    "#" +
    rgb
      .slice(1, 4)
      .map((channel) => Number(channel).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
};

const ColorPickerDropdown = ({
  editor,
  currentColor,
}: {
  editor: Editor;
  currentColor: string | null;
}) => {
  const [open, setOpen] = useState(false);
  // See FontSizeSelector: after a pick the editor keeps focus, not the trigger.
  const pickedRef = useRef(false);
  const activeColor = toHex(currentColor);

  const apply = (command: () => void) => {
    pickedRef.current = true;
    command();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <ToolbarTooltip label="Text colour">
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Text colour"
            className={cn(toolbarButtonClass(), "gap-0.5")}
          >
            <span className="flex flex-col items-center">
              <span className="text-[15px] font-semibold leading-none">A</span>
              <span
                className="mt-[3px] h-[3px] w-4 rounded-full ring-1 ring-inset ring-foreground/10"
                style={{ backgroundColor: currentColor ?? "currentColor" }}
              />
            </span>
            <ChevronDown className="size-3 opacity-60" />
          </button>
        </PopoverTrigger>
      </ToolbarTooltip>

      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-auto rounded-lg p-3"
        onCloseAutoFocus={(event) => {
          if (!pickedRef.current) return;
          event.preventDefault();
          pickedRef.current = false;
        }}
      >
        <p className="mb-2.5 text-xs font-medium text-secondary-foreground">
          Text colour
        </p>

        <div className="grid grid-cols-5 gap-2">
          {PALETTE.map(({ value, name, light }) => {
            const isActive = activeColor === value;
            return (
              <button
                key={value}
                type="button"
                title={name}
                aria-label={name}
                aria-pressed={isActive}
                onClick={() =>
                  apply(() => editor.chain().focus().setColor(value).run())
                }
                className={cn(
                  "flex size-7 items-center justify-center rounded-md cursor-pointer",
                  "ring-1 ring-inset ring-black/10",
                  "transition-[scale] duration-150 ease-out hover:scale-110 active:scale-95",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  isActive && "outline-2 outline-offset-2 outline-primary"
                )}
                style={{ backgroundColor: value }}
              >
                {isActive && (
                  <Check
                    strokeWidth={3}
                    className={cn(
                      "size-3.5",
                      light ? "text-slate-900" : "text-white"
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => apply(() => editor.chain().focus().unsetColor().run())}
          className="mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md border border-light-silver py-1.5 text-xs font-medium text-secondary-foreground outline-none transition-colors hover:bg-light-dark hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw className="size-3.5" />
          Reset to default
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPickerDropdown;
