import {
  mergeAttributes,
  type CommandProps,
  type NodeViewProps,
} from "@tiptap/core";
import Image from "@tiptap/extension-image";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import type {
  ImageAlign,
  ImageWrap,
  ResizableImageAttributes,
} from "../types/editor";

/** Widths are stored as a percentage of the article column, not raw pixels, so
 *  an image keeps the proportion the admin chose on every screen width — a
 *  300px float that looked right on a desktop editor used to eat a phone's
 *  whole text column. Legacy content saved in px still parses and renders. */
const MIN_WIDTH_PERCENT = 10;
const MAX_WIDTH_PERCENT = 100;
const DEFAULT_WIDTH = "45%";

export const IMAGE_WIDTH_PRESETS = ["25%", "40%", "60%", "100%"] as const;

const clampPercent = (percent: number): number =>
  Math.min(MAX_WIDTH_PERCENT, Math.max(MIN_WIDTH_PERCENT, Math.round(percent)));

/** Accepts `300`, `"300"`, `"300px"`, `"45%"` — anything already carrying a
 *  unit passes through untouched, bare numbers become px. */
const toCssSize = (value?: string | number | null): string | undefined => {
  if (value === undefined || value === null || value === "") return undefined;
  const raw = String(value).trim();
  if (raw === "auto") return "auto";
  if (/^-?\d*\.?\d+$/.test(raw)) return `${Math.round(Number(raw))}px`;
  return raw;
};

const normaliseWrap = (value?: string | null): ImageWrap =>
  value === "wrap" || value === "break" || value === "inline"
    ? value
    : "inline";

const normaliseAlign = (value?: string | null): ImageAlign =>
  value === "center" || value === "right" || value === "left" ? value : "left";

/** One gap governs every edge where an image meets text, in every wrap mode:
 *  16px. Horizontally the margin *is* that gap. Vertically it is not — the
 *  line that flows under an image carries half of its leading above the
 *  glyphs — so the block margin is shortened by that half-leading to land on
 *  the same 16px optically. `em` resolves against the image's inherited font
 *  size, so the correction tracks whatever type size the column is set in. */
const GAP = "1rem";
const GAP_BLOCK = "calc(1rem - 0.5em)";

/** The layout half of an image's inline style — shared by `renderHTML` (the
 *  HTML that gets saved) and by the interactive node view (what the admin sees
 *  while editing) so the two can never drift apart.
 *
 *  Inside this app the `.image-wrap-*` rules in globals.css override these
 *  with `!important`, which is what lets already-saved articles pick up a
 *  change to the numbers; the inline style is what any consumer of the
 *  exported HTML outside the app sees. Keep the two in sync. */
const getWrapStyle = (wrap: ImageWrap, align: ImageAlign): string => {
  if (wrap === "wrap") {
    // The gutter between the image and the text running past it is the whole
    // point of this mode. The top offset is not a gap — it nudges the picture
    // down so its top edge lines up with the first line's glyphs rather than
    // with that line's box.
    return align === "right"
      ? ` float: right; margin: 0.35rem 0 ${GAP_BLOCK} ${GAP};`
      : ` float: left; margin: 0.35rem ${GAP} ${GAP_BLOCK} 0;`;
  }

  if (wrap === "break") {
    const margin =
      align === "right"
        ? `${GAP_BLOCK} 0 ${GAP_BLOCK} auto`
        : align === "center"
          ? `${GAP_BLOCK} auto`
          : `${GAP_BLOCK} auto ${GAP_BLOCK} 0`;
    return ` display: block; float: none; clear: both; margin: ${margin};`;
  }

  return " display: inline-block; float: none; vertical-align: middle; margin: 0 0.5rem;";
};

const ResizableImage = Image.extend({
  name: "resizableImage",

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: DEFAULT_WIDTH,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-width") ||
          element.style.width ||
          DEFAULT_WIDTH,
        renderHTML: () => ({}),
      },
      height: {
        default: "auto",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-height") || element.style.height || "auto",
        renderHTML: () => ({}),
      },
      wrap: {
        default: "wrap",
        parseHTML: (element: HTMLElement) =>
          normaliseWrap(element.getAttribute("data-wrap")),
        renderHTML: () => ({}),
      },
      align: {
        default: "left",
        parseHTML: (element: HTMLElement) =>
          normaliseAlign(element.getAttribute("data-align")),
        renderHTML: () => ({}),
      },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const width = toCssSize(node.attrs.width) ?? DEFAULT_WIDTH;
    const height = toCssSize(node.attrs.height) ?? "auto";
    const wrap = normaliseWrap(node.attrs.wrap);
    const align = normaliseAlign(node.attrs.align);

    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-width": width,
        "data-height": height,
        "data-wrap": wrap,
        "data-align": align,
        class: `resizable-image image-wrap-${wrap} image-align-${align}`,
        style:
          `width: ${width}; height: ${height}; max-width: 100%;` +
          getWrapStyle(wrap, align),
      }),
    ];
  },

  addCommands() {
    return {
      setResizableImage:
        (options: ResizableImageAttributes) =>
        ({ chain }: CommandProps) => {
          const { width, height, wrap, align, ...baseAttrs } = options;
          const attrs: Record<string, unknown> = {
            ...baseAttrs,
            width: toCssSize(width) ?? DEFAULT_WIDTH,
            height: toCssSize(height) ?? "auto",
            wrap: normaliseWrap(wrap),
            align: normaliseAlign(align),
          };
          return (
            chain()
              .insertContent({ type: this.name, attrs })
              // The image is a block node, so `insertContent` leaves the
              // cursor as a NodeSelection *on* the image whenever there is no
              // text position right after it (e.g. it was inserted at the end
              // of the doc). Typing then replaces the selected node — which is
              // why a freshly inserted image vanished on the next keystroke.
              // Drop a paragraph after it when needed and park the cursor there.
              .command(({ tr, dispatch }) => {
                const posAfterImage = tr.selection.to;
                const nodeAfter = tr.doc.nodeAt(posAfterImage);

                if (!dispatch) return true;

                if (!nodeAfter?.isTextblock) {
                  const paragraph = tr.doc.type.schema.nodes.paragraph.create();
                  tr.insert(posAfterImage, paragraph);
                }

                tr.setSelection(
                  TextSelection.near(tr.doc.resolve(posAfterImage))
                );
                return true;
              })
              .run()
          );
        },

      updateResizableImage:
        (options: Partial<ResizableImageAttributes>) =>
        ({ chain }: CommandProps) => {
          const updateAttrs: Record<string, unknown> = { ...options };
          if (options.width) updateAttrs.width = toCssSize(options.width);
          if (options.height) updateAttrs.height = toCssSize(options.height);
          return chain().updateAttributes(this.name, updateAttrs).run();
        },

      setResizableImageSize:
        (width: string, height: string = "auto") =>
        ({ chain }: CommandProps) =>
          chain()
            .updateAttributes(this.name, {
              width: toCssSize(width),
              height: height === "auto" ? "auto" : toCssSize(height),
            })
            .run(),

      /** Percentage presets from the image toolbar. Height always resets to
       *  `auto` so a preset can never leave an image stretched out of ratio by
       *  an explicit height an older edit had baked in. */
      setResizableImageWidth:
        (width: string) =>
        ({ chain }: CommandProps) =>
          chain()
            .updateAttributes(this.name, {
              width: toCssSize(width),
              height: "auto",
            })
            .run(),

      setResizableImageWrap:
        (wrap: ImageWrap) =>
        ({ chain, state }: CommandProps) => {
          const attrs: Record<string, unknown> = { wrap };
          // `center` has no meaning for a float — the text has to run down one
          // side or the other — so switching a centred image into wrap mode
          // falls back to a left float instead of keeping an alignment the
          // renderer would silently ignore.
          const selected =
            state.selection instanceof NodeSelection
              ? state.selection.node
              : null;
          if (wrap === "wrap" && selected?.attrs.align === "center") {
            attrs.align = "left";
          }
          return chain().updateAttributes(this.name, attrs).run();
        },

      setResizableImageAlign:
        (align: ImageAlign) =>
        ({ chain }: CommandProps) =>
          chain().updateAttributes(this.name, { align }).run(),

      setResizableImageAlt:
        (alt: string) =>
        ({ chain }: CommandProps) =>
          chain().updateAttributes(this.name, { alt, title: alt }).run(),
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
      const badge = document.createElement("span");
      badge.className = "rt-size-badge";

      // The percentage width lives on the *container*, not on the `img`. A
      // percentage resolves against the containing block, and a shrink-to-fit
      // float sized by its own child is circular — browsers resolve it against
      // the image's intrinsic width, so "45%" silently meant "45% of the
      // photo" instead of "45% of the column". Sizing the container against
      // the editor column and letting the img fill it keeps the editor honest
      // about what the public page will do with the serialized `<img>`.
      img.className = "resizable-image";
      img.draggable = false;

      const corners = ["nw", "ne", "sw", "se"] as const;
      type Corner = (typeof corners)[number];

      const handles = corners.map((corner) => {
        const handle = document.createElement("span");
        handle.className = `resize-handle resize-handle--${corner}`;
        handle.dataset.corner = corner;
        return handle;
      });

      const applyAttrs = (current: typeof node) => {
        const wrap = normaliseWrap(current.attrs.wrap);
        const align = normaliseAlign(current.attrs.align);
        const width = toCssSize(current.attrs.width) ?? DEFAULT_WIDTH;

        dom.className = `image-resize-container image-wrap-${wrap} image-align-${align}`;
        dom.setAttribute("data-wrap", wrap);
        dom.setAttribute("data-align", align);
        dom.style.cssText = `width: ${width}; max-width: 100%;${getWrapStyle(wrap, align)}`;

        img.src = current.attrs.src;
        img.alt = current.attrs.alt || "";
        img.title = current.attrs.title || "";
        badge.textContent = width;
      };

      applyAttrs(node);

      dom.appendChild(img);
      dom.appendChild(badge);
      handles.forEach((handle) => dom.appendChild(handle));

      let isSelected = false;

      const renderSelection = () => {
        dom.classList.toggle("is-selected", isSelected);
      };

      const selectSelf = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const pos = getPos();
        if (pos === undefined) return;
        editor.commands.setNodeSelection(pos);
      };

      img.addEventListener("click", selectSelf);

      const updateSelection = () => {
        const { selection } = editor.state;
        const pos = getPos();
        if (pos === undefined) return;
        isSelected =
          selection.from <= pos && selection.to >= pos + node.nodeSize;
        renderSelection();
      };

      editor.on("selectionUpdate", updateSelection);

      // ---- Resize -----------------------------------------------------
      // Width-only, so the aspect ratio can never be destroyed: dragging any
      // corner changes the column share and the height follows from `auto`.
      // The left-hand corners grow the image as the pointer moves left, which
      // is what makes a right-floated image feel natural to resize.
      let isResizing = false;
      let startX = 0;
      let startWidthPx = 0;
      let columnWidth = 1;
      let activeCorner: Corner = "se";
      let pendingWidth: string | null = null;

      const resize = (event: MouseEvent) => {
        if (!isResizing) return;
        const direction =
          activeCorner === "ne" || activeCorner === "se" ? 1 : -1;
        const nextPx = startWidthPx + (event.clientX - startX) * direction;
        const percent = clampPercent((nextPx / columnWidth) * 100);
        pendingWidth = `${percent}%`;
        dom.style.width = pendingWidth;
        badge.textContent = pendingWidth;
      };

      const stopResize = () => {
        if (!isResizing) return;
        isResizing = false;
        dom.classList.remove("is-resizing");
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);

        const pos = getPos();
        if (pos === undefined || !pendingWidth) return;

        const { state, dispatch } = editor.view;
        const target = state.doc.nodeAt(pos);
        if (target?.type.name !== node.type.name) return;

        dispatch(
          state.tr.setNodeMarkup(pos, undefined, {
            ...target.attrs,
            width: pendingWidth,
            height: "auto",
          })
        );
        pendingWidth = null;
      };

      const startResize = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        activeCorner =
          ((event.currentTarget as HTMLElement).dataset.corner as Corner) ||
          "se";
        isResizing = true;
        startX = event.clientX;
        startWidthPx = dom.getBoundingClientRect().width;
        // The column the width is a percentage *of* — measured live so a
        // resize is correct whether the editor is full width or squeezed into
        // a narrow admin panel.
        columnWidth = editor.view.dom.clientWidth || startWidthPx || 1;
        dom.classList.add("is-resizing");

        const pos = getPos();
        if (pos !== undefined) editor.commands.setNodeSelection(pos);

        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
      };

      handles.forEach((handle) =>
        handle.addEventListener("mousedown", startResize)
      );

      return {
        dom,
        // Without this, ProseMirror can't patch the view in place when attrs
        // change (e.g. right after a resize commits, or on undo/redo) — it
        // falls back to destroying and rebuilding the whole node, which is
        // where the "resize doesn't stick" symptom came from. Updating in
        // place also keeps `node` (and therefore any attrs read during a
        // *second* resize) current.
        update: (updatedNode: typeof node) => {
          if (updatedNode.type !== node.type) return false;
          node = updatedNode;
          if (!isResizing) applyAttrs(node);
          return true;
        },
        destroy: () => {
          img.removeEventListener("click", selectSelf);
          handles.forEach((handle) =>
            handle.removeEventListener("mousedown", startResize)
          );
          document.removeEventListener("mousemove", resize);
          document.removeEventListener("mouseup", stopResize);
          editor.off("selectionUpdate", updateSelection);
        },
      };
    };
  },
});

export default ResizableImage;
