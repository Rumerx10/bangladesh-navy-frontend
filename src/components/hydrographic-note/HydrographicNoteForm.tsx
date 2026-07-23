"use client";

import InputLabel from "../shared/InputLabel";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { usePost } from "@/src/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { type Resolver, FormProvider, useForm } from "react-hook-form";
import ControlledInputField from "../shared/FromController/ControlledInputField";
import ControlledSelectField from "../shared/FromController/ControlledSelectField";
import ControlledTextareaField from "../shared/FromController/ControlledTextareaField";
import {
  HydrographicNoteFormType,
  hydrographicNoteValidationSchema,
} from "./hydrographicNoteValidationSchema";

const REPLACEMENT_OPTIONS = [
  { label: "Required", value: "required" },
  { label: "Not Required", value: "not-required" },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="border-l-4 border-pBlue bg-blue-50 px-4 py-2.5 mb-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-pBlue">
        {title}
      </p>
    </div>
  );
}

const HydrographicNoteForm = () => {
  const { mutateAsync, error, isPending } = usePost(
    "/hydrographic-notes",
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

  const onSubmit = (data: HydrographicNoteFormType) => {
    mutateAsync(data)
      .then(() => {
        toast.success("Hydrographic note submitted successfully!");
        methods.reset();
      })
      .catch((err) => {
        toast.error(err?.message || "Failed to submit hydrographic note");
      });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-pBlue lg:text-3xl">
          Hydrographic Note Form
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-500 lg:text-base">
          Fill out this form to report navigational hazards, depth anomalies, or
          other hydrographic observations.
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
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
                className="bg-white"
              />
            </div>
            <div>
              <InputLabel label="Ref Number" required />
              <ControlledInputField
                name="refNumber"
                placeholder="Enter reference number"
                className="bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <InputLabel label="Name of Ship or Sender" required />
              <ControlledInputField
                name="nameOfShip"
                placeholder="Enter name of ship or sender"
                className="bg-white"
              />
            </div>

            <div>
              <InputLabel label="IMO Number (if applicable)" />
              <ControlledInputField
                name="imoNumber"
                placeholder="Enter IMO number"
                className="bg-white"
              />
            </div>
            <div>
              <InputLabel label="Address" required />
              <ControlledInputField
                name="address"
                placeholder="Enter address"
                className="bg-white"
              />
            </div>

            <div>
              <InputLabel label="E-mail" required />
              <ControlledInputField
                type="email"
                name="email"
                placeholder="Enter email"
                className="bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputLabel label="Tel" required />
                <ControlledInputField
                  type="tel"
                  name="tel"
                  placeholder="Telephone"
                  className="bg-white"
                />
              </div>
              <div>
                <InputLabel label="Fax" />
                <ControlledInputField
                  name="fax"
                  placeholder="Fax number"
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* ── LOCALITY & SUBJECT ── */}
          <div className="p-6 pb-0">
            <SectionHeader title="Locality &amp; Subject" />
          </div>

          <div className="grid grid-cols-1 gap-5 px-6 pb-6">
            <div>
              <InputLabel label="General Locality" required />
              <ControlledInputField
                name="generalLocality"
                placeholder="Enter general locality"
                className="bg-white"
              />
            </div>
            <div>
              <InputLabel label="Subject" required />
              <ControlledInputField
                name="subject"
                placeholder="Enter subject"
                className="bg-white"
              />
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* ── POSITION ── */}
          <div className="p-6 pb-0">
            <SectionHeader title="Position (see Instructions for Hydrographic Notes)" />
          </div>

          <div className="grid grid-cols-1 gap-5 px-6 pb-6 md:grid-cols-2">
            <div>
              <InputLabel label="Latitude" required />
              <ControlledInputField
                name="latitude"
                placeholder="e.g. 22° 20′ N"
                className="bg-white"
              />
            </div>
            <div>
              <InputLabel label="Longitude" required />
              <ControlledInputField
                name="longitude"
                placeholder="e.g. 91° 48′ E"
                className="bg-white"
              />
            </div>

            <div>
              <InputLabel label="GPS" />
              <ControlledInputField
                name="gps"
                placeholder="GPS details"
                className="bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputLabel label="Datum" />
                <ControlledInputField
                  name="datum"
                  placeholder="Datum"
                  className="bg-white"
                />
              </div>
              <div>
                <InputLabel label="Accuracy" />
                <ControlledInputField
                  name="accuracy"
                  placeholder="Accuracy"
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* ── BN CHARTS ── */}
          <div className="p-6 pb-0">
            <SectionHeader title="BN Charts" />
          </div>

          <div className="grid grid-cols-1 gap-5 px-6 pb-6 md:grid-cols-2">
            <div>
              <InputLabel label="BN Charts Affected" required />
              <ControlledInputField
                name="bnChartsAffected"
                placeholder="Enter BN charts affected"
                className="bg-white"
              />
            </div>
            <div>
              <InputLabel label="Edition" />
              <ControlledInputField
                name="edition"
                placeholder="Enter edition"
                className="bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <InputLabel label="Latest Notices to Mariners Held" />
              <ControlledInputField
                name="latestNoticesToMariners"
                placeholder="Enter latest notices to mariners"
                className="bg-white"
              />
            </div>

            <div>
              <InputLabel label="Replacement Copy of Chart No (see Instructions for Hydrographic Notes)" />
              <ControlledInputField
                name="replacementCopyOfChartNo"
                placeholder="Enter chart number"
                className="bg-white"
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

          <div className="border-t border-gray-100" />

          {/* ── ENCs & ECDIS ── */}
          <div className="p-6 pb-0">
            <SectionHeader title="ENCs &amp; ECDIS" />
          </div>

          <div className="grid grid-cols-1 gap-5 px-6 pb-6 md:grid-cols-2">
            <div>
              <InputLabel label="ENCs Affected" />
              <ControlledInputField
                name="encsAffected"
                placeholder="Enter ENCs affected"
                className="bg-white"
              />
            </div>
            <div>
              <InputLabel label="Latest Update Applied (Week)" />
              <ControlledInputField
                name="latestUpdateApplied"
                placeholder="Enter week number"
                className="bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <InputLabel label="Model and Age of ECDIS (if applicable)" />
              <ControlledInputField
                name="modelAndAgeOfECDIS"
                placeholder="Enter ECDIS model and age"
                className="bg-white"
              />
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* ── PUBLICATIONS ── */}
          <div className="p-6 pb-0">
            <SectionHeader title="Publications" />
          </div>

          <div className="grid grid-cols-1 gap-5 px-6 pb-6">
            <div>
              <InputLabel label="Publications Affected (NP/HP number, Edition No)" />
              <ControlledInputField
                name="publicationsAffected"
                placeholder="Enter publications affected"
                className="bg-white"
              />
            </div>
            <div>
              <InputLabel label="Date of Latest Supplement / Update, Page &amp; Light List No. etc" />
              <ControlledInputField
                name="dateOfLatestSupplement"
                placeholder="Enter date and details"
                className="bg-white"
              />
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* ── OBSERVATION DETAILS ── */}
          <div className="p-6 pb-0">
            <SectionHeader title="Observation Details" />
          </div>

          <div className="grid grid-cols-1 gap-5 px-6 pb-6">
            <div>
              <InputLabel label="Details of Observation" required />
              <ControlledTextareaField
                name="detailsOfObservation"
                placeholder="Describe the hydrographic observation in detail..."
                className="bg-white"
              />
            </div>
            <div>
              <InputLabel label="Name of Observer / Reporter" required />
              <ControlledInputField
                name="nameOfObserver"
                placeholder="Enter name of observer or reporter"
                className="bg-white"
              />
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div className="flex items-center justify-end border-t border-gray-100 bg-gray-50 px-6 py-5">
            {error && (
              <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error.message || "Failed to submit. Please try again."}
              </p>
            )}
            <Button
              type="submit"
              disabled={isPending}
              className="h-11 w-full cursor-pointer rounded-lg bg-primary px-10 capitalize text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 lg:w-auto lg:h-12"
            >
              {isPending ? "Submitting..." : "Submit Hydrographic Note →"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default HydrographicNoteForm;
