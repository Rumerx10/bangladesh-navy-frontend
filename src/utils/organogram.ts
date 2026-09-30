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
 * Shape of `GET /organogram/tree` — the only organogram read that is open to
 * anonymous visitors, and already nested by the backend. It omits `parentId`
 * and `status`: the server has resolved the parent links itself, and the
 * public projection is expected to have dropped switched-off nodes before it
 * ever reaches us. Sorting is likewise the server's, so no client pass is run.
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
 * The public chart does not come through here: its `/organogram/tree` read is
 * nested server-side (see `IOrganogramTreeNode`). This builder exists for the
 * admin's flat collection read alone.
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

/** Total nodes in a forest, counting every descendant. */
export const countOrganogramNodes = (nodes: OrganogramTreeItem[]): number =>
  nodes.reduce((sum, node) => sum + 1 + countOrganogramNodes(node.children), 0);
