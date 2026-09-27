/** Typography for rendered TipTap output.
 *
 *  The layout half of an image — its width, which side it floats to, the
 *  gutter beside it — is carried by the image itself (see
 *  `extensions/resizable-image.ts` and the `.rich-text` rules in
 *  globals.css). What is left is typography, and it lives here so the admin
 *  preview and the public page are styled by one string instead of two that
 *  slowly diverge. Image widths are percentages of the text column, so the
 *  same content reads correctly in a narrow admin panel and a wide article.
 */
// The body colour is not here: `.rich-text` sets it from `--prose-ink` in
// globals.css so it can follow the theme, which a baked-in hex could not.
export const richTextNarrativeClass =
  "rich-text leading-[1.9] " +
  // Justified text beside a float is the classic magazine setting, but a
  // phone column is too narrow for it — the word spacing tears open.
  "text-left sm:text-justify hyphens-auto " +
  "[&_p]:mb-5 [&_p:last-child]:mb-0 " +
  "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 " +
  "[&_li]:mb-2 [&_li]:marker:text-primary " +
  "[&_img]:shadow-md [&_a]:text-primary [&_a]:underline";
