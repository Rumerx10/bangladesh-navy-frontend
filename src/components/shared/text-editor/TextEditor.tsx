"use client";
import "./TextEditor.css";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import ToolbarButton from "./Toolbar";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import { useEffect, useRef, useState } from "react";
import { FieldError } from "react-hook-form";
import FontSize from "./extensions/font-size";
import Italic from "@tiptap/extension-italic";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import Placeholder from "@tiptap/extension-placeholder";
import OrderedList from "@tiptap/extension-ordered-list";
import ResizableImage from "./extensions/resizable-image";
import { EditorContent, useEditor } from "@tiptap/react";
import FontSizeSelector from "./toolbar/FontSizeSelector";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import ColorPickerDropdown from "./toolbar/ColorPickerDropdown";

interface TextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  className?: string;
  error?: FieldError;
  onImageUpload?: (file: File) => Promise<string>;
}

const TextEditor = ({
  value,
  onChange,
  className,
  error,
  onImageUpload,
}: TextEditorProps) => {
  const [currentFontSize, setCurrentFontSize] = useState("16");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
      ...(onImageUpload ? [ResizableImage] : []),
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

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !onImageUpload) return;

    setIsUploadingImage(true);
    try {
      const url = await onImageUpload(file);
      editor.chain().focus().setResizableImage({ src: url }).run();
    } finally {
      setIsUploadingImage(false);
    }
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

          {onImageUpload && (
            <>
              <span className="h-10 w-px bg-[#EAECF0]"></span>
              <div className="py-2.5">
                <ToolbarButton
                  onClick={() => imageInputRef.current?.click()}
                  isActive={false}
                  disabled={isUploadingImage}
                  title={isUploadingImage ? "Uploading..." : "Insert Image"}
                >
                  <Image
                    src="/icons/media.svg"
                    alt="Insert image"
                    width={20}
                    height={20}
                    className={cn(isUploadingImage && "opacity-50")}
                  />
                </ToolbarButton>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  className="hidden"
                  onChange={handleImageFileChange}
                />
              </div>
            </>
          )}
        </div>

        {/* EDITOR */}
        <div className="p-3 ">
          <EditorContent editor={editor} className="min-h-32" />
        </div>
      </div>

      {error && error && (
        <div className="text-rose-500 text-xs mt-1 pl-2">{error.message}</div>
      )}
    </div>
  );
};

export default TextEditor;
