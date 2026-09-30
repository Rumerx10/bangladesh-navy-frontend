export interface TextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}
export interface ImageAttributes {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
}

export interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
}

export interface ImageUploadResponse {
  url: string;
  width?: number;
  height?: number;
}

/** How an image sits in the text flow.
 *  - `inline`: flows inside a line, like a big character.
 *  - `wrap`:   floats to one side and the paragraph text runs around it.
 *  - `break`:  breaks the flow onto its own band, nothing beside it. */
export type ImageWrap = "inline" | "wrap" | "break";

export type ImageAlign = "left" | "center" | "right";

export type ResizableImageAttributes = Omit<
  ImageAttributes,
  "width" | "height"
> & {
  width?: string;
  height?: string;
  wrap?: ImageWrap;
  align?: ImageAlign;
};

/** The resolved attrs of the image node the caret is currently on, plus where
 *  it sits relative to the editor shell so a floating toolbar can be anchored
 *  to it. */
export interface SelectedImage {
  pos: number;
  src: string;
  alt: string;
  width: string;
  wrap: ImageWrap;
  align: ImageAlign;
  /** Offsets in px from the top-left of the editor shell. */
  top: number;
  left: number;
  imageWidth: number;
  /** Width of the editor shell, so the toolbar can keep itself in view. */
  boundaryWidth: number;
}
