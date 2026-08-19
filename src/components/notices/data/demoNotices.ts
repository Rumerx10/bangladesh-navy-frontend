/**
 * ⚠️ DEMO DATA — DELETE THIS FILE TO GO LIVE.
 *
 * Placeholder notices used until the `/notices` endpoint exists. Removing this
 * file plus the marked demo block in `useNotices.ts` is the whole migration —
 * every component already reads its data through that hook.
 *
 * See docs/notices-api.md for the endpoints and payloads these fixtures mirror.
 */

import { INotice } from "../types";

/** The one PDF checked into /public, so the download button works offline. */
const SAMPLE_PDF = "/Hydrographic Note H-102.pdf";

export const DEMO_NOTICES: INotice[] = [
  {
    id: "demo-1",
    noticeNumber: "NM 21/2026",
    titleEn: "Chattogram Harbour — New Depths Reported in the Outer Bar",
    titleBn: "চট্টগ্রাম বন্দর — আউটার বারে নতুন গভীরতা রিপোর্ট",
    descriptionEn:
      "Surveys completed in July 2026 report reduced depths across the Outer Bar approach channel. Mariners are advised to consult the amended depths before transiting and to allow additional under-keel clearance at low water.",
    descriptionBn:
      "জুলাই ২০২৬-এ সম্পন্ন জরিপে আউটার বার অ্যাপ্রোচ চ্যানেলে গভীরতা হ্রাস পাওয়া গেছে। নাবিকদের চলাচলের পূর্বে সংশোধিত গভীরতা দেখে নেওয়ার পরামর্শ দেওয়া হচ্ছে।",
    type: "PERMANENT",
    pdfUrl: SAMPLE_PDF,
    publishedAt: "2026-08-04T00:00:00.000Z",
    status: "ACTIVE",
    createdAt: "2026-08-04T06:12:00.000Z",
    updatedAt: "2026-08-04T06:12:00.000Z",
  },
  {
    id: "demo-2",
    noticeNumber: "NM 20/2026",
    titleEn: "Karnaphuli River — Buoy No. 7 Temporarily Withdrawn",
    titleBn: "কর্ণফুলী নদী — ৭ নম্বর বয়া সাময়িকভাবে প্রত্যাহার",
    descriptionEn:
      "Lighted buoy No. 7 has been withdrawn for maintenance and will be re-established on or before 30 September 2026. Vessels should navigate with caution in the vicinity.",
    descriptionBn:
      "রক্ষণাবেক্ষণের জন্য ৭ নম্বর আলোকিত বয়া প্রত্যাহার করা হয়েছে এবং ৩০ সেপ্টেম্বর ২০২৬-এর মধ্যে পুনঃস্থাপন করা হবে।",
    type: "TEMPORARY",
    pdfUrl: SAMPLE_PDF,
    publishedAt: "2026-07-28T00:00:00.000Z",
    status: "ACTIVE",
    createdAt: "2026-07-28T04:40:00.000Z",
    updatedAt: "2026-07-28T04:40:00.000Z",
  },
  {
    id: "demo-3",
    noticeNumber: "NM 19/2026",
    titleEn: "Naval Gunnery Exercise — Bay of Bengal Danger Area B-3",
    titleBn: "নৌ গোলাবর্ষণ মহড়া — বঙ্গোপসাগর বিপদ এলাকা বি-৩",
    descriptionEn:
      "Live firing will take place daily between 0800 and 1600 hours from 12 to 16 August 2026 within Danger Area B-3. All craft are to remain clear of the area during the stated periods.",
    descriptionBn:
      "১২ থেকে ১৬ আগস্ট ২০২৬ পর্যন্ত প্রতিদিন ০৮০০ থেকে ১৬০০ ঘটিকা পর্যন্ত বিপদ এলাকা বি-৩ এ সরাসরি গোলাবর্ষণ অনুষ্ঠিত হবে। উক্ত সময়ে সকল নৌযানকে এলাকা এড়িয়ে চলতে বলা হচ্ছে।",
    type: "GUN_FIRE",
    pdfUrl: SAMPLE_PDF,
    publishedAt: "2026-07-22T00:00:00.000Z",
    status: "ACTIVE",
    createdAt: "2026-07-22T09:05:00.000Z",
    updatedAt: "2026-07-22T09:05:00.000Z",
  },
  {
    id: "demo-4",
    noticeNumber: "NM 18/2026",
    titleEn: "Proposed Dredging — Mongla Approach Channel",
    titleBn: "প্রস্তাবিত ড্রেজিং — মোংলা অ্যাপ্রোচ চ্যানেল",
    descriptionEn:
      "Capital dredging of the Mongla approach channel is planned to commence in the fourth quarter of 2026. Charted depths will be amended on completion; this preliminary notice is issued for planning purposes only.",
    descriptionBn:
      "২০২৬ সালের চতুর্থ প্রান্তিকে মোংলা অ্যাপ্রোচ চ্যানেলের ক্যাপিটাল ড্রেজিং শুরুর পরিকল্পনা রয়েছে। কাজ সম্পন্ন হলে চার্টের গভীরতা সংশোধন করা হবে।",
    type: "PRELIMINARY",
    pdfUrl: null,
    publishedAt: "2026-07-15T00:00:00.000Z",
    status: "ACTIVE",
    createdAt: "2026-07-15T11:20:00.000Z",
    updatedAt: "2026-07-15T11:20:00.000Z",
  },
  {
    id: "demo-5",
    noticeNumber: "NM 17/2026",
    titleEn: "Cox's Bazar — Light Characteristics Amended",
    titleBn: "কক্সবাজার — বাতির বৈশিষ্ট্য সংশোধিত",
    descriptionEn:
      "The characteristics of Cox's Bazar light have been permanently amended to Fl(2) W 10s 24m 15M. Charts and the List of Lights are to be corrected accordingly.",
    descriptionBn:
      "কক্সবাজার বাতির বৈশিষ্ট্য স্থায়ীভাবে Fl(2) W 10s 24m 15M-এ সংশোধন করা হয়েছে। চার্ট ও লাইট তালিকা সে অনুযায়ী সংশোধন করতে হবে।",
    type: "PERMANENT",
    pdfUrl: SAMPLE_PDF,
    publishedAt: "2026-07-09T00:00:00.000Z",
    status: "ACTIVE",
    createdAt: "2026-07-09T07:55:00.000Z",
    updatedAt: "2026-07-09T07:55:00.000Z",
  },
  {
    id: "demo-6",
    noticeNumber: "NM 16/2026",
    titleEn: "Payra Port — Wreck Marked by Emergency Wreck Marking Buoy",
    titleBn: "পায়রা বন্দর — জরুরি রেক মার্কিং বয়া দ্বারা চিহ্নিত ধ্বংসাবশেষ",
    descriptionEn:
      "A wreck in position 21°49.2'N 090°08.6'E has been marked by an emergency wreck marking buoy. The buoy will remain on station until salvage operations are complete.",
    descriptionBn:
      "২১°৪৯.২'উ ০৯০°০৮.৬'পূ অবস্থানে একটি ধ্বংসাবশেষ জরুরি রেক মার্কিং বয়া দ্বারা চিহ্নিত করা হয়েছে।",
    type: "TEMPORARY",
    pdfUrl: null,
    publishedAt: "2026-06-30T00:00:00.000Z",
    status: "ACTIVE",
    createdAt: "2026-06-30T13:30:00.000Z",
    updatedAt: "2026-06-30T13:30:00.000Z",
  },
  {
    id: "demo-7",
    noticeNumber: "NM 15/2026",
    titleEn: "Firing Practice — Kutubdia Danger Area K-1",
    titleBn: "গোলাবর্ষণ অনুশীলন — কুতুবদিয়া বিপদ এলাকা কে-১",
    descriptionEn:
      "Naval units will conduct surface firing practice within Danger Area K-1 on 05 and 06 September 2026 between 0900 and 1400 hours. Fishing vessels are particularly cautioned.",
    descriptionBn:
      "০৫ ও ০৬ সেপ্টেম্বর ২০২৬ তারিখে ০৯০০ থেকে ১৪০০ ঘটিকার মধ্যে বিপদ এলাকা কে-১ এ নৌ ইউনিটসমূহ গোলাবর্ষণ অনুশীলন পরিচালনা করবে। মৎস্যজীবী নৌযানসমূহকে বিশেষভাবে সতর্ক করা হচ্ছে।",
    type: "GUN_FIRE",
    pdfUrl: SAMPLE_PDF,
    publishedAt: "2026-06-24T00:00:00.000Z",
    status: "ACTIVE",
    createdAt: "2026-06-24T08:00:00.000Z",
    updatedAt: "2026-06-24T08:00:00.000Z",
  },
  {
    id: "demo-8",
    noticeNumber: "NM 14/2026",
    titleEn: "Proposed Offshore Wind Farm — Consultation Notice",
    titleBn: "প্রস্তাবিত অফশোর বায়ু বিদ্যুৎ কেন্দ্র — পরামর্শ বিজ্ঞপ্তি",
    descriptionEn:
      "A survey campaign for a proposed offshore wind farm south-west of Kuakata is expected during 2027. Mariners will be advised of survey vessel movements by separate notice.",
    descriptionBn:
      "কুয়াকাটার দক্ষিণ-পশ্চিমে প্রস্তাবিত অফশোর বায়ু বিদ্যুৎ কেন্দ্রের জন্য ২০২৭ সালে জরিপ কার্যক্রম প্রত্যাশিত।",
    type: "PRELIMINARY",
    pdfUrl: null,
    publishedAt: "2026-06-11T00:00:00.000Z",
    status: "INACTIVE",
    createdAt: "2026-06-11T10:10:00.000Z",
    updatedAt: "2026-06-11T10:10:00.000Z",
  },
];
