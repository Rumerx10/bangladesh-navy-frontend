import type { HydrographicNoteFormType } from "./hydrographicNoteValidationSchema";

type NoteField = keyof HydrographicNoteFormType;

// Same sections, order and labels as the public form, so the copy reads like
// the H-102 the observer filled in.
const SECTIONS: { title: string; fields: [NoteField, string][] }[] = [
  {
    title: "Sender Information",
    fields: [
      ["date", "Date"],
      ["refNumber", "Ref Number"],
      ["nameOfShip", "Name of Ship or Sender"],
      ["imoNumber", "IMO Number"],
      ["address", "Address"],
      ["email", "E-mail"],
      ["tel", "Tel"],
      ["fax", "Fax"],
    ],
  },
  {
    title: "Locality & Subject",
    fields: [
      ["generalLocality", "General Locality"],
      ["subject", "Subject"],
    ],
  },
  {
    title: "Position",
    fields: [
      ["latitude", "Latitude"],
      ["longitude", "Longitude"],
      ["gps", "GPS"],
      ["datum", "Datum"],
      ["accuracy", "Accuracy"],
    ],
  },
  {
    title: "BN Charts",
    fields: [
      ["bnChartsAffected", "BN Charts Affected"],
      ["edition", "Edition"],
      ["latestNoticesToMariners", "Latest Notices to Mariners Held"],
      ["replacementCopyOfChartNo", "Replacement Copy of Chart No"],
      ["replacementRequired", "Replacement Required"],
    ],
  },
  {
    title: "ENCs & ECDIS",
    fields: [
      ["encsAffected", "ENCs Affected"],
      ["latestUpdateApplied", "Latest Update Applied (Week)"],
      ["modelAndAgeOfECDIS", "Model and Age of ECDIS"],
    ],
  },
  {
    title: "Publications",
    fields: [
      ["publicationsAffected", "Publications Affected"],
      ["dateOfLatestSupplement", "Date of Latest Supplement / Update"],
    ],
  },
  {
    title: "Observation Details",
    fields: [
      ["detailsOfObservation", "Details of Observation"],
      ["nameOfObserver", "Name of Observer / Reporter"],
    ],
  },
];

const REPLACEMENT_LABELS: Record<string, string> = {
  required: "Required",
  "not-required": "Not Required",
};

const formatValue = (field: NoteField, value: unknown) => {
  if (value === undefined || value === null || value === "") return "—";
  if (field === "replacementRequired") {
    return REPLACEMENT_LABELS[String(value)] ?? String(value);
  }
  return String(value);
};

const toFileSlug = (value: string) =>
  value
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

/** Builds a PDF of a Hydrographic Note and saves it to the observer's device —
 * either a copy of a submitted note or the filled-in form before submitting.
 * jsPDF is loaded on demand so it stays out of the page bundle until someone
 * actually asks for a copy. */
export const downloadHydrographicNotePdf = async (
  note: HydrographicNoteFormType,
  generatedAt: Date,
  { submitted = true }: { submitted?: boolean } = {}
) => {
  const [{ jsPDF }, { default: autoTable }] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 40;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(11, 42, 74);
  doc.text("Hydrographic Note (H-102)", margin, 50);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90);
  doc.text("Bangladesh Navy Hydrographic & Oceanographic Center", margin, 66);
  doc.text(
    `${submitted ? "Submitted" : "Generated"} on ${generatedAt.toLocaleString()}`,
    margin,
    80
  );

  // One table with full-width section rows, so autotable handles page breaks
  // across the whole note instead of per section.
  autoTable(doc, {
    startY: 96,
    margin: { left: margin, right: margin },
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 6,
      overflow: "linebreak",
      valign: "top",
      lineColor: [220, 225, 232],
    },
    columnStyles: {
      0: { cellWidth: 170, fontStyle: "bold", textColor: 60 },
      1: { textColor: 30 },
    },
    body: SECTIONS.flatMap((section) => [
      [
        {
          content: section.title.toUpperCase(),
          colSpan: 2,
          styles: {
            fillColor: [11, 42, 74],
            textColor: 255,
            fontStyle: "bold",
          },
        },
      ],
      ...section.fields.map(([field, label]) => [
        label,
        formatValue(field, note[field]),
      ]),
    ]),
  });

  const pageCount = doc.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(140);
  for (let page = 1; page <= pageCount; page++) {
    doc.setPage(page);
    doc.text(
      `Page ${page} of ${pageCount}`,
      pageWidth - margin,
      pageHeight - 20,
      {
        align: "right",
      }
    );
  }

  const ref = toFileSlug(note.refNumber ?? "");
  const day = generatedAt.toISOString().slice(0, 10);
  doc.save(`hydrographic-note${ref ? `-${ref}` : ""}-${day}.pdf`);
};
