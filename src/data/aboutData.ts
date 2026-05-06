import type { IGalleryItem, ISurveyShip, ITimelineItem, IVisionMissionItem } from "@/src/components/about/types";

export const historyTimeline: ITimelineItem[] = [
  { id: "h-1", year: "1971", title: "Independence of Bangladesh", description: "Following the liberation war, Bangladesh emerged as an independent nation with significant maritime territory to survey and chart.", icon: "flag", position: "right" },
  { id: "h-2", year: "1978", title: "Establishment of Hydrographic Department", description: "The Bangladesh Navy established its Hydrographic Department to systematically survey and chart national waters.", icon: "building", position: "left" },
  { id: "h-3", year: "1990", title: "First Digital Chart Published", description: "Transition to digital cartography began with the publication of the first digitally produced nautical chart.", icon: "monitor", position: "right" },
  { id: "h-4", year: "2010", title: "ENC Production Commenced", description: "Started production of Electronic Navigational Charts (ENC) in accordance with IHO standards for ECDIS systems.", icon: "cpu", position: "left" },
  { id: "h-5", year: "2020", title: "GIS Integration Implemented", description: "Full integration of Geographic Information Systems for advanced spatial data management and visualization.", icon: "globe", position: "right" },
];

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
