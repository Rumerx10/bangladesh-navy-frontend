"use client";

import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Plus, Network } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import OrganogramTree, { PARENT_COLOR_PALETTE } from "./OrganogramTree";
import CreateUpdateOrganogram from "./Form/CreateUpdateOrganogram";
import { IOrganogramNode, OrganogramTreeItem } from "./types";

const buildTree = (nodes: IOrganogramNode[]): OrganogramTreeItem[] => {
  const byId = new Map<string, OrganogramTreeItem>();
  nodes.forEach((n) => byId.set(n.id, { ...n, children: [] }));

  const roots: OrganogramTreeItem[] = [];
  byId.forEach((node) => {
    const parent = node.parentId ? byId.get(node.parentId) : undefined;
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  const bySerial = (a: IOrganogramNode, b: IOrganogramNode) =>
    a.serial - b.serial;
  byId.forEach((node) => node.children.sort(bySerial));
  roots.sort(bySerial);

  return roots;
};

const countAll = (nodes: OrganogramTreeItem[]): number =>
  nodes.reduce((sum, n) => sum + 1 + countAll(n.children), 0);

const OrganogramManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IOrganogramNode | undefined>();
  const [defaultParentId, setDefaultParentId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<OrganogramTreeItem | null>(
    null
  );

  const { data, isLoading } = useGet<IOrganogramNode[]>(
    "/organogram",
    ["organogram-all"],
    { page: "1", limit: "1000" }
  );

  const nodes = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );
  const tree = useMemo(() => buildTree(nodes), [nodes]);

  const { mutate: deleteMutate } = useDelete(
    () => {
      toast.success("Organogram node deleted successfully!");
      setPendingDelete(null);
    },
    [["organogram-all"], ["organogram-list"]]
  );

  const handleAddRoot = () => {
    setSelectedItem(undefined);
    setDefaultParentId(null);
    setIsModalOpen(true);
  };

  const handleAddChild = (node: OrganogramTreeItem) => {
    setSelectedItem(undefined);
    setDefaultParentId(node.id);
    setIsModalOpen(true);
  };

  const handleEdit = (node: OrganogramTreeItem) => {
    setSelectedItem(node);
    setDefaultParentId(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
    setDefaultParentId(null);
  };

  const childCount = pendingDelete ? countAll(pendingDelete.children) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-light-silver rounded-lg p-5">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-md border border-primary/20">
            <Network className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-lg font-semibold text-pBlue">Organogram</p>
            <p className="text-sm text-secondary-gary">
              Manage the organizational hierarchy shown on the public
              Organogram page.
            </p>
          </div>
        </div>
        <Button
          onClick={handleAddRoot}
          className="text-white font-inter text-sm font-medium bg-primary hover:bg-primary/70 h-11 gap-1 px-6!"
        >
          <Plus className="h-4 w-4" /> Add Root Node
        </Button>
      </div>

      <div className="bg-white border border-light-silver rounded-lg p-6">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : tree.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <Network className="h-10 w-10 text-gray-300" />
            <p className="text-sm text-secondary-gary">
              No organogram nodes yet. Start by adding a root node.
            </p>
          </div>
        ) : (
          <OrganogramTree
            nodes={tree}
            onAddChild={handleAddChild}
            onEdit={handleEdit}
            onDelete={setPendingDelete}
          />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400 tracking-wide uppercase">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-pBlue" />
          Root
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-liteBlue" />
          Branch
        </span>
        <span className="flex items-center gap-1.5">
          {PARENT_COLOR_PALETTE.map((s) => (
            <span
              key={s.bg}
              className={`inline-block w-3 h-3 rounded-sm border ${s.bg} ${s.border}`}
            />
          ))}
          Departments &amp; below — each node its own color
        </span>
      </div>

      <CreateUpdateOrganogram
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
        defaultParentId={defaultParentId}
      />

      <DeleteConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteMutate({ url: `/organogram/${pendingDelete.id}` });
          }
        }}
        title="Delete this organogram node?"
        description={
          pendingDelete
            ? `"${pendingDelete.title}" will be permanently removed.${
                childCount > 0
                  ? ` It has ${childCount} child node${
                      childCount > 1 ? "s" : ""
                    } — check with the backend team on how deletes cascade before proceeding.`
                  : ""
              }`
            : undefined
        }
      />
    </div>
  );
};

export default OrganogramManagement;
