const CoursesPreviewSkeleton = () => {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden animate-pulse">
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="bg-light-silver w-10 h-10 rounded-xl" />
          <div>
            <div className="bg-light-silver h-6 w-44 rounded" />
            <div className="bg-light-silver h-4 w-60 rounded mt-1" />
          </div>
        </div>
        <div className="absolute -bottom-5 right-8 bg-light-silver h-12 w-36 rounded-xl" />
      </div>

      <div className="p-8 pt-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-light rounded-xl p-5 border border-border space-y-2"
            >
              <div className="bg-light-silver h-4 w-24 rounded" />
              <div className="bg-light-silver h-4 w-full rounded" />
              <div className="bg-light-silver h-4 w-5/6 rounded" />
              <div className="bg-light-silver h-4 w-3/4 rounded" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-l-4 border-border pl-5 space-y-2">
              <div className="bg-light-silver h-5 w-1/3 rounded" />
              <div className="bg-light-silver h-4 w-full rounded" />
              <div className="bg-light-silver h-4 w-4/5 rounded" />
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-light p-5 space-y-2">
          <div className="bg-light-silver h-4 w-40 rounded" />
          <div className="bg-light-silver h-4 w-full rounded" />
          <div className="bg-light-silver h-4 w-48 rounded" />
        </div>
      </div>
    </div>
  );
};

export default CoursesPreviewSkeleton;
