export interface IVisionMission {
  title: string;
  description: string;
}

export interface IMissionVisionManagement {
  id?: string;
  title: string;
  subTitle: string;
  vision: IVisionMission;
  mission: IVisionMission;
}
