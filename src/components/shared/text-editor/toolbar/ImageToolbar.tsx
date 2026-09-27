"use client";

import { type Editor } from "@tiptap/core";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Check,
  Trash2,
  Type,
} from "lucide-react";
import { type RefObject, useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";
import useSelectedImage from "../hooks/useSelectedImage";
import { IMAGE_WIDTH_PRESETS } from "../extensions/resizable-image";
import type { ImageAlign, ImageWrap } from "../types/editor";

interface ImageToolbarProps {
  editor: Editor;
  /** The positioned element the toolbar is placed inside. */
  boundaryRef: RefObject<HTMLElement | null>;
}

const TOOLBAR_HEIGHT = 46;
const ESTIMATED_TOOLBAR_WIDTH = 430;

const WRAP_MODES: { value: ImageWrap; label: string; hint: string }[] = [
  {
    value: "inline",
    label: "Inline",
    hint: "Inline — the image sits inside the line of text, like a large character",
  },
  {
    value: "wrap",
    label: "Wrap",
    hint: "Wrap — the image floats to one side and the paragraph runs around it",
  },
  {
    value: "break",
    label: "Break",
    hint: "Break — the image gets its own band, with no text beside it",
  },
];

const ALIGNMENTS: {
  value: ImageAlign;
  label: string;
  Icon: typeof AlignLeft;
}[] = [
  { value: "left", label: "Align left", Icon: AlignLeft },
  { value: "center", label: "Align centre", Icon: AlignCenter },
  { value: "right", label: "Align right", Icon: AlignRight },
];

const PillButton = ({
  onClick,
  isActive,
  disabled,
  title,
  children,
  className,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    aria-pressed={isActive}
    disabled={disabled}
    // `onMouseDown` prevention keeps the editor's node selection alive — a
    // plain click would blur the ProseMirror view first and the toolbar would
    // vanish before the command ever ran.
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
    className={cn(
      "flex items-center justify-center gap-1 h-7 px-2 rounded-md text-xs font-medium",
      "text-slate-600 transition-colors cursor-pointer",
      "hover:bg-slate-100 hover:text-slate-900",
      "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
      isActive && "bg-slate-900 text-white hover:bg-slate-900 hover:text-white",
      className
    )}
  >
    {children}
  </button>
);

const Divider = () => <span className="h-5 w-px bg-slate-200 shrink-0" />;

/** Contextual toolbar that appears over an image the moment it is selected.
 *  Everything that only makes sense for an image lives here instead of in the
 *  always-on text toolbar, which is what lets an admin see the wrap, the
 *  alignment and the size of the image they are actually editing. */
const ImageToolbar = ({ editor, boundaryRef }: ImageToolbarProps) => {
  const image = useSelectedImage(editor, boundaryRef);
  // Which image the alt field is open for, rather than a bare boolean: moving
  // the selection to another image closes the field on its own, so one
  // image's description can never be saved onto the next one.
  const [altEditingPos, setAltEditingPos] = useState<number | null>(null);
  const [altDraft, setAltDraft] = useState("");
  const altInputRef = useRef<HTMLInputElement>(null);

  const isEditingAlt = !!image && altEditingPos === image.pos;

  useEffect(() => {
    if (isEditingAlt) altInputRef.current?.focus();
  }, [isEditingAlt]);

  if (!image) return null;

  const { wrap, align, width, top, left, boundaryWidth } = image;
  const isFloating = wrap === "wrap";

  const placeAbove = top >= TOOLBAR_HEIGHT + 8;
  const maxLeft = Math.max(0, boundaryWidth - ESTIMATED_TOOLBAR_WIDTH);
  const clampedLeft = Math.max(0, Math.min(left, maxLeft));

  const openAltEditor = () => {
    setAltDraft(image.alt);
    setAltEditingPos(image.pos);
  };

  const commitAlt = () => {
    editor.chain().focus().setResizableImageAlt(altDraft.trim()).run();
    setAltEditingPos(null);
  };

  return (
    <div
      role="toolbar"
      aria-label="Image options"
      className="absolute z-30 flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-white px-1.5 py-1 shadow-lg shadow-slate-900/10"
      style={{
        top: placeAbove ? top - TOOLBAR_HEIGHT : top + 8,
        left: clampedLeft,
        maxWidth: "100%",
      }}
    >
      {isEditingAlt ? (
        <>
          <Type className="w-3.5 h-3.5 text-slate-400 ml-1 shrink-0" />
          <input
            ref={altInputRef}
            value={altDraft}
            onChange={(event) => setAltDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commitAlt();
              }
              if (event.key === "Escape") {
                event.preventDefault();
                setAltEditingPos(null);
              }
            }}
            placeholder="Describe this image for screen readers"
            className="h-7 w-56 rounded-md border border-slate-200 px-2 text-xs outline-none focus:border-slate-400"
          />
          <PillButton onClick={commitAlt} title="Save alt text">
            <Check className="w-3.5 h-3.5" />
          </PillButton>
        </>
      ) : (
        <>
          {WRAP_MODES.map((mode) => (
            <PillButton
              key={mode.value}
              title={mode.hint}
              isActive={wrap === mode.value}
              onClick={() =>
                editor.chain().focus().setResizableImageWrap(mode.value).run()
              }
            >
              {mode.label}
            </PillButton>
          ))}

          <Divider />

          {ALIGNMENTS.map(({ value, label, Icon }) => (
            <PillButton
              key={value}
              title={
                // A float has to hug one edge, so "centre" is only offered for
                // images that break the flow onto their own band.
                isFloating && value === "center"
                  ? "Centre is only available in Break mode"
                  : label
              }
              isActive={align === value}
              disabled={isFloating && value === "center"}
              onClick={() =>
                editor.chain().focus().setResizableImageAlign(value).run()
              }
            >
              <Icon className="w-3.5 h-3.5" />
            </PillButton>
          ))}

          <Divider />

          {IMAGE_WIDTH_PRESETS.map((preset) => (
            <PillButton
              key={preset}
              title={`Set width to ${preset} of the text column`}
              isActive={width === preset}
              onClick={() =>
                editor.chain().focus().setResizableImageWidth(preset).run()
              }
            >
              {preset}
            </PillButton>
          ))}

          <Divider />

          <PillButton
            title="Alt text (for screen readers)"
            isActive={!!image.alt}
            onClick={openAltEditor}
          >
            <Type className="w-3.5 h-3.5" />
          </PillButton>
          <PillButton
            title="Remove image"
            onClick={() => editor.chain().focus().deleteSelection().run()}
            className="text-rose-500 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </PillButton>
        </>
      )}
    </div>
  );
};

export default ImageToolbar;
