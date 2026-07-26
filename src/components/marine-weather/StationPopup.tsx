"use client";

import { useGet } from "@/src/hooks/useGet";
import { LineChart } from "lucide-react";
import { useMemo, useState } from "react";
import { normalizeMeasures } from "./normalizeMeasures";
import { IPlottedExternalStation } from "./types";

const TABS = ["Data", "Info"] as const;
type Tab = (typeof TABS)[number];

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-3 border-b border-gray-100 py-1.5 last:border-b-0">
    <span className="text-gray-500">{label}</span>
    <span className="text-right font-medium text-gray-800">{value}</span>
  </div>
);

const StationPopup = ({ station }: { station: IPlottedExternalStation }) => {
  const [tab, setTab] = useState<Tab>("Data");

  // Fired only once a pin is clicked, because the popup mounts on demand.
  const { data, isLoading, isError } = useGet<unknown>(
    `/external-stations/${station.id}`,
    ["external-station", String(station.id)]
  );

  const measures = useMemo(() => normalizeMeasures(data?.data), [data]);
  const latestDate = measures.find((measure) => measure.date)?.date ?? "";

  return (
    <div className="w-75 text-[13px]">
      <h3 className="pr-6 text-sm font-semibold text-gray-900">
        [{station.id}] {station.name}
      </h3>

      <div className="mt-2 flex gap-4 border-b border-gray-200">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`-mb-px border-b-2 px-1 pb-1.5 text-xs font-medium transition-colors ${
              tab === item
                ? "border-liteBlue text-liteBlue"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Data" ? (
        <div className="mt-3">
          <p className="text-xs text-gray-500">
            Latest Data:{" "}
            <span className="font-semibold text-gray-800">
              {latestDate || "—"}
            </span>
          </p>

          {isLoading ? (
            <p className="mt-3 text-xs text-gray-400">Loading measurements…</p>
          ) : isError ? (
            <p className="mt-3 text-xs text-gray-400">
              Measurements unavailable.
            </p>
          ) : measures.length === 0 ? (
            <p className="mt-3 text-xs text-gray-400">
              No measurements reported for this station.
            </p>
          ) : (
            <div className="mt-2 max-h-56 overflow-y-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead className="sticky top-0">
                  <tr className="bg-liteBlue text-white">
                    <th className="px-2 py-1.5 font-semibold">Measure</th>
                    <th className="px-2 py-1.5 font-semibold">Value</th>
                    <th className="px-2 py-1.5 font-semibold">Date</th>
                    <th className="px-2 py-1.5" />
                  </tr>
                </thead>
                <tbody>
                  {measures.map((measure, index) => (
                    <tr
                      key={`${measure.measure}-${index}`}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <td className="px-2 py-1.5">
                        <span className="mr-1.5 inline-block size-2 rounded-full bg-green-500 align-middle" />
                        {measure.measure}
                      </td>
                      <td className="px-2 py-1.5 whitespace-nowrap">
                        {measure.value}
                        {measure.unit ? ` ${measure.unit}` : ""}
                      </td>
                      <td className="px-2 py-1.5 whitespace-nowrap text-gray-600">
                        {measure.date || "—"}
                      </td>
                      <td className="px-2 py-1.5">
                        {/* No history endpoint yet, so the chart is inert. */}
                        <button
                          type="button"
                          disabled
                          title="Chart not available yet"
                          className="rounded bg-liteBlue/10 p-1 text-liteBlue disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <LineChart className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-3 text-xs">
          <InfoRow
            label="Coordinates"
            value={`${station.lat.toFixed(6)}, ${station.lng.toFixed(6)}`}
          />
          <InfoRow label="Altitude" value={`${station.altitude ?? 0} m`} />
          <InfoRow label="State" value={station.state || "—"} />
          <InfoRow label="Site" value={station.site || "—"} />
          <InfoRow label="Province" value={station.province || "—"} />
          <InfoRow label="Municipality" value={station.municipality || "—"} />
          <InfoRow
            label="Transmission"
            value={
              station.transmission_interval
                ? `${station.transmission_interval} min`
                : "—"
            }
          />
          <InfoRow
            label="Storage"
            value={
              station.storage_interval ? `${station.storage_interval} min` : "—"
            }
          />
        </div>
      )}
    </div>
  );
};

export default StationPopup;
