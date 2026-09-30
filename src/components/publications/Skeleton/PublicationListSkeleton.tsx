/** Mirrors the grid and card shape of the real list so nothing shifts on load. */
const PublicationListSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-xl border border-border bg-card"
        >
          <div className="aspect-4/3 w-full bg-light-silver" />
          <div className="p-5">
            <div className="h-5 w-20 rounded-md bg-light-dark" />
            <div className="mt-3 h-5 w-full rounded bg-light-silver" />
            <div className="mt-2 h-5 w-2/3 rounded bg-light-silver" />
            <div className="mt-3 h-4 w-24 rounded bg-light-dark" />
            <div className="mt-6 h-4 w-28 rounded bg-light-dark" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicationListSkeleton;
