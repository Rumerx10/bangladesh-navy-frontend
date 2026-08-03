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

      <div className="p-8 pt-10 space-y-6">
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="bg-gray-200 h-4 w-32 rounded mb-2" />
          <div className="bg-gray-200 h-24 w-full rounded" />
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="bg-gray-200 h-4 w-32 rounded mb-2" />
          <div className="bg-gray-200 h-24 w-full rounded" />
        </div>
      </div>
    </div>
  );
};

export default HistoryPreviewSkeleton;
