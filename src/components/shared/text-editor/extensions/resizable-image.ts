import { type CommandProps, type NodeViewProps } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import { ResizableImageAttributes } from "../types/editor";

// Attrs are stored as CSS length strings (e.g. "300px") to match the
// schema default — a bare number serializes to invalid CSS ("width: 350;"
// has no unit and gets dropped by the browser), which is what made resized
// images silently fall back to their natural size after a save/reload.
const toPx = (value?: string | number): string | undefined => {
  if (value === undefined || value === null || value === "") return undefined;
  return typeof value === "number" || /^\d+$/.test(String(value))
    ? `${parseInt(String(value), 10)}px`
    : String(value);
};

const ResizableImage = Image.extend({
  name: "resizableImage",

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: "300px",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-width") || element.style.width || "300px",
        renderHTML: (attributes: ResizableImageAttributes) => {
          const { width, height, wrap, align } = attributes;
          let style = `width: ${width}; height: ${
            height || "auto"
          }; max-width: 100%;`;

          if (wrap === "inline") {
            style += " display: inline; vertical-align: middle; margin: 0 4px;";
          } else if (wrap === "wrap") {
            if (align === "left") {
              style += " float: left; margin: 0 12px 6px 0; clear: both;";
            } else if (align === "right") {
              style += " float: right; margin: 0 0 6px 12px; clear: both;";
            } else {
              style += " float: left; margin: 0 12px 6px 0; clear: both;";
            }
          } else if (wrap === "break") {
            if (align === "center") {
              style +=
                " display: block; margin: 12px auto; float: none; clear: both;";
            } else if (align === "right") {
              style +=
                " display: block; margin: 12px 0 12px auto; float: none; clear: both;";
            } else {
              style +=
                " display: block; margin: 12px auto; float: none; clear: both;";
            }
          }

          return {
            "data-width": width,
            "data-height": height,
            "data-wrap": wrap,
            "data-align": align,
            class: `resizable-image image-wrap-${wrap} image-align-${
              align || "left"
            }`,
            style,
          };
        },
      },
      height: {
        default: "auto",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-height") || element.style.height || "auto",
        renderHTML: () => ({}),
      },
      wrap: {
        default: "inline",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-wrap") || "inline",
        renderHTML: () => ({}),
      },
      align: {
        default: "left",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-align") || "left",
        renderHTML: () => ({}),
      },
    };
  },

  addCommands() {
    return {
      setResizableImage:
        (options: ResizableImageAttributes) =>
        ({ commands }: CommandProps) => {
          const { width, height, wrap, align, ...baseAttrs } = options;
          const attrs: Record<string, unknown> = {
            ...baseAttrs,
            width: toPx(width),
            height: toPx(height),
          };
          if (wrap) attrs.wrap = wrap;
          if (align) attrs.align = align;
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
      updateResizableImage:
        (options: Partial<ResizableImageAttributes>) =>
        ({ chain }: CommandProps) => {
          const updateAttrs: Record<string, unknown> = { ...options };
          if (options.width) updateAttrs.width = toPx(options.width);
          if (options.height) updateAttrs.height = toPx(options.height);
          return chain().updateAttributes(this.name, updateAttrs).run();
        },
      setResizableImageSize:
        (width: string, height: string = "auto") =>
        ({ chain }: CommandProps) => {
          const attrs: Record<string, unknown> = { width: toPx(width) };
          if (height !== "auto") attrs.height = toPx(height);
          return chain().updateAttributes(this.name, attrs).run();
        },
      setResizableImageWrap:
        (wrap: "inline" | "wrap" | "break") =>
        ({ chain }: CommandProps) =>
          chain().updateAttributes(this.name, { wrap }).run(),
      setResizableImageAlign:
        (align: "left" | "center" | "right") =>
        ({ chain }: CommandProps) =>
          chain().updateAttributes(this.name, { align }).run(),
    };
  },

  addNodeView() {
    const editor = this.editor;
    return (props: unknown) => {
      const { node: initialNode, getPos } = props as unknown as NodeViewProps;
      // Reassigned on every `update()` call so the resize/select handlers
      // always read the node's current attrs instead of a stale snapshot
      // captured only when the view was first created.
      let node = initialNode;

      const dom = document.createElement("span");
      const img = document.createElement("img");
      img.className = "resizable-image";

      const applyAttrs = (n: typeof node) => {
        dom.className = `image-resize-container image-wrap-${n.attrs.wrap}`;
        dom.setAttribute("data-wrap", n.attrs.wrap);

        img.src = n.attrs.src;
        img.alt = n.attrs.alt || "";
        img.title = n.attrs.title || "";
        img.style.width = toPx(n.attrs.width) ?? "300px";
        img.style.height = (n.attrs.height && toPx(n.attrs.height)) || "auto";
        img.style.maxWidth = "100%";

        // Apply wrapping styles
        switch (n.attrs.wrap) {
          case "wrap":
            img.style.float = "left";
            img.style.marginRight = "12px";
            img.style.marginBottom = "6px";
            img.style.display = "block";
            img.style.verticalAlign = "";
            img.style.margin = "0 12px 6px 0";
            break;
          case "break":
            img.style.display = "block";
            img.style.margin = "12px auto";
            img.style.float = "none";
            break;
          default:
            img.style.display = "inline";
            img.style.verticalAlign = "middle";
            img.style.margin = "0 20px";
            img.style.float = "none";
        }
      };

      applyAttrs(node);

      // Resize handle
      const resizeHandle = document.createElement("div");
      resizeHandle.className = "resize-handle";
      resizeHandle.innerHTML = "↘";
      resizeHandle.style.cssText = `
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 12px;
        height: 12px;
        background: #3b82f6;
        border: 1px solid white;
        border-radius: 2px;
        cursor: se-resize;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        color: white;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 10;
      `;

      dom.appendChild(img);
      dom.appendChild(resizeHandle);

      let isSelected = false;

      const updateResizeHandle = () => {
        resizeHandle.style.opacity = isSelected ? "1" : "0";
      };

      const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const pos = getPos();
        if (pos !== undefined) {
          editor.commands.setNodeSelection(pos);
          isSelected = true;
          updateResizeHandle();
        }
      };

      img.addEventListener("click", handleClick);

      const updateSelection = () => {
        const { selection } = editor.state;
        const pos = getPos();
        if (pos === undefined) return;
        isSelected =
          selection.from <= pos && selection.to >= pos + node.nodeSize;
        updateResizeHandle();
      };

      editor.on("selectionUpdate", updateSelection);

      // Resize logic
      let isResizing = false;
      let startX = 0,
        startY = 0,
        startWidth = 0,
        startHeight = 0;

      const startResize = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(img.style.width) || img.offsetWidth;
        startHeight = parseInt(img.style.height) || img.offsetHeight;

        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
      };

      const resize = (e: MouseEvent) => {
        if (!isResizing) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const newWidth = Math.max(50, startWidth + deltaX);
        const newHeight = Math.max(50, startHeight + deltaY);
        img.style.width = `${newWidth}px`;
        img.style.height = `${newHeight}px`;
      };

      const stopResize = () => {
        if (!isResizing) return;
        isResizing = false;
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);

        const pos = getPos();
        if (pos !== undefined) {
          editor.commands.command(({ tr }: Record<string, unknown>) => {
            const transaction = tr as {
              setNodeMarkup: (
                pos: number,
                type: unknown,
                attrs: Record<string, unknown>
              ) => void;
            };
            transaction.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              width: toPx(img.style.width),
              height: toPx(img.style.height),
            });
            return true;
          });
        }
      };

      resizeHandle.addEventListener("mousedown", startResize);

      return {
        dom,
        // Without this, ProseMirror can't patch the view in place when
        // attrs change (e.g. right after a resize commits, or on
        // undo/redo) — it falls back to destroying and rebuilding the
        // whole node, which is where the "resize doesn't stick" symptom
        // came from. Updating in place also keeps `node` (and therefore
        // any attrs read during a *second* resize) current.
        update: (updatedNode: typeof node) => {
          if (updatedNode.type !== node.type) return false;
          node = updatedNode;
          if (!isResizing) applyAttrs(node);
          return true;
        },
        destroy: () => {
          img.removeEventListener("click", handleClick);
          resizeHandle.removeEventListener("mousedown", startResize);
          document.removeEventListener("mousemove", resize);
          document.removeEventListener("mouseup", stopResize);
          editor.off("selectionUpdate", updateSelection);
        },
      };
    };
  },
});

export default ResizableImage;
