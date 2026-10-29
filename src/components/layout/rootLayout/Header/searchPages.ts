/**
 * The public pages site search can jump to — shared by the desktop header
 * search (SiteSearch) and the mobile menu's search so both offer the same
 * pages with the same, working links.
 */

export interface SearchPage {
  label: string;
  href: string;
  section: string;
  /** Other words the page should answer to. */
  keywords?: string;
}

export const SEARCH_PAGES: SearchPage[] = [
  { label: "Home", href: "/", section: "Main" },
  { label: "About Us", href: "/about", section: "About", keywords: "bnhoc" },
  {
    label: "Chief Hydrographer Message",
    href: "/about/chief-hydrographer-message",
    section: "About",
  },
  { label: "History", href: "/about/history", section: "About" },
  {
    label: "Vision & Mission",
    href: "/about/vision-mission",
    section: "About",
    keywords: "goals",
  },
  {
    label: "Organogram",
    href: "/about/organogram",
    section: "About",
    keywords: "organisation organization structure",
  },
  {
    label: "Survey Ships",
    href: "/about/survey-ships",
    section: "About",
    keywords: "vessels fleet",
  },
  {
    label: "Gallery",
    href: "/about/gallery",
    section: "About",
    keywords: "photos pictures images",
  },
  {
    label: "News & Events",
    href: "/about/news",
    section: "About",
    keywords: "updates",
  },
  {
    label: "Nautical Products",
    href: "/product-service",
    section: "Products",
    keywords: "charts catalogue",
  },
  {
    label: "Paper Chart Index",
    href: "/product-service/paper-charts",
    section: "Products",
    keywords: "paper charts map",
  },
  {
    label: "Electronic Chart Index (ENC)",
    href: "/product-service/electronic-navigational-charts",
    section: "Products",
    keywords: "electronic charts enc cells",
  },
  {
    label: "Tide Tables",
    href: "/product-service/tide-tables",
    section: "Products",
    keywords: "tidal tide stations",
  },
  {
    label: "How to Collect",
    href: "/how-to-collect",
    section: "Products",
    keywords: "buy order purchase payment",
  },
  {
    label: "Notices to Mariners",
    href: "/important-notice/notices",
    section: "Notices",
    keywords: "ntm notice warnings",
  },
  {
    label: "Publications",
    href: "/important-notice/publications",
    section: "Notices",
    keywords: "books downloads",
  },
  {
    label: "Hydrographic Note",
    href: "/important-notice/hydrographic-note",
    section: "Notices",
    keywords: "report hazard",
  },
  {
    label: "BN Hydrographic Institute",
    href: "/training-courses",
    section: "Training",
    keywords: "institute training school",
  },
  {
    label: "Courses",
    href: "/training-courses/courses",
    section: "Training",
    keywords: "course statistics training",
  },
  {
    label: "Alumni",
    href: "/training-courses/alumni",
    section: "Training",
    keywords: "graduates batches",
  },
  {
    label: "Contact Information",
    href: "/contact-us/information",
    section: "Contact",
    keywords: "phone email address",
  },
  {
    label: "Query & Suggestion",
    href: "/contact-us/query-suggestion",
    section: "Contact",
    keywords: "feedback question",
  },
];

/** Pages whose label, section or keywords contain every term (lower-case). */
export const findPages = (terms: string[], limit: number) =>
  terms.length === 0
    ? []
    : SEARCH_PAGES.filter((page) => {
        const text =
          `${page.label} ${page.section} ${page.keywords ?? ""}`.toLowerCase();
        return terms.every((term) => text.includes(term));
      }).slice(0, limit);
