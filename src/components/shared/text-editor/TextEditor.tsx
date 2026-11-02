"use client";
import { usePost } from "@/src/hooks/usePost";
import { cn } from "@/src/lib/utils";
import { type Editor } from "@tiptap/core";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CircleAlertIcon,
  ImagePlusIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  Loader2Icon,
  UnderlineIcon,
} from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FieldError } from "react-hook-form";
import FontSize from "./extensions/font-size";
import ResizableImage from "./extensions/resizable-image";
import "./TextEditor.css";
import ToolbarButton, { ToolbarDivider } from "./Toolbar";
import ColorPickerDropdown from "./toolbar/ColorPickerDropdown";
import FontSizeSelector from "./toolbar/FontSizeSelector";
import ImageToolbar from "./toolbar/ImageToolbar";

interface TextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  className?: string;
  error?: FieldError;
  /** Fixed height of the editable area (scrolls past it). e.g. 300 | "20rem" */
  height?: number | string;
  /** Height the editable area grows from when `height` is not set. */
  minHeight?: number | string;
  /** Height the editable area stops growing at (scrolls past it). */
  maxHeight?: number | string;
  /** Where inserted images are uploaded to. */
  uploadEndpoint?: string;
}

const MARKS = [
  {
    key: "bold",
    label: "Bold",
    Icon: BoldIcon,
    shortcut: ["Mod", "B"],
    run: (editor: Editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    key: "italic",
    label: "Italic",
    Icon: ItalicIcon,
    shortcut: ["Mod", "I"],
    run: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
  },
  {
    key: "underline",
    label: "Underline",
    Icon: UnderlineIcon,
    shortcut: ["Mod", "U"],
    run: (editor: Editor) => editor.chain().focus().toggleUnderline().run(),
  },
] as const;

const ALIGNMENTS = [
  {
    value: "left",
    label: "Align left",
    Icon: AlignLeftIcon,
    shortcut: ["Mod", "Shift", "L"],
  },
  {
    value: "center",
    label: "Align centre",
    Icon: AlignCenterIcon,
    shortcut: ["Mod", "Shift", "E"],
  },
  {
    value: "right",
    label: "Align right",
    Icon: AlignRightIcon,
    shortcut: ["Mod", "Shift", "R"],
  },
  {
    value: "justify",
    label: "Justify",
    Icon: AlignJustifyIcon,
    shortcut: ["Mod", "Shift", "J"],
  },
] as const;

const LISTS = [
  {
    key: "bulletList",
    label: "Bulleted list",
    Icon: ListIcon,
    shortcut: ["Mod", "Shift", "8"],
    run: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    key: "orderedList",
    label: "Numbered list",
    Icon: ListOrderedIcon,
    shortcut: ["Mod", "Shift", "7"],
    run: (editor: Editor) => editor.chain().focus().toggleOrderedList().run(),
  },
] as const;

const TextEditor = ({
  value,
  onChange,
  className,
  error,
  height,
  minHeight = 240,
  maxHeight,
  uploadEndpoint = "/history/upload-image",
}: TextEditorProps) => {
  const { mutateAsync: uploadImage, isPending: isLoading } = usePost<{
    imageUrl: string;
  }>(uploadEndpoint);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // The contextual image toolbar is positioned against this element, so it has
  // to be the nearest positioned ancestor of the editable area.
  const editorShellRef = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Start writing…",
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),

      Document,
      Paragraph,
      Text,
      Bold,
      Underline,
      Italic,
      TextStyle,
      Color,
      FontSize,
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({
        types: ["paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      ResizableImage,
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        // Shares the public pages' rich-text rules (see globals.css) so what
        // the admin composes is laid out by exactly the same CSS that will
        // render it on the site. The padding lives here rather than on a
        // wrapper so the whole writing area, margins included, takes a click.
        class: "rich-text px-5 py-4",
      },
    },
    onCreate: ({ editor }) => {
      editor.chain().setColor("#5C5C5C").run();
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // `useEditor` doesn't re-render on selection changes, so without this the
  // toolbar would keep showing the formatting of wherever the caret was when
  // the text last changed.
  const toolbarState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null;
      const textStyle = editor.getAttributes("textStyle");
      const text = editor.getText({ blockSeparator: " " }).trim();
      return {
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
        // A paragraph with no alignment set renders left-aligned, so show it so.
        align:
          ALIGNMENTS.find(({ value }) => editor.isActive({ textAlign: value }))
            ?.value ?? "left",
        fontSize: String(textStyle.fontSize ?? "").replace("px", ""),
        color: (textStyle.color as string | undefined) ?? null,
        words: text ? text.split(/\s+/).length : 0,
        characters: editor.state.doc.textContent.length,
      };
    },
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await uploadImage({ data: formData });
      const imageUrl = response?.imageUrl;

      if (imageUrl) {
        editor
          ?.chain()
          .focus()
          .setResizableImage({
            src: imageUrl,
            alt: "",
            title: "",
            // Floated at just under half the column by default: the layout
            // admins reach for most often is a photo with the narrative
            // running past it, and starting there saves them a round trip
            // through the toolbar on every insert.
            width: "45%",
            height: "auto",
            wrap: "wrap",
            align: "left",
          })
          .run();
      }
    } catch (err) {
      console.error("Upload failed", err);
      setUploadError("Image upload failed. Please try again.");
    } finally {
      if (e.target) e.target.value = "";
    }
  };

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);
  if (!editor || !toolbarState) return null;

  const setFontSize = (size: string) => {
    const chain = editor.chain().focus();
    (size ? chain.setFontSize(`${size}px`) : chain.unsetFontSize()).run();
  };

  return (
    <div>
      <div
        className={cn(
          "rounded-xl border bg-card shadow-[0_1px_2px_rgb(0_24_54/0.05)]",
          "transition-[border-color,box-shadow] duration-200",
          error
            ? "border-rose-400 focus-within:ring-4 focus-within:ring-rose-500/10"
            : "border-light-silver focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10",
          className
        )}
      >
        {/* Sticky so a long article never scrolls its toolbar out of reach.
            The admin content pane is the scroll container, so `top-0` pins
            it just under the dashboard header. */}
        <div
          role="toolbar"
          aria-label="Text formatting"
          className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 rounded-t-[calc(var(--radius)_+_3px)] border-b border-light-silver bg-light/90 px-2 py-1.5 backdrop-blur-sm"
        >
          <FontSizeSelector
            currentFontSize={toolbarState.fontSize}
            setFontSize={setFontSize}
          />
          <ColorPickerDropdown
            editor={editor}
            currentColor={toolbarState.color}
          />

          <ToolbarDivider />

          {MARKS.map(({ key, label, Icon, shortcut, run }) => (
            <ToolbarButton
              key={key}
              title={label}
              shortcut={shortcut}
              isActive={toolbarState[key]}
              onClick={() => run(editor)}
            >
              <Icon />
            </ToolbarButton>
          ))}

          <ToolbarDivider />

          {ALIGNMENTS.map(({ value, label, Icon, shortcut }) => (
            <ToolbarButton
              key={value}
              title={label}
              shortcut={shortcut}
              isActive={toolbarState.align === value}
              onClick={() => editor.chain().focus().setTextAlign(value).run()}
            >
              <Icon />
            </ToolbarButton>
          ))}

          <ToolbarDivider />

          {LISTS.map(({ key, label, Icon, shortcut, run }) => (
            <ToolbarButton
              key={key}
              title={label}
              shortcut={shortcut}
              isActive={toolbarState[key]}
              onClick={() => run(editor)}
            >
              <Icon />
            </ToolbarButton>
          ))}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            tabIndex={-1}
            aria-hidden
            className="hidden"
          />
          <ToolbarButton
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            title="Insert image"
            className="ml-auto gap-1.5 px-2.5 text-sm font-medium"
          >
            {isLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <ImagePlusIcon />
            )}
            <span className="hidden sm:inline">
              {isLoading ? "Uploading…" : "Image"}
            </span>
          </ToolbarButton>
        </div>

        {/* `isolate` keeps the image toolbar and resize handles stacked
            beneath the sticky toolbar when the content scrolls under it. */}
        <div className="relative isolate" ref={editorShellRef}>
          <EditorContent
            editor={editor}
            className="flex flex-col overflow-y-auto [&>.ProseMirror]:flex-1"
            style={{ height, minHeight, maxHeight }}
          />
          <ImageToolbar editor={editor} boundaryRef={editorShellRef} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-b-[calc(var(--radius)_+_3px)] border-t border-light-silver bg-light/50 px-4 py-2 text-xs text-muted-foreground">
          <span className="tabular-nums">
            {toolbarState.words.toLocaleString()}{" "}
            {toolbarState.words === 1 ? "word" : "words"}
            <span aria-hidden className="mx-1.5 opacity-50">
              ·
            </span>
            {toolbarState.characters.toLocaleString()} characters
          </span>

          {isLoading ? (
            <span className="flex items-center gap-1.5 text-primary">
              <Loader2Icon className="size-3.5 animate-spin" />
              Uploading image…
            </span>
          ) : (
            uploadError && (
              <span
                role="alert"
                className="flex items-center gap-1.5 text-rose-500"
              >
                <CircleAlertIcon className="size-3.5" />
                {uploadError}
              </span>
            )
          )}
        </div>
      </div>

      {error?.message && (
        <div className="text-rose-500 text-xs mt-1.5 pl-1">{error.message}</div>
      )}
    </div>
  );
};

export default TextEditor;
