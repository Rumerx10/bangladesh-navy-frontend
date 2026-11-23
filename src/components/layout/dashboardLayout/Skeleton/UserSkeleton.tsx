import { Skeleton } from "@/src/components/ui/skeleton";

/** Placeholder for the profile in the admin masthead — tinted white so it
 *  reads on the navy band instead of the default primary wash. */
const UserSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="size-9 rounded-full bg-white/15 md:size-10" />
      <div className="hidden space-y-1.5 sm:block">
        <Skeleton className="h-3.5 w-24 rounded bg-white/15" />
        <Skeleton className="h-3 w-12 rounded bg-white/10" />
      </div>
    </div>
  );
};

export default UserSkeleton;
