/**
 * ENC (Electronic Navigational Chart) cell hotspots for the interactive
 * catalogue page (/electronic-chart).
 *
 * Coordinates are in a fixed 3072x2205 viewBox that matches the pixel
 * dimensions of /public/chart/enc-index.jpg (the "Catalogue of ENC Cell"
 * map extracted from HP001_2026 DRAFT). They are digitized against the
 * printed purple coverage rectangles and calibrated with a rendered
 * overlay; tune any entry here and the map follows. Set DEBUG_OUTLINES in
 * ElectronicChartMap.tsx to outline every hotspot while calibrating.
 *
 * Metadata (title/INT/national no/scale/dates) is transcribed from the
 * "Index of ENC Cell" table, which is the authoritative source. A cell that
 * is in that index but not drawn on the catalogue map (BD501501) is still
 * listed here with its hotspot geometry omitted — the admin Chart Code
 * picker needs every cell, the map only renders the ones it can place.
 */

export const ENC_VIEWBOX = { w: 3072, h: 2205 };

export interface IEncCell {
  /** ENC cell number, e.g. "BD307425" */
  cellNo: string;
  /** International (INT) chart designation when assigned, e.g. "INT 7425" */
  intNo?: string;
  /** National chart number, e.g. "35001" */
  nationalNo: string;
  /** Title of chart as printed in the index */
  title: string;
  /** Compilation scale, e.g. "1:180 000" */
  scale: string;
  /** Date of publication, e.g. "14 Mar 2019" */
  published?: string;
  /** New edition number / date, e.g. "Ed No. 03, 26 May 2025" */
  edition?: string;
  /**
   * Hotspot geometry. Omitted for cells that are listed in the "Index of ENC
   * Cell" table but not drawn on the catalogue map — those are still valid
   * products, they just have nothing to click on the map.
   */
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

/** An entry that is actually drawn on the catalogue map. */
export type IEncCellWithHotspot = IEncCell &
  Required<Pick<IEncCell, "x" | "y" | "w" | "h">>;

export const encIndexAreas: IEncCell[] = [
  // ── Chattogram / Karnaphuli ──────────────────────────────────────
  {
    cellNo: "BD507427",
    intNo: "INT 7427",
    nationalNo: "3001",
    title: "Chattogram Harbour",
    scale: "1:22 000",
    published: "14 Mar 2019",
    edition: "Ed No. 03, 13 Mar 2024",
    x: 2194,
    y: 528,
    w: 138,
    h: 230,
  },
  {
    cellNo: "BD407428",
    intNo: "INT 7428",
    nationalNo: "7510",
    title: "Approaches to Chattogram",
    scale: "1:45 000",
    published: "08 Aug 2019",
    edition: "Ed No. 03, 13 Mar 2024",
    x: 2041,
    y: 535,
    w: 504,
    h: 517,
  },

  // ── Kutubdia / Maiskhali / Cox's Bazar ───────────────────────────
  {
    cellNo: "BD503506",
    nationalNo: "3506",
    title: "Kutubdia Channel and Adjoining Area",
    scale: "1:22 000",
    published: "26 Sep 2021",
    edition: "Ed No. 02, 06 Oct 2025",
    x: 2219,
    y: 855,
    w: 169,
    h: 133,
  },
  {
    // Drawn as "BD507455" on the draft catalogue; finalized as BD503003.
    cellNo: "BD503003",
    nationalNo: "3003",
    title: "Matarbari Harbour",
    scale: "1:22 000",
    published: "09 Mar 2023",
    edition: "Ed No. 02, 06 Oct 2025",
    x: 2219,
    y: 988,
    w: 169,
    h: 248,
  },
  {
    cellNo: "BD407429",
    intNo: "INT 7429",
    nationalNo: "7511",
    title: "Elephant Point to Matarbari Island",
    scale: "1:45 000",
    published: "19 Sep 2019",
    edition: "Ed No. 03, 26 May 2025",
    x: 2190,
    y: 1050,
    w: 295,
    h: 520,
  },

  // ── St Martin's Island / Teknaf ──────────────────────────────────
  {
    cellNo: "BD503501",
    nationalNo: "3501",
    title: "St. Martin's Island and Adjoining Area",
    scale: "1:22 000",
    published: "08 Jun 2021",
    edition: "Ed No. 05, 23 Sep 2024",
    x: 2580,
    y: 1760,
    w: 165,
    h: 235,
  },
  {
    cellNo: "BD407512",
    nationalNo: "7512",
    title: "St. Martin's Island to Teknaf",
    scale: "1:45 000",
    published: "25 Nov 2024",
    x: 2440,
    y: 1700,
    w: 360,
    h: 350,
  },

  // ── Pussur River / Mongla (INT 7451 & 7452, two panels each) ─────
  {
    cellNo: "BD57451B",
    intNo: "INT 7451",
    nationalNo: "2508",
    title: "Pussur River - Joyman Reach to Mongla Port",
    scale: "1:22 000",
    published: "03 Oct 2019",
    edition: "Ed No. 03, 26 May 2025",
    x: 600,
    y: 378,
    w: 92,
    h: 122,
  },
  {
    cellNo: "BD57451A",
    intNo: "INT 7451",
    nationalNo: "2508",
    title: "Pussur River - Monkey Point to Joyman Reach",
    scale: "1:22 000",
    published: "24 Oct 2019",
    edition: "Ed No. 03, 26 May 2025",
    x: 600,
    y: 488,
    w: 92,
    h: 110,
  },
  {
    cellNo: "BD57452B",
    intNo: "INT 7452",
    nationalNo: "3004",
    title: "Pussur River - Ghusaingari Khal to Monkey Point",
    scale: "1:22 000",
    published: "26 Sep 2019",
    edition: "Ed No. 03, 26 May 2025",
    x: 578,
    y: 605,
    w: 85,
    h: 165,
  },
  {
    cellNo: "BD57452A",
    intNo: "INT 7452",
    nationalNo: "3004",
    title: "Pussur River - Trikona Island to Ghusaingari Khal",
    scale: "1:22 000",
    published: "26 Sep 2019",
    edition: "Ed No. 03, 26 May 2025",
    x: 540,
    y: 758,
    w: 118,
    h: 175,
  },

  // ── Payra ────────────────────────────────────────────────────────
  {
    cellNo: "BD507453",
    intNo: "INT 7453",
    nationalNo: "3002",
    title: "Payra Harbour",
    scale: "1:22 000",
    published: "19 Sep 2019",
    edition: "Ed No. 03, 26 May 2025",
    x: 1128,
    y: 758,
    w: 150,
    h: 218,
  },
  {
    cellNo: "BD407454",
    intNo: "INT 7454",
    nationalNo: "7504",
    title: "Approaches to Payra Harbour",
    scale: "1:45 000",
    published: "19 Sep 2019",
    edition: "Ed No. 04, 26 May 2025",
    x: 920,
    y: 905,
    w: 415,
    h: 595,
  },

  // ── Hiran Point (Sundarbans approaches) ──────────────────────────
  {
    cellNo: "BD407426",
    intNo: "INT 7426",
    nationalNo: "5001",
    title: "Approaches to Hiran Point",
    scale: "1:45 000",
    published: "17 Oct 2019",
    edition: "Ed No. 03, 26 May 2025",
    x: 430,
    y: 905,
    w: 280,
    h: 370,
  },

  // ── Mid-scale coastal charts (1:150 000) ─────────────────────────
  {
    cellNo: "BD330001",
    nationalNo: "30001",
    title: "Hariabhanga River to Char Fasson",
    scale: "1:150 000",
    published: "25 Nov 2023",
    x: 270,
    y: 378,
    w: 1186,
    h: 600,
  },
  {
    cellNo: "BD330002",
    nationalNo: "30002",
    title: "Char Fasson to St. Martin's Island",
    scale: "1:150 000",
    published: "25 Nov 2023",
    x: 1456,
    y: 535,
    w: 1284,
    h: 1185,
  },

  // ── Overview charts (extend across the frame; drawn under the rest) ─
  {
    cellNo: "BD307425",
    intNo: "INT 7425",
    nationalNo: "35001",
    title: "Malancha River to St Martin's Island",
    scale: "1:180 000",
    published: "14 Mar 2019",
    x: 265,
    y: 378,
    w: 2475,
    h: 1632,
  },
  {
    cellNo: "BD270001",
    nationalNo: "70001",
    title: "Bangladesh and Adjoining Area",
    scale: "1:350 000",
    published: "27 Jan 2022",
    x: 132,
    y: 280,
    w: 2858,
    h: 1780,
  },

  // ── Listed in the index, not drawn on the catalogue map ──────────
  {
    // TODO: nationalNo is inferred from the BD5-0-<national no> pattern used
    // by BD503003 / BD503501 / BD503506 — verify against HP001_2026 before
    // relying on it. No hotspot: this cell is absent from the catalogue map.
    cellNo: "BD501501",
    nationalNo: "1501",
    title: "Karnaphuli River",
    scale: "1:12 500",
  },
];

/**
 * The subset the map can render. Searching for a cell with no hotspot would
 * highlight nothing, so the map works from this list rather than the full
 * index; the admin Chart Code picker uses `encIndexAreas` directly.
 */
export const encHotspotAreas = encIndexAreas.filter(
  (cell): cell is IEncCellWithHotspot =>
    cell.x !== undefined &&
    cell.y !== undefined &&
    cell.w !== undefined &&
    cell.h !== undefined
);
