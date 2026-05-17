// ─── About Page Types ───

export interface ITimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  position: "left" | "right";
}

export interface IVisionMissionItem {
  id: string;
  type: "vision" | "mission";
  title: string;
  description: string;
  points?: string[];
  icon: string;
}

export interface IOrganizationMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  image?: string;
}

export interface IOrganizationUnit {
  id: string;
  name: string;
  description: string;
  members?: IOrganizationMember[];
  subUnits?: IOrganizationUnit[];
}

export interface ISurveyShip {
  id: string;
  slug: string;
  name: string;
  designation: string;
  description: string;
  image?: string;
  specifications: Record<string, string>;
  status: "active" | "retired" | "under-maintenance";
  details: string[];
}

export interface IGalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  date?: string;
}

export interface IGalleryCategory {
  id: string;
  name: string;
  count: number;
}
