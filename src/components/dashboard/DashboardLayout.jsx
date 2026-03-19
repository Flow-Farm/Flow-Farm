import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

export default function DashboardLayout(){
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return(
    <div className="flex min-h-screen bg-gray-100">
  {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />


       {/* Sidebar */}
      <div
        className={`
          fixed md:static z-50 
          h-screen
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform duration-300
        `}
      >
        <Sidebar className="h-full flex flex-col"/>
      </div>


            {/* Right Side */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">

        
        {/* Topbar */}
        <div className="flex flex-1 flex-col bg-gray-100 h-14 px-4">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <Topbar />

        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>

      </div>

    </div>
  );
}