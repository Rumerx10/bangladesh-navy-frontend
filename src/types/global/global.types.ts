export interface IApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export type ApiResponse<T = unknown> = {
  data: T;
  message: string;
};

export type ApiError = {
  message: string;
};


export interface SurveyShipItem {
  id: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  length: string;
  beam: string;
  draft: string;
  crew: string;
  surveyEquipment: string[];
  image: string;
  status: "ACTIVE" | "INACTIVE";
  surveyCategory: {
    id: string;
    nameEn: string;
    nameBn: string;
  };
}
