export interface IOrgNode {
  id: string;
  title: string;
}

export interface IOrgDeputy extends IOrgNode {
  sub: IOrgNode;
}

export interface IOrganogramData {
  root: string;
  leftBranch: {
    title: string;
    sideNodes: IOrgNode[];
    chains: IOrgNode[][];
  };
  rightBranch: {
    title: string;
    deputies: IOrgDeputy[];
  };
}

export const organogramData: IOrganogramData = {
  root: "CHIEF HYDROGRAPHER",

  leftBranch: {
    title: "ADDL CHIEF HYDROGRAPHER / CO BNHOC",
    sideNodes: [
      { id: "admin-dept", title: "ADMINISTRATION DEPT" },
      { id: "chart-depot", title: "CHART DEPOT" },
      { id: "tide-analysis", title: "TIDE ANALYSIS DEPT" },
    ],
    chains: [
      [
        { id: "oceanographic", title: "OCEANOGRAPHIC DEPT" },
        { id: "maritime-safety", title: "MERITIME SAFETY & PUBLICATION DEPT" },
        { id: "geological", title: "GEOLOGICAL & GEOPHYSICAL DEPT" },
      ],
      [
        { id: "cartographic", title: "CARTOGRAPHIC DEPT" },
        { id: "instrument", title: "INSTRUMENT & MAINTENANCE DEPT" },
        { id: "logistic", title: "LOGISTIC DEPT" },
      ],
      [
        { id: "qc-data-mgmt", title: "QUALITY CONTROL & DATA MANAGEMENT DEPT" },
        { id: "meteorology", title: "METEOROLOGY DEPT" },
        { id: "research-dev", title: "RESEARCH & DEVELOPMENT DEPT" },
      ],
    ],
  },

  rightBranch: {
    title: "ADDL CHIEF HYDROGRAPHER (OPS & PLAN)",
    deputies: [
      {
        id: "plan-policy",
        title: "DEPUTY CHIEFHYDROGRAPHER (PLAN & POLICY)",
        sub: { id: "national-affair", title: "DEPUTY CHIEFHYDROGRAPHER (NATIONAL AFFAIR)" },
      },
      {
        id: "ops-trg",
        title: "DEPUTY CHIEFHYDROGRAPHER (OPS & TRG)",
        sub: { id: "international-affair", title: "DEPUTY CHIEFHYDROGRAPHER (INTERNATIONAL AFFAIR)" },
      },
    ],
  },
};
