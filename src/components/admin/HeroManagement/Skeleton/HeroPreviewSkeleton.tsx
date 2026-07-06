// src/modules/admin/hero-management/components/Skeleton/HeroPreviewSkeleton.tsx

const HeroPreviewSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Header with gradient */}
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 w-10 h-10 rounded-xl" />
            <div>
              <div className="bg-gray-200 h-6 w-48 rounded" />
              <div className="bg-gray-200 h-4 w-32 rounded mt-1" />
            </div>
          </div>
        </div>

        {/* Edit Button placeholder */}
        <div className="absolute -bottom-5 right-8 bg-gray-200 h-12 w-32 rounded-xl" />
      </div>

      {/* Content Section */}
      <div className="p-8 pt-10">
        {/* Images Grid Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-gray-200 w-5 h-5 rounded" />
            <div className="bg-gray-200 h-5 w-32 rounded" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-video rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="bg-gray-200 h-4 w-16 rounded mb-2" />
            <div className="bg-gray-200 h-6 w-3/4 rounded" />
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="bg-gray-200 h-4 w-16 rounded mb-2" />
            <div className="bg-gray-200 h-6 w-1/2 rounded" />
          </div>

          <div className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="bg-gray-200 h-4 w-24 rounded mb-2" />
            <div className="bg-gray-200 h-20 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPreviewSkeleton;