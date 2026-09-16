"use client";

import { useFormContext } from "react-hook-form";
import { Network } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledComboboxSelect from "@/src/components/shared/FromController/ControlledComboboxSelect";
import { Button } from "@/src/components/ui/button";
import { ErrorType } from "@/src/components/shared/types/common";
import { IOrganogramListItem } from "../types";
import { OrganogramFormValues } from "../Schema/organogramSchema";

export const NO_PARENT_VALUE = "__none__";

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

/** Collects the id of `nodeId` plus every one of its descendants, so a node
 * can never be re-parented under itself or its own subtree. */
const getSelfAndDescendantIds = (
  nodeId: string,
  nodes: IOrganogramListItem[]
) => {
  const childrenByParent = new Map<string, string[]>();
  nodes.forEach((n) => {
    if (!n.parentId) return;
    childrenByParent.set(n.parentId, [
      ...(childrenByParent.get(n.parentId) ?? []),
      n.id,
    ]);
  });

  const excluded = new Set<string>([nodeId]);
  const stack = [nodeId];
  while (stack.length) {
    const current = stack.pop() as string;
    for (const childId of childrenByParent.get(current) ?? []) {
      if (!excluded.has(childId)) {
        excluded.add(childId);
        stack.push(childId);
      }
    }
  }
  return excluded;
};

interface OrganogramFormProps {
  isEditMode?: boolean;
  editingNodeId?: string;
  onSubmit: (data: OrganogramFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

const OrganogramForm = ({
  isEditMode = false,
  editingNodeId,
  onSubmit,
  onCancel,
  isPending = false,
  error,
}: OrganogramFormProps) => {
  const { handleSubmit } = useFormContext<OrganogramFormValues>();

  const { data: listData } = useGet<IOrganogramListItem[]>(
    "/organogram/list",
    ["organogram-list"]
  );

  const allNodes = Array.isArray(listData?.data) ? listData.data : [];
  const excludedIds = editingNodeId
    ? getSelfAndDescendantIds(editingNodeId, allNodes)
    : new Set<string>();

  const parentOptions = [
    { label: "No parent (Top level)", value: NO_PARENT_VALUE },
    ...allNodes
      .filter((n) => !excludedIds.has(n.id))
      .map((n) => ({ label: n.title, value: n.id })),
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="border border-light-silver rounded-lg p-8 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 w-9 h-9 flex items-center justify-center rounded-md border border-primary/20">
            <Network className="w-4 h-4 text-primary" />
          </div>
          <span className="xl:text-lg font-medium text-pBlue">
            Node Details
          </span>
        </div>

        <div className="flex flex-col gap-y-6">
          <div>
            <InputLabel label="Title" required />
            <ControlledInputField
              name="title"
              placeholder="e.g. ADMINISTRATION DEPT"
              className="bg-light shadow-none"
            />
          </div>

          <div>
            <InputLabel label="Parent Node" />
            <ControlledComboboxSelect
              name="parentId"
              options={parentOptions}
              placeholder="Select a parent node"
              searchPlaceholder="Search nodes..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <InputLabel label="Serial" required />
              <ControlledInputField
                name="serial"
                type="number"
                placeholder="e.g. 1"
                className="bg-light shadow-none"
              />
            </div>
            <div>
              <InputLabel label="Status" required />
              <ControlledSelectField
                name="status"
                options={STATUS_OPTIONS}
                placeholder="Select status"
              />
            </div>
          </div>
        </div>
      </div>

      <ErrorMessage error={error} />

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          className="text-secondary-foreground bg-transparent hover:bg-gray-100 duration-300 border hover:shadow cursor-pointer"
        >
          Cancel
        </Button>
        <SubmitButton
          isLoading={isPending}
          label={isEditMode ? "Update Node" : "Create Node"}
        />
      </div>
    </form>
  );
};

export default OrganogramForm;
