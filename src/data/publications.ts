/**
 * Placeholder fixture for the Publications feature (public listing +
 * admin management). Swap for a real `/publication` endpoint later —
 * see the "Replace with API" comments in Publications.tsx and
 * PublicationsManagement.tsx for the two spots that need to change.
 */
export interface IPublication {
  id: string;
  title: string;
  code: string;
  date: string; // ISO date string
  image: string;
}

export const publications: IPublication[] = [
  {
    id: "pub-1",
    title: "List of Lights, Buoys and Signals",
    code: "P101",
    date: "2025-01-15",
    image: "/1252.JPG",
  },
  {
    id: "pub-2",
    title: "Sailing Directions for the Bay of Bengal",
    code: "P102",
    date: "2025-02-08",
    image: "/1253.JPG",
  },
  {
    id: "pub-3",
    title: "Tide Tables — Bangladesh Coast",
    code: "P103",
    date: "2025-01-02",
    image: "/1254.JPG",
  },
  {
    id: "pub-4",
    title: "Annual Summary of Notices to Mariners",
    code: "P104",
    date: "2024-12-20",
    image: "/1501.JPG",
  },
  {
    id: "pub-5",
    title: "List of Radio Signals",
    code: "P105",
    date: "2024-11-11",
    image: "/1502.JPG",
  },
  {
    id: "pub-6",
    title: "Chart Catalogue of Bangladesh Waters",
    code: "P106",
    date: "2024-10-05",
    image: "/2508.JPG",
  },
  {
    id: "pub-7",
    title: "Mariner's Handbook — Bangladesh Edition",
    code: "P107",
    date: "2024-09-18",
    image: "/3001.JPG",
  },
  {
    id: "pub-8",
    title: "Ocean Passages and Routeing Guide",
    code: "P108",
    date: "2024-08-27",
    image: "/3002.JPG",
  },
  {
    id: "pub-9",
    title: "Symbols and Abbreviations Used on Charts",
    code: "P109",
    date: "2024-07-14",
    image: "/3003.JPG",
  },
  {
    id: "pub-10",
    title: "Guide to Port Entry — Chittagong & Mongla",
    code: "P110",
    date: "2024-06-09",
    image: "/3004.JPG",
  },
  {
    id: "pub-11",
    title: "Hydrographic Note — Meghna Estuary Survey",
    code: "P111",
    date: "2024-05-22",
    image: "/img1.jpeg",
  },
  {
    id: "pub-12",
    title: "Weekly Notices to Mariners — Cumulative List",
    code: "P112",
    date: "2024-04-30",
    image: "/img3.jpeg",
  },
  {
    id: "pub-13",
    title: "Diving Operations Notice Register",
    code: "P113",
    date: "2024-03-16",
    image: "/img4.jpeg",
  },
  {
    id: "pub-14",
    title: "Electronic Navigational Chart (ENC) Catalogue",
    code: "P114",
    date: "2024-02-11",
    image: "/img5.jpeg",
  },
  {
    id: "pub-15",
    title: "Tidal Stream Atlas — Karnaphuli River",
    code: "P115",
    date: "2024-01-25",
    image: "/img6.jpeg",
  },
  {
    id: "pub-16",
    title: "Gun Firing and Exercise Area Notices",
    code: "P116",
    date: "2023-12-19",
    image: "/img7.jpeg",
  },
];
