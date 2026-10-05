"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Network } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import SectionTitle from "@/src/components/SectionTitle";
import type { IOrganogramTreeNode } from "@/src/utils/organogram";

type Kind = "command" | "deputy" | "dept";

// ─── Style tokens ─────────────────────────────────────────────────────────────

/** Connector colour cycles by depth, so each generation reads as its own band. */
const LEVEL_COLORS = ["#0891b2", "#f97316", "#0d9488"];
const levelColor = (depth: number) => LEVEL_COLORS[depth % LEVEL_COLORS.length];

const KIND_COLORS: Record<Kind, string> = {
  command: "#003f71",
  deputy: "#0e7490",
  dept: "#64748b",
};

const tierFor = (depth: number): Kind => (depth <= 1 ? "command" : "dept");

const COLUMN_MIN = 120;

const CHART_MIN = 1200;

const narrowestShare = (node: IOrganogramTreeNode, share = 1): number =>
  node.children.length === 0
    ? share
    : Math.min(
        ...node.children.map((child) =>
          narrowestShare(child, share / node.children.length)
        )
      );

// ─── Card ─────────────────────────────────────────────────────────────────────

const NodeCard = ({
  node,
  depth,
  parentTitle,
}: {
  node: IOrganogramTreeNode;
  depth: number;
  /** Title of the node this one reports to; absent on a root. */
  parentTitle?: string;
}) => {
  const tagColor = KIND_COLORS[tierFor(depth)];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: Math.min(depth * 0.06, 0.3) }}
      className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-left shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition-shadow duration-200 hover:shadow-[0_6px_18px_rgba(15,23,42,0.12)]"
    >
      <span className="block hyphens-dash text-[13px] leading-snug font-semibold text-center wrap-break-word text-foreground">
        {node.title}
      </span>
    </motion.div>
  );
};

// ─── Connector (desktop) ──────────────────────────────────────────────────────

const BAND = 46;
const RADIUS = 14;
const STROKE = 2;

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

type TreeProps = {
  node: IOrganogramTreeNode;
  depth: number;
  parentTitle?: string;
};

const DesktopNode = ({ node, depth, parentTitle }: TreeProps) => {
  const kids = node.children;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full max-w-55">
        <NodeCard node={node} depth={depth} parentTitle={parentTitle} />
      </div>

      {kids.length > 0 && (
        <>
          <Connector n={kids.length} color={levelColor(depth)} />
          <div className="flex w-full items-start">
            {kids.map((child) => (
              <div key={child.id} className="min-w-0 flex-1 px-2">
                <DesktopNode
                  node={child}
                  depth={depth + 1}
                  parentTitle={node.title}
                />
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
  parentTitle,
  isLast = true,
  color,
}: TreeProps & { isLast?: boolean; color?: string }) => {
  const kids = node.children;
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

      <NodeCard node={node} depth={depth} parentTitle={parentTitle} />

      {kids.length > 0 && (
        <div className="mt-4 flex flex-col gap-4 pl-5.5">
          {kids.map((child, i) => (
            <MobileNode
              key={child.id}
              node={child}
              depth={depth + 1}
              parentTitle={node.title}
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
  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-secondary-foreground">
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
          style={{ background: KIND_COLORS[kind] }}
        />
        {label}
      </span>
    ))}
  </div>
);

// ─── Placeholder states ───────────────────────────────────────────────────────

const ChartSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="mx-auto h-14 w-56 rounded-xl bg-light-silver" />
    <div className="flex justify-center gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-14 w-44 rounded-xl bg-light-silver" />
      ))}
    </div>
    <div className="flex justify-center gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-14 w-44 rounded-xl bg-light-silver/70" />
      ))}
    </div>
  </div>
);

const EmptyChart = () => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
    <Network className="h-10 w-10 text-light-silver" />
    <p className="text-sm text-secondary-foreground">
      The organisational structure has not been published yet.
    </p>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

const Organization = () => {
  const { data, isLoading } = useGet<IOrganogramTreeNode[]>(
    "/organogram/tree",
    ["organogram-public"]
  );

  const roots = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );

  /* Each root is drawn as its own chart inside one shared scroll container, so
     the widest of them sets the width. Anything past the canvas is reachable
     through the existing `overflow-x-auto` — a chart that scrolls is readable,
     a chart crushed to fit is not. */
  const chartMinWidth = useMemo(
    () =>
      Math.max(
        CHART_MIN,
        ...roots.map((root) => Math.ceil(COLUMN_MIN / narrowestShare(root)))
      ),
    [roots]
  );

  return (
    <section className="bg-linear-to-b from-light/60 to-card py-8 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Organisation Tree"
          desc="Organisational structure of Bangladesh Navy Hydrographic & Oceanographic Centre (BNHOC)"
        />

        {/* Dotted canvas */}
        <div
          className="overflow-x-auto rounded-2xl border border-border/80 bg-light/50 p-5 lg:p-8"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--dot-grid) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          {isLoading ? (
            <ChartSkeleton />
          ) : roots.length === 0 ? (
            <EmptyChart />
          ) : (
            <>
              {/* Stacked rail on small screens */}
              <div className="flex flex-col gap-8 lg:hidden">
                {roots.map((root) => (
                  <MobileNode key={root.id} node={root} depth={0} />
                ))}
              </div>

              {/* Full top-down chart on large screens. The admin allows more
                  than one root node, so each is drawn as its own chart. */}
              <div className="hidden lg:block">
                <div
                  style={{ minWidth: chartMinWidth }}
                  className="mx-auto space-y-12"
                >
                  {roots.map((root) => (
                    <DesktopNode key={root.id} node={root} depth={0} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Hidden while there is no chart to explain. */}
        {!isLoading && roots.length > 0 && <Legend />}
      </div>
    </section>
  );
};

export default Organization;
