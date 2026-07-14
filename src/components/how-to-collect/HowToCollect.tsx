"use client";

import SectionTitle from "@/src/components/SectionTitle";
import { motion } from "framer-motion";
import {
  Globe,
  Landmark,
  LayoutGrid,
  Mail,
  MousePointerClick,
  PackageCheck,
  PhoneCall,
  ShieldCheck,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";

const themes = {
  teal: {
    node: "bg-teal-500 shadow-teal-500/30",
    tile: "bg-teal-50 text-teal-600",
    phase: "text-teal-600",
    box: "bg-teal-50/60 border-teal-100",
  },
  blue: {
    node: "bg-blue-600 shadow-blue-600/30",
    tile: "bg-blue-50 text-blue-600",
    phase: "text-blue-600",
    box: "bg-blue-50/60 border-blue-100",
  },
  emerald: {
    node: "bg-emerald-500 shadow-emerald-500/30",
    tile: "bg-emerald-50 text-emerald-600",
    phase: "text-emerald-600",
    box: "bg-emerald-50/60 border-emerald-100",
  },
} as const;

type CollectStep = {
  icon: LucideIcon;
  theme: keyof typeof themes;
  phase: string;
  title: string;
  description: string;
  details?: { label: string; value: string; href?: string }[];
};

const collectSteps: CollectStep[] = [
  {
    icon: LayoutGrid,
    theme: "teal",
    phase: "Browse",
    title: "Select Desired Chart from Catalogue",
    description:
      "Browse the BNHOC catalogue of nautical charts and publications to find the one you need.",
  },
  {
    icon: MousePointerClick,
    theme: "teal",
    phase: "Browse",
    title: "Click on Your Desired Chart",
    description:
      "Open the chart to view its details — edition, scale, coverage and price.",
  },
  {
    icon: ShoppingCart,
    theme: "teal",
    phase: "Order",
    title: "Go to the 'Collect' Option",
    description:
      "Use the Collect option on the chart page to place your order.",
  },
  {
    icon: Landmark,
    theme: "blue",
    phase: "Payment",
    title: "Payment System Details",
    description:
      "Transfer the exact amount to the designated BNHOC bank account.",
    details: [
      { label: "Bank", value: "Sonali Bank Limited" },
      { label: "Branch", value: "Agrabad Branch, Chattogram" },
      {
        label: "Account Name",
        value: "Bangladesh Navy Hydrographic & Oceanographic Center",
      },
      { label: "Account No", value: "Contact BNHOC for account details" },
    ],
  },
  {
    icon: PhoneCall,
    theme: "blue",
    phase: "Payment",
    title: "Confirm Transaction",
    description:
      "After the transfer, call or email us with your transaction (TXN) number to confirm the payment.",
    details: [
      { label: "Phone", value: "+880 1769 722446", href: "tel:+8801769722446" },
      {
        label: "Email",
        value: "bnhoc@navy.mil.bd",
        href: "mailto:bnhoc@navy.mil.bd",
      },
    ],
  },
  {
    icon: Truck,
    theme: "emerald",
    phase: "Delivery",
    title: "Receive Your Chart",
    description:
      "Once your payment is confirmed, we will dispatch the chart to your address.",
  },
];

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
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-pBlue overflow-hidden">
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
              Follow our simple six-step process to collect BNHOC nautical
              charts and publications — from browsing the catalogue to delivery
              at your address.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collection Flow */}
      <section className="py-8 lg:py-20 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Collection Process"
            desc="From catalogue to your doorstep in six simple steps."
          />

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line */}
            <div className="absolute left-6 lg:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-linear-to-b from-emerald-400 via-blue-400 to-emerald-400" />

            <FlowPill icon={Globe} label="Start — Visit the Website" />

            <ol className="mt-10 space-y-10 lg:mt-14 lg:space-y-14">
              {collectSteps.map((step, i) => {
                const Icon = step.icon;
                const theme = themes[step.theme];
                const isRight = i % 2 === 1;
                return (
                  <li key={step.title} className="relative">
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
                      className={`rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-sm hover:shadow-lg hover:border-liteBlue/30 transition-all duration-300 lg:w-[calc(50%-4rem)] ${
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
                            Step {i + 1} · {step.phase}
                          </span>
                          <h3 className="mt-1 text-base lg:text-lg font-semibold text-pBlue leading-snug">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                        {step.description}
                      </p>

                      {step.details && (
                        <div
                          className={`mt-4 rounded-xl border p-4 space-y-2 ${theme.box}`}
                        >
                          {step.details.map((detail) => (
                            <div
                              key={detail.label}
                              className="flex items-start justify-between gap-3 text-sm"
                            >
                              <span className="shrink-0 font-medium text-gray-700">
                                {detail.label}
                              </span>
                              {detail.href ? (
                                <a
                                  href={detail.href}
                                  className={`text-right font-semibold hover:underline ${theme.phase}`}
                                >
                                  {detail.value}
                                </a>
                              ) : (
                                <span className="text-right text-gray-600">
                                  {detail.value}
                                </span>
                              )}
                            </div>
                          ))}
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
          </div>
        </div>
      </section>

      {/* Help Banner */}
      <section className="py-14 bg-liteBlue">
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
