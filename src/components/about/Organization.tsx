"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/src/components/SectionTitle";

// ─── Data ─────────────────────────────────────────────────────────────────────
// Edit here to add / remove / rename nodes.

const orgData = {
  root: "CHIEF HYDROGRAPHER",

  leftBranch: {
    title: "ADDL CHIEF HYDROGRAPHER / CO BNHOC",
    // Each inner array = one horizontal row; items are connected left → right with arrows
    rows: [
      [
        "ADMINISTRATION DEPT",
        "OCEANOGRAPHIC DEPT",
        "CARTOGRAPHIC DEPT",
        "QUALITY CONTROL & DATA MANAGEMENT DEPT",
      ],
      [
        "CHART DEPOT",
        "MERITIME SAFETY & PUBLICATION DEPT",
        "INSTRUMENT & MAINTENANCE DEPT",
        "METEOROLOGY DEPT",
      ],
      [
        "TIDE ANALYSIS DEPT",
        "GEOLOGICAL & GEOPHYSICAL DEPT",
        "LOGISTIC DEPT",
        "RESEARCH & DEVELOPMENT DEPT",
      ],
    ],
  },

  rightBranch: {
    title: "ADDL CHIEF HYDROGRAPHER (OPS & PLAN)",
    // Each inner array = one vertical column; items stacked top → bottom with arrows
    columns: [
      [
        "DEPUTY CHIEFHYDROGRAPHER (PLAN & POLICY)",
        "DEPUTY CHIEFHYDROGRAPHER (NATIONAL AFFAIR)",
      ],
      [
        "DEPUTY CHIEFHYDROGRAPHER (OPS & TRG)",
        "DEPUTY CHIEFHYDROGRAPHER (INTERNATIONAL AFFAIR)",
      ],
    ],
  },
};

// ─── Style tokens ─────────────────────────────────────────────────────────────

const NAVY = "#003f71";
const LINE = `${NAVY}55`;

// ─── Cards ────────────────────────────────────────────────────────────────────

function RootCard({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-pBlue text-white font-bold text-sm tracking-widest uppercase px-8 py-3 rounded-2xl shadow-2xl border border-white/10 text-center"
    >
      {title}
    </motion.div>
  );
}

function BranchCard({ title, delay = 0 }: { title: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="bg-pBlue text-white font-bold text-sm tracking-wider uppercase px-4 py-3 rounded-xl shadow-lg border border-white/10 text-center w-full"
    >
      {title}
    </motion.div>
  );
}

function DeptCard({ title, delay = 0 }: { title: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28, delay }}
      className="bg-white text-pBlue text-sm font-medium p-2 rounded-lg border border-pBlue/20 shadow-sm hover:shadow-md hover:border-pBlue/40 hover:-translate-y-0.5 transition-all duration-200 text-center leading-snug tracking-wide cursor-default uppercase w-full"
    >
      {title}
    </motion.div>
  );
}

function DeputyCard({ title, delay = 0 }: { title: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28, delay }}
      className="bg-[#eef4fa] text-pBlue text-sm font-medium p-2 rounded-lg border border-pBlue/25 shadow-sm text-center leading-snug tracking-wide uppercase w-full"
    >
      {title}
    </motion.div>
  );
}

// ─── Connectors ───────────────────────────────────────────────────────────────

/** Horizontal right-pointing arrow: ──► */
function HArrow() {
  return (
    <div className="flex items-center shrink-0" style={{ width: 20 }}>
      <div className="flex-1 h-px" style={{ background: LINE }} />
      <svg width="6" height="8" viewBox="0 0 6 8" fill="none" className="shrink-0">
        <path d="M0 0 L6 4 L0 8 Z" fill={NAVY} fillOpacity="0.5" />
      </svg>
    </div>
  );
}

/** Vertical downward arrow: a line + arrowhead */
function VArrow({ height = 18 }: { height?: number }) {
  return (
    <div className="flex flex-col items-center mx-auto" style={{ height }}>
      <div className="w-px flex-1" style={{ background: LINE }} />
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
        <path d="M0 0 L4 5 L8 0 Z" fill={NAVY} fillOpacity="0.5" />
      </svg>
    </div>
  );
}

/**
 * Splits one parent into N equal-width children.
 *   vertical stem from parent
 *   horizontal crossbar
 *   N vertical stems down to children
 */
function ForkDown({ n }: { n: number }) {
  const pcts = Array.from({ length: n }, (_, i) => (100 / n) * (i + 0.5));
  const lo = pcts[0];
  const hi = pcts[pcts.length - 1];
  return (
    <div className="relative w-full" style={{ height: 32 }}>
      <div
        className="absolute top-0 h-1/2 w-px"
        style={{ left: "50%", transform: "translateX(-50%)", background: LINE }}
      />
      {n > 1 && (
        <div
          className="absolute h-px"
          style={{ top: "50%", left: `${lo}%`, right: `${100 - hi}%`, background: LINE }}
        />
      )}
      {pcts.map((p, i) => (
        <div
          key={i}
          className="absolute top-1/2 bottom-0 w-px"
          style={{ left: `${p}%`, transform: "translateX(-50%)", background: LINE }}
        />
      ))}
    </div>
  );
}

/**
 * Root → two asymmetric branches.
 * leftPct / rightPct = horizontal % positions of the stems (relative to full container width).
 */
function RootFork({ leftPct, rightPct }: { leftPct: number; rightPct: number }) {
  return (
    <div className="relative w-full" style={{ height: 36 }}>
      <div
        className="absolute top-0 h-1/2 w-px"
        style={{ left: "50%", transform: "translateX(-50%)", background: LINE }}
      />
      <div
        className="absolute h-px"
        style={{ top: "50%", left: `${leftPct}%`, right: `${100 - rightPct}%`, background: LINE }}
      />
      {[leftPct, rightPct].map((p, i) => (
        <div
          key={i}
          className="absolute top-1/2 bottom-0 w-px"
          style={{ left: `${p}%`, transform: "translateX(-50%)", background: LINE }}
        />
      ))}
    </div>
  );
}

/**
 * Connector from the center of the branch header down, then left to a left-edge sidebar.
 * Looks like: ┐ (mirrored L)
 */
function DropLeftConnector() {
  return (
    <div className="relative w-full" style={{ height: 28 }}>
      {/* vertical drop from center */}
      <div
        className="absolute top-0 h-1/2 w-px"
        style={{ left: "50%", transform: "translateX(-50%)", background: LINE }}
      />
      {/* horizontal: center → left edge */}
      <div
        className="absolute h-px"
        style={{ top: "50%", left: 0, right: "50%", background: LINE }}
      />
      {/* short vertical at left edge → connects to sidebar */}
      <div
        className="absolute top-1/2 bottom-0 w-px"
        style={{ left: 0, background: LINE }}
      />
    </div>
  );
}

// ─── Left branch row tree ─────────────────────────────────────────────────────

function LeftRows({ rows }: { rows: string[][] }) {
  return (
    <div className="relative w-full">
      {/* Vertical sidebar spanning all rows */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: LINE }}
      />
      <div className="flex flex-col gap-3 pl-5">
        {rows.map((row, ri) => (
          <div key={ri} className="relative flex items-center">
            {/* Horizontal branch from sidebar to first item */}
            <div
              className="absolute h-px"
              style={{ left: -20, top: "50%", width: 20, background: LINE }}
            />
            {row.map((dept, di) => (
              <Fragment key={di}>
                <div className="flex-1 min-w-0">
                  <DeptCard
                    title={dept}
                    delay={0.15 + ri * 0.08 + di * 0.04}
                  />
                </div>
                {di < row.length - 1 && <HArrow />}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Organization() {
  const { root, leftBranch, rightBranch } = orgData;

  // Fork stem positions relative to the 860 px-wide container.
  // Left box  ≈ 60 % wide → center at ~30 %
  // Right box ≈ 35 % wide, starting at ~63 % → center at ~63 + 17 = ~80 %
  const LEFT_PCT = 30;
  const RIGHT_PCT = 80;

  return (
    <section className="py-8 lg:py-20 bg-linear-to-b from-slate-50/60 to-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Organisation Tree"
          desc="Organisational structure of Bangladesh Navy Hydrographic & Oceanographic Centre (BNHOC)"
        />

        {/* Horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-4 px-4 pb-6">
          <div style={{ minWidth: 860 }} className="flex flex-col items-center">

            {/* ROOT */}
            <RootCard title={root} />

            {/* Root → 2 branch stems */}
            <RootFork leftPct={LEFT_PCT} rightPct={RIGHT_PCT} />

            {/* BRANCH ROW */}
            <div className="w-full flex items-start gap-4">

              {/* ── LEFT BRANCH (wider) ── */}
              <div style={{ flex: "0 0 60%" }} className="min-w-0">
                <BranchCard title={leftBranch.title} delay={0.1} />
                {/* ┐-shaped connector to left sidebar */}
                <DropLeftConnector />
                {/* 3 rows with → arrows */}
                <LeftRows rows={leftBranch.rows} />
              </div>

              {/* Vertical divider */}
              <div className="self-stretch w-px shrink-0 bg-pBlue/10 mt-1" />

              {/* ── RIGHT BRANCH (narrower) ── */}
              <div style={{ flex: "0 0 35%" }} className="min-w-0 flex flex-col items-center">
                <BranchCard title={rightBranch.title} delay={0.15} />
                {/* Branch → 2 column stems */}
                <ForkDown n={rightBranch.columns.length} />
                <div className="w-full flex items-start gap-3">
                  {rightBranch.columns.map((col, ci) => (
                    <div
                      key={ci}
                      className="flex-1 flex flex-col items-center min-w-0"
                    >
                      {col.map((item, ii) => (
                        <Fragment key={ii}>
                          {ii > 0 && <VArrow height={18} />}
                          <DeputyCard
                            title={item}
                            delay={0.22 + ci * 0.1 + ii * 0.08}
                          />
                        </Fragment>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* LEGEND */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-[10px] text-gray-400 tracking-widest uppercase">
              {[
                { color: "#001836", label: "Chief Hydrographer" },
                { color: "#003f71", label: "Addl Chief Hydrographer" },
                { color: "#eef4fa", label: "Deputy Chief Hydrographer", border: "#003f71" },
                { color: "#ffffff", label: "Department", border: "#003f71" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-3 h-3 rounded-sm border"
                    style={{
                      background: item.color,
                      borderColor: item.border ?? item.color,
                    }}
                  />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




// "use client";

// import { motion } from "framer-motion";
// import SectionTitle from "@/src/components/SectionTitle";
// import { organogramData, type IOrgNode } from "@/src/data/organizationData";

// // ─── Primitives ───────────────────────────────────────────────────────────────

// const LINE = "#003f71";

// function VLine({ height = 24 }: { height?: number }) {
//   return (
//     <div
//       className="w-px shrink-0"
//       style={{ height, background: `${LINE}35` }}
//     />
//   );
// }

// /** Draws a downward fork: one stem in, N stems out with a horizontal crossbar. */
// function ForkConnector({ n, fromPct = 50 }: { n: number; fromPct?: number }) {
//   const childPcts = Array.from({ length: n }, (_, i) => (100 / n) * (i + 0.5));
//   const lo = childPcts[0];
//   const hi = childPcts[childPcts.length - 1];

//   return (
//     <div className="relative w-full" style={{ height: 32 }}>
//       {/* stem from parent */}
//       <div
//         className="absolute top-0 w-px"
//         style={{
//           left: `${fromPct}%`,
//           transform: "translateX(-50%)",
//           height: "50%",
//           background: `${LINE}35`,
//         }}
//       />
//       {/* horizontal crossbar */}
//       <div
//         className="absolute h-px"
//         style={{
//           top: "50%",
//           left: `${lo}%`,
//           right: `${100 - hi}%`,
//           background: `${LINE}35`,
//         }}
//       />
//       {/* stems to each child */}
//       {childPcts.map((pct, i) => (
//         <div
//           key={i}
//           className="absolute w-px"
//           style={{
//             left: `${pct}%`,
//             transform: "translateX(-50%)",
//             top: "50%",
//             bottom: 0,
//             background: `${LINE}35`,
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// // ─── Card Variants ────────────────────────────────────────────────────────────

// type CardVariant = "root" | "branch" | "dept" | "deputy";

// const CARD_CLS: Record<CardVariant, string> = {
//   root: "bg-pBlue text-white text-sm font-bold px-8 py-3 rounded-2xl shadow-2xl tracking-widest border border-white/10",
//   branch:
//     "bg-pBlue text-white font-bold px-4 py-3 rounded-xl shadow-lg tracking-wider w-full text-center border border-white/10",
//   dept: "bg-white text-pBlue text-sm font-medium px-2.5 py-2 rounded-lg border border-pBlue/20 shadow-sm hover:shadow-md hover:border-pBlue/40 hover:-translate-y-0.5 transition-all duration-200 w-full text-center leading-snug tracking-wide cursor-default",
//   deputy:
//     "bg-[#eef4fa] text-pBlue text-sm font-medium px-2.5 py-2 rounded-lg border border-pBlue/25 shadow-sm w-full text-center leading-snug tracking-wide",
// };

// function OrgCard({
//   title,
//   variant = "dept",
//   delay = 0,
// }: {
//   title: string;
//   variant?: CardVariant;
//   delay?: number;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 8 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.35, delay }}
//       className={`uppercase ${CARD_CLS[variant]}`}
//     >
//       {title}
//     </motion.div>
//   );
// }

// // ─── Department Column ────────────────────────────────────────────────────────

// function DeptColumn({
//   items,
//   delayBase,
// }: {
//   items: IOrgNode[];
//   delayBase: number;
// }) {
//   return (
//     <div className="flex flex-col items-center flex-1 min-w-0 gap-0">
//       {items.map((item, i) => (
//         <div key={item.id} className="flex flex-col items-center w-full">
//           {i > 0 && (
//             <div className="flex justify-center w-full">
//               <VLine height={10} />
//             </div>
//           )}
//           <OrgCard
//             title={item.title}
//             variant="dept"
//             delay={delayBase + i * 0.04}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── Main ─────────────────────────────────────────────────────────────────────

// export default function Organization() {
//   const { root, leftBranch, rightBranch } = organogramData;
//   const leftChildCount = 1 + leftBranch.chains.length; // side column + 3 chains

//   return (
//     <section className="py-8 lg:py-20 bg-linear-to-b from-slate-50/60 to-white">
//       <div className="container px-4 sm:px-6 lg:px-8">
//         <SectionTitle
//           title="Organisation Tree"
//           desc="Organisational structure of Bangladesh Navy Hydrographic & Oceanographic Centre (BNHOC)"
//         />

//         {/* Scrollable wrapper for small screens */}
//         <div className="overflow-x-auto -mx-4 px-4 pb-6">
//           <div style={{ minWidth: 860 }} className="flex flex-col items-center">
//             {/* ROOT */}
//             <OrgCard title={root} variant="root" />

//             {/* Root → 2 branches */}
//             <ForkConnector n={2} />

//             {/* BRANCHES ROW */}
//             <div className="w-full flex items-start gap-6">
//               {/* ── LEFT BRANCH ── */}
//               <div className="flex-1 flex flex-col items-center min-w-0">
//                 <OrgCard
//                   title={leftBranch.title}
//                   variant="branch"
//                   delay={0.1}
//                 />

//                 {/* Left branch → 4 children */}
//                 <ForkConnector n={leftChildCount} />

//                 <div className="w-full flex items-start gap-2">
//                   {/* Side nodes column */}
//                   <DeptColumn items={leftBranch.sideNodes} delayBase={0.2} />

//                   {/* 3 dept chains */}
//                   {leftBranch.chains.map((chain, ci) => (
//                     <DeptColumn
//                       key={ci}
//                       items={chain}
//                       delayBase={0.25 + ci * 0.08}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Vertical separator */}
//               <div className="self-stretch w-px shrink-0 bg-liteBlue/10 mt-2" />

//               {/* ── RIGHT BRANCH ── */}
//               <div className="flex-1 flex flex-col items-center min-w-0">
//                 <OrgCard
//                   title={rightBranch.title}
//                   variant="branch"
//                   delay={0.1}
//                 />

//                 {/* Right branch → 2 deputies */}
//                 <ForkConnector n={2} />

//                 <div className="w-full flex items-start gap-2">
//                   {rightBranch.deputies.map((deputy, di) => (
//                     <div
//                       key={deputy.id}
//                       className="flex-1 flex flex-col items-center min-w-0"
//                     >
//                       <OrgCard
//                         title={deputy.title}
//                         variant="deputy"
//                         delay={0.3 + di * 0.08}
//                       />
//                       <div className="flex justify-center w-full">
//                         <VLine height={14} />
//                       </div>
//                       <OrgCard
//                         title={deputy.sub.title}
//                         variant="dept"
//                         delay={0.42 + di * 0.08}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Legend */}
//             <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[10px] text-gray-400 tracking-widest uppercase">
//               {[
//                 { color: "#001836", label: "Chief" },
//                 { color: "#003f71", label: "Additional Chief" },
//                 { color: "#eef4fa", label: "Deputy", border: "#003f71" },
//                 { color: "#fff", label: "Department", border: "#003f71" },
//               ].map((item) => (
//                 <span key={item.label} className="flex items-center gap-1.5">
//                   <span
//                     className="inline-block w-3 h-3 rounded-sm border"
//                     style={{
//                       background: item.color,
//                       borderColor: item.border ?? item.color,
//                     }}
//                   />
//                   {item.label}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
