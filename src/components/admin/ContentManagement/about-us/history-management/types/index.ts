export interface IKeyMilestone {
  year: string;
  description: string;
}

export interface ITimelineItem {
  id: number;
  period: string;
  title: string;
  icon: File | string;
  summary: string;
  highlights: string[];
  note: string;
}

export interface IHistoryManagement {
  id?: string;
  title: string;
  subTitle: string;
  image: File | string;
  description: string;
  keyMilestones: IKeyMilestone[];
  timelineItems: ITimelineItem[];
}
