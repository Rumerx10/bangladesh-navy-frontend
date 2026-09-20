"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/src/components/SectionTitle";

// ─── Data ─────────────────────────────────────────────────────────────────────
// Each node is `title` (the distinguishing part, shown bold) + `role` (the post
// or category, shown beneath). `kind` drives the tag colour.
// Add, remove or rename nodes here — the chart lays itself out from this tree.

type Kind = "command" | "deputy" | "dept";

type OrgNode = {
  title: string;
  role: string;
  kind: Kind;
  children?: OrgNode[];
};

type Post = { title: string; role: string };

/** Builds a straight vertical chain: each item's only child is the next one. */
const chain = (posts: Post[], kind: Kind): OrgNode => {
  const build = (i: number): OrgNode => ({
    ...posts[i],
    kind,
    children: i < posts.length - 1 ? [build(i + 1)] : undefined,
  });
  return build(0);
};

const dept = (title: string, role = "Department"): Post => ({ title, role });

const orgTree: OrgNode = {
  title: "Chief Hydrographer",
  role: "BNHOC",
  kind: "command",
  children: [
    {
      title: "CO BNHOC",
      role: "Addl Chief Hydrographer",
      kind: "command",
      children: [
        chain(
          [
            dept("Administration"),
            dept("Oceanographic"),
            dept("Cartographic"),
            dept("Quality Control & Data Management"),
          ],
          "dept",
        ),
        chain(
          [
            dept("Chart Depot", "Depot"),
            dept("Maritime Safety & Publication"),
            dept("Instrument & Maintenance"),
            dept("Meteorology"),
          ],
          "dept",
        ),
        chain(
          [
            dept("Tide Analysis"),
            dept("Geological & Geophysical"),
            dept("Logistic"),
            dept("Research & Development"),
          ],
          "dept",
        ),
      ],
    },
    {
      title: "Ops & Plan",
      role: "Addl Chief Hydrographer",
      kind: "command",
      children: [
        chain(
          [
            { title: "Plan & Policy", role: "Deputy Chief Hydrographer" },
            { title: "National Affair", role: "Deputy Chief Hydrographer" },
          ],
          "deputy",
        ),
        chain(
          [
            { title: "Ops & Trg", role: "Deputy Chief Hydrographer" },
            { title: "International Affair", role: "Deputy Chief Hydrographer" },
          ],
          "deputy",
        ),
      ],
    },
  ],
};

// ─── Style tokens ─────────────────────────────────────────────────────────────

/** Connector colour cycles by depth, so each generation reads as its own band. */
const LEVEL_COLORS = ["#0891b2", "#f97316", "#0d9488"];
const levelColor = (depth: number) => LEVEL_COLORS[depth % LEVEL_COLORS.length];

const KIND_STYLES: Record<Kind, { tag: string; label: string }> = {
  command: { tag: "#003f71", label: "Command" },
  deputy: { tag: "#0e7490", label: "Ops & Plan" },
  dept: { tag: "#64748b", label: "BNHOC" },
};

// ─── Card ─────────────────────────────────────────────────────────────────────

const NodeCard = ({ node, depth }: { node: OrgNode; depth: number }) => {
  const style = KIND_STYLES[node.kind];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: Math.min(depth * 0.06, 0.3) }}
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition-shadow duration-200 hover:shadow-[0_6px_18px_rgba(15,23,42,0.12)]"
    >
      <span className="block text-[13px] leading-snug font-semibold text-slate-900">
        {node.title}
      </span>
      <span className="mt-0.5 flex items-center gap-1.5 text-[11px] leading-snug text-slate-500">
        <span className="truncate">{node.role}</span>
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: style.tag }}
        />
        <span className="truncate" style={{ color: style.tag }}>
          {style.label}
        </span>
      </span>
    </motion.div>
  );
};

// ─── Connector (desktop) ──────────────────────────────────────────────────────

const BAND = 46;
const RADIUS = 14;
const STROKE = 2;

/**
 * The band between a parent and its children: a stem down from the parent
 * centre, a crossbar with rounded elbows at both ends, and a stem down to
 * each child ending in a dot. Children are equal-width flex columns, so a
 * child's centre is always at (100 / n) * (i + 0.5) percent of the band.
 */
const Connector = ({ n, color }: { n: number; color: string }) => {
  const centers = Array.from({ length: n }, (_, i) => (100 / n) * (i + 0.5));
  const first = centers[0];
  const last = centers[n - 1];
  const mid = BAND / 2;
  const half = STROKE / 2;

  return (
    <div className="relative w-full" style={{ height: BAND }} aria-hidden>
      {/* stem leaving the parent */}
      <div
        className="absolute top-0"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          width: STROKE,
          height: n > 1 ? mid : BAND - 4,
          background: color,
        }}
      />

      {n > 1 && (
        <>
          {/* rounded elbow at the left end of the crossbar */}
          <div
            className="absolute"
            style={{
              left: `calc(${first}% - ${half}px)`,
              top: mid,
              width: RADIUS,
              height: RADIUS,
              borderLeft: `${STROKE}px solid ${color}`,
              borderTop: `${STROKE}px solid ${color}`,
              borderTopLeftRadius: RADIUS,
            }}
          />
          {/* rounded elbow at the right end */}
          <div
            className="absolute"
            style={{
              right: `calc(${100 - last}% - ${half}px)`,
              top: mid,
              width: RADIUS,
              height: RADIUS,
              borderRight: `${STROKE}px solid ${color}`,
              borderTop: `${STROKE}px solid ${color}`,
              borderTopRightRadius: RADIUS,
            }}
          />
          {/* crossbar between the two elbows */}
          <div
            className="absolute"
            style={{
              left: `calc(${first}% + ${RADIUS - half}px)`,
              right: `calc(${100 - last}% + ${RADIUS - half}px)`,
              top: mid,
              height: STROKE,
              background: color,
            }}
          />
          {/* stems down to each child */}
          {centers.map((c, i) => {
            const isEdge = i === 0 || i === n - 1;
            return (
              <div
                key={c}
                className="absolute"
                style={{
                  left: `calc(${c}% - ${half}px)`,
                  top: isEdge ? mid + RADIUS : mid,
                  bottom: 4,
                  width: STROKE,
                  background: color,
                }}
              />
            );
          })}
        </>
      )}

      {/* junction dot where each stem meets the child card */}
      {centers.map((c) => (
        <span
          key={`dot-${c}`}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `calc(${c}% - 4px)`,
            width: 8,
            height: 8,
            background: color,
          }}
        />
      ))}
    </div>
  );
};

// ─── Desktop tree ─────────────────────────────────────────────────────────────

type TreeProps = { node: OrgNode; depth: number };

const DesktopNode = ({ node, depth }: TreeProps) => {
  const kids = node.children ?? [];

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full max-w-55">
        <NodeCard node={node} depth={depth} />
      </div>

      {kids.length > 0 && (
        <>
          <Connector n={kids.length} color={levelColor(depth)} />
          <div className="flex w-full items-start">
            {kids.map((child) => (
              <div key={child.title} className="min-w-0 flex-1 px-2">
                <DesktopNode node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Mobile tree (indented rail, no horizontal scrolling) ─────────────────────

const MobileNode = ({
  node,
  depth,
  isLast = true,
  color,
}: TreeProps & { isLast?: boolean; color?: string }) => {
  const kids = node.children ?? [];
  const railColor = levelColor(depth);

  return (
    <div className="relative">
      {/* elbow from the parent rail into this card */}
      {color && (
        <>
          <div
            className="absolute"
            style={{
              left: -22,
              top: 0,
              width: RADIUS,
              height: 26,
              borderLeft: `${STROKE}px solid ${color}`,
              borderBottom: `${STROKE}px solid ${color}`,
              borderBottomLeftRadius: RADIUS,
            }}
          />
          <div
            className="absolute"
            style={{
              left: -22 + RADIUS,
              top: 26 - STROKE,
              width: 22 - RADIUS,
              height: STROKE,
              background: color,
            }}
          />
          {/* rail continues past this child unless it is the last one */}
          {!isLast && (
            <div
              className="absolute"
              style={{
                left: -22,
                top: 26,
                bottom: -16,
                width: STROKE,
                background: color,
              }}
            />
          )}
        </>
      )}

      <NodeCard node={node} depth={depth} />

      {kids.length > 0 && (
        <div className="mt-4 flex flex-col gap-4 pl-5.5">
          {kids.map((child, i) => (
            <MobileNode
              key={child.title}
              node={child}
              depth={depth + 1}
              isLast={i === kids.length - 1}
              color={railColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Legend ───────────────────────────────────────────────────────────────────

const Legend = () => (
  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-slate-500">
    {(
      [
        ["command", "Chief / Addl Chief Hydrographer"],
        ["deputy", "Deputy Chief Hydrographer"],
        ["dept", "Department"],
      ] as const
    ).map(([kind, label]) => (
      <span key={kind} className="flex items-center gap-1.5">
        <span
          className="inline-block h-2 w-2 shrink-0 rounded-full"
          style={{ background: KIND_STYLES[kind].tag }}
        />
        {label}
      </span>
    ))}
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

const Organization = () => (
  <section className="bg-linear-to-b from-slate-50/60 to-white py-8 lg:py-20">
    <div className="container px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="Organisation Tree"
        desc="Organisational structure of Bangladesh Navy Hydrographic & Oceanographic Centre (BNHOC)"
      />

      {/* Dotted canvas */}
      <div
        className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 lg:p-8"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(203 213 225 / 0.9) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        {/* Stacked rail on small screens */}
        <div className="lg:hidden">
          <MobileNode node={orgTree} depth={0} />
        </div>

        {/* Full top-down chart on large screens */}
        <div className="hidden lg:block">
          <div style={{ minWidth: 1200 }} className="mx-auto">
            <DesktopNode node={orgTree} depth={0} />
          </div>
        </div>
      </div>

      <Legend />
    </div>
  </section>
);

export default Organization;
