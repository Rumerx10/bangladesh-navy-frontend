/** Mirrors the grid and card shape of the real list so nothing shifts on load. */
const NoticeListSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-border bg-card p-5"
        >
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-6 w-24 rounded-full bg-light-silver" />
            <div className="h-6 w-20 rounded-md bg-light-dark" />
          </div>
          <div className="mt-3 h-4 w-24 rounded bg-light-dark" />
          <div className="mt-3 h-5 w-full rounded bg-light-silver" />
          <div className="mt-2 h-5 w-2/3 rounded bg-light-silver" />
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded bg-light-dark" />
            <div className="h-3 w-full rounded bg-light-dark" />
            <div className="h-3 w-4/5 rounded bg-light-dark" />
          </div>
          <div className="mt-6 h-10 w-full rounded-lg bg-light-dark" />
        </div>
      ))}
    </div>
  );
};

export default NoticeListSkeleton;
