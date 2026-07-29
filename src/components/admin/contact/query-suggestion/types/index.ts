export interface IQuerySuggestion {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  contactType: "QUERY_SUGGESTION";
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
  updatedAt: string;
}
