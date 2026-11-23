"use client";

import DashboardHeader from "@/src/components/layout/dashboardLayout/DashboardHeader";
import Sidebar from "@/src/components/shared/sidebar/Sidebar";
import { ReactNode, useState } from "react";

const AdminLayoutClient = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative isolate flex h-dvh w-full overflow-hidden">
      {/* The coastal chart (see `.admin-canvas` in globals.css), under both
          the sidebar and the workspace and starting below the masthead. It
          sits outside the scroll container, so it stays put while pages
          scroll over it, and the frosted sidebar and tables blur it. */}
      <div
        aria-hidden
        className="admin-canvas pointer-events-none absolute inset-x-0 top-16 bottom-0 -z-10 lg:top-18"
      />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        {/* The workspace takes exactly the height left under the header —
            `min-h-0` is what lets a flex child shrink to that instead of
            growing to fit its content, which would push the bottom of long
            pages out of reach. */}
        <main className="min-h-0 flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-gutter-stable scrollbar-thumb-light-silver sm:p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayoutClient;
