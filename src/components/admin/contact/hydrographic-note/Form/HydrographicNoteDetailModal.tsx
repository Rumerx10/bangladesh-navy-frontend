"use client";

import { IHydrographicNote } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

interface HydrographicNoteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: IHydrographicNote;
}

const DetailRow = ({ label, value }: { label: string; value?: string }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-medium text-secondary-dark">{value || "—"}</p>
    </div>
  );
};

const SectionLabel = ({ title }: { title: string }) => {
  return (
    <div className="border-l-4 border-primary bg-primary/5 px-3 py-2 col-span-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">{title}</p>
    </div>
  );
};

const HydrographicNoteDetailModal = ({
  isOpen,
  onClose,
  data,
}: HydrographicNoteDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="bg-white min-w-[60vw] max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-secondary text-xl font-semibold">
            Hydrographic Note Details
          </DialogTitle>
        </DialogHeader>

        {data && (
          <div className="overflow-y-auto scrollbar-modern flex-1 mt-2 pr-2">
            <div className="grid grid-cols-2 gap-3">
              <SectionLabel title="Sender Information" />
              <DetailRow label="Date" value={data.date} />
              <DetailRow label="Ref Number" value={data.refNumber} />
              <DetailRow label="Name of Ship / Sender" value={data.nameOfShip} />
              <DetailRow label="IMO Number" value={data.imoNumber} />
              <DetailRow label="Address" value={data.address} />
              <DetailRow label="Email" value={data.email} />
              <DetailRow label="Tel" value={data.tel} />
              <DetailRow label="Fax" value={data.fax} />

              <SectionLabel title="Locality & Subject" />
              <DetailRow label="General Locality" value={data.generalLocality} />
              <DetailRow label="Subject" value={data.subject} />

              <SectionLabel title="Position" />
              <DetailRow label="Latitude" value={data.latitude} />
              <DetailRow label="Longitude" value={data.longitude} />
              <DetailRow label="GPS" value={data.gps} />
              <DetailRow label="Datum" value={data.datum} />
              <DetailRow label="Accuracy" value={data.accuracy} />

              <SectionLabel title="BN Charts" />
              <DetailRow label="BN Charts Affected" value={data.bnChartsAffected} />
              <DetailRow label="Edition" value={data.edition} />
              <DetailRow label="Latest Notices to Mariners" value={data.latestNoticesToMariners} />
              <DetailRow label="Replacement Copy of Chart No" value={data.replacementCopyOfChartNo} />
              <DetailRow label="Replacement Required" value={data.replacementRequired} />

              <SectionLabel title="ENCs & ECDIS" />
              <DetailRow label="ENCs Affected" value={data.encsAffected} />
              <DetailRow label="Latest Update Applied" value={data.latestUpdateApplied} />
              <DetailRow label="Model and Age of ECDIS" value={data.modelAndAgeOfECDIS} />

              <SectionLabel title="Publications" />
              <DetailRow label="Publications Affected" value={data.publicationsAffected} />
              <DetailRow label="Date of Latest Supplement" value={data.dateOfLatestSupplement} />

              <SectionLabel title="Observation Details" />
              <div className="col-span-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Details of Observation</p>
                <p className="text-sm text-secondary-dark whitespace-pre-wrap">{data.detailsOfObservation || "—"}</p>
              </div>
              <DetailRow label="Name of Observer / Reporter" value={data.nameOfObserver} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HydrographicNoteDetailModal;