const HistoryPreviewSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 w-10 h-10 rounded-xl" />
          <div>
            <div className="bg-gray-200 h-6 w-48 rounded" />
            <div className="bg-gray-200 h-4 w-32 rounded mt-1" />
          </div>
        </div>
        <div className="absolute -bottom-5 right-8 bg-gray-200 h-12 w-36 rounded-xl" />
      </div>

      <div className="p-8 pt-10 space-y-8">
        {/* Image skeleton */}
        <div className="w-full h-56 rounded-xl bg-gray-200" />

        {/* Basic fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="bg-gray-200 h-4 w-16 rounded mb-2" />
            <div className="bg-gray-200 h-6 w-3/4 rounded" />
          </div>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="bg-gray-200 h-4 w-20 rounded mb-2" />
            <div className="bg-gray-200 h-6 w-1/2 rounded" />
          </div>
          <div className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="bg-gray-200 h-4 w-24 rounded mb-2" />
            <div className="bg-gray-200 h-20 w-full rounded" />
          </div>
        </div>

        {/* Key Milestones */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-gray-200 w-5 h-5 rounded" />
            <div className="bg-gray-200 h-5 w-36 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex gap-4"
              >
                <div className="bg-gray-200 h-8 w-16 rounded-lg shrink-0" />
                <div className="flex-1">
                  <div className="bg-gray-200 h-4 w-full rounded mb-2" />
                  <div className="bg-gray-200 h-4 w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-gray-200 w-5 h-5 rounded" />
            <div className="bg-gray-200 h-5 w-28 rounded" />
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-5 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 shrink-0" />
                  <div className="flex-1">
                    <div className="bg-gray-200 h-4 w-24 rounded mb-2" />
                    <div className="bg-gray-200 h-5 w-2/3 rounded mb-2" />
                    <div className="bg-gray-200 h-16 w-full rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPreviewSkeleton;
