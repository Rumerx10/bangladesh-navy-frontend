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
    id: "era-1",
    era: "Origins",
    yearRange: "1971 – 1982",
    title: "Birth of a Maritime Nation",
    summary:
      "The Bangladesh Navy was born during the 1971 Liberation War when Bengali sailors defected from the Pakistan Navy. Operation Jackpot—a series of daring commando raids on enemy ports—became a defining moment of the war at sea.",
    details: [
      "Bengali sailors and officers defected from the Pakistan Navy and formed the nucleus of the Bangladesh Naval Force in July 1971.",
      "Naval Commandos executed Operation Jackpot, mining and sabotaging enemy warships and merchant vessels across major ports, severely disrupting Pakistani supply lines.",
      "The first naval fleet of six patrol vessels was inaugurated on 9 November 1971.",
      "After independence the three services were separated in 1972. BNS Issa Khan, BNS Haji Mohsin, and BNS Titumir were commissioned as the first naval bases in 1974.",
      "The fleet grew with the acquisition of ex-Royal Navy frigates: BNS Umar Farooq (1976), BNS Ali Haider (1978), and BNS Abu Bakr (1982).",
    ],
    highlight: "Operation Jackpot is regarded as one of the most successful unconventional naval operations in modern history.",
    icon: "anchor",
  },
  {
    id: "era-2",
    era: "Foundation",
    yearRange: "1983 – 1995",
    title: "Laying the Hydrographic Foundation",
    summary:
      "Recognizing the need to chart its vast maritime territory, the Bangladesh Navy established the Hydrographic School and Chart Depot in 1983 at BNS Issa Khan, Chattogram—the first dedicated hydrographic institutions in the country.",
    details: [
      "The Hydrographic School was established at BNS Issa Khan, Chattogram in 1983 to train naval personnel in survey techniques and chart production.",
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
  { year: "1971", event: "Bangladesh Navy formed during Liberation War" },
  { year: "1971", event: "Operation Jackpot executed against enemy ports" },
  { year: "1974", event: "First naval bases commissioned by Bangabandhu" },
  { year: "1983", event: "Hydrographic School & Chart Depot established", highlight: true },
  { year: "1993", event: "Bangladesh Navy joins UN peacekeeping missions" },
  { year: "1996", event: "Hydro Bangla Project-1 with French assistance", highlight: true },
  { year: "2001", event: "BNHOC formally established", highlight: true },
  { year: "2001", event: "Bangladesh joins IHO as member state", highlight: true },
  { year: "2010", event: "ENC production commenced (IHO S-57 standard)" },
  { year: "2011", event: "Naval Aviation Wing established" },
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
    description: "To be a world-class hydrographic organization providing comprehensive maritime geospatial data and services for safe navigation and sustainable development of Bangladesh's maritime domain.",
    points: [
      "International standard nautical charts and publications",
      "Modern hydrographic survey capabilities",
      "Centre of excellence for maritime data",
    ],
    icon: "eye",
  },
  {
    id: "vm-2",
    type: "mission",
    title: "Our Mission",
    description: "To provide accurate and timely hydrographic, oceanographic, and navigational information to ensure safety of navigation in Bangladesh waters and support national maritime development.",
    points: [
      "Conduct systematic hydrographic surveys",
      "Produce and maintain nautical charts",
      "Disseminate maritime safety information",
      "Support maritime research and development",
    ],
    icon: "target",
  },
];

// ─── Survey Ships ───

export const surveyShips: ISurveyShip[] = [
  {
    id: "ss-1",
    name: "BNS Anusandhan",
    designation: "Survey Vessel",
    description: "Primary hydrographic survey vessel equipped with modern multi-beam echo sounder systems and oceanographic equipment.",
    specifications: { "Length": "65m", "Beam": "12m", "Draft": "3.8m", "Crew": "85", "Survey Equipment": "Multi-beam Echo Sounder, Side Scan Sonar" },
    status: "active",
  },
  {
    id: "ss-2",
    name: "BNS Tallashi",
    designation: "Survey Launch",
    description: "Coastal survey launch for shallow water hydrographic surveys and port approach channel surveys.",
    specifications: { "Length": "32m", "Beam": "7m", "Draft": "2.1m", "Crew": "35", "Survey Equipment": "Single-beam Echo Sounder, DGPS" },
    status: "active",
  },
  {
    id: "ss-3",
    name: "BNS Darshak",
    designation: "Oceanographic Vessel",
    description: "Dedicated oceanographic research vessel for deep water surveys and scientific data collection.",
    specifications: { "Length": "55m", "Beam": "10m", "Draft": "3.5m", "Crew": "65", "Survey Equipment": "CTD Profiler, ADCP, Grab Sampler" },
    status: "active",
  },
];

// ─── Gallery ───

export const galleryItems: IGalleryItem[] = [
  { id: "g-1", title: "Hydrographic Survey Operations", category: "Survey", image: "/heroImages/home/img1.jpeg" },
  { id: "g-2", title: "Chart Production Facility", category: "Production", image: "/heroImages/home/img2.jpeg" },
  { id: "g-3", title: "BNS Anusandhan at Sea", category: "Ships", image: "/heroImages/home/img3.jpeg" },
  { id: "g-4", title: "ENC Production Lab", category: "Production", image: "/newsImages/news1.jpg" },
  { id: "g-5", title: "Tide Gauge Station", category: "Survey", image: "/newsImages/news2.jpg" },
  { id: "g-6", title: "Training Exercise", category: "Training", image: "/newsImages/news3.jpg" },
  { id: "g-7", title: "Oceanographic Data Collection", category: "Survey", image: "/newsImages/news4.jpg" },
  { id: "g-8", title: "International Cooperation", category: "Events", image: "/newsImages/news5.jpg" },
  { id: "g-9", title: "Marine Research Expedition", category: "Survey", image: "/heroImages/home/heroImage1.png" },
  { id: "g-10", title: "Coastal Mapping Project", category: "Survey", image: "/heroImages/home/heroImage2.jpg" },
  { id: "g-11", title: "Navigational Warning Center", category: "Operations", image: "/newsImages/news6.jpg" },
  { id: "g-12", title: "Deep Sea Sounding", category: "Survey", image: "/heroImages/home/heroImage3.jpg" },
  { id: "g-13", title: "National Maritime Day", category: "Events", image: "/heroImages/home/img1.jpeg" },
  { id: "g-14", title: "Hydrographic School", category: "Training", image: "/heroImages/home/img2.jpeg" },
  { id: "g-15", title: "Satellite Analysis", category: "Production", image: "/heroImages/home/img3.jpeg" },
];
