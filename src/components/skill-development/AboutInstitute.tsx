"use client";

import { BookOpen, Eye, Target } from "lucide-react";
import { useAboutInstitute } from "@/src/components/about-institute/useAboutInstitute";

const AboutInstituteSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-12 h-12 rounded-xl bg-light-dark shrink-0" />
      <div className="space-y-2">
        <div className="h-7 w-72 max-w-full rounded bg-light-dark" />
        <div className="h-4 w-56 max-w-full rounded bg-light-dark" />
      </div>
    </div>

    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-4 w-full rounded bg-light-dark" />
      ))}
      <div className="h-4 w-2/3 rounded bg-light-dark" />
    </div>

    <div className="grid sm:grid-cols-2 gap-6 mt-12">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-liteBlue/20 bg-liteBlue/5 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-light-dark shrink-0" />
            <div className="h-5 w-24 rounded bg-light-dark" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-light-dark" />
            <div className="h-3 w-11/12 rounded bg-light-dark" />
            <div className="h-3 w-3/4 rounded bg-light-dark" />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-10 rounded-2xl border border-border bg-light p-6">
      <div className="h-5 w-40 rounded bg-light-dark mb-3" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-light-dark" />
        <div className="h-3 w-10/12 rounded bg-light-dark" />
      </div>
    </div>
  </div>
);

/**
 * The whole "About BN Hydrographic Institute" section — heading, prose, the
 * vision and mission cards and the training overview — comes from the singleton
 * `/about-institute` record, edited on Training & Courses → BN Hydrographic
 * Institute. Until that record exists the hook serves the copy this page shipped
 * with, so the section is never blank. Bangla is stored on the record but not
 * rendered — the public site has no language switch yet.
 */
const AboutInstitute = () => {
  const { aboutInstitute, isLoading } = useAboutInstitute();

  return (
    <section className="py-8 lg:py-20 bg-card">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {isLoading ? (
          <AboutInstituteSkeleton />
        ) : (
          <>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-liteBlue/10 text-liteBlue flex items-center justify-center shrink-0">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-pBlue">
                  {aboutInstitute.titleEn}
                </h2>
                {aboutInstitute.subTitleEn?.trim() && (
                  <p className="mt-1 text-sm text-secondary-foreground">
                    {aboutInstitute.subTitleEn}
                  </p>
                )}
              </div>
            </div>

            <div className="text-secondary-foreground leading-relaxed space-y-4 text-justify">
              {aboutInstitute.aboutParagraphsEn.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Vision & Mission */}
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {/* Vision */}
              <div className="rounded-2xl border border-liteBlue/20 bg-liteBlue/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue text-white flex items-center justify-center shrink-0">
                    <Eye size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-pBlue">
                    {aboutInstitute.visionTitleEn}
                  </h3>
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed text-justify">
                  {aboutInstitute.visionDescriptionEn}
                </p>
              </div>

              {/* Mission */}
              <div className="rounded-2xl border border-liteBlue/20 bg-liteBlue/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue text-white flex items-center justify-center shrink-0">
                    <Target size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-pBlue">
                    {aboutInstitute.missionTitleEn}
                  </h3>
                </div>
                <ul className="text-sm text-secondary-foreground leading-relaxed space-y-2">
                  {aboutInstitute.missionPointsEn.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 text-justify" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Training Overview */}
            {(aboutInstitute.trainingOverviewTitleEn.trim() ||
              aboutInstitute.trainingOverviewParagraphsEn.length > 0) && (
              <div className="mt-10 rounded-2xl border border-border bg-light p-6">
                <h3 className="text-lg font-bold text-pBlue mb-3">
                  {aboutInstitute.trainingOverviewTitleEn}
                </h3>
                <div className="text-sm text-secondary-foreground leading-relaxed space-y-3 text-justify">
                  {aboutInstitute.trainingOverviewParagraphsEn.map(
                    (paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    )
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AboutInstitute;
