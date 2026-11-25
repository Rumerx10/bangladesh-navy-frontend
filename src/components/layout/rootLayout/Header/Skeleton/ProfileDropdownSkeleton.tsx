/** Stands in for the account menu while a stored session's profile loads.
 *  Tinted for the navy header band. */
const ProfileDropdownSkeleton = () => {
  return (
    <div
      aria-hidden
      className="flex h-9 items-center gap-2 rounded-full bg-nav-wash pr-2 pl-0.5"
    >
      <div className="size-8 animate-pulse rounded-full bg-nav-ink/20" />
      <div className="hidden h-2.5 w-16 animate-pulse rounded bg-nav-ink/20 xl:block" />
    </div>
  );
};

export default ProfileDropdownSkeleton;
