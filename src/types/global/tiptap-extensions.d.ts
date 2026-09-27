// tiptap-extensions.d.ts
import "@tiptap/core";

type ImageWrap = "inline" | "wrap" | "break";
type ImageAlign = "left" | "center" | "right";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    resizableImage: {
      /**
       * Insert a new resizable image with custom attributes
       */
      setResizableImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        width?: string;
        height?: string;
        wrap?: ImageWrap;
        align?: ImageAlign;
      }) => ReturnType;

      /**
       * Update resizable image attributes
       */
      updateResizableImage: (options: {
        width?: string;
        height?: string;
        wrap?: ImageWrap;
        align?: ImageAlign;
      }) => ReturnType;

      /**
       * Change resizable image dimensions
       */
      setResizableImageSize: (width: string, height?: string) => ReturnType;

      /**
       * Set the image width (e.g. "45%"), resetting height to `auto` so the
       * aspect ratio is preserved
       */
      setResizableImageWidth: (width: string) => ReturnType;

      /**
       * Change resizable image wrapping mode
       */
      setResizableImageWrap: (wrap: ImageWrap) => ReturnType;

      /**
       * Change resizable image alignment
       */
      setResizableImageAlign: (align: ImageAlign) => ReturnType;

      /**
       * Set the image's alternative text (also mirrored into `title`)
       */
      setResizableImageAlt: (alt: string) => ReturnType;
    };
  }
}
