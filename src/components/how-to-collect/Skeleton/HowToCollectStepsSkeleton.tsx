import { Skeleton } from "@/src/components/ui/skeleton";

/** Mirrors the alternating step-card layout so the timeline does not jump
 * when the real steps arrive. */
const HowToCollectStepsSkeleton = () => {
  return (
    <ol className="mt-10 space-y-10 lg:mt-14 lg:space-y-14">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="relative">
          <Skeleton className="absolute top-0 left-6 z-10 h-12 w-12 -translate-x-1/2 rounded-full lg:left-1/2" />
          <div
            className={`rounded-2xl border border-border bg-card p-5 lg:w-[calc(50%-4rem)] lg:p-6 ${
              i % 2 === 1 ? "ml-16 lg:ml-auto" : "ml-16 lg:ml-0"
            }`}
          >
            <div className="flex items-start gap-4">
              <Skeleton className="h-12 w-12 shrink-0 rounded-xl lg:h-14 lg:w-14" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-5/6" />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default HowToCollectStepsSkeleton;
