import { Link, useLocation } from "react-router-dom";
import { adminRoutes } from "../../constant/route";
import Icon from "../icons/Icon";
import { Outlet } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
export default function Dashboard() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar className="z-50 border-r border-slate-200">
          <SidebarHeader className="p-6 flex justify-center border-b border-slate-200">
            <Link to="/" className="flex items-center justify-center">
              <img src="/logo.png" alt="logo" className="w-14 h-14" />
            </Link>
          </SidebarHeader>

          <SidebarContent className="px-2 py-4">
            <SidebarMenu>
              {adminRoutes.map((route) => {
                const isActive = location.pathname.includes(route.path);
                return (
                  <SidebarMenuButton
                    key={route.path}
                    asChild
                    isActive={isActive}
                    tooltip={route.name}
                    className="mb-1"
                  >
                    <Link
                      to={route.path}
                      className={`flex items-center px-4 py-3 w-full rounded-md transition-colors ${
                        isActive
                          ? "bg-red-50 text-red-600"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon
                        name={route.icon}
                        size={20}
                        className={`mr-3 ${isActive ? "text-red-600" : ""}`}
                      />
                      <span className="font-medium">{route.name}</span>
                      {isActive && (
                        <div className="w-1 h-full bg-red-500 absolute left-0 rounded-r-md"></div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-slate-200 mt-auto">
            <div className="flex items-center p-2 rounded-md hover:bg-slate-100">
              <div className="w-8 h-8 bg-slate-300 rounded-full mr-3">
                <img
                  src={user?.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content - Full width container */}
        <div className="flex-1 w-full bg-gray-100 overflow-hidden">
          {/* Mobile sidebar trigger */}
          <div className="md:hidden fixed top-4 left-4 z-50">
            <SidebarTrigger />
          </div>

          {/* Dashboard Content */}
          <div className="h-full w-full overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
