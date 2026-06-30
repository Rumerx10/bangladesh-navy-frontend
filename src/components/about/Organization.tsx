"use client";

import { motion } from "framer-motion";
import {
    Anchor,
    Briefcase,
    Database,
    GraduationCap,
    Map,
    Waves,
} from "lucide-react";
import Image from "next/image";

const departments = [
  {
    name: "BNHOC",
    description:
      "Bangladesh Navy Hydrographic & Oceanographic Centre - Core command center for hydrographic operations",
    icon: <Anchor size={20} />,
  },
  {
    name: "BNS ANUSANDHAN",
    description:
      "Research and survey vessel dedicated to hydrographic data collection",
    icon: <Map size={20} />,
  },
  {
    name: "BNS Shaibal",
    description:
      "Survey and support vessel for oceanographic and coastal operations",
    icon: <Waves size={20} />,
  },
  {
    name: "BN Hydro Institute",
    description:
      "Training and education center for hydrographic personnel development",
    icon: <Database size={20} />,
  },
  {
    name: "BNS Darshak",
    description:
      "Support vessel for training and operational hydrographic surveys",
    icon: <GraduationCap size={20} />,
  },
  {
    name: "BNS Surovi",
    description:
      "Advanced survey and research vessel for operational hydrographic missions",
    icon: <Briefcase size={20} />,
  },
  {
    name: "BNS TALLASHI",
    description: "Operational support vessel for coastal and maritime surveys",
    icon: <Anchor size={20} />,
  },
];

export default function Organization() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* ── Chief Hydrographer (Root Node) ── */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Photo card with glow */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-linear-to-br from-[#003f71] to-cyan-500 opacity-30 blur group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src="/CHIEF.jpeg"
                alt="Cdre Sheikh Firoz Ahmed"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Name & designation */}
          <h2 className="mt-5 text-xl lg:text-2xl font-bold text-[#001836] text-center">
            Cdre Sheikh Firoz Ahmed, (H), NGP, psc, BN
          </h2>
          <p className="text-sm lg:text-base text-[#003f71] font-semibold mt-1">
            BN Chief Hydrographer
          </p>

        </motion.div>

        {/* ── Tree Connector: Vertical stem from chief ── */}
        <div className="flex justify-center">
          <div className="w-px h-12 lg:h-16 bg-linear-to-b from-[#003f71] to-[#003f71]/30" />
        </div>

        {/* ── Tree Connector: Horizontal bar ── */}
        <div className="hidden lg:block max-w-5xl mx-auto">
          <div className="h-px bg-[#003f71]/25" />
        </div>

        {/* ── Department Tree Branches ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0 max-w-5xl mx-auto">
          {departments.map((dept, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              {/* Vertical branch connector */}
              <div className="w-px h-8 lg:h-10 bg-linear-to-b from-[#003f71]/25 to-[#003f71]/40" />

              {/* Connector dot */}
              <div className="w-3 h-3 rounded-full bg-[#003f71] border-2 border-white shadow-sm" />

              {/* Department card */}
              <div className="mt-3 mb-8 w-full max-w-70 min-h-50 flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-[#003f71]/20 hover:-translate-y-1 transition-all duration-300 group cursor-default ">
                <div className="w-11 h-11 rounded-xl bg-[#003f71]/10 text-[#003f71] flex items-center justify-center mb-3 group-hover:bg-[#003f71] group-hover:text-white transition-colors duration-300 shrink-0">
                  {dept.icon}
                </div>
                <h4 className="text-sm font-bold text-[#001836] leading-snug uppercase">
                  {dept.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  {dept.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
