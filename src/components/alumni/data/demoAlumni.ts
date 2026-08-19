import { IAlumniBatch, IAlumniCourse } from "../types";

/**
 * Placeholder alumni data used until the `/alumni-batches` and
 * `/alumni-courses` endpoints exist. Transcribed from the institute's
 * "LIST OF ALL BASIC HYDRO COURSE" document.
 *
 * Removing this file is step 1 of going live — see docs/alumni-api.md.
 */

export const DEMO_ALUMNI_COURSES: IAlumniCourse[] = [
  { id: "demo-course-basic", nameEn: "Basic Hydro", status: "ACTIVE" },
  { id: "demo-course-advanced", nameEn: "Advanced Hydro", status: "ACTIVE" },
];

export const DEMO_ALUMNI_BATCHES: IAlumniBatch[] = [
  {
    id: "demo-batch-1",
    batchNo: 1,
    titleEn: "1st Basic Hydro",
    startDate: "1997-03-08T00:00:00.000Z",
    endDate: "1997-08-07T00:00:00.000Z",
    status: "ACTIVE",
    alumniCourseId: "demo-course-basic",
    alumniCourse: DEMO_ALUMNI_COURSES[0],
    members: [
      {
        serial: 1,
        pNo: "790",
        rankName: "Cdre A K M Mostak Sherafullah, (H1), psc, BN",
        organization: "BN",
        remarks: "Present Rank",
      },
      {
        serial: 2,
        pNo: "817",
        rankName: "Lt Cdr K A Rahman, (H2), BN (Rtd)",
        organization: "BN",
        remarks: "Rtd",
      },
      {
        serial: 3,
        pNo: "963",
        rankName: "Capt Shah Mohammad Moyeen Uddin, (H1), psc, BN",
        organization: "BN",
        remarks: "Present Rank",
      },
      {
        serial: 4,
        pNo: "969",
        rankName: "Cdr Mohammad Abul Hasan, (H1), psc, BN",
        organization: "BN",
        remarks: "Present Rank",
      },
      {
        serial: 5,
        pNo: "972",
        rankName: "Lt Cdr S M Anisur Rahman, (H3), BN",
        organization: "BN",
        remarks: "Present Rank",
      },
    ],
  },
  {
    id: "demo-batch-2",
    batchNo: 2,
    titleEn: "2nd Basic Hydro",
    startDate: "1998-09-06T00:00:00.000Z",
    endDate: "1999-02-04T00:00:00.000Z",
    status: "ACTIVE",
    alumniCourseId: "demo-course-basic",
    alumniCourse: DEMO_ALUMNI_COURSES[0],
    members: [
      {
        serial: 1,
        pNo: "913",
        rankName: "Instr Cdre M Jashim Uddin, (H1) (Rtd)",
        organization: "BN",
        remarks: "Present Rank",
      },
      {
        serial: 2,
        pNo: "927",
        rankName: "Cdre Mohammad Minarul Hoque, (H), psc, BN",
        organization: "BN",
        remarks: "Present Rank",
      },
      {
        serial: 3,
        pNo: "992",
        rankName: "Lt Cdr M M U Mallik, (H4), BN (Change Branch)",
        organization: "BN",
        remarks: "",
      },
      {
        serial: 4,
        pNo: "986",
        rankName: "Capt Mohammad Habibul Alam, (H1), NUP, PCGM, BN",
        organization: "BN",
        remarks: "Present Rank",
      },
      {
        serial: 5,
        pNo: "1006",
        rankName: "Cdre Sheikh Firoz Ahmed, (H), NGP, psc, BN",
        organization: "BN",
        remarks: "Present Rank",
      },
      {
        serial: 6,
        pNo: "1039",
        rankName: "Capt M Manzur-Ul-Karim Chowdhury, (H2), psc, BN",
        organization: "BN",
        remarks: "Present Rank",
      },
    ],
  },
];
