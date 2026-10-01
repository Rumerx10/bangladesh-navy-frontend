/** User-defined key/value row attached to a step — rendered as a detail
 * table inside the step card on the public page. */
export interface IExtraField {
  key: string;
  value: string;
}

export interface IHowToCollectStep {
  id: string;
  /** Identifier from `STEP_ICON_OPTIONS` in `src/data/howToCollectIcons.ts`. */
  icon: string;
  stepName: string;
  title: string;
  description: string;
  extraFields: IExtraField[] | null;
  serial: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: string;
  updatedAt?: string;
}
