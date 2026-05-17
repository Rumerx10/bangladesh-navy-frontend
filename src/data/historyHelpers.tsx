import {
  Anchor,
  Compass,
  Cpu,
  Building2,
  Globe,
  Calendar,
  MapPin,
  Users,
  Award,
  Ship,
  BookOpen,
} from "lucide-react";

/* ─── Icon map for eras ─── */
export const eraIcons: Record<string, React.ReactNode> = {
  anchor: <Anchor size={22} />,
  compass: <Compass size={22} />,
  cpu: <Cpu size={22} />,
  building: <Building2 size={22} />,
  globe: <Globe size={22} />,
};

/* ─── Key Fact type & data ─── */
export interface KeyFact {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const keyFacts: KeyFact[] = [
  { icon: <Calendar size={20} />, label: "Established", value: "2001" },
  { icon: <MapPin size={20} />, label: "Location", value: "Chattogram" },
  { icon: <Ship size={20} />, label: "Parent Org", value: "Bangladesh Navy" },
  { icon: <Award size={20} />, label: "IHO Member Since", value: "2001" },
  { icon: <Users size={20} />, label: "Personnel", value: "300+" },
  { icon: <BookOpen size={20} />, label: "Charts Produced", value: "100+" },
];
