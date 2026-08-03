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
// italic, underline, lists, links) but drop inline `style`/`class` so the
// article always inherits the page's own typography instead of whatever
// color/font-size the editor happened to save.
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
    ],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
}
