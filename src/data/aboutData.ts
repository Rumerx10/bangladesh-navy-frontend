import type { IGalleryItem, ISurveyShip, IVisionMissionItem } from "@/src/components/about/types";

// ─── History Data ───

export interface IHistoryEra {
  id: string;
  era: string;
  yearRange: string;
  title: string;
  summary: string;
  details: string[];
  highlight?: string;
  icon: string;
}

export interface IHistoryMilestone {
  year: string;
  event: string;
  highlight?: boolean;
}

export const historyEras: IHistoryEra[] = [
  
  {
    id: "era-2",
    era: "Foundation",
    yearRange: "1983 – 1995",
    title: "Laying the Hydrographic Foundation",
    summary:
      "Recognizing the need to chart its vast maritime territory, the Bangladesh Navy established the Hydrographic Institute and Chart Depot in 1983 at BNS Issa Khan, Chattogram—the first dedicated hydrographic institutions in the country.",
    details: [
      "The Hydrographic Institute was established at BNS Issa Khan, Chattogram in 1983 to train naval personnel in survey techniques and chart production.",
      "The BN Chart Depot was created in the same year to manage, store, and distribute navigational charts and maritime publications.",
      "Conventional analogue survey methods were employed, using traditional equipment for coastal and riverine hydrographic data collection.",
      "These foundational institutions set the stage for Bangladesh to develop sovereign capability in charting its own waters.",
    ],
    icon: "compass",
  },
  {
    id: "era-3",
    era: "Modernization",
    yearRange: "1996 – 2000",
    title: "Digital Transformation: Hydro Bangla Project-1",
    summary:
      "A landmark collaboration with the French government in 1996 under the \"Hydro Bangla Project-1\" enabled the Navy to transition from conventional analogue survey methods to modern digital surveying systems.",
    details: [
      "The French government provided technical assistance and modern equipment under the Hydro Bangla Project-1 initiative.",
      "Survey operations transitioned from analogue to digital, dramatically improving accuracy, speed, and data management.",
      "Digital cartographic tools were introduced, enabling the production of higher-quality nautical charts compliant with emerging international standards.",
      "Personnel received specialized training in digital hydrographic surveying and data processing techniques.",
    ],
    highlight: "This project marked a paradigm shift—transforming Bangladesh Navy hydrography from a manual discipline into a technology-driven capability.",
    icon: "cpu",
  },
  {
    id: "era-4",
    era: "Establishment",
    yearRange: "2001 – 2010",
    title: "BNHOC is Born",
    summary:
      "The completion of Hydro Bangla Project-2 in 2001 led to the formal establishment of the Bangladesh Navy Hydrographic and Oceanographic Centre (BNHOC) at New Mooring, Chattogram. Bangladesh also became a member state of the International Hydrographic Organization (IHO).",
    details: [
      "BNHOC was formally established in 2001 as the central hub for all hydrographic and oceanographic activities of the Bangladesh Navy.",
      "The existing BN Chart Depot was merged into BNHOC, consolidating chart production, data management, and distribution under one centre.",
      "Bangladesh became a member state of the International Hydrographic Organization (IHO) in 2001, gaining access to international standards and collaboration frameworks.",
      "BNHOC began producing nautical charts and publications to national and international standards, including INT series charts.",
      "Electronic Navigational Chart (ENC) production commenced in accordance with IHO S-57/S-63 standards for ECDIS systems.",
    ],
    highlight: "2001 was a watershed year—BNHOC was born and Bangladesh joined the global hydrographic community through IHO membership.",
    icon: "building",
  },
  {
    id: "era-5",
    era: "Present & Future",
    yearRange: "2011 – Present",
    title: "Regional Leadership & Innovation",
    summary:
      "Today, BNHOC serves as the national authority for hydrographic data, producing INT charts, ENCs, and maritime safety information. The centre leverages GIS, satellite imagery, and modern multi-beam sonar to support safe navigation and sustainable maritime development.",
    details: [
      "The Naval Aviation Wing was established in 2011, enhancing aerial survey and maritime reconnaissance capabilities.",
      "Full integration of Geographic Information Systems (GIS) for advanced spatial data management and coastal zone analysis.",
      "Production of S-100 series products and next-generation Electronic Navigational Charts is underway.",
      "BNHOC provides meteorological and tidal data, Notices to Mariners, and navigational warnings for Bangladesh waters.",
      "Active participation in UN peacekeeping missions and international hydrographic cooperation programmes since 1993.",
      "The centre maintains and calibrates all survey and meteorological equipment for the Navy's hydrographic fleet.",
    ],
    highlight: "BNHOC has evolved from a chart depot into a world-recognized centre driving Bangladesh's Blue Economy agenda.",
    icon: "globe",
  },
];

export const historyMilestones: IHistoryMilestone[] = [
  { year: "1983", event: "Hydrographic Institute & Chart Depot established", highlight: true },
  { year: "1996", event: "Hydro Bangla Project-1 with French assistance", highlight: true },
  { year: "2001", event: "BNHOC formally established", highlight: true },
  { year: "2001", event: "Bangladesh joins IHO as member state", highlight: true },
  { year: "2010", event: "ENC production commenced (IHO S-57 standard)" },
  { year: "2020", event: "Full GIS integration implemented" },
  { year: "2024", event: "S-100 series chart production initiated" },
];

export const historyKeyFacts = {
  foundedYear: "2001",
  location: "New Mooring, Chattogram",
  parentOrg: "Bangladesh Navy",
  ihoMemberSince: "2001",
  totalPersonnel: "300+",
  chartsProduced: "100+",
};

// ─── Vision & Mission ───

export const visionMissionItems: IVisionMissionItem[] = [
  {
    id: "vm-1",
    type: "vision",
    title: "Our Vision",
    description: "To ensure safe & efficient marine transportation for sustainable Bangladesh.",
    // points: [
    //   "International standard nautical charts and publications",
    //   "Modern hydrographic survey capabilities",
    //   "Centre of excellence for maritime data",
    // ],
    icon: "eye",
  },
  {
    id: "vm-2",
    type: "mission",
    title: "Our Mission",
    description: "Provide accurate and up-to-date Hydrographic, Oceanographic & Meteorological data through production of Charts & Publications for safe navigation and sustainable Marine environment.",
    // points: [
    //   "Conduct systematic hydrographic surveys",
    //   "Produce and maintain nautical charts",
    //   "Disseminate maritime safety information",
    //   "Support maritime research and development",
    // ],
    icon: "target",
  },
];

// ─── Survey Ships ───

export const surveyShips: ISurveyShip[] = [
  {
    id: "ss-1",
    slug: "bns-anusandhan",
    name: "BNS ANUSANDHAN",
    designation: "Survey Vessel",
    description: "Primary hydrographic survey vessel equipped with modern multi-beam echo sounder systems and oceanographic equipment.",
    image: "/ANI-02.jpeg",
    specifications: { "Length": "65m", "Beam": "12m", "Draft": "3.8m", "Crew": "85", "Survey Equipment": "Multi-beam Echo Sounder, Side Scan Sonar" },
    status: "active",
    details: [
      "BNS Anusandhan is the flagship hydrographic survey vessel of the Bangladesh Navy Hydrographic & Oceanographic Center (BNHOC). Commissioned to serve as the primary platform for systematic ocean-floor mapping and charting operations across Bangladesh's extensive maritime territory.",
      "The vessel is outfitted with a state-of-the-art Kongsberg EM 2040 multi-beam echo sounder system capable of producing high-resolution bathymetric data in depths ranging from shallow coastal waters to deep oceanic zones. Complementing this is a Klein 3000 side-scan sonar for seabed feature detection and hazard identification.",
      "BNS Anusandhan carries an integrated navigation suite including differential GNSS receivers, motion reference units (MRU), and a sound velocity profiler (SVP) system to ensure survey data meets IHO S-44 standards for hydrographic surveys.",
      "The vessel regularly conducts survey missions covering port approach channels, coastal shipping lanes, and offshore areas of the Bay of Bengal. Data collected by BNS Anusandhan has been instrumental in updating nautical charts and producing Electronic Navigational Charts (ENCs) for safe maritime navigation.",
      "In addition to hydrographic work, the ship supports oceanographic research through water sampling, tidal observations, and sediment analysis, contributing valuable data to national maritime spatial planning initiatives.",
    ],
  },
  {
    id: "ss-2",
    slug: "bns-tallashi",
    name: "BNS TALLASHI",
    designation: "Survey Launch",
    description: "Coastal survey launch for shallow water hydrographic surveys and port approach channel surveys.",
    image: "/img9.jpeg",
    specifications: { "Length": "32m", "Beam": "7m", "Draft": "2.1m", "Crew": "35", "Survey Equipment": "Single-beam Echo Sounder, DGPS" },
    status: "active",
    details: [
      "BNS Tallashi is a purpose-built coastal survey launch designed for hydrographic operations in the shallow waters, river systems, and port approaches of Bangladesh. Her shallow draft makes her ideally suited for surveying areas inaccessible to larger vessels.",
      "Equipped with a single-beam echo sounder and Differential Global Positioning System (DGPS), BNS Tallashi provides reliable depth measurement and positioning accuracy suitable for harbour and coastal surveys classified under IHO Special Order and Order 1a.",
      "The vessel plays a critical role in maintaining navigational safety across Bangladesh's busy port channels, including the approaches to Chittagong Port, Mongla Port, and the Payra Deep Sea Port. Regular surveys by BNS Tallashi ensure that charted depths remain accurate and any shoaling or sedimentation is promptly identified.",
      "BNS Tallashi is also deployed for emergency surveys following cyclones and tidal surges, rapidly assessing changes to navigable waterways and providing essential data for Notices to Mariners.",
      "Her compact size and manoeuvrability allow her to operate effectively in the intricate riverine channels of the Ganges-Brahmaputra-Meghna delta system, where accurate hydrographic data is vital for inland waterway transport.",
    ],
  },
  {
    id: "ss-3",
    slug: "bns-darshak",
    name: "BNS Darshak",
    designation: "Oceanographic Vessel",
    description: "Dedicated oceanographic research vessel for deep water surveys and scientific data collection.",
    image: "/img8.jpeg",
    specifications: { "Length": "55m", "Beam": "10m", "Draft": "3.5m", "Crew": "65", "Survey Equipment": "CTD Profiler, ADCP, Grab Sampler" },
    status: "active",
    details: [
      "BNS Darshak serves as the dedicated oceanographic research vessel of BNHOC, designed to conduct deep-water scientific surveys and environmental data collection across the Bay of Bengal and adjacent waters.",
      "The vessel is equipped with a CTD (Conductivity, Temperature, Depth) profiler for measuring water column properties, an Acoustic Doppler Current Profiler (ADCP) for ocean current analysis, and grab samplers for seabed sediment collection. This comprehensive instrumentation suite enables multi-disciplinary oceanographic investigations.",
      "BNS Darshak has contributed significantly to Bangladesh's understanding of its marine environment, collecting data on water temperature, salinity, dissolved oxygen, and current patterns that inform fisheries management, coastal protection, and climate change research.",
      "The vessel supports BNHOC's tidal observation programme by deploying and maintaining permanent and temporary tide gauge stations along the coast, providing essential data for tide table production and chart datum establishment.",
      "BNS Darshak regularly participates in international collaborative research programmes under the auspices of the International Hydrographic Organization (IHO) and the North Indian Ocean Hydrographic Commission (NIOHC), strengthening Bangladesh's contributions to regional maritime science.",
    ],
  },
];

// ─── Gallery ───

export const galleryItems: IGalleryItem[] = [
  { id: "g-1", title: "Bangladesh Navy Ship", category: "Ships", image: "/gallery/img1.jpeg" },
  { id: "g-2", title: "Survey Operations", category: "Survey", image: "/gallery/img2.jpg" },
  { id: "g-3", title: "Maritime Survey", category: "Survey", image: "/gallery/img3.jpg" },
  { id: "g-4", title: "Hydrographic Operations", category: "Operations", image: "/gallery/img4.jpg" },
  { id: "g-5", title: "Oceanographic Research", category: "Survey", image: "/gallery/img5.jpg" },
  { id: "g-6", title: "ADCP Deployment", category: "Survey", image: "/gallery/img6.jpg" },
  { id: "g-7", title: "BNS Shaibal", category: "Ships", image: "/gallery/img7.jpg" },
  { id: "g-8", title: "BNS Shaibal at Sea", category: "Ships", image: "/gallery/img8.jpeg" },
  { id: "g-9", title: "BNS Shaibal Operations", category: "Ships", image: "/gallery/img9.jpg" },
  { id: "g-10", title: "BNS Shaibal Survey", category: "Ships", image: "/gallery/img10.jpg" },
  { id: "g-11", title: "Buoy Position Marking", category: "Operations", image: "/gallery/img11.jpeg" },
  { id: "g-12", title: "Char Hare Survey", category: "Survey", image: "/gallery/img12.jpg" },
  { id: "g-13", title: "Navy Operations", category: "Operations", image: "/gallery/img13.JPG" },
  { id: "g-14", title: "Field Survey", category: "Survey", image: "/gallery/img14.JPG" },
  { id: "g-15", title: "Maritime Mission", category: "Operations", image: "/gallery/img15.JPG" },
  { id: "g-16", title: "Coastal Survey", category: "Survey", image: "/gallery/img16.JPG" },
  { id: "g-17", title: "Naval Exercise", category: "Training", image: "/gallery/img17.JPG" },
  { id: "g-18", title: "Hydrographic Mission", category: "Operations", image: "/gallery/img18.JPG" },
];
