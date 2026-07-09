export interface IBasicInformation {
  length: string;
  beam: string;
  draft: string;
  crew: string;
}

export interface ISurveyShip {
  image: File | string;
  isActive: boolean;
  name: string;
  type: string;
  description: string;
  basicInformation: IBasicInformation;
  surveyEquipment: string[];
  detailsLink: string;
}

export interface ISurveyShipsManagement {
  id?: string;
  title: string;
  subTitle: string;
  shipTypes: string[];
  surveyShips: ISurveyShip[];
}
