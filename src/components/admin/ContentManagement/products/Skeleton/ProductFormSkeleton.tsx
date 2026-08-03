export default function ProductFormSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {[1, 2, 3].map((section) => (
        <div
          key={section}
          className="border border-light-silver rounded-lg p-8 bg-white"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-md bg-gray-200" />
            <div className="h-5 w-44 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((field) => (
              <div key={field} className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-end gap-4">
        <div className="h-10 w-24 bg-gray-200 rounded-md" />
        <div className="h-10 w-36 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}
