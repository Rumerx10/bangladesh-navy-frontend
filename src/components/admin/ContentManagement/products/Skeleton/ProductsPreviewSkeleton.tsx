const ProductsPreviewSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="h-6 bg-gray-200 rounded w-48" />
            <div className="h-4 bg-gray-200 rounded w-80" />
          </div>
          <div className="h-9 w-20 bg-gray-200 rounded-md shrink-0" />
        </div>
        <div className="flex gap-2 mt-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-7 w-24 bg-gray-200 rounded-full" />
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border border-light-silver rounded-lg bg-white overflow-hidden"
          >
            <div className="h-44 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-24" />
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPreviewSkeleton;
