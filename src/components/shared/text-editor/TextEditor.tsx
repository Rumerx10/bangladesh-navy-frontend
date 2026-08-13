"use client";
import { usePost } from "@/src/hooks/usePost";
import { cn } from "@/src/lib/utils";
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
import { EditorContent, useEditor } from "@tiptap/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FieldError } from "react-hook-form";
import FontSize from "./extensions/font-size";
import ResizableImage from "./extensions/resizable-image";
import "./TextEditor.css";
import ToolbarButton from "./Toolbar";
import ColorPickerDropdown from "./toolbar/ColorPickerDropdown";
import FontSizeSelector from "./toolbar/FontSizeSelector";
import getCurrentImageWrap from "./utils/getCurrentImageWrap";

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
}

const TextEditor = ({
  value,
  onChange,
  className,
  error,
  height,
  minHeight = 128,
  maxHeight,
}: TextEditorProps) => {
  const { mutateAsync: uploadImage, isPending: isLoading } = usePost<{
    imageUrl: string;
  }>("/history/upload-image");
  const [currentFontSize, setCurrentFontSize] = useState("16");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Write here...",
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
      }),
      ResizableImage,
    ],
    content: value,
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      editor.chain().setColor("#5C5C5C").run();
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
      const size = editor.getAttributes("textStyle").fontSize;
      setCurrentFontSize(size?.replace("px", "") || "");
    },
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
            alt: file.name,
            title: file.name,
            width: "300",
            height: "auto",
          })
          .run();
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed. Please try again.");
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
  if (!editor) return null;

  const setFontSize = (size: string) => {
    if (!size) {
      editor.chain().focus().unsetFontSize().run();
      setCurrentFontSize("");
    } else {
      editor.chain().focus().setFontSize(`${size}px`).run();
      setCurrentFontSize(size);
    }
  };

  const setImageWrap = (wrap: "inline" | "wrap" | "break") => {
    editor.chain().focus().setResizableImageWrap(wrap).run();
  };

  return (
    <div>
      <div
        className={cn(
          `border rounded-md ${error ? "border-rose-500" : "border-light-silver"}`,
          className
        )}
      >
        <div className="flex items-center flex-wrap gap-2  px-2  bg-light w-fit rounded-tl-md">
          <FontSizeSelector
            currentFontSize={currentFontSize}
            setFontSize={setFontSize}
          />
          <span className="h-10 w-px bg-[#EAECF0]"></span>
          <ColorPickerDropdown editor={editor} />
          <span className="h-10 w-px bg-[#EAECF0]"></span>
          <div className="py-2.5">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              title="Bold"
            >
              <Image src="/icons/bold.svg" alt="bold" width={20} height={20} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              title="Italic"
            >
              <Image
                src="/icons/italic.svg"
                alt="bold"
                width={20}
                height={20}
              />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive("underline")}
              title="Underline"
            >
              <Image
                src="/icons/underline.svg"
                alt="Underline"
                width={20}
                height={20}
              />
            </ToolbarButton>
          </div>
          <div className="toolbar-group">
            <span>Text Wrap:</span>
            <ToolbarButton
              onClick={() => setImageWrap("inline")}
              isActive={getCurrentImageWrap(editor) === "inline"}
              title="Inline - Image behaves like text"
            >
              Inline
            </ToolbarButton>
            <ToolbarButton
              onClick={() => setImageWrap("wrap")}
              isActive={getCurrentImageWrap(editor) === "wrap"}
              title="Wrap - Text wraps around image"
            >
              Wrap
            </ToolbarButton>
            <ToolbarButton
              onClick={() => setImageWrap("break")}
              isActive={getCurrentImageWrap(editor) === "break"}
              title="Break - Image breaks text flow"
            >
              Break
            </ToolbarButton>
          </div>

          <span className="h-10 w-px bg-[#EAECF0]"></span>

          <div>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              isActive={editor.isActive({ textAlign: "left" })}
              title="Align Left"
            >
              <Image
                src="/icons/left_align.svg"
                alt="bold"
                width={20}
                height={20}
              />
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              isActive={editor.isActive({ textAlign: "center" })}
              title="Align Center"
            >
              <Image
                src="/icons/center_align.svg"
                alt="bold"
                width={20}
                height={20}
              />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              isActive={editor.isActive({ textAlign: "right" })}
              title="Align Right"
            >
              <Image
                src="/icons/right_align.svg"
                alt="bold"
                width={20}
                height={20}
              />
            </ToolbarButton>
          </div>
          <span className="h-10 w-px bg-[#EAECF0]"></span>

          <div>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              title="Bullet List"
            >
              <Image src="/icons/list.svg" alt="bold" width={20} height={20} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              title="Numbered List"
            >
              <Image
                src="/icons/number.svg"
                alt="bold"
                width={20}
                height={20}
              />
            </ToolbarButton>
          </div>

          <div className="toolbar-group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <ToolbarButton
              onClick={() => fileInputRef.current?.click()}
              isActive={false}
              disabled={isLoading}
              title="Insert Image"
            >
              {isLoading ? "📤" : "🖼️"}
            </ToolbarButton>
          </div>
        </div>

        {/* EDITOR */}
        <div className="p-3 ">
          <EditorContent
            editor={editor}
            className="overflow-y-auto"
            style={{ height, minHeight, maxHeight }}
          />
        </div>
      </div>

      {error && error && (
        <div className="text-rose-500 text-xs mt-1 pl-2">{error.message}</div>
      )}
    </div>
  );
};

export default TextEditor;