const PartnerPreviewSkeleton = () => {
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

      <div className="p-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="bg-gray-200 h-4 w-16 rounded mb-2" />
            <div className="bg-gray-200 h-6 w-3/4 rounded" />
          </div>

          <div className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="bg-gray-200 h-4 w-24 rounded mb-2" />
            <div className="bg-gray-200 h-20 w-full rounded" />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gray-200 w-5 h-5 rounded" />
          <div className="bg-gray-200 h-5 w-32 rounded" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-lg bg-gray-200" />
              <div className="bg-gray-200 h-4 w-20 rounded" />
              <div className="bg-gray-200 h-4 w-14 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerPreviewSkeleton;
