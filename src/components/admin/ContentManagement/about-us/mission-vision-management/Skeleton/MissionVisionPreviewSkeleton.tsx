const MissionVisionPreviewSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 w-10 h-10 rounded-xl" />
          <div>
            <div className="bg-gray-200 h-6 w-52 rounded" />
            <div className="bg-gray-200 h-4 w-36 rounded mt-1" />
          </div>
        </div>
        <div className="absolute -bottom-5 right-8 bg-gray-200 h-12 w-36 rounded-xl" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl p-5 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-gray-200 w-4 h-4 rounded" />
                <div className="bg-gray-200 h-4 w-20 rounded" />
              </div>
              <div className="bg-gray-200 h-5 w-1/2 rounded mb-2" />
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 w-full rounded" />
                <div className="bg-gray-200 h-4 w-5/6 rounded" />
                <div className="bg-gray-200 h-4 w-4/6 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionVisionPreviewSkeleton;
