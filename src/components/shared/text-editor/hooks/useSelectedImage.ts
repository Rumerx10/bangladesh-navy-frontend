"use client";

import { type Editor } from "@tiptap/core";
import { NodeSelection } from "@tiptap/pm/state";
import { type RefObject, useCallback, useEffect, useState } from "react";
import type { ImageAlign, ImageWrap, SelectedImage } from "../types/editor";

const IMAGE_NODE = "resizableImage";

/** Tracks the image node the admin currently has selected and where it sits
 *  on screen, so the contextual image toolbar can be anchored over it.
 *
 *  Offsets are measured as the difference between two viewport rects (the
 *  image and the editor shell) rather than from `offsetTop`, which means
 *  scrolling the editable area — or the page — keeps the toolbar glued to the
 *  image without any extra bookkeeping. */
const useSelectedImage = (
  editor: Editor | null,
  boundaryRef: RefObject<HTMLElement | null>
): SelectedImage | null => {
  const [selected, setSelected] = useState<SelectedImage | null>(null);

  const measure = useCallback(() => {
    if (!editor) return setSelected(null);

    const { selection } = editor.state;
    if (
      !(selection instanceof NodeSelection) ||
      selection.node.type.name !== IMAGE_NODE
    ) {
      return setSelected(null);
    }

    const boundary = boundaryRef.current;
    const dom = editor.view.nodeDOM(selection.from);
    if (!boundary || !(dom instanceof HTMLElement)) return setSelected(null);

    const rect = dom.getBoundingClientRect();
    const base = boundary.getBoundingClientRect();
    const { attrs } = selection.node;

    setSelected({
      pos: selection.from,
      src: attrs.src ?? "",
      alt: attrs.alt ?? "",
      width: String(attrs.width ?? ""),
      wrap: (attrs.wrap ?? "inline") as ImageWrap,
      align: (attrs.align ?? "left") as ImageAlign,
      top: rect.top - base.top,
      left: rect.left - base.left,
      imageWidth: rect.width,
      boundaryWidth: base.width,
    });
  }, [editor, boundaryRef]);

  useEffect(() => {
    if (!editor) return;

    // Deferred a frame rather than measured inline: on the first pass the
    // editable DOM may not be laid out yet, so every rect would read zero.
    const frame = requestAnimationFrame(measure);

    editor.on("selectionUpdate", measure);
    editor.on("transaction", measure);
    window.addEventListener("resize", measure);
    // `true` so scrolling the editable area itself — not just the window —
    // re-measures; scroll events from inner elements don't bubble.
    window.addEventListener("scroll", measure, true);

    return () => {
      cancelAnimationFrame(frame);
      editor.off("selectionUpdate", measure);
      editor.off("transaction", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [editor, measure]);

  return selected;
};

export default useSelectedImage;
