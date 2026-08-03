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
  contentEn: string;
  contentBn?: string;
  createdAt?: string;
  updatedAt?: string;
  // Commented out — Title/Subtitle/Image/Key Milestones/Timeline are not part of the
  // current /history API. Kept for potential future re-enablement.
  // title?: string;
  // subTitle?: string;
  // image?: File | string;
  // keyMilestones?: IKeyMilestone[];
  // timelineItems?: ITimelineItem[];
}
