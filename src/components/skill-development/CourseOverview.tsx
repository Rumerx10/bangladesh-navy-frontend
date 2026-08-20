import CourseStatisticsTable from "@/src/components/courses/CourseStatisticsTable";

export default function CourseOverview() {
  return (
    <section className="bg-white py-8 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        {/* Intro */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-pBlue mb-4">
            Courses
          </h2>
          <p className="text-gray-600 leading-relaxed text-[15px] mb-6">
            BN Hydrographic Institute offers professional courses in
            hydrography, oceanography and related marine sciences, designed to
            meet national requirements while maintaining international
            standards.
          </p>
          <div className="rounded-xl border border-liteBlue/20 bg-liteBlue/5 p-5">
            <p className="text-sm font-semibold text-liteBlue mb-3">
              Course Sequence
            </p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Long Hydrographic Cat-A Course</li>
              <li>Basic Hydrographic Cat-B Course</li>
              <li>Other Courses</li>
            </ol>
          </div>
        </div>

        {/* Course descriptions */}
        <div className="space-y-8">
          {/* Cat A */}
          <div className="border-l-4 border-liteBlue pl-5">
            <h3 className="text-lg font-bold text-pBlue mb-2">
              1. Long Hydrographic (Cat A) Course
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              The institute received approval in 2025 to conduct the prestigious
              Category A course, an honor held by only a limited number of
              institutions across Asia. The Institute is being affiliated under
              Bangladesh Maritime University, so that Cat A students can also
              obtain an MSc in Hydrography degree.
            </p>
          </div>

          {/* Cat B */}
          <div className="border-l-4 border-liteBlue pl-5">
            <h3 className="text-lg font-bold text-pBlue mb-2">
              2. Basic Hydrographic (Cat B) Course
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              In 2005, the institute achieved a significant milestone by
              obtaining international accreditation from the International Board
              on Standards of Competence for Hydrographic Surveyors and Nautical
              Cartographers (IBSC) to conduct Category B courses. As of 2025,
              the institute has successfully completed 19 Category B courses,
              demonstrating its sustained commitment to excellence.
            </p>
          </div>

          {/* Other */}
          <div className="border-l-4 border-liteBlue pl-5">
            <h3 className="text-lg font-bold text-pBlue mb-2">
              3. Other Courses
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              The institute also conducts professional training for Survey
              Recorders, short courses, workshops and refresher programmes on
              modern hydrographic technologies and software. These programmes
              ensure participants remain aligned with international standards
              and continuously enhance their survey capabilities.
            </p>
          </div>
        </div>

        {/* Summary Table — rows and totals come from `/courses/list` */}
        <CourseStatisticsTable />
      </div>
    </section>
  );
}
