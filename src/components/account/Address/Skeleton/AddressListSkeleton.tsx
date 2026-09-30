const AddressListSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-xl border border-border p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-20 rounded-md bg-light-silver" />
            <div className="h-6 w-16 rounded-md bg-light-silver" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-3/5 rounded bg-light-silver" />
            <div className="h-4 w-2/5 rounded bg-light-silver" />
            <div className="h-12 w-full rounded bg-light-silver" />
          </div>

          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
            <div className="h-4 w-10 rounded bg-light-silver" />
            <div className="text-light-silver">|</div>
            <div className="h-4 w-20 rounded bg-light-silver" />
            <div className="text-light-silver">|</div>
            <div className="h-4 w-14 rounded bg-light-silver" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressListSkeleton;
