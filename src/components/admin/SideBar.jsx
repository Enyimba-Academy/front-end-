import { Link, useLocation } from "react-router-dom";
import { adminRoutes } from "../../constant/route";
import Icon from "../icons/Icon";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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
import {
  Bell,
  BookOpen,
  BookOpenCheck,
  CheckCircle,
  CreditCard,
  AlertCircle,
  Check,
} from "lucide-react";
import {
  useGetNotificationsByRole,
  useMarkAllNotificationsAsReadByRole,
} from "@/hooks/notification.hook";

export default function Dashboard() {
  const location = useLocation();
  const { user } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const { data: notifications } = useGetNotificationsByRole();
  const { mutate: markAllAsRead, isPending: isMarkingAsRead } =
    useMarkAllNotificationsAsReadByRole();

  const notificationCount =
    notifications?.data?.filter((n) => !n.isRead)?.length || 0;
  const notificationData = notifications?.data;

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "ENROLLMENT":
        return <BookOpenCheck className="h-5 w-5 text-blue-500" />;
      case "COURSE":
        return <BookOpen className="h-5 w-5 text-green-500" />;
      case "ENROLLMENT_APPROVED":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case "PAYMENT_SUCCESS":
        return <CreditCard className="h-5 w-5 text-purple-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <header className="bg-white shadow-sm">
              <div className="flex justify-end items-center px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="relative" ref={notificationRef}>
                    <button
                      onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                      className="text-gray-500 hover:text-gray-700 relative"
                    >
                      <Bell className="h-5 w-5 cursor-pointer text-red-600" />
                      {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {notificationCount}
                        </span>
                      )}
                    </button>

                    {isNotificationOpen && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50">
                        <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                          <h3 className="text-sm font-semibold text-gray-900">
                            Notifications
                          </h3>
                          {notificationCount > 0 && (
                            <button
                              onClick={handleMarkAllAsRead}
                              disabled={isMarkingAsRead}
                              className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Mark all as read
                            </button>
                          )}
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notificationData?.length > 0 ? (
                            notificationData.map((notification) => (
                              <div
                                key={notification.id}
                                className={`px-4 py-3 hover:bg-gray-50 ${
                                  !notification.isRead ? "bg-blue-50" : ""
                                }`}
                              >
                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mt-1">
                                    {getNotificationIcon(notification.type)}
                                  </div>
                                  <div className="flex-1 ml-3">
                                    <p className="text-sm font-medium text-gray-900">
                                      {notification.title}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                      {formatDate(notification.createdAt)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-sm text-gray-500">
                              No notifications
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
                    <img
                      src={
                        user?.avatar || "/placeholder.svg?height=32&width=32"
                      }
                      alt="Profile"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </header>
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
