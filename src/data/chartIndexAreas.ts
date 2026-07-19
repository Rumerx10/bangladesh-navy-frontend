/**
 * Hotspot geometry for the interactive chart index page (/chart).
 *
 * Coordinates are in a fixed 2000x1414 viewBox space that matches the
 * aspect ratio of /public/chart/chart-index.jpg (landscape, north-up:
 * Khulna left, Teknaf right; scan rotated 90° CW from the 7017x9925
 * portrait original). They are digitized against the printed purple
 * rectangles and calibrated with a rendered overlay; tune any entry
 * here and the overlay follows. Set DEBUG_OUTLINES in ChartIndexMap.tsx
 * to outline every hotspot while calibrating.
 */

export const CHART_VIEWBOX = { w: 2000, h: 1414 };

export interface IChartArea {
  /** Chart serial number as printed on the index, e.g. "3512" */
  number: string;
  /** International chart designation when printed, e.g. "INT 7427" */
  int?: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const chartIndexAreas: IChartArea[] = [
  // ── Chattogram / Sandwip Channel ─────────────────────────────────
  { number: "1254", x: 1656, y: 256, w: 100, h: 72 },
  { number: "2501", x: 1520, y: 285, w: 154, h: 158 },
  { number: "1501", x: 1460, y: 354, w: 111, h: 77 },
  { number: "3001", int: "INT 7427", x: 1360, y: 401, w: 212, h: 93 },
  { number: "3507", x: 1361, y: 500, w: 211, h: 96 },
  { number: "3509", x: 1318, y: 192, w: 205, h: 136 },
  { number: "3510", x: 1258, y: 107, w: 202, h: 122 },
  { number: "1511", x: 1293, y: 104, w: 107, h: 67 },
  { number: "1511", x: 1248, y: 141, w: 100, h: 71 },
  { number: "3536", x: 1111, y: 102, w: 135, h: 117 },
  { number: "3511", x: 1263, y: 232, w: 157, h: 124 },
  { number: "3508", x: 1293, y: 365, w: 170, h: 102 },
  { number: "7513", x: 1108, y: 464, w: 382, h: 125 },
  { number: "3512", x: 1146, y: 229, w: 184, h: 221 },
  { number: "3513", x: 1113, y: 365, w: 205, h: 126 },
  { number: "3514", x: 1103, y: 474, w: 153, h: 112 },
  { number: "7509", x: 1110, y: 73, w: 780, h: 523 },

  // ── Meghna estuary / Bhola ───────────────────────────────────────
  { number: "3518", x: 1076, y: 160, w: 104, h: 87 },
  { number: "7508", x: 840, y: 107, w: 273, h: 232 },
  { number: "3517", x: 956, y: 243, w: 182, h: 122 },
  { number: "3516", x: 936, y: 367, w: 174, h: 120 },
  { number: "3515", x: 1016, y: 481, w: 144, h: 153 },
  { number: "3519", x: 870, y: 559, w: 186, h: 106 },
  { number: "3520", x: 786, y: 576, w: 180, h: 109 },
  { number: "7505", x: 856, y: 634, w: 290, h: 243 },

  // ── Patuakhali / Kuakata / Haringhata ────────────────────────────
  { number: "3002", int: "INT 7453", x: 686, y: 538, w: 210, h: 109 },
  { number: "3521", x: 686, y: 661, w: 180, h: 108 },
  { number: "3522", x: 546, y: 600, w: 180, h: 114 },
  { number: "3523", x: 456, y: 607, w: 180, h: 109 },
  { number: "3524", x: 496, y: 426, w: 175, h: 106 },
  { number: "3525", x: 366, y: 604, w: 180, h: 112 },
  { number: "7503", x: 456, y: 683, w: 270, h: 196 },
  { number: "7504", int: "INT 7454", x: 456, y: 875, w: 604, h: 119 },

  // ── Sundarbans / Mongla / Khulna ─────────────────────────────────
  { number: "3533", x: 376, y: 369, w: 160, h: 118 },
  { number: "2508", int: "INT 7451", x: 316, y: 268, w: 170, h: 111 },
  { number: "1252", x: 356, y: 236, w: 94, h: 63 },
  { number: "2502", x: 352, y: 14, w: 58, h: 166 },
  { number: "1253", x: 270, y: 210, w: 106, h: 75 },
  { number: "3534", x: 216, y: 230, w: 145, h: 129 },
  { number: "7502", x: 110, y: 232, w: 266, h: 259 },
  { number: "3535", x: 86, y: 247, w: 160, h: 133 },
  { number: "3532", x: 161, y: 369, w: 165, h: 131 },
  { number: "3531", x: 166, y: 438, w: 170, h: 131 },
  { number: "3004", int: "INT 7452", x: 296, y: 498, w: 200, h: 102 },
  { number: "5001", int: "INT 7426", x: 288, y: 576, w: 450, h: 283 },
  { number: "3530", x: 116, y: 540, w: 170, h: 131 },
  { number: "3529", x: 146, y: 722, w: 180, h: 114 },
  { number: "7501", x: 78, y: 844, w: 278, h: 194 },

  // ── Cox's Bazar / Teknaf / St. Martin's ──────────────────────────
  { number: "1502", x: 1468, y: 634, w: 120, h: 71 },
  { number: "3506", x: 1368, y: 651, w: 200, h: 94 },
  { number: "3003", x: 1366, y: 712, w: 197, h: 104 },
  { number: "7510", int: "INT 7428", x: 1110, y: 593, w: 456, h: 105 },
  { number: "3505", x: 1418, y: 773, w: 200, h: 94 },
  { number: "7511", int: "INT 7429", x: 1113, y: 879, w: 507, h: 153 },
  { number: "3504", x: 1518, y: 981, w: 198, h: 95 },
  { number: "3503", x: 1460, y: 1015, w: 203, h: 95 },
  { number: "3502", x: 1540, y: 1081, w: 200, h: 114 },
  { number: "3501", x: 1628, y: 1161, w: 180, h: 175 },
  { number: "7512", x: 1430, y: 1076, w: 383, h: 282 },

  // ── Small-scale charts (extend past the frame; clipped to it) ────
  { number: "30002", x: 62, y: 188, w: 1881, h: 1170 },
  { number: "25002", x: 62, y: 872, w: 1086, h: 486 },
  { number: "30001", x: 62, y: 718, w: 948, h: 640 },
  { number: "35001", int: "INT 7425", x: 62, y: 1128, w: 353, h: 230 },
  { number: "25001", x: 62, y: 1030, w: 286, h: 328 },
];
