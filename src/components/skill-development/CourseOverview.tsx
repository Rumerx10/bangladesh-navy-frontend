export default function CourseOverview() {
  return (
    <section className="bg-white py-8 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">

        {/* Intro */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-pBlue mb-4">Courses</h2>
          <p className="text-gray-600 leading-relaxed text-[15px] mb-6">
            BN Hydrographic Institute offers professional courses in hydrography, oceanography
            and related marine sciences, designed to meet national requirements while maintaining
            international standards.
          </p>
          <div className="rounded-xl border border-liteBlue/20 bg-liteBlue/5 p-5">
            <p className="text-sm font-semibold text-liteBlue mb-3">Course Sequence</p>
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
              The institute received approval in 2025 to conduct the prestigious Category A course,
              an honor held by only a limited number of institutions across Asia. The Institute is
              being affiliated under Bangladesh Maritime University, so that Cat A students can also
              obtain an MSc in Hydrography degree.
            </p>
          </div>

          {/* Cat B */}
          <div className="border-l-4 border-liteBlue pl-5">
            <h3 className="text-lg font-bold text-pBlue mb-2">
              2. Basic Hydrographic (Cat B) Course
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              In 2005, the institute achieved a significant milestone by obtaining international
              accreditation from the International Board on Standards of Competence for Hydrographic
              Surveyors and Nautical Cartographers (IBSC) to conduct Category B courses. As of 2025,
              the institute has successfully completed 19 Category B courses, demonstrating its
              sustained commitment to excellence.
            </p>
          </div>

          {/* Other */}
          <div className="border-l-4 border-liteBlue pl-5">
            <h3 className="text-lg font-bold text-pBlue mb-2">3. Other Courses</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              The institute also conducts professional training for Survey Recorders, short courses,
              workshops and refresher programmes on modern hydrographic technologies and software.
              These programmes ensure participants remain aligned with international standards and
              continuously enhance their survey capabilities.
            </p>
          </div>
        </div>

        {/* Summary Table */}
        <div>
          <h3 className="text-lg font-bold text-pBlue mb-4">Course Statistics</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-liteBlue text-white">
                  <th className="border border-liteBlue/40 px-3 py-3 text-center font-semibold">Ser</th>
                  <th className="border border-liteBlue/40 px-3 py-3 text-left font-semibold">Course</th>
                  <th className="border border-liteBlue/40 px-3 py-3 text-center font-semibold">Courses Conducted</th>
                  <th className="border border-liteBlue/40 px-3 py-3 text-center font-semibold">Courses Duration</th>
                  <th className="border border-liteBlue/40 px-3 py-3 text-center font-semibold">BN</th>
                  <th className="border border-liteBlue/40 px-3 py-3 text-center font-semibold">Other Maritime Org</th>
                  <th className="border border-liteBlue/40 px-3 py-3 text-center font-semibold">Overseas</th>
                  <th className="border border-liteBlue/40 px-3 py-3 text-center font-semibold">Total Trainees</th>
                  <th className="border border-liteBlue/40 px-3 py-3 text-center font-semibold">Remarks</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {/* Row 1 — Long Hydrographic Cat A */}
                <tr className="bg-white">
                  <td className="border border-gray-200 px-3 py-3 text-center"></td>
                  <td className="border border-gray-200 px-3 py-3">Long Hydrographic (Cat A)</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">—</td>
                  <td className="border border-gray-200 px-3 py-3 text-center whitespace-nowrap">44 weeks</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">—</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">—</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">—</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">—</td>
                  <td className="border border-gray-200 px-3 py-3 text-center align-middle" rowSpan={2}>Officers</td>
                </tr>
                {/* Row 2 — Basic Hydrographic Cat B */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-3 text-center"></td>
                  <td className="border border-gray-200 px-3 py-3">Basic Hydrographic (Cat B)</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">19</td>
                  <td className="border border-gray-200 px-3 py-3 text-center whitespace-nowrap">24 weeks</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">86</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">20</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">27</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">133</td>
                </tr>
                {/* Row 3 — SR-I */}
                <tr className="bg-white">
                  <td className="border border-gray-200 px-3 py-3 text-center"></td>
                  <td className="border border-gray-200 px-3 py-3">SR-I</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">25</td>
                  <td className="border border-gray-200 px-3 py-3 text-center whitespace-nowrap">22 weeks</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">208</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">—</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">01</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">209</td>
                  <td className="border border-gray-200 px-3 py-3 text-center align-middle" rowSpan={3}>Sailors</td>
                </tr>
                {/* Row 4 — SR-II */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-3 text-center"></td>
                  <td className="border border-gray-200 px-3 py-3">SR-II</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">29</td>
                  <td className="border border-gray-200 px-3 py-3 text-center whitespace-nowrap">22 weeks</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">382</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">—</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">01</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">383</td>
                </tr>
                {/* Row 5 — SR-III */}
                <tr className="bg-white">
                  <td className="border border-gray-200 px-3 py-3 text-center"></td>
                  <td className="border border-gray-200 px-3 py-3">SR-III</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">39</td>
                  <td className="border border-gray-200 px-3 py-3 text-center whitespace-nowrap">22 weeks</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">459</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">06</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">—</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">465</td>
                </tr>
                {/* Row 6 — Echo Sounder */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-3 text-center"></td>
                  <td className="border border-gray-200 px-3 py-3">Echo Sounder Data Acquisition and Processing</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">06</td>
                  <td className="border border-gray-200 px-3 py-3 text-center whitespace-nowrap">02 weeks</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">61</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">—</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">—</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">61</td>
                  <td className="border border-gray-200 px-3 py-3 text-center">Officers and Sailors</td>
                </tr>
                {/* Total */}
                <tr className="bg-liteBlue/10 font-bold">
                  <td className="border border-gray-300 px-3 py-3 text-center" colSpan={2}>Total</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">118</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">—</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">1196</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">26</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">29</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">1251</td>
                  <td className="border border-gray-300 px-3 py-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
