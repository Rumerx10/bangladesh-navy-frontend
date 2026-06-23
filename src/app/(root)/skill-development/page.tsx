import { BookOpen, Eye, Target } from "lucide-react";
import { Metadata } from "next";
import SkillBanner from "@/src/components/skill-development/SkillBanner";

export const metadata: Metadata = {
  title: "BN Hydrographic Institute | Bangladesh Navy",
  description:
    "BN Hydrographic Institute — established 1983 at BNS Issa Khan. Training hydrographic professionals in surveying, oceanography and nautical charting.",
};

export default function SkillDevelopmentPage() {
  return (
    <main>
      <SkillBanner />

      {/* About */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#003f71]/10 text-[#003f71] flex items-center justify-center shrink-0">
              <BookOpen size={24} />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#001836]">
              About Us
            </h2>
          </div>

          <div className="text-gray-600 leading-relaxed space-y-4 text-[15px]">
            <p>
              BN Hydrographic Institute, formerly known as BN Hydrographic School, was established
              on 04 May 1983 at BNS ISSA KHAN with the objective of developing skilled hydrographic
              professionals. Initially offering Survey Recorder courses, the institute has progressively
              evolved into a specialized centre for hydrography, oceanography and nautical charting.
              As a dedicated training and research institution, the institute promotes professional
              excellence through high-quality instruction, practical training and continuous technical
              capacity development.
            </p>
            <p>
              The institute provides professional training to personnel from Bangladesh, maritime
              organizations and international participants. Training is conducted using advanced survey
              technologies, including multibeam and single beam echo sounders, side scan sonar,
              GPS/DGPS, Sub Bottom Profiler and other modern hydrographic systems, ensuring
              precise data collection, processing and analysis.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            {/* Vision */}
            <div className="rounded-2xl border border-[#003f71]/20 bg-[#003f71]/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#003f71] text-white flex items-center justify-center shrink-0">
                  <Eye size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#001836]">Vision</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                To become a centre of excellence in hydrographic education, training and research,
                upholding internationally recognized standards and contributing to safe navigation
                and sustainable maritime development.
              </p>
            </div>

            {/* Mission */}
            <div className="rounded-2xl border border-[#003f71]/20 bg-[#003f71]/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#003f71] text-white flex items-center justify-center shrink-0">
                  <Target size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#001836]">Mission</h3>
              </div>
              <ul className="text-sm text-gray-600 leading-relaxed space-y-2">
                {[
                  "Deliver high-quality training in hydrography and related disciplines.",
                  "Develop competent professionals using modern technologies and methodologies.",
                  "Support accurate hydrographic surveying and nautical chart production.",
                  "Enhance the operational and technical capabilities of the Bangladesh Navy and the wider maritime sector.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#003f71] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Training Overview */}
          <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-bold text-[#001836] mb-3">Training Overview</h3>
            <div className="text-sm text-gray-600 leading-relaxed space-y-3">
              <p>
                All training is aligned with international standards, particularly those set by the IBSC,
                ensuring high-quality outcomes and preparing trainees to support safe navigation, accurate
                charting and sustainable maritime development.
              </p>
              <p>
                To avail training facilities at the institute for national participants, applications are
                coordinated through the Directorate of Naval Training at Naval Headquarters. Overseas
                participants are required to apply through the Armed Forces Division, Dhaka Cantonment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
