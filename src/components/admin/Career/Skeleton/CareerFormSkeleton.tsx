const CareerFormSkeleton = () => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="border border-light-silver rounded-lg p-8 bg-card">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-light-silver" />
            <div className="h-5 w-44 bg-light-silver rounded" />
          </div>
          <div className="h-6 w-20 bg-light-silver rounded-full" />
        </div>

        {/* Image upload */}
        <div className="mt-6">
          <div className="h-40 w-full rounded-lg bg-light-silver" />
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-6 gap-x-6 mt-6">
          {/* Title */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-light-silver rounded" />
            <div className="h-10 w-full bg-light-silver rounded-md" />
          </div>

          {/* Vacancy */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-light-silver rounded" />
            <div className="h-10 w-full bg-light-silver rounded-md" />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-light-silver rounded" />
            <div className="h-10 w-full bg-light-silver rounded-md" />
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <div className="h-4 w-28 bg-light-silver rounded" />
            <div className="h-10 w-full bg-light-silver rounded-md" />
          </div>

          {/* Salary Range */}
          <div className="space-y-2">
            <div className="h-4 w-32 bg-light-silver rounded" />
            <div className="h-10 w-full bg-light-silver rounded-md" />
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <div className="h-4 w-28 bg-light-silver rounded" />
            <div className="h-10 w-full bg-light-silver rounded-md" />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-light-silver rounded" />
            <div className="h-10 w-full bg-light-silver rounded-md" />
          </div>

          {/* Job Description */}
          <div className="lg:col-span-4 space-y-2">
            <div className="h-4 w-40 bg-light-silver rounded" />
            <div className="h-28 w-full bg-light-silver rounded-md" />
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex items-center justify-end gap-4">
        <div className="h-10 w-24 bg-light-silver rounded-md" />
        <div className="h-10 w-36 bg-light-silver rounded-md" />
      </div>
    </div>
  );
};

export default CareerFormSkeleton;
