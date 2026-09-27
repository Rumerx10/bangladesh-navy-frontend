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

export interface OrganogramTreeItem extends IOrganogramNode {
  children: OrganogramTreeItem[];
}

interface BuildOptions {
  /** Public pages pass `true` so nodes switched off in the admin disappear,
   *  along with everything hanging beneath them. */
  activeOnly?: boolean;
}

const bySerial = (a: IOrganogramNode, b: IOrganogramNode) =>
  a.serial - b.serial;

/**
 * Turns the flat `/organogram` rows into the nested shape both the admin
 * editor and the public chart render from.
 *
 * Lives here rather than beside either consumer because the public page used
 * to draw a hardcoded copy of the hierarchy: deleting a branch in the admin
 * changed nothing on the site. One builder, fed by the API, is what keeps the
 * two honest.
 */
export const buildOrganogramTree = (
  nodes: IOrganogramNode[],
  { activeOnly = false }: BuildOptions = {}
): OrganogramTreeItem[] => {
  const source = activeOnly
    ? nodes.filter((node) => node.status === "ACTIVE")
    : nodes;

  const byId = new Map<string, OrganogramTreeItem>();
  source.forEach((node) => byId.set(node.id, { ...node, children: [] }));

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

    // The parent isn't in the set. For the admin that means broken data worth
    // surfacing, so the node is promoted to a root and stays visible. On the
    // public page it means the parent was switched off — and a department
    // floating free of the branch it reports to reads as an error, so the
    // whole subtree is dropped instead.
    if (!activeOnly) roots.push(node);
  });

  byId.forEach((node) => node.children.sort(bySerial));
  roots.sort(bySerial);

  return roots;
};

/** Total nodes in a forest, counting every descendant. */
export const countOrganogramNodes = (nodes: OrganogramTreeItem[]): number =>
  nodes.reduce((sum, node) => sum + 1 + countOrganogramNodes(node.children), 0);
