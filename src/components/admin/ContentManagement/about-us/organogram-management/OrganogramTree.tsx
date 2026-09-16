"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { OrganogramTreeItem } from "./types";

const ROOT_STYLE = {
  bg: "bg-pBlue",
  text: "text-white",
  border: "border-transparent",
};

const BRANCH_STYLE = {
  bg: "bg-liteBlue",
  text: "text-white",
  border: "border-transparent",
};

/** Every node from the department tier down gets its own color from this
 * palette (cycling if the tree has more nodes than colors), so siblings
 * like ADMINISTRATION DEPT, CHART DEPOT, TIDE ANALYSIS DEPT are each
 * individually distinguishable rather than sharing one flat color. */
export const PARENT_COLOR_PALETTE = [
  { bg: "bg-blue-50", text: "text-blue-900", border: "border-blue-300" },
  { bg: "bg-teal-50", text: "text-teal-900", border: "border-teal-300" },
  { bg: "bg-purple-50", text: "text-purple-900", border: "border-purple-300" },
  { bg: "bg-rose-50", text: "text-rose-900", border: "border-rose-300" },
  { bg: "bg-orange-50", text: "text-orange-900", border: "border-orange-300" },
  { bg: "bg-cyan-50", text: "text-cyan-900", border: "border-cyan-300" },
  { bg: "bg-indigo-50", text: "text-indigo-900", border: "border-indigo-300" },
  { bg: "bg-pink-50", text: "text-pink-900", border: "border-pink-300" },
  { bg: "bg-lime-50", text: "text-lime-900", border: "border-lime-300" },
  { bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-300" },
];

/** Depth-first walk assigning each depth>=2 node the next palette color in
 * traversal order, so consecutive siblings never repeat a color until the
 * palette wraps around. */
const assignParentColors = (
  nodes: OrganogramTreeItem[],
  depth: number,
  counter: { value: number },
  map: Map<string, number>
) => {
  nodes.forEach((node) => {
    if (depth >= 2) {
      map.set(node.id, counter.value % PARENT_COLOR_PALETTE.length);
      counter.value += 1;
    }
    assignParentColors(node.children, depth + 1, counter, map);
  });
};

export const buildColorMap = (roots: OrganogramTreeItem[]) => {
  const map = new Map<string, number>();
  assignParentColors(roots, 0, { value: 0 }, map);
  return map;
};

const styleForNode = (
  node: OrganogramTreeItem,
  depth: number,
  colorMap: Map<string, number>
) => {
  if (depth === 0) return ROOT_STYLE;
  if (depth === 1) return BRANCH_STYLE;
  return PARENT_COLOR_PALETTE[colorMap.get(node.id) ?? 0];
};

interface OrganogramNodeCardProps {
  node: OrganogramTreeItem;
  depth: number;
  colorMap: Map<string, number>;
  onAddChild: (node: OrganogramTreeItem) => void;
  onEdit: (node: OrganogramTreeItem) => void;
  onDelete: (node: OrganogramTreeItem) => void;
}

const OrganogramNodeCard = ({
  node,
  depth,
  colorMap,
  onAddChild,
  onEdit,
  onDelete,
}: OrganogramNodeCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const style = styleForNode(node, depth, colorMap);
  const hasChildren = node.children.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 shadow-sm",
          style.bg,
          style.text,
          style.border,
          node.status === "INACTIVE" && "opacity-60"
        )}
      >
        <button
          type="button"
          onClick={() => hasChildren && setExpanded((prev) => !prev)}
          className={cn(
            "flex items-center gap-2 min-w-0 text-left",
            hasChildren ? "cursor-pointer" : "cursor-default"
          )}
        >
          {hasChildren ? (
            expanded ? (
              <ChevronDown className="h-4 w-4 shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 shrink-0" />
            )
          ) : (
            <span className="w-4 shrink-0" />
          )}
          <span className="text-sm font-semibold uppercase tracking-wide truncate">
            {node.title}
          </span>
          <span className="text-xs opacity-70 shrink-0">#{node.serial}</span>
          {node.status === "INACTIVE" && (
            <span className="text-[10px] font-medium uppercase tracking-wider bg-black/10 rounded px-1.5 py-0.5 shrink-0">
              Inactive
            </span>
          )}
        </button>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => onAddChild(node)}
            aria-label={`Add child to ${node.title}`}
            title="Add child node"
            className="p-1.5 rounded-md hover:bg-black/10 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(node)}
            aria-label={`Edit ${node.title}`}
            title="Edit node"
            className="p-1.5 rounded-md hover:bg-black/10 cursor-pointer"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(node)}
            aria-label={`Delete ${node.title}`}
            title="Delete node"
            className="p-1.5 rounded-md hover:bg-black/10 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {hasChildren && expanded && (
        <div className="ml-6 border-l-2 border-dashed border-gray-200 pl-4 flex flex-col gap-2">
          {node.children.map((child) => (
            <OrganogramNodeCard
              key={child.id}
              node={child}
              depth={depth + 1}
              colorMap={colorMap}
              onAddChild={onAddChild}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface OrganogramTreeProps {
  nodes: OrganogramTreeItem[];
  onAddChild: (node: OrganogramTreeItem) => void;
  onEdit: (node: OrganogramTreeItem) => void;
  onDelete: (node: OrganogramTreeItem) => void;
}

const OrganogramTree = ({
  nodes,
  onAddChild,
  onEdit,
  onDelete,
}: OrganogramTreeProps) => {
  const colorMap = useMemo(() => buildColorMap(nodes), [nodes]);

  return (
    <div className="flex flex-col gap-3">
      {nodes.map((node) => (
        <OrganogramNodeCard
          key={node.id}
          node={node}
          depth={0}
          colorMap={colorMap}
          onAddChild={onAddChild}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default OrganogramTree;
