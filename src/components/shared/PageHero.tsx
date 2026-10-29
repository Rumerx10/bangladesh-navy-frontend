import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Container from "@/src/components/shared/Container";

export interface PageHeroCrumb {
  label: string;
  href?: string;
}

export interface PageHeroFeature {
  /** A lucide icon element, e.g. `<Phone />` — sized and coloured here. */
  icon?: React.ReactNode;
  label: string;
}

interface PageHeroProps {
  title: string;
  /** Words after the title, set in the accent colour — e.g. "Mariners". */
  highlight?: string;
  description?: React.ReactNode;
  /** Pages between Home and this one, e.g. `[{ label: "About Us", href: "/about" }]`. */
  parents?: PageHeroCrumb[];
  /** This page's name in the breadcrumb, when the title is a longer phrase. */
  breadcrumbLabel?: string;
  /** Short selling points shown as chips under the description. */
  features?: PageHeroFeature[];
  /** Extra content under the text, e.g. stat tiles. */
  children?: React.ReactNode;
  className?: string;
}

// ─── Backdrop ─────────────────────────────────────────────────────────────────

/** Brand navy, lifted by a soft brand-blue light from the top right and a
 *  faint teal from the bottom left — no neon. */
const DEPTH: React.CSSProperties = {
  backgroundImage: [
    "radial-gradient(ellipse 65% 120% at 100% 0%, rgb(0 63 113 / 0.95) 0%, rgb(0 63 113 / 0) 62%)",
    "radial-gradient(ellipse 45% 90% at 0% 100%, rgb(14 116 144 / 0.22) 0%, rgb(14 116 144 / 0) 70%)",
    "linear-gradient(180deg, #001836 0%, #001a3a 100%)",
  ].join(", "),
};

/** A chart graticule, strongest on the right and fading out behind the text. */
const GRATICULE_FADE = "linear-gradient(to left, #000 5%, transparent 70%)";
const GRATICULE: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgb(255 255 255 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.07) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
  backgroundPosition: "right top",
  maskImage: GRATICULE_FADE,
  WebkitMaskImage: GRATICULE_FADE,
};

const CENTER = 200;
const round = (value: number) => Math.round(value * 100) / 100;
/** Point `radius` from the centre at a compass bearing (0° = north). */
const bearing = (radius: number, degrees: number) => {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return `${round(CENTER + radius * Math.cos(radians))},${round(CENTER + radius * Math.sin(radians))}`;
};

/** Degree ring: a tick every 5°, longer every 30°. */
const TICKS = Array.from({ length: 72 }, (_, index) => {
  const degrees = index * 5;
  const [x1, y1] = bearing(190, degrees).split(",");
  const [x2, y2] = bearing(degrees % 30 === 0 ? 172 : 182, degrees).split(",");
  return { degrees, x1, y1, x2, y2, major: degrees % 30 === 0 };
});

/** Rose points — the four cardinals long, the intercardinals short; each
 *  drawn as a lit and a shaded half. */
const ROSE = [45, 135, 225, 315, 0, 90, 180, 270].map((degrees) => {
  const cardinal = degrees % 90 === 0;
  const tip = bearing(cardinal ? 150 : 88, degrees);
  const centre = `${CENTER},${CENTER}`;
  return {
    degrees,
    lit: `${centre} ${tip} ${bearing(cardinal ? 22 : 15, degrees - 45)}`,
    shaded: `${centre} ${tip} ${bearing(cardinal ? 22 : 15, degrees + 45)}`,
  };
});

const CompassRose = () => (
  <div className="absolute top-1/2 animate-[spin_20s_linear_infinite] spin-[500] right-0 hidden aspect-square h-[150%] translate-x-1/4 -translate-y-1/2 text-white md:block">
    {/* The whole rose turns, with the degree bezel drifting on top of it. */}
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full motion-safe:animate-[spin_160s_linear_infinite]"
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r={190}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.14}
      />
      {TICKS.map(({ degrees, x1, y1, x2, y2, major }) => (
        <line
          key={degrees}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeOpacity={major ? 0.22 : 0.1}
          strokeWidth={major ? 1.5 : 1}
        />
      ))}
    </svg>
    <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
      <circle
        cx={CENTER}
        cy={CENTER}
        r={128}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.08}
        strokeDasharray="2 7"
      />
      {ROSE.map(({ degrees, lit, shaded }) => (
        <g key={degrees}>
          <polygon points={lit} fill="currentColor" fillOpacity={0.1} />
          <polygon points={shaded} fill="currentColor" fillOpacity={0.04} />
        </g>
      ))}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={5}
        fill="currentColor"
        fillOpacity={0.2}
      />
      <text
        x={CENTER}
        y={34}
        textAnchor="middle"
        fontSize={18}
        fontWeight={600}
        fill="currentColor"
        fillOpacity={0.3}
      >
        N
      </text>
    </svg>
  </div>
);

const PageHeroBackdrop = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0" style={DEPTH} />
    <div className="absolute inset-0" style={GRATICULE} />
    <CompassRose />
    <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-sky-300/40 to-transparent" />
  </div>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────

/** Entrance: each block rises in turn (skipped for reduced motion). */
const RISE =
  "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:ease-out [--tw-animation-fill-mode:both]";

/**
 * The header band at the top of every inner page: breadcrumb, title, an
 * optional accent phrase, description and feature chips, on brand navy with
 * a chart graticule and a compass rose.
 *
 * It sits under the fixed site header and pads itself clear of it, so place
 * it first on the page with no top margin. Works in server and client
 * components alike — no client JavaScript; the motion is CSS.
 *
 * @example
 * <PageHero
 *   title="Organogram"
 *   description="Structure and departments of BNHOC"
 *   parents={[{ label: "About Us", href: "/about" }]}
 * />
 */
const PageHero = ({
  title,
  highlight,
  description,
  parents = [],
  breadcrumbLabel,
  features = [],
  children,
  className,
}: PageHeroProps) => {
  const crumbs: PageHeroCrumb[] = [
    { label: "Home", href: "/" },
    ...parents,
    { label: breadcrumbLabel ?? [title, highlight].filter(Boolean).join(" ") },
  ];

  return (
    <section
      className={cn(
        // Pulled up under the header's 40px desktop spacer so the navy runs
        // behind the whole (translucent) fixed header; the top padding
        // clears that header — about 100px on mobile, 141px on desktop.
        "relative overflow-hidden bg-brand-navy pt-36 pb-12 text-white lg:-mt-10 lg:pt-50 lg:pb-16",
        className
      )}
    >
      <PageHeroBackdrop />

      <Container className="relative">
        <nav aria-label="Breadcrumb" className={RISE}>
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-white/60">
            {crumbs.map((crumb, index) => {
              const isCurrent = index === crumbs.length - 1;
              return (
                <li
                  key={`${crumb.label}-${index}`}
                  className="flex items-center gap-1.5"
                >
                  {index > 0 && (
                    <ChevronRight
                      aria-hidden="true"
                      className="size-3.5 text-white/30"
                    />
                  )}
                  {crumb.href && !isCurrent ? (
                    <Link
                      href={crumb.href}
                      className="rounded-sm transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-300/60 focus-visible:outline-none"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={isCurrent ? "page" : undefined}
                      className={cn(isCurrent && "font-medium text-white/90")}
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <h1
          className={cn(
            "mt-4 max-w-4xl text-3xl leading-[1.15] font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl",
            RISE,
            "motion-safe:delay-100"
          )}
        >
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-sky-300">{highlight}</span>
            </>
          )}
        </h1>

        {description && (
          <p
            className={cn(
              "mt-4 max-w-2xl text-base leading-relaxed text-pretty text-white/70 lg:text-lg",
              RISE,
              "motion-safe:delay-200"
            )}
          >
            {description}
          </p>
        )}

        {features.length > 0 && (
          <ul
            className={cn(
              "mt-7 flex flex-wrap gap-2.5",
              RISE,
              "motion-safe:delay-300"
            )}
          >
            {features.map(({ icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-white/80 backdrop-blur-sm [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-sky-300"
              >
                {icon}
                {label}
              </li>
            ))}
          </ul>
        )}

        {children && (
          <div className={cn("mt-8", RISE, "motion-safe:delay-400")}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
};

export default PageHero;
