const SurveyShipsPreviewSkeleton = () => {
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
        <div className="absolute -bottom-5 right-8 bg-gray-200 h-12 w-32 rounded-xl" />
      </div>

      <div className="p-8 pt-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl p-5 border border-gray-100"
            >
              <div className="bg-gray-200 h-4 w-16 rounded mb-2" />
              <div className="bg-gray-200 h-6 w-3/4 rounded" />
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-gray-200 w-5 h-5 rounded" />
            <div className="bg-gray-200 h-5 w-36 rounded" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
              >
                <div className="w-full h-44 bg-gray-200" />
                <div className="p-5 space-y-4">
                  <div>
                    <div className="bg-gray-200 h-5 w-40 rounded mb-2" />
                    <div className="bg-gray-200 h-4 w-32 rounded" />
                  </div>
                  <div className="bg-gray-200 h-16 w-full rounded" />
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((j) => (
                      <div
                        key={j}
                        className="bg-white rounded-lg p-2.5 border border-gray-100"
                      >
                        <div className="bg-gray-200 h-3 w-12 rounded mb-1" />
                        <div className="bg-gray-200 h-4 w-16 rounded" />
                      </div>
                    ))}
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

export default SurveyShipsPreviewSkeleton;
