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
