"use client";

import { useAppSelector } from "@/src/lib/redux/hooks";
import { Menu, User } from "lucide-react";
import ThemeToggle from "../../theme/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import UserSkeleton from "./Skeleton/UserSkeleton";

const DashboardHeader = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
  const {
    userInformation: { firstName, role, profilePicture },
    loading,
  } = useAppSelector((state) => state.auth);

  return (
    <div
      className={`h-18 bg-card  flex items-center px-3 md:px-6 border-b border-border gap-3 md:gap-5 justify-between`}
    >
      <div className="flex items-center gap-4">
        {toggleSidebar && (
          <button
            className="lg:hidden p-1 md:p-2 rounded-md hover:bg-light-dark"
            onClick={toggleSidebar}
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        <ThemeToggle className="text-secondary-foreground" />
        {loading ? (
          <UserSkeleton />
        ) : (
          <div className="flex items-center gap-2 md:gap-4">
            <Avatar className="w-8 h-8 md:w-12 md:h-12">
              {profilePicture ? (
                <AvatarImage src={profilePicture} alt="Profile" />
              ) : (
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Default Profile"
                />
              )}
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>

            <div className="hidden sm:block">
              <h2 className="text-primary font-semibold font-inter text-sm md:text-base truncate">
                Hello, {firstName}
              </h2>
              <p className="text-muted-foreground text-xs md:text-sm font-inter font-normal truncate">
                {role}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
