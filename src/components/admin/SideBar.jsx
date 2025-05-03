import { Bell } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";
import { adminRoutes } from "../../constant/route";
import Icon from "../icons/Icon";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#4D4D4D] text-white">
        <div className="p-6 flex items-center justify-center">
          <div className="w-12 h-12  rounded-md flex items-center justify-center text-white font-bold">
            <img src="/logo.png" alt="logo" className="w-full h-full" />
          </div>
        </div>
        <nav className="mt-6">
          <div className="px-4">
            {adminRoutes.map((route, index) => (
              <NavLink
                key={index}
                to={route.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md ${
                    index > 0 ? "mt-1" : ""
                  } ${
                    isActive
                      ? "bg-gray-900 text-white border-l-2 border-red-500"
                      : "text-[#D1D5DB] hover:bg-gray-700"
                  }`
                }
              >
                <Icon name={route.icon} size={20} className="mr-3" />
                <span>{route.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}

        {/* Dashboard Content */}
        <Outlet />
      </div>
    </div>
  );
}
