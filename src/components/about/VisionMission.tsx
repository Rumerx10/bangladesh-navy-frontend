"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  Eye,
  HistoryIcon,
  MapIcon,
  Ship,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Fragment, useRef, type ComponentType } from "react";
import {
  LighthouseScene,
  SurveyShipScene,
} from "@/src/components/about/VisionMissionScenes";
import { useMissionVision } from "@/src/components/mission-vision/useMissionVision";
import Container from "@/src/components/shared/Container";
import { cn } from "@/src/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const SERIF = "[font-family:var(--font-source-serif),Georgia,serif]";

// Words the statements pick out in the accent colour. The copy is edited in
// the admin, so this is a light touch: whichever of these appear are lit,
// and none of them has to.
const EMPHASIS = new Set([
  "safe",
  "safety",
  "efficient",
  "sustainable",
  "accurate",
  "navigation",
  "bangladesh",
]);

const statementVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.045 } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(8px)" },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

/** The statement, set large in the display serif and revealed word by word
 *  as it scrolls into view. */
const Statement = ({ text }: { text: string }) => {
  const words = text.trim().split(/\s+/);
  // Long statements step down a size so they stay a few lines, not a wall
  const size =
    words.length > 18
      ? "text-[1.75rem] sm:text-4xl lg:text-[2.6rem]"
      : "text-3xl sm:text-[2.75rem] lg:text-6xl";

  return (
    <motion.p
      variants={statementVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "relative mt-6 leading-[1.18] font-bold tracking-[-0.01em] text-pBlue",
        SERIF,
        size
      )}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <motion.span
            variants={wordVariants}
            className={cn(
              "inline-block",
              EMPHASIS.has(word.toLowerCase().replace(/[^a-z]/g, "")) &&
                "text-liteBlue"
            )}
          >
            {word}
          </motion.span>{" "}
        </Fragment>
      ))}
    </motion.p>
  );
};

interface BlockProps {
  index: string;
  label: string;
  tag: string;
  icon: LucideIcon;
  Scene: ComponentType<{ className?: string }>;
  text: string;
  /** Scene on the left, words on the right (large screens). */
  flip?: boolean;
}

/** One principle: big outlined number, label, the statement, and its scene
 *  drifting at a different speed from the page. */
const Block = ({
  index,
  label,
  tag,
  icon: Icon,
  Scene,
  text,
  flip = false,
}: BlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [56, -56]);
  const numberY = useTransform(scrollYProgress, [0, 1], [-36, 36]);

  return (
    <div
      ref={ref}
      className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
    >
      <div className={cn("relative lg:col-span-7", flip && "lg:order-2")}>
        <motion.span
          aria-hidden
          style={{ y: numberY }}
          className={cn(
            "pointer-events-none absolute -top-20 -left-1 text-[8rem] leading-none font-bold text-transparent opacity-25 select-none [-webkit-text-stroke:1.5px_var(--brand-ink-accent)] lg:-top-28 lg:text-[11rem]",
            SERIF
          )}
        >
          {index}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative flex items-center gap-3"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-liteBlue/10 text-liteBlue ring-1 ring-liteBlue/20">
            <Icon size={20} />
          </span>
          <div>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-liteBlue uppercase">
              {label}
            </h2>
            <p className="text-sm text-muted-foreground">{tag}</p>
          </div>
        </motion.div>

        <Statement text={text} />

        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="mt-8 h-1 w-24 origin-left rounded-full bg-linear-to-r from-liteBlue to-sky-400"
        />
      </div>

      <div className={cn("relative lg:col-span-5", flip && "lg:order-1")}>
        <motion.div style={{ y: sceneY }} className="relative">
          {/* Soft glow behind the frame */}
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem] bg-liteBlue/20 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative aspect-5/4 overflow-hidden rounded-[1.75rem] bg-brand-navy shadow-[0_40px_80px_-40px_rgb(0_24_54/0.65)] ring-1 ring-white/10"
          >
            <Scene className="absolute inset-0 h-full w-full" />
            <span className="absolute top-4 left-4 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-sm">
              {index} · {label}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Starts under the vision's words (left) and ends under the mission's
// (right); the compass sits on its midpoint
const COURSE = "M40 0 C 40 90, 360 70, 360 160";

/** A course line plotted from vision to mission, drawn as you scroll past,
 *  with a compass turning on it. */
const CourseLine = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });
  const turn = useTransform(scrollYProgress, [0, 1], [0, 270]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative mx-auto my-20 flex h-40 w-full max-w-lg items-center justify-center lg:my-28"
    >
      <svg
        viewBox="0 0 400 160"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <path
          d={COURSE}
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
          strokeDasharray="6 9"
        />
        <motion.path
          d={COURSE}
          fill="none"
          stroke="var(--brand-ink-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <motion.span
        style={{ rotate: turn }}
        className="relative grid size-14 place-items-center rounded-full bg-card text-liteBlue shadow-lg ring-1 ring-border"
      >
        <Compass size={26} />
      </motion.span>
    </div>
  );
};

const EXPLORE = [
  {
    href: "/about/survey-ships",
    label: "Survey ships",
    description: "The ships that carry out our surveys",
    icon: Ship,
  },
  {
    href: "/product-service",
    label: "Charts & publications",
    description: "Every chart and publication we produce",
    icon: MapIcon,
  },
  {
    href: "/about/history",
    label: "Our history",
    description: "How the centre began and grew",
    icon: HistoryIcon,
  },
];

const Explore = () => (
  <div className="mt-28 lg:mt-36">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className="text-center"
    >
      <p className="text-sm font-semibold tracking-[0.18em] text-liteBlue uppercase">
        Keep exploring
      </p>
      <h2
        className={cn("mt-2 text-3xl font-bold text-pBlue sm:text-4xl", SERIF)}
      >
        See the mission at work
      </h2>
    </motion.div>

    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {EXPLORE.map(({ href, label, description, icon: Icon }, i) => (
        <motion.div
          key={href}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
        >
          <Link
            href={href}
            className="group flex h-full flex-col rounded-2xl bg-card p-6 ring-1 ring-border transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgb(0_24_54/0.5)] hover:ring-liteBlue/40"
          >
            <span className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-2xl bg-liteBlue/10 text-liteBlue transition-colors group-hover:bg-liteBlue group-hover:text-white dark:group-hover:text-brand-navy">
                <Icon size={20} />
              </span>
              <ArrowUpRight
                size={20}
                className="text-muted-foreground transition-[translate,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-liteBlue"
              />
            </span>
            <span className="mt-5 block text-lg font-semibold text-pBlue">
              {label}
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">
              {description}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

const VisionMissionSkeleton = () => (
  <div className="animate-pulse space-y-24">
    {Array.from({ length: 2 }).map((_, index) => (
      <div
        key={index}
        className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
      >
        <div
          className={cn("space-y-4 lg:col-span-7", index === 1 && "lg:order-2")}
        >
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-light-dark" />
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-light-dark" />
              <div className="h-3 w-36 rounded bg-light-dark" />
            </div>
          </div>
          <div className="h-10 w-full rounded bg-light-dark" />
          <div className="h-10 w-11/12 rounded bg-light-dark" />
          <div className="h-10 w-2/3 rounded bg-light-dark" />
        </div>
        <div
          className={cn(
            "aspect-5/4 rounded-[1.75rem] bg-light-dark lg:col-span-5",
            index === 1 && "lg:order-1"
          )}
        />
      </div>
    ))}
  </div>
);

const VisionMission = () => {
  const { missionVision, isLoading } = useMissionVision();

  return (
    // No background of its own: the site backdrop shows through
    <section className="relative isolate overflow-hidden py-20 lg:py-32">
      <Container>
        <div className="mx-auto max-w-6xl">
          {isLoading ? (
            <VisionMissionSkeleton />
          ) : (
            <>
              <Block
                index="01"
                label={missionVision.visionTitleEn}
                tag="Where we are heading"
                icon={Eye}
                Scene={LighthouseScene}
                text={missionVision.visionDescriptionEn}
              />
              <CourseLine />
              <Block
                index="02"
                label={missionVision.missionTitleEn}
                tag="What we do every day"
                icon={Compass}
                Scene={SurveyShipScene}
                text={missionVision.missionDescriptionEn}
                flip
              />
            </>
          )}

          <Explore />
        </div>
      </Container>
    </section>
  );
};

export default VisionMission;
