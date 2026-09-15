import DOMPurify from "dompurify";
import parse from "html-react-parser";

export function sanitizer(description: string) {
  const text = DOMPurify.sanitize(description, {
    FORBID_TAGS: ["strong", "b", "em"],
  });
  return parse(text);
}

// Rich text from the TipTap editor carries per-run inline styles (color,
// font-size). Good for the editor, but a card excerpt should always look
// like the surrounding UI — so tags are stripped and only the text survives.
export function htmlToPlainText(html?: string): string {
  if (!html) return "";
  if (typeof window === "undefined") {
    return html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] })
    .replace(/\s+/g, " ")
    .trim();
}

// For full article bodies: keep the admin's semantic formatting (bold,
// italic, underline, lists, links, images, paragraph alignment) but drop
// per-run color/font-size so the article always inherits the page's own
// typography instead of whatever the editor happened to save — that's why
// `span` (the tag TipTap's Color/FontSize marks wrap text in) is deliberately
// left out of ALLOWED_TAGS: DOMPurify strips the tag and its style with it,
// keeping only the text. `style`/`class`/`data-*` stay allowed because `img`
// and `p` are the only tags that legitimately carry them here — `img` for
// the wrap/align/size the admin chose (see resizable-image.ts and the public
// `.image-wrap-*` rules in globals.css), `p` for text-align (incl. justify).
export function sanitizeRichText(html?: string): string {
  if (!html) return "";
  if (typeof window === "undefined") return html;
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "ul",
      "ol",
      "li",
      "a",
      "img",
    ],
    ALLOWED_ATTR: [
      "href",
      "target",
      "rel",
      "src",
      "alt",
      "title",
      "style",
      "class",
      "data-width",
      "data-height",
      "data-wrap",
      "data-align",
    ],
  });
}
