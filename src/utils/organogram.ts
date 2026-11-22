export interface IOrganogramNode {
  id: string;
  title: string;
  parentId: string | null;
  serial: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface IOrganogramListItem {
  id: string;
  title: string;
  parentId: string | null;
  serial: number;
}

/**
 * Nested node of the public chart. Built client-side from `GET
 * /organogram/list` (see `buildPublicOrganogramTree`), which, like
 * `/organogram/tree`, is open to anonymous visitors and only carries active
 * nodes.
 */
export interface IOrganogramTreeNode {
  id: string;
  title: string;
  serial: number;
  children: IOrganogramTreeNode[];
}

export interface OrganogramTreeItem extends IOrganogramNode {
  children: OrganogramTreeItem[];
}

const bySerial = (a: IOrganogramNode, b: IOrganogramNode) =>
  a.serial - b.serial;

/**
 * Turns the flat `/organogram` rows into the nested shape the admin editor
 * renders from, inactive nodes included — switching one off there should stay
 * visible and reversible.
 *
 * The public chart does not come through here — it uses
 * `buildPublicOrganogramTree`, which drops orphaned branches instead.
 */
export const buildOrganogramTree = (
  nodes: IOrganogramNode[]
): OrganogramTreeItem[] => {
  const byId = new Map<string, OrganogramTreeItem>();
  nodes.forEach((node) => byId.set(node.id, { ...node, children: [] }));

  const roots: OrganogramTreeItem[] = [];

  byId.forEach((node) => {
    if (!node.parentId) {
      roots.push(node);
      return;
    }

    const parent = byId.get(node.parentId);
    if (parent) {
      parent.children.push(node);
      return;
    }

    // Parent id pointing at a row that isn't in the set means broken data, and
    // silently dropping the node would hide it from the only screen that can
    // repair it. Promote it to a root so it stays reachable.
    roots.push(node);
  });

  byId.forEach((node) => node.children.sort(bySerial));
  roots.sort(bySerial);

  return roots;
};

/**
 * The public chart's tree, from the active-only `/organogram/list` rows.
 *
 * Unlike the admin builder, a node whose parent is not in the set is dropped
 * together with its whole branch: the parent is missing because an admin
 * switched it off, and switching a node off has to take its children off the
 * site too. (`/organogram/tree` instead promotes those orphans to top-level
 * roots, which is why the public page no longer reads it.)
 */
export const buildPublicOrganogramTree = (
  rows: IOrganogramListItem[]
): IOrganogramTreeNode[] => {
  const childrenOf = new Map<string | null, IOrganogramListItem[]>();
  rows.forEach((row) => {
    const key = row.parentId ?? null;
    childrenOf.set(key, [...(childrenOf.get(key) ?? []), row]);
  });

  // Walking down from the true roots only reaches nodes whose every ancestor
  // is active; `seen` guards against a parent cycle in bad data.
  const seen = new Set<string>();
  const build = (parentId: string | null): IOrganogramTreeNode[] =>
    (childrenOf.get(parentId) ?? [])
      .filter((row) => !seen.has(row.id))
      .sort((a, b) => a.serial - b.serial)
      .map((row) => {
        seen.add(row.id);
        return {
          id: row.id,
          title: row.title,
          serial: row.serial,
          children: build(row.id),
        };
      });

  return build(null);
};

/** Total nodes in a forest, counting every descendant. */
export const countOrganogramNodes = (nodes: OrganogramTreeItem[]): number =>
  nodes.reduce((sum, node) => sum + 1 + countOrganogramNodes(node.children), 0);
