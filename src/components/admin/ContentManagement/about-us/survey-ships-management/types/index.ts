export interface ISurveyCategory {
  id: string;
  nameEn: string;
  nameBn: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface ISurveyShipCategory {
  id: string;
  nameEn: string;
  nameBn: string;
}

export interface ISurveyShip {
  id: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
  length: string;
  beam: string;
  draft: string;
  crew: string;
  surveyEquipment: string[];
  image: string;
  status: "ACTIVE" | "INACTIVE";
  surveyCategory: ISurveyShipCategory;
  createdAt?: string;
  updatedAt?: string;
}
