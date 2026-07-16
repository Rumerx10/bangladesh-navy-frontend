import {
  DiscountType,
  INavyProduct,
  ProductStatus,
} from "@/src/components/products/types";
import { navyCategories } from "./navyCategories";

const cat = (slug: string) =>
  navyCategories.find((c) => c.slug === slug) ?? navyCategories[0];

export const navyProducts: INavyProduct[] = [
  // ── Chart 1252 ───────────────────────────────────────────────
  {
    id: "prod-1252",
    nameBn: "মংলা বন্দর নটিক্যাল চার্ট",
    nameEn: "Mongla Harbour",
    images: ["/1252.JPG"],
    descriptionBn:
      "মংলা বন্দর এলাকার বিস্তারিত নটিক্যাল চার্ট। বে অব বেঙ্গল অঞ্চলের মংলা বন্দরে নিরাপদ নৌচলাচলের জন্য অপরিহার্য।",
    descriptionEn:
      "Detailed nautical chart of Mongla Harbour in the Bay of Bengal. Covers the harbour area at 1:12 500 scale for safe navigation.",
    price: 350000,
    stock: 50,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2017-03-13T00:00:00Z",
    updatedAt: "2020-10-28T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      {
        id: "1252-01",
        productId: "prod-1252",
        key: "Chart Number",
        value: "1252",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1252-geo",
        productId: "prod-1252",
        key: "Geographic Location",
        value: "Bay of Bengal",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1252-02",
        productId: "prod-1252",
        key: "Scale",
        value: "1:12 500",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1252-03",
        productId: "prod-1252",
        key: "Projection",
        value: "Mercator",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1252-04a",
        productId: "prod-1252",
        key: "North Latitude",
        value: "22°32.45'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1252-04b",
        productId: "prod-1252",
        key: "South Latitude",
        value: "22°25.90'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1252-04c",
        productId: "prod-1252",
        key: "East Longitude",
        value: "089°37.20'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1252-04d",
        productId: "prod-1252",
        key: "West Longitude",
        value: "089°32.50'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1252-05",
        productId: "prod-1252",
        key: "Edition",
        value: "2nd Edition (2020-10-28)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1252-06",
        productId: "prod-1252",
        key: "Date of Publication",
        value: "2017-03-13",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },

  // ── Chart 1253 ───────────────────────────────────────────────
  {
    id: "prod-1253",
    nameBn: "চুনকুরি খাল - কালিবাড়ি থেকে চালনা",
    nameEn: "Chunkuri Khal - Kalibari to Chalna",
    images: ["/1253.JPG"],
    descriptionBn:
      "চুনকুরি খালের কালিবাড়ি থেকে চালনা পর্যন্ত নটিক্যাল চার্ট। অভ্যন্তরীণ জলপথ নৌচলাচলের জন্য আবশ্যক।",
    descriptionEn:
      "Nautical chart of Chunkuri Khal from Kalibari to Chalna in the Bay of Bengal. Essential for inland waterway navigation at 1:12 500 scale.",
    price: 350000,
    stock: 40,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2014-11-30T00:00:00Z",
    updatedAt: "2019-10-02T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      {
        id: "1253-01",
        productId: "prod-1253",
        key: "Chart Number",
        value: "1253",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1253-geo",
        productId: "prod-1253",
        key: "Geographic Location",
        value: "Bay of Bengal",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1253-02",
        productId: "prod-1253",
        key: "Scale",
        value: "1:12 500",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1253-03",
        productId: "prod-1253",
        key: "Projection",
        value: "Mercator",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1253-04a",
        productId: "prod-1253",
        key: "North Latitude",
        value: "22°37.10'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1253-04b",
        productId: "prod-1253",
        key: "South Latitude",
        value: "22°30.15'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1253-04c",
        productId: "prod-1253",
        key: "East Longitude",
        value: "089°32.10'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1253-04d",
        productId: "prod-1253",
        key: "West Longitude",
        value: "089°28.60'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1253-05",
        productId: "prod-1253",
        key: "Edition",
        value: "2nd Edition (2019-10-02)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1253-06",
        productId: "prod-1253",
        key: "Date of Publication",
        value: "2014-11-30",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },

  // ── Chart 1254 ───────────────────────────────────────────────
  {
    id: "prod-1254",
    nameBn: "কর্ণফুলী নদী - সিলক বাজার থেকে কাপ্তাই",
    nameEn: "Karnaphuli River - Silok Bazar to Kaptai",
    images: ["/1254.JPG"],
    descriptionBn:
      "কর্ণফুলী নদীর সিলক বাজার থেকে কাপ্তাই পর্যন্ত বিস্তারিত নটিক্যাল চার্ট।",
    descriptionEn:
      "Detailed nautical chart of Karnaphuli River from Silok Bazar to Kaptai. Covers upper river navigation at 1:12 500 scale.",
    price: 350000,
    stock: 35,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2016-05-18T00:00:00Z",
    updatedAt: "2016-05-18T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      {
        id: "1254-01",
        productId: "prod-1254",
        key: "Chart Number",
        value: "1254",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1254-geo",
        productId: "prod-1254",
        key: "Geographic Location",
        value: "Bay of Bengal",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1254-02",
        productId: "prod-1254",
        key: "Scale",
        value: "1:12 500",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1254-03",
        productId: "prod-1254",
        key: "Projection",
        value: "Mercator",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1254-04a",
        productId: "prod-1254",
        key: "North Latitude",
        value: "22°30.64'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1254-04b",
        productId: "prod-1254",
        key: "South Latitude",
        value: "22°26.59'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1254-04c",
        productId: "prod-1254",
        key: "East Longitude",
        value: "092°15.05'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1254-04d",
        productId: "prod-1254",
        key: "West Longitude",
        value: "092°02.20'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1254-05",
        productId: "prod-1254",
        key: "Edition",
        value: "1st Edition (2016-05-18)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1254-06",
        productId: "prod-1254",
        key: "Date of Publication",
        value: "2016-05-18",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },

  // ── Chart 1501 ───────────────────────────────────────────────
  {
    id: "prod-1501",
    nameBn: "কর্ণফুলী নদী - পতেঙ্গা পয়েন্ট থেকে শাহ আমানত সেতু",
    nameEn: "Karnaphuli River - Patenga Point to Shah Amanat Bridge",
    images: ["/1501.JPG"],
    descriptionBn:
      "কর্ণফুলী নদীর পতেঙ্গা পয়েন্ট থেকে শাহ আমানত সেতু পর্যন্ত নটিক্যাল চার্ট। চট্টগ্রাম বন্দরের প্রবেশপথ নৌচলাচলের জন্য অপরিহার্য।",
    descriptionEn:
      "Nautical chart of Karnaphuli River from Patenga Point to Shah Amanat Bridge. Essential for Chittagong port approach navigation at 1:15 000 scale.",
    price: 350000,
    stock: 45,
    categoryId: "cat-2",
    status: ProductStatus.ACTIVE,
    createdAt: "2021-09-12T00:00:00Z",
    updatedAt: "2023-09-20T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      {
        id: "1501-01",
        productId: "prod-1501",
        key: "Chart Number",
        value: "1501",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1501-geo",
        productId: "prod-1501",
        key: "Geographic Location",
        value: "Bay of Bengal",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1501-02",
        productId: "prod-1501",
        key: "Scale",
        value: "1:15 000",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1501-03",
        productId: "prod-1501",
        key: "Projection",
        value: "Mercator",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1501-04a",
        productId: "prod-1501",
        key: "North Latitude",
        value: "22°19.90'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1501-04b",
        productId: "prod-1501",
        key: "South Latitude",
        value: "22°11.00'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1501-04c",
        productId: "prod-1501",
        key: "East Longitude",
        value: "091°51.65'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1501-04d",
        productId: "prod-1501",
        key: "West Longitude",
        value: "091°46.00'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1501-05",
        productId: "prod-1501",
        key: "Edition",
        value: "2nd Edition (2023-09-20)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1501-06",
        productId: "prod-1501",
        key: "Date of Publication",
        value: "2021-09-12",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },

  // ── Chart 1502 ───────────────────────────────────────────────
  {
    id: "prod-1502",
    nameBn: "দক্ষিণ কুতুবদিয়া চ্যানেল",
    nameEn: "South Kutubdia Channel",
    images: ["/1502.JPG"],
    descriptionBn:
      "দক্ষিণ কুতুবদিয়া চ্যানেলের বিস্তারিত নটিক্যাল চার্ট। উপকূলীয় জাহাজ চলাচলের জন্য প্রয়োজনীয়।",
    descriptionEn:
      "Detailed nautical chart of South Kutubdia Channel in the Bay of Bengal. Covers coastal shipping lane at 1:15 000 scale.",
    price: 350000,
    stock: 30,
    categoryId: "cat-2",
    status: ProductStatus.ACTIVE,
    createdAt: "2023-04-25T00:00:00Z",
    updatedAt: "2025-02-16T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      {
        id: "1502-01",
        productId: "prod-1502",
        key: "Chart Number",
        value: "1502",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1502-geo",
        productId: "prod-1502",
        key: "Geographic Location",
        value: "Bay of Bengal",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1502-02",
        productId: "prod-1502",
        key: "Scale",
        value: "1:15 000",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1502-03",
        productId: "prod-1502",
        key: "Projection",
        value: "Mercator",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1502-04a",
        productId: "prod-1502",
        key: "North Latitude",
        value: "21°48.73'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1502-04b",
        productId: "prod-1502",
        key: "South Latitude",
        value: "21°40.77'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1502-04c",
        productId: "prod-1502",
        key: "East Longitude",
        value: "091°55.00'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1502-04d",
        productId: "prod-1502",
        key: "West Longitude",
        value: "091°49.35'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1502-05",
        productId: "prod-1502",
        key: "Edition",
        value: "2nd Edition (2025-02-16)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "1502-06",
        productId: "prod-1502",
        key: "Date of Publication",
        value: "2023-04-25",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },
  {
    id: "prod-009",
    nameBn: "",
    nameEn: "Bangladesh Navy Tide Table 2026",
    images: ["/tid.jpeg"],
    descriptionBn: "",
    descriptionEn: "",
    content: `<h3>List of Tidal Stations</h3><table><thead><tr><th>Ser</th><th>General Area</th><th>Location</th><th>Position</th></tr></thead><tbody><tr><td>1</td><td>St. Martin's Island</td><td>St. Martin's Jetty</td><td>20°37.94′N, 092°19.74′E</td></tr><tr><td>2</td><td>Teknaf</td><td>Naf River (Damdamia)</td><td>20°55.33′N, 092°16.18′E</td></tr><tr><td>3</td><td>Inani</td><td>Inani Naval Jetty</td><td>21°12.82′N, 092°02.55′E</td></tr><tr><td>4</td><td>Cox's Bazar</td><td>Bakkhali River (Nuniar Chara)</td><td>21°27.61′N, 091°58.11′E</td></tr><tr><td>5</td><td>Matarbari</td><td>Matarbari Power Plant</td><td>21°41.12′N, 091°51.22′E</td></tr><tr><td>6</td><td>Kutubdia Channel</td><td>Boroghop Ghat</td><td>21°48.80′N, 091°52.49′E</td></tr><tr><td>7</td><td>Karnaphuli River</td><td>Khal No-18</td><td>22°13.62′N, 091°48.074′E</td></tr><tr><td>8</td><td>Karnaphuli River</td><td>KAFCO</td><td>22°14.19′N, 091°49.50′E</td></tr><tr><td>9</td><td>Karnaphuli River</td><td>Khal No-10</td><td>22°16.09′N, 091°49.26′E</td></tr><tr><td>10</td><td>Karnaphuli River</td><td>Naval Berth-1</td><td>22°17.21′N, 091°47.62′E</td></tr><tr><td>11</td><td>Karnaphuli River</td><td>Sadarghat</td><td>22°19.45′N, 091°50.08′E</td></tr><tr><td>12</td><td>Karnaphuli River</td><td>Kalurghat</td><td>22°23.85′N, 091°53.28′E</td></tr><tr><td>13</td><td>Sandwip Island (West)</td><td>Satal Khal</td><td>22°30.00′N, 091°25.00′E</td></tr><tr><td>14</td><td>Bhasanchar</td><td>Bhasanchar</td><td>22°21.41′N, 091°22.19′E</td></tr><tr><td>15</td><td>Shahbazpur River</td><td>Char Changa</td><td>22°13.79′N, 091°04.29′E</td></tr><tr><td>16</td><td>Tetulia River</td><td>Char Montaj</td><td>21°54.50′N, 090°30.90′E</td></tr><tr><td>17</td><td>Meghna River</td><td>Char Ramdaspur (Ilsha Ghat)</td><td>22°49.32′N, 090°35.91′E</td></tr><tr><td>18</td><td>Chandpur</td><td>Dakatia River (Puran Bazar)</td><td>23°13.26′N, 090°39.10′E</td></tr><tr><td>19</td><td>Lakhya River</td><td>Narayanganj Ferry Ghat</td><td>23°37.01′N, 090°30.36′E</td></tr><tr><td>20</td><td>Buriganga River</td><td>Pagla Jetty</td><td>23°39.57′N, 090°27.41′E</td></tr><tr><td>21</td><td>Kirtankhola River</td><td>Barishal Launch Ghat</td><td>22°41.62′N, 090°22.42′E</td></tr><tr><td>22</td><td>Andermanik River</td><td>Payra Port</td><td>21°59.38′N, 090°16.83′E</td></tr><tr><td>23</td><td>Rabnabad Channel</td><td>Payra Port (Charipara)</td><td>21°57.08′N, 090°18.03′E</td></tr><tr><td>24</td><td>Rabnabad Channel</td><td>Payra Port (Kauar char)</td><td>21°49.97′N, 090°15.30′E</td></tr><tr><td>25</td><td>Pussur River</td><td>Hiran Point</td><td>21°48.05′N, 089°27.84′E</td></tr><tr><td>26</td><td>Pussur River</td><td>Sundarikota</td><td>22°06.99′N, 089°35.29′E</td></tr><tr><td>27</td><td>Pussur River</td><td>Mongla Port</td><td>22°29.66′N, 089°35.41′E</td></tr></tbody></table>`,
    price: 100000, // 3500 BDT
    stock: 200,
    categoryId: "cat-3",
    status: ProductStatus.ACTIVE,
    createdAt: "2025-11-01T00:00:00Z",
    updatedAt: "2025-12-15T00:00:00Z",
    category: cat("tide-tables"),
    productAttributes: [
      {
        id: "attr-023",
        productId: "prod-009",
        key: "Year",
        value: "2026",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "attr-024",
        productId: "prod-009",
        key: "Stations",
        value: " 27 Stations.",
        createdAt: "",
        updatedAt: "",
      },
      // {
      //   id: "attr-025",
      //   productId: "prod-009",
      //   key: "Format",
      //   value: "Printed Book (A4)",
      //   createdAt: "",
      //   updatedAt: "",
      // },
    ],
  },
  // ── Chart 2508 (INT7451) ─────────────────────────────────────
  {
    id: "prod-2508",
    nameBn: "পশুর নদী - মাংকি পয়েন্ট থেকে মংলা বন্দর",
    nameEn: "Pussur River - Monkey Point to Mongla Port",
    images: ["/2508.JPG"],
    descriptionBn:
      "পশুর নদীর মাংকি পয়েন্ট থেকে মংলা বন্দর পর্যন্ত আন্তর্জাতিক নটিক্যাল চার্ট। মংলামুখী কার্গো জাহাজের জন্য অপরিহার্য।",
    descriptionEn:
      "International nautical chart (INT7451) of Pussur River from Monkey Point to Mongla Port. Essential for cargo vessels bound for Mongla at 1:25 000 scale.",
    price: 350000,
    stock: 40,
    categoryId: "cat-2",
    status: ProductStatus.ACTIVE,
    createdAt: "2017-06-04T00:00:00Z",
    updatedAt: "2025-01-20T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      {
        id: "2508-01",
        productId: "prod-2508",
        key: "Chart Number",
        value: "2508 (INT7451)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "2508-geo",
        productId: "prod-2508",
        key: "Geographic Location",
        value: "Bay of Bengal",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "2508-02",
        productId: "prod-2508",
        key: "Scale",
        value: "1:25 000",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "2508-03",
        productId: "prod-2508",
        key: "Projection",
        value: "Mercator",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "2508-04a",
        productId: "prod-2508",
        key: "North Latitude",
        value: "22°32.50'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "2508-04b",
        productId: "prod-2508",
        key: "South Latitude",
        value: "22°14.10'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "2508-04c",
        productId: "prod-2508",
        key: "East Longitude",
        value: "089°40.20'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "2508-04d",
        productId: "prod-2508",
        key: "West Longitude",
        value: "089°31.85'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "2508-05",
        productId: "prod-2508",
        key: "Edition",
        value: "3rd Edition (2025-01-20)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "2508-06",
        productId: "prod-2508",
        key: "Date of Publication",
        value: "2017-06-04",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },

  // ── Chart 3001 (INT7427) ─────────────────────────────────────
  {
    id: "prod-3001",
    nameBn: "চট্টগ্রাম বন্দর নটিক্যাল চার্ট",
    nameEn: "Chattogram Harbour",
    images: ["/3001.JPG"],
    descriptionBn:
      "চট্টগ্রাম বন্দরের আন্তর্জাতিক নটিক্যাল চার্ট। বন্দরে প্রবেশ ও নোঙর এলাকার বিস্তারিত তথ্যসহ।",
    descriptionEn:
      "International nautical chart (INT7427) of Chattogram Harbour. Covers port approach, anchorage, and harbour layout at 1:30 000 scale.",
    price: 350000,
    stock: 60,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2017-02-02T00:00:00Z",
    updatedAt: "2025-12-10T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      {
        id: "3001-01",
        productId: "prod-3001",
        key: "Chart Number",
        value: "3001 (INT7427)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3001-geo",
        productId: "prod-3001",
        key: "Geographic Location",
        value: "Bay of Bengal",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3001-02",
        productId: "prod-3001",
        key: "Scale",
        value: "1:30 000",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3001-03",
        productId: "prod-3001",
        key: "Projection",
        value: "Mercator",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3001-04a",
        productId: "prod-3001",
        key: "North Latitude",
        value: "22°20.85'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3001-04b",
        productId: "prod-3001",
        key: "South Latitude",
        value: "22°05.00'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3001-04c",
        productId: "prod-3001",
        key: "East Longitude",
        value: "091°51.30'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3001-04d",
        productId: "prod-3001",
        key: "West Longitude",
        value: "091°40.00'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3001-05",
        productId: "prod-3001",
        key: "Edition",
        value: "3rd Edition (2025-12-10)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3001-06",
        productId: "prod-3001",
        key: "Date of Publication",
        value: "2017-02-02",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },

  // ── Chart 3002 (INT7453) ─────────────────────────────────────
  {
    id: "prod-3002",
    nameBn: "পায়রা বন্দর নটিক্যাল চার্ট",
    nameEn: "Payra Harbour",
    images: ["/3002.JPG"],
    descriptionBn:
      "পায়রা গভীর সমুদ্র বন্দরের আন্তর্জাতিক নটিক্যাল চার্ট। বন্দর প্রবেশপথ ও নোঙর এলাকার বিস্তারিত তথ্যসহ।",
    descriptionEn:
      "International nautical chart (INT7453) of Payra Harbour. Covers Payra deep sea port approach and anchorage at 1:30 000 scale.",
    price: 350000,
    stock: 45,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2017-02-02T00:00:00Z",
    updatedAt: "2025-02-16T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      {
        id: "3002-01",
        productId: "prod-3002",
        key: "Chart Number",
        value: "3002 (INT7453)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3002-geo",
        productId: "prod-3002",
        key: "Geographic Location",
        value: "Bay of Bengal",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3002-02",
        productId: "prod-3002",
        key: "Scale",
        value: "1:30 000",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3002-03",
        productId: "prod-3002",
        key: "Projection",
        value: "Mercator",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3002-04a",
        productId: "prod-3002",
        key: "North Latitude",
        value: "22°04.55'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3002-04b",
        productId: "prod-3002",
        key: "South Latitude",
        value: "21°48.70'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3002-04c",
        productId: "prod-3002",
        key: "East Longitude",
        value: "090°25.70'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3002-04d",
        productId: "prod-3002",
        key: "West Longitude",
        value: "090°14.40'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3002-05",
        productId: "prod-3002",
        key: "Edition",
        value: "3rd Edition (2025-02-16)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3002-06",
        productId: "prod-3002",
        key: "Date of Publication",
        value: "2017-02-02",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },

  // ── Chart 3003 ───────────────────────────────────────────────
  {
    id: "prod-3003",
    nameBn: "মাতারবাড়ি বন্দর নটিক্যাল চার্ট",
    nameEn: "Matarbari Harbour",
    images: ["/3003.JPG"],
    descriptionBn:
      "মাতারবাড়ি বন্দরের বিস্তারিত নটিক্যাল চার্ট। গভীর সমুদ্র বন্দর এলাকার নিরাপদ নৌচলাচলের জন্য আবশ্যক।",
    descriptionEn:
      "Detailed nautical chart of Matarbari Harbour. Covers the deep sea port area and approach channels at 1:30 000 scale.",
    price: 350000,
    stock: 35,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2022-09-21T00:00:00Z",
    updatedAt: "2025-04-10T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      {
        id: "3003-01",
        productId: "prod-3003",
        key: "Chart Number",
        value: "3003",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3003-geo",
        productId: "prod-3003",
        key: "Geographic Location",
        value: "Bay of Bengal",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3003-02",
        productId: "prod-3003",
        key: "Scale",
        value: "1:30 000",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3003-03",
        productId: "prod-3003",
        key: "Projection",
        value: "Mercator",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3003-04a",
        productId: "prod-3003",
        key: "North Latitude",
        value: "21°47.86'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3003-04b",
        productId: "prod-3003",
        key: "South Latitude",
        value: "21°30.00'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3003-04c",
        productId: "prod-3003",
        key: "East Longitude",
        value: "091°55.00'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3003-04d",
        productId: "prod-3003",
        key: "West Longitude",
        value: "091°42.00'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3003-05",
        productId: "prod-3003",
        key: "Edition",
        value: "2nd Edition (2025-04-10)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3003-06",
        productId: "prod-3003",
        key: "Date of Publication",
        value: "2022-09-21",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },

  // ── Chart 3004 (7452) ────────────────────────────────────────
  {
    id: "prod-3004",
    nameBn: "পশুর নদী - ত্রিকোণা দ্বীপ থেকে মাংকি পয়েন্ট",
    nameEn: "Pussur River - Trikona Island to Monkey Point",
    images: ["/3004.JPG"],
    descriptionBn:
      "পশুর নদীর ত্রিকোণা দ্বীপ থেকে মাংকি পয়েন্ট পর্যন্ত নটিক্যাল চার্ট। মংলা বন্দরমুখী জাহাজ চলাচলের জন্য অপরিহার্য।",
    descriptionEn:
      "Nautical chart (7452) of Pussur River from Trikona Island to Monkey Point. Covers lower river section critical for Mongla-bound vessels at 1:30 000 scale.",
    price: 350000,
    stock: 40,
    categoryId: "cat-1",
    status: ProductStatus.ACTIVE,
    createdAt: "2017-06-04T00:00:00Z",
    updatedAt: "2025-03-25T00:00:00Z",
    category: cat("paper-charts"),
    productAttributes: [
      {
        id: "3004-01",
        productId: "prod-3004",
        key: "Chart Number",
        value: "3004 (7452)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3004-geo",
        productId: "prod-3004",
        key: "Geographic Location",
        value: "Bay of Bengal",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3004-02",
        productId: "prod-3004",
        key: "Scale",
        value: "1:30 000",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3004-03",
        productId: "prod-3004",
        key: "Projection",
        value: "Mercator",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3004-04a",
        productId: "prod-3004",
        key: "North Latitude",
        value: "22°15.90'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3004-04b",
        productId: "prod-3004",
        key: "South Latitude",
        value: "21°53.20'N",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3004-04c",
        productId: "prod-3004",
        key: "East Longitude",
        value: "089°37.25'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3004-04d",
        productId: "prod-3004",
        key: "West Longitude",
        value: "089°27.00'E",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3004-05",
        productId: "prod-3004",
        key: "Edition",
        value: "3rd Edition (2025-03-25)",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "3004-06",
        productId: "prod-3004",
        key: "Date of Publication",
        value: "2017-06-04",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },
];

/**
 * Utility: compute the discounted price in poysha.
 */
export function getDiscountedPrice(product: INavyProduct): number {
  if (!product.discountType || !product.discountValue) return product.price;
  if (product.discountType === DiscountType.PERCENTAGE) {
    return Math.round(product.price * (1 - product.discountValue / 100));
  }
  // FLAT discount: discountValue is in BDT, price is in poysha
  return Math.max(0, product.price - product.discountValue * 100);
}

/**
 * Utility: format poysha to BDT string.
 */
export function formatPrice(poysha: number): string {
  return `৳${(poysha / 100).toLocaleString("en-BD")}`;
}

/**
 * Utility: find product by id.
 */
export function findProductById(id: string): INavyProduct | undefined {
  return navyProducts.find((p) => p.id === id);
}

/**
 * Utility: generate a slug from the English name.
 */
export function getProductSlug(product: INavyProduct): string {
  return product.nameEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Utility: find product by slug.
 */
export function findProductBySlug(slug: string): INavyProduct | undefined {
  return navyProducts.find((p) => getProductSlug(p) === slug);
}

/**
 * Utility: find product by its "Chart Number" attribute. The bare number
 * matches values with an INT designation, e.g. "2508" → "2508 (INT7451)".
 */
export function findProductByChartNumber(
  chartNumber: string
): INavyProduct | undefined {
  return navyProducts.find((p) =>
    p.productAttributes?.some(
      (a) =>
        a.key === "Chart Number" &&
        (a.value === chartNumber || a.value.startsWith(`${chartNumber} `))
    )
  );
}
