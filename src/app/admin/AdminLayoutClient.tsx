"use client";

import DashboardHeader from "@/src/components/layout/dashboardLayout/DashboardHeader";
import Sidebar from "@/src/components/shared/sidebar/Sidebar";
import { ReactNode, useState } from "react";
import { GiCompass } from "react-icons/gi";
const AdminLayoutClient = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 lg:ml-0 min-w-0 w-full flex flex-col overflow-hidden">
        <div className="w-full sticky top-0 z-30 bg-card">
          <DashboardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <div>
          {/* Hero */}
          <div className="relative overflow-hidden bg-linear-to-br from-brand-navy via-secondary to-brand-blue px-6 py-10 text-white shadow-lg sm:px-10 sm:py-12">
            <div className="relative flex max-w-3xl flex-col items-start gap-6 md:flex-row md:items-center">
              <GiCompass
                className="pointer-events-none animate-[spin_20s_linear_infinite] h-28 w-28 shrink-0 text-white/10 sm:h-36 sm:w-36 md:h-52 md:w-52"
                strokeWidth={1}
              />
              <div>
                <p className="text-xs font-semibold tracking-widest text-white/70 uppercase sm:text-sm">
                  Bangladesh Navy Hydrographic &amp; Oceanographic Centre
                </p>
                <h1 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
                  Admin Control Panel
                </h1>
                <p className="mt-3 text-sm text-white/80 sm:text-base">
                  Manage products, content, news and users for the BNHOC
                  platform — everything you need, in one place.
                </p>
              </div>
            </div>
          </div>
          <div className="p-3 sm:p-4 lg:p-6 w-full overflow-y-auto h-[calc(100vh-75px)] scrollbar-hide bg-light">
            <div className="w-full max-w-full ">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutClient;
