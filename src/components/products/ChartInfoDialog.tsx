"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

export interface ChartInfoSpec {
  label: string;
  value?: string | null;
}

const SpecTile = ({ label, value }: ChartInfoSpec) => {
  if (!value) return null;
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold wrap-break-word text-gray-800">
        {value}
      </p>
    </div>
  );
};

interface ChartInfoDialogProps {
  open: boolean;
  onClose: () => void;
  /** Dialog heading. */
  title?: string;
  /** Line under the dialog heading. */
  description?: string;
  /** Preview image; the preview block is skipped when there isn't one. */
  image?: string;
  /** Badge over the top-left of the preview, e.g. "Chart 3001". */
  imageBadge?: string;
  /** Badge over the top-right of the preview, e.g. "INT 7425". */
  imageBadgeSecondary?: string;
  /** Card title. Its presence is what switches the dialog to the detail view. */
  heading?: string;
  /** Line under the card title, e.g. "Bay of Bengal · Paper Chart". */
  subheading?: string;
  specs?: ChartInfoSpec[];
  /** Target of the "View Details" button; the button is dropped without it. */
  detailsHref?: string;
  /** Bare identifier card shown when there is no `heading` to build on. */
  fallback?: { label: string; value: string; note?: string };
}

/**
 * Shared detail dialog for map hotspots — paper chart areas and tidal
 * stations both feed it. It is purely presentational: every call site maps
 * its own domain object onto these props.
 */
const ChartInfoDialog = ({
  open,
  onClose,
  title = "Chart Information",
  description = "Bangladesh Navy Hydrographic & Oceanographic Centre",
  image,
  imageBadge,
  imageBadgeSecondary,
  heading,
  subheading,
  specs,
  detailsHref,
  fallback,
}: ChartInfoDialogProps) => {
  const visibleSpecs = (specs ?? []).filter((spec) => !!spec.value);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent className={heading ? "sm:max-w-md" : "sm:max-w-sm"}>
        <DialogHeader>
          <DialogTitle className="text-pBlue">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {heading ? (
          <div className="space-y-4">
            {/* Preview */}
            {image && (
              <div className="relative h-56 w-full overflow-hidden rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 to-slate-100">
                <Image
                  src={image}
                  alt={heading}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 100vw, 448px"
                />
                {imageBadge && (
                  <span className="absolute top-3 left-3 rounded-md bg-pBlue px-2.5 py-1 text-xs font-bold text-white shadow-md">
                    {imageBadge}
                  </span>
                )}
                {imageBadgeSecondary && (
                  <span className="absolute top-3 right-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-pBlue shadow-md">
                    {imageBadgeSecondary}
                  </span>
                )}
              </div>
            )}

            {/* Title */}
            <div>
              <h3 className="text-lg leading-snug font-bold text-pBlue">
                {heading}
              </h3>
              {subheading && (
                <p className="mt-0.5 text-sm text-gray-500">{subheading}</p>
              )}
            </div>

            {/* Specifications */}
            {visibleSpecs.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {visibleSpecs.map((spec) => (
                  <SpecTile
                    key={spec.label}
                    label={spec.label}
                    value={spec.value}
                  />
                ))}
              </div>
            )}

            {/* CTA */}
            {detailsHref && (
              <div className="border-t border-gray-100 pt-4">
                <Link
                  href={detailsHref}
                  className="block w-full rounded-lg bg-pBlue py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-pBlue/90"
                >
                  View Details
                </Link>
              </div>
            )}
          </div>
        ) : (
          fallback && (
            <div className="space-y-4">
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-8 text-center">
                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  {fallback.label}
                </p>
                <p className="mt-1 text-4xl font-extrabold tracking-wide text-pBlue">
                  {fallback.value}
                </p>
                {fallback.note && (
                  <p className="mt-1 text-sm font-semibold text-gray-600">
                    {fallback.note}
                  </p>
                )}
              </div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChartInfoDialog;
