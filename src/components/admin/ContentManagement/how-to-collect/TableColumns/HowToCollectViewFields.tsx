import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { getStepIcon, STEP_ICON_OPTIONS } from "@/src/data/howToCollectIcons";
import { IHowToCollectStep } from "../types";

export const getHowToCollectViewSections = (
  item: IHowToCollectStep
): ViewSection[] => {
  const Icon = getStepIcon(item.icon);
  const iconLabel =
    STEP_ICON_OPTIONS.find((option) => option.value === item.icon)?.label ??
    item.icon;

  return [
    {
      title: "General",
      fields: [
        { label: "Serial", value: item.serial },
        { label: "Step Name", value: item.stepName },
        {
          label: "Icon",
          type: "custom",
          value: (
            <span className="inline-flex items-center gap-2 font-medium">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              {iconLabel || "—"}
            </span>
          ),
        },
        { label: "Status", type: "status", value: item.status },
        { label: "Title", value: item.title, fullWidth: true },
        { label: "Description", type: "longText", value: item.description },
        { label: "Extra Details", type: "keyValue", value: item.extraFields },
      ],
    },
    recordMetaSection(item),
  ];
};
