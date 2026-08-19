const AlumniListSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-5"
        >
          <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-72 max-w-full animate-pulse rounded bg-gray-100" />
          </div>
          <div className="h-5 w-5 shrink-0 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
};

export default AlumniListSkeleton;
