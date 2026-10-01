"use client";

import SectionTitle from "@/src/components/SectionTitle";
import { useGet } from "@/src/hooks/useGet";
import { getStepIcon } from "@/src/data/howToCollectIcons";
import { IHowToCollectStep } from "@/src/components/admin/ContentManagement/how-to-collect/types";
import { motion } from "framer-motion";
import {
  Globe,
  Mail,
  PackageCheck,
  PhoneCall,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import HowToCollectStepsSkeleton from "./Skeleton/HowToCollectStepsSkeleton";

const themes = [
  {
    node: "bg-teal-500 shadow-teal-500/30",
    tile: "bg-teal-50 text-teal-600",
    phase: "text-teal-600",
    box: "bg-teal-50/60 border-teal-100",
  },
  {
    node: "bg-blue-600 shadow-blue-600/30",
    tile: "bg-blue-50 text-blue-600",
    phase: "text-blue-600",
    box: "bg-blue-50/60 border-blue-100",
  },
  {
    node: "bg-emerald-500 shadow-emerald-500/30",
    tile: "bg-emerald-50 text-emerald-600",
    phase: "text-emerald-600",
    box: "bg-emerald-50/60 border-emerald-100",
  },
] as const;

/** Extra-field values that are plainly an email, phone or URL become links —
 * the same affordance the previous hard-coded contact rows had. */
const detailHref = (value: string) => {
  const trimmed = value.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return `mailto:${trimmed}`;
  if (/^https?:\/\/\S+$/i.test(trimmed)) return trimmed;
  const digits = trimmed.match(/\d/g)?.length ?? 0;
  if (/^\+?[\d\s()-]+$/.test(trimmed) && digits >= 7) {
    return `tel:${trimmed.replace(/[\s()-]/g, "")}`;
  }
  return undefined;
};

const FlowPill = ({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="relative z-10 flex pl-16 lg:justify-center lg:pl-0"
  >
    <div className="inline-flex items-center gap-2.5 rounded-full bg-emerald-500 px-6 py-3 text-white shadow-lg shadow-emerald-500/30">
      <Icon size={18} />
      <span className="text-sm font-bold uppercase tracking-wide">{label}</span>
    </div>
  </motion.div>
);

const HowToCollect = () => {
  // `/list` already returns only ACTIVE steps, ordered by serial ascending.
  const { data, isLoading } = useGet<IHowToCollectStep[]>(
    "/how-to-collect/list",
    ["how-to-collect-list"]
  );

  const steps = Array.isArray(data?.data) ? data.data : [];
  const hasSteps = steps.length > 0;

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-125 h-125 bg-blue-500 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-500 rounded-full blur-[100px] -ml-48 -mb-48" />
        </div>

        <div className="relative container px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck size={16} />
              Simple &amp; Secure Process
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              How to{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                Collect
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {hasSteps ? (
                <>
                  Follow our simple {steps.length}-step process to collect BNHOC
                  nautical charts and publications — from browsing the catalogue
                  to delivery at your address.
                </>
              ) : (
                <>
                  Collect BNHOC nautical charts and publications — from browsing
                  the catalogue to delivery at your address.
                </>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collection Flow */}
      <section className="py-8 lg:py-20 bg-card">
        <div className="container px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Collection Process"
            desc="From catalogue to your doorstep, step by step."
          />

          <div className="relative max-w-5xl mx-auto">
            {isLoading ? (
              <HowToCollectStepsSkeleton />
            ) : hasSteps ? (
              <>
                {/* Connecting line */}
                <div className="absolute left-6 lg:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-linear-to-b from-emerald-400 via-blue-400 to-emerald-400" />

                <FlowPill icon={Globe} label="Start — Visit the Website" />

                <ol className="mt-10 space-y-10 lg:mt-14 lg:space-y-14">
                  {steps.map((step, i) => {
                    const Icon = getStepIcon(step.icon);
                    const theme = themes[i % themes.length];
                    const isRight = i % 2 === 1;
                    const extraFields = step.extraFields ?? [];
                    return (
                      <li key={step.id} className="relative">
                        {/* Numbered node on the line */}
                        <div
                          className={`absolute top-0 left-6 lg:left-1/2 -translate-x-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white text-lg font-bold ring-4 ring-white shadow-lg ${theme.node}`}
                        >
                          {i + 1}
                        </div>

                        {/* Step card */}
                        <motion.div
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.5 }}
                          className={`rounded-2xl border border-border bg-card p-5 lg:p-6 shadow-sm hover:shadow-lg hover:border-liteBlue/30 transition-all duration-300 lg:w-[calc(50%-4rem)] ${
                            isRight ? "ml-16 lg:ml-auto" : "ml-16 lg:ml-0"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`shrink-0 flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl ${theme.tile}`}
                            >
                              <Icon size={24} />
                            </div>
                            <div className="min-w-0">
                              <span
                                className={`text-[11px] font-bold uppercase tracking-widest ${theme.phase}`}
                              >
                                {step.stepName}
                              </span>
                              <h3 className="mt-1 text-base lg:text-lg font-semibold text-pBlue leading-snug">
                                {step.title}
                              </h3>
                            </div>
                          </div>

                          <p className="mt-3 text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">
                            {step.description}
                          </p>

                          {extraFields.length > 0 && (
                            <div
                              className={`mt-4 rounded-xl border p-4 space-y-2 ${theme.box}`}
                            >
                              {extraFields.map((detail, index) => {
                                const href = detailHref(detail.value);
                                return (
                                  <div
                                    key={`${detail.key}-${index}`}
                                    className="flex items-start justify-between gap-3 text-sm"
                                  >
                                    <span className="shrink-0 font-medium text-foreground">
                                      {detail.key}
                                    </span>
                                    {href ? (
                                      <a
                                        href={href}
                                        target={
                                          href.startsWith("http")
                                            ? "_blank"
                                            : undefined
                                        }
                                        rel={
                                          href.startsWith("http")
                                            ? "noopener noreferrer"
                                            : undefined
                                        }
                                        className={`text-right font-semibold hover:underline ${theme.phase}`}
                                      >
                                        {detail.value}
                                      </a>
                                    ) : (
                                      <span className="text-right text-secondary-foreground">
                                        {detail.value}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </motion.div>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-10 lg:mt-14">
                  <FlowPill icon={PackageCheck} label="Chart Delivered" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-input bg-light py-20 text-center">
                <Workflow className="h-10 w-10 text-light-silver" />
                <p className="max-w-sm text-sm text-secondary-foreground">
                  The collection process will be published here shortly. In the
                  meantime, please reach out to us using the contact details
                  below.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Help Banner */}
      <section className="py-14 bg-brand-blue">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
            Need Assistance with Your Collection?
          </h3>
          <p className="text-blue-200 mb-6 max-w-lg mx-auto text-sm">
            Our team is available Sunday – Thursday, 09:00–17:00 (BST) to assist
            you with any collection or payment queries.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/90">
            <a
              href="mailto:bnhoc@navy.mil.bd"
              className="inline-flex items-center gap-2 underline underline-offset-2 hover:text-white"
            >
              <Mail size={16} />
              bnhoc@navy.mil.bd
            </a>
            <span className="hidden sm:block text-white/30">|</span>
            <a
              href="tel:+8801769722446"
              className="inline-flex items-center gap-2 underline underline-offset-2 hover:text-white"
            >
              <PhoneCall size={16} />
              +880 1769 722446
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowToCollect;
