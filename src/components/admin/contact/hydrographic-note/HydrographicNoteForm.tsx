"use client";

import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Download, FileDown } from "lucide-react";
import { usePost } from "@/src/hooks/usePost";
import { Button } from "@/src/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { type Resolver, FormProvider, useForm } from "react-hook-form";

import {
  HYDROGRAPHIC_NOTE_MAX_LENGTH as LIMIT,
  HydrographicNoteFormType,
  hydrographicNoteValidationSchema,
  todayIsoDate,
} from "./hydrographicNoteValidationSchema";
import { downloadHydrographicNotePdf } from "./downloadHydrographicNotePdf";
import InputLabel from "@/src/components/shared/InputLabel";
import { IGenericErrorResponse } from "@/src/components/shared/types/common";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledPhoneField from "@/src/components/shared/FromController/ControlledPhoneField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";

const REPLACEMENT_OPTIONS = [
  { label: "Required", value: "required" },
  { label: "Not Required", value: "not-required" },
];

const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="border-l-4 border-pBlue bg-blue-50 px-4 py-2.5 mb-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-pBlue">
        {title}
      </p>
    </div>
  );
};

interface SubmittedNote {
  data: HydrographicNoteFormType;
  submittedAt: Date;
}

const HydrographicNoteForm = () => {
  // Which submit button started the request, so only that one says
  // "Submitting...".
  const [activeAction, setActiveAction] = useState<
    "submit" | "submitAndDownload" | null
  >(null);
  // Kept after a successful submission so the observer can still download a
  // copy even if they used the plain Submit button.
  const [submittedNote, setSubmittedNote] = useState<SubmittedNote | null>(
    null
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const confirmationRef = useRef<HTMLDivElement>(null);

  const { mutateAsync, error, isPending } = usePost(
    "/hydrographic-note",
    undefined,
    [["hydrographic"]]
  );

  const methods = useForm<HydrographicNoteFormType>({
    resolver: yupResolver(
      hydrographicNoteValidationSchema
    ) as unknown as Resolver<HydrographicNoteFormType>,
    mode: "onChange",
    defaultValues: {
      date: "",
      refNumber: "",
      nameOfShip: "",
      imoNumber: "",
      address: "",
      email: "",
      tel: "",
      fax: "",
      generalLocality: "",
      subject: "",
      latitude: "",
      longitude: "",
      gps: "",
      datum: "",
      accuracy: "",
      bnChartsAffected: "",
      edition: "",
      latestNoticesToMariners: "",
      replacementCopyOfChartNo: "",
      replacementRequired: undefined,
      encsAffected: "",
      latestUpdateApplied: "",
      modelAndAgeOfECDIS: "",
      publicationsAffected: "",
      dateOfLatestSupplement: "",
      detailsOfObservation: "",
      nameOfObserver: "",
    },
  });
  // Read during render so the form tracks validity — "Download Form" stays
  // disabled until every required field is filled in.
  const { isValid } = methods.formState;

  // The form is long, so bring the confirmation into view once it replaces it.
  useEffect(() => {
    if (submittedNote) {
      confirmationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [submittedNote]);

  const downloadPdf = async (
    data: HydrographicNoteFormType,
    generatedAt: Date,
    submitted: boolean
  ) => {
    setIsDownloading(true);
    try {
      await downloadHydrographicNotePdf(data, generatedAt, { submitted });
    } catch {
      toast.error("Couldn't generate the PDF copy. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadCopy = (note: SubmittedNote) =>
    downloadPdf(note.data, note.submittedAt, true);

  // Downloads the filled-in form without submitting it. Runs through
  // handleSubmit so the PDF gets the same trimmed values a submission would.
  const downloadFilledForm = methods.handleSubmit((data) =>
    downloadPdf(data, new Date(), false)
  );

  const submitNote = async (
    data: HydrographicNoteFormType,
    withDownload: boolean
  ) => {
    // Optional fields left blank are dropped rather than sent as "" — the API
    // treats an empty string as a supplied value and validates it.
    const payload = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== undefined && value !== ""
      )
    );

    setActiveAction(withDownload ? "submitAndDownload" : "submit");
    try {
      await mutateAsync(payload);
    } catch (err) {
      // Surface the per-field reasons instead of a bare "validation failed".
      const apiError = err as IGenericErrorResponse;
      const details = apiError?.errorMessages
        ?.map((e) => e.message)
        .filter(Boolean)
        .join(", ");
      toast.error(
        details || apiError?.message || "Failed to submit hydrographic note"
      );
      return;
    } finally {
      setActiveAction(null);
    }

    const note = { data, submittedAt: new Date() };
    setSubmittedNote(note);
    methods.reset();
    toast.success("Hydrographic note submitted successfully!");
    if (withDownload) await downloadCopy(note);
  };

  const startNewNote = () => {
    setSubmittedNote(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-pBlue lg:text-3xl">
            Hydrographic Note Form
          </h2>
          {!submittedNote && (
            // The title sits on a wrapper because a disabled button gets no
            // pointer events, so its own tooltip would never show.
            <span
              title={
                isValid
                  ? "Download the filled-in form as a PDF"
                  : "Fill in all required fields to download the form"
              }
            >
              <button
                type="button"
                onClick={downloadFilledForm}
                disabled={!isValid || isDownloading}
                className="border px-3 gap-3 h-10 flex items-center text-white bg-green-500 hover:bg-green-600 justify-center rounded-sm cursor-pointer hover:scale-105 duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-green-500"
              >
                <Download size={20} />
                <span className="text-md font-medium">
                  {isDownloading ? "Preparing PDF..." : "Download Form"}
                </span>
              </button>
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-secondary-foreground lg:text-base">
          Fill out this form to report navigational hazards, depth anomalies, or
          other hydrographic observations.
        </p>
      </div>

      {submittedNote ? (
        <div
          ref={confirmationRef}
          className="rounded-xl border border-border bg-card px-6 py-10 text-center shadow-sm sm:px-10"
        >
          <CheckCircle2 size={48} className="mx-auto text-green-500" />
          <h3 className="mt-4 text-xl font-bold text-pBlue lg:text-2xl">
            Hydrographic Note Submitted
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-secondary-foreground lg:text-base">
            Thank you, {submittedNote.data.nameOfObserver}. Your note &ldquo;
            {submittedNote.data.subject}&rdquo; was received on{" "}
            {submittedNote.submittedAt.toLocaleString()}. Download a copy for
            your records — it won&apos;t be available here once you leave this
            page.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              type="button"
              onClick={() => downloadCopy(submittedNote)}
              disabled={isDownloading}
              className="h-11 cursor-pointer rounded-lg bg-primary px-6 text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FileDown size={18} />
              {isDownloading ? "Preparing PDF..." : "Download a Copy (PDF)"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={startNewNote}
              className="h-11 cursor-pointer rounded-lg px-6"
            >
              Submit New
            </Button>
          </div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            noValidate
            onSubmit={methods.handleSubmit((data) => submitNote(data, false))}
            className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          >
            {/* ── SENDER INFORMATION ── */}
            <div className="p-6 pb-0">
              <SectionHeader title="Sender Information" />
            </div>

            <div className="grid grid-cols-1 gap-5 px-6 pb-6 md:grid-cols-2">
              <div>
                <InputLabel label="Date" required />
                <ControlledInputField
                  type="date"
                  name="date"
                  max={todayIsoDate()}
                  className="bg-card"
                />
              </div>
              <div>
                <InputLabel label="Ref Number" required />
                <ControlledInputField
                  name="refNumber"
                  placeholder="e.g. BNHOC/HN/2026/014"
                  maxLength={LIMIT.refNumber}
                  className="bg-card"
                />
              </div>

              <div className="md:col-span-2">
                <InputLabel label="Name of Ship or Sender" required />
                <ControlledInputField
                  name="nameOfShip"
                  placeholder="e.g. MV Banglar Joy, or the sender's name"
                  maxLength={LIMIT.nameOfShip}
                  className="bg-card"
                />
              </div>

              <div>
                <InputLabel label="IMO Number (if applicable)" />
                <ControlledInputField
                  name="imoNumber"
                  placeholder="e.g. IMO 9074729"
                  maxLength={LIMIT.imoNumber}
                  autoComplete="off"
                  className="bg-card"
                />
              </div>
              <div>
                <InputLabel label="Address" required />
                <ControlledInputField
                  name="address"
                  placeholder="Postal address of the ship's owner or sender"
                  maxLength={LIMIT.address}
                  autoComplete="street-address"
                  className="bg-card"
                />
              </div>

              <div>
                <InputLabel label="E-mail" required />
                <ControlledInputField
                  type="email"
                  name="email"
                  placeholder="e.g. master@shippingline.com"
                  maxLength={LIMIT.email}
                  autoComplete="email"
                  className="bg-card"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <InputLabel label="Tel" required />
                  <ControlledPhoneField
                    name="tel"
                    placeholder="e.g. 01712345678"
                    className="bg-card"
                  />
                </div>
                <div>
                  <InputLabel label="Fax" />
                  <ControlledPhoneField
                    name="fax"
                    placeholder="e.g. +88031123456"
                    autoComplete="off"
                    className="bg-card"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border" />

            {/* ── LOCALITY & SUBJECT ── */}
            <div className="p-6 pb-0">
              <SectionHeader title="Locality &amp; Subject" />
            </div>

            <div className="grid grid-cols-1 gap-5 px-6 pb-6">
              <div>
                <InputLabel label="General Locality" required />
                <ControlledInputField
                  name="generalLocality"
                  placeholder="e.g. Approaches to Chattogram Port"
                  maxLength={LIMIT.generalLocality}
                  className="bg-card"
                />
              </div>
              <div>
                <InputLabel label="Subject" required />
                <ControlledInputField
                  name="subject"
                  placeholder="e.g. Uncharted shoal, light extinguished"
                  maxLength={LIMIT.subject}
                  className="bg-card"
                />
              </div>
            </div>

            <div className="border-t border-border" />

            {/* ── POSITION ── */}
            <div className="p-6 pb-0">
              <SectionHeader title="Position (see Instructions for Hydrographic Notes)" />
            </div>

            <div className="grid grid-cols-1 gap-5 px-6 pb-6 md:grid-cols-2">
              <div>
                <InputLabel label="Latitude" required />
                <ControlledInputField
                  name="latitude"
                  placeholder="e.g. 22° 20.5′ N"
                  maxLength={LIMIT.latitude}
                  autoComplete="off"
                  className="bg-card"
                />
              </div>
              <div>
                <InputLabel label="Longitude" required />
                <ControlledInputField
                  name="longitude"
                  placeholder="e.g. 91° 48.2′ E"
                  maxLength={LIMIT.longitude}
                  autoComplete="off"
                  className="bg-card"
                />
              </div>

              <div>
                <InputLabel label="GPS" />
                <ControlledInputField
                  name="gps"
                  placeholder="e.g. DGPS, receiver model"
                  maxLength={LIMIT.gps}
                  className="bg-card"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <InputLabel label="Datum" />
                  <ControlledInputField
                    name="datum"
                    placeholder="e.g. WGS 84"
                    maxLength={LIMIT.datum}
                    className="bg-card"
                  />
                </div>
                <div>
                  <InputLabel label="Accuracy" />
                  <ControlledInputField
                    name="accuracy"
                    placeholder="e.g. ±5 m"
                    maxLength={LIMIT.accuracy}
                    className="bg-card"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border" />

            {/* ── BN CHARTS ── */}
            <div className="p-6 pb-0">
              <SectionHeader title="BN Charts" />
            </div>

            <div className="grid grid-cols-1 gap-5 px-6 pb-6 md:grid-cols-2">
              <div>
                <InputLabel label="BN Charts Affected" required />
                <ControlledInputField
                  name="bnChartsAffected"
                  placeholder="e.g. BN 1001, BN 1002"
                  maxLength={LIMIT.bnChartsAffected}
                  className="bg-card"
                />
              </div>
              <div>
                <InputLabel label="Edition" />
                <ControlledInputField
                  name="edition"
                  placeholder="e.g. 3rd Edition, 2024"
                  maxLength={LIMIT.edition}
                  className="bg-card"
                />
              </div>

              <div className="md:col-span-2">
                <InputLabel label="Latest Notices to Mariners Held" />
                <ControlledInputField
                  name="latestNoticesToMariners"
                  placeholder="e.g. NM 25/2026"
                  maxLength={LIMIT.latestNoticesToMariners}
                  className="bg-card"
                />
              </div>

              <div>
                <InputLabel label="Replacement Copy of Chart No (see Instructions for Hydrographic Notes)" />
                <ControlledInputField
                  name="replacementCopyOfChartNo"
                  placeholder="e.g. BN 1001"
                  maxLength={LIMIT.replacementCopyOfChartNo}
                  className="bg-card"
                />
              </div>
              <div>
                <InputLabel label="Required / Not Required" />
                <ControlledSelectField
                  name="replacementRequired"
                  placeholder="Select option"
                  options={REPLACEMENT_OPTIONS}
                />
              </div>
            </div>

            <div className="border-t border-border" />

            {/* ── ENCs & ECDIS ── */}
            <div className="p-6 pb-0">
              <SectionHeader title="ENCs &amp; ECDIS" />
            </div>

            <div className="grid grid-cols-1 gap-5 px-6 pb-6 md:grid-cols-2">
              <div>
                <InputLabel label="ENCs Affected" />
                <ControlledInputField
                  name="encsAffected"
                  placeholder="e.g. BD500001"
                  maxLength={LIMIT.encsAffected}
                  className="bg-card"
                />
              </div>
              <div>
                <InputLabel label="Latest Update Applied (Week)" />
                <ControlledInputField
                  name="latestUpdateApplied"
                  placeholder="e.g. Week 23/2026"
                  maxLength={LIMIT.latestUpdateApplied}
                  className="bg-card"
                />
              </div>

              <div className="md:col-span-2">
                <InputLabel label="Model and Age of ECDIS (if applicable)" />
                <ControlledInputField
                  name="modelAndAgeOfECDIS"
                  placeholder="e.g. Furuno FMD-3200, 5 years"
                  maxLength={LIMIT.modelAndAgeOfECDIS}
                  className="bg-card"
                />
              </div>
            </div>

            <div className="border-t border-border" />

            {/* ── PUBLICATIONS ── */}
            <div className="p-6 pb-0">
              <SectionHeader title="Publications" />
            </div>

            <div className="grid grid-cols-1 gap-5 px-6 pb-6">
              <div>
                <InputLabel label="Publications Affected (NP/HP number, Edition No)" />
                <ControlledInputField
                  name="publicationsAffected"
                  placeholder="e.g. NP 21, Edition 12"
                  maxLength={LIMIT.publicationsAffected}
                  className="bg-card"
                />
              </div>
              <div>
                <InputLabel label="Date of Latest Supplement / Update, Page &amp; Light List No. etc" />
                <ControlledInputField
                  name="dateOfLatestSupplement"
                  placeholder="e.g. Supplement 2/2026, page 45, Light List No. 1234"
                  maxLength={LIMIT.dateOfLatestSupplement}
                  className="bg-card"
                />
              </div>
            </div>

            <div className="border-t border-border" />

            {/* ── OBSERVATION DETAILS ── */}
            <div className="p-6 pb-0">
              <SectionHeader title="Observation Details" />
            </div>

            <div className="grid grid-cols-1 gap-5 px-6 pb-6">
              <div>
                <InputLabel label="Details of Observation" required />
                <ControlledTextareaField
                  name="detailsOfObservation"
                  placeholder="Describe what was observed: the hazard or discrepancy, how it was detected, depths, times and any supporting evidence."
                  maxLength={LIMIT.detailsOfObservation}
                  className="bg-card"
                />
              </div>
              <div>
                <InputLabel label="Name of Observer / Reporter" required />
                <ControlledInputField
                  name="nameOfObserver"
                  placeholder="Full name and rank of the observer"
                  maxLength={LIMIT.nameOfObserver}
                  autoComplete="name"
                  className="bg-card"
                />
              </div>
            </div>

            {/* ── FOOTER ── */}
            <div className="flex flex-col gap-4 border-t border-border bg-light px-6 py-5 lg:flex-row lg:items-center lg:justify-end">
              {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 lg:mr-auto">
                  {error.message || "Failed to submit. Please try again."}
                </p>
              )}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={methods.handleSubmit((data) =>
                    submitNote(data, true)
                  )}
                  className="h-11 w-full cursor-pointer rounded-lg px-6 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto lg:h-12"
                >
                  <FileDown size={18} />
                  {activeAction === "submitAndDownload"
                    ? "Submitting..."
                    : "Submit & Download Copy"}
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="h-11 w-full cursor-pointer rounded-lg bg-primary px-10 capitalize text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto lg:h-12"
                >
                  {activeAction === "submit"
                    ? "Submitting..."
                    : "Submit Hydrographic Note →"}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default HydrographicNoteForm;
