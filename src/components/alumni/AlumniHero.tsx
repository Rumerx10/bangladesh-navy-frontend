import { CalendarRange, GraduationCap, Users } from "lucide-react";
import PageHero from "@/src/components/shared/PageHero";

interface AlumniHeroProps {
  totalCourses: number;
  totalAlumni: number;
  /** "1997 – 2026", or null while the list is still loading. */
  yearsSpan: string | null;
}

const STATS = [
  { key: "courses", label: "Courses Conducted", icon: GraduationCap },
  { key: "alumni", label: "Alumni Trained", icon: Users },
  { key: "years", label: "Years of Training", icon: CalendarRange },
] as const;

/** The shared page header, with the directory's headline figures under it. */
const AlumniHero = ({
  totalCourses,
  totalAlumni,
  yearsSpan,
}: AlumniHeroProps) => {
  const values: Record<(typeof STATS)[number]["key"], string> = {
    courses: totalCourses ? String(totalCourses) : "—",
    alumni: totalAlumni ? String(totalAlumni) : "—",
    years: yearsSpan ?? "—",
  };

  return (
    <PageHero
      title="Alumni"
      parents={[
        { label: "BN Hydrographic Institute", href: "/training-courses" },
      ]}
    >
      <dl className="grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
        {STATS.map(({ key, label, icon: Icon }) => (
          <div
            key={key}
            className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-sm"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/10 text-sky-300">
              <Icon className="size-5" />
            </span>
            {/* Label first in the markup (dt before dd), figure first on screen. */}
            <div className="flex min-w-0 flex-col-reverse">
              <dt className="text-xs font-medium text-white/60">{label}</dt>
              <dd className="text-xl font-bold text-white tabular-nums">
                {values[key]}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </PageHero>
  );
};

export default AlumniHero;
