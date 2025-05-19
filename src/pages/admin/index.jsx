import { Bell, ChevronRight } from "lucide-react";
import { useGetDashboardData } from "@/hooks/admin/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";

export default function Admin() {
  const { data: dashboardData, isLoading } = useGetDashboardData();
  const dashboardStats = dashboardData?.data;

  return (
    <div>
      {" "}
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Profile"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Students Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">All Students</div>
            {isLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <div className="text-3xl font-bold">
                {dashboardStats?.totalStudents || 0}
              </div>
            )}
          </div>

          {/* Completion Rate Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">
              Course Completion Rate
            </div>
            {isLoading ? (
              <>
                <Skeleton className="h-10 w-24 mb-2" />
                <Skeleton className="h-2.5 w-full" />
              </>
            ) : (
              <>
                <div className="text-3xl font-bold">
                  {dashboardStats?.completionRate || "0%"}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-red-600 h-2.5 rounded-full"
                    style={{ width: dashboardStats?.completionRate || "0%" }}
                  ></div>
                </div>
              </>
            )}
          </div>

          {/* Instructors Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">Total Courses</div>
            {isLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <div className="text-3xl font-bold">
                {dashboardStats?.totalCourses || 0}
              </div>
            )}
          </div>
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">Revenue (NGN)</div>
            {isLoading ? (
              <>
                <Skeleton className="h-10 w-36 mb-2" />
                <div className="flex items-end h-16 mt-2 space-x-1">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className="w-6"
                      style={{ height: `${(i + 1) * 4}px` }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="text-3xl font-bold">
                  ₦{dashboardStats?.totalRevenue.toLocaleString() || 0}
                </div>
                <div className="flex items-end h-16 mt-2 space-x-1">
                  <div className="bg-red-600 w-6 h-6 rounded-sm"></div>
                  <div className="bg-red-600 w-6 h-8 rounded-sm"></div>
                  <div className="bg-red-600 w-6 h-10 rounded-sm"></div>
                  <div className="bg-red-600 w-6 h-12 rounded-sm"></div>
                  <div className="bg-red-600 w-6 h-14 rounded-sm"></div>
                  <div className="bg-red-600 w-6 h-16 rounded-sm"></div>
                </div>
              </>
            )}
          </div>

          {/* Certificates Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">
              Generated Certificates
            </div>
            {isLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <div className="text-3xl font-bold">
                {dashboardStats?.totalCertificates || 0}
              </div>
            )}
          </div>

          {/* Total Courses Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">Total Courses</div>
            {isLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <div className="text-3xl font-bold">
                {dashboardStats?.totalCourses || 0}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <a
              href="#"
              className="text-red-600 text-sm hover:underline flex items-center"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>

          {isLoading ? (
            <div className="p-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 py-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardStats?.recentActivity?.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div
                          className={`h-8 w-8 rounded-full ${
                            activity.type === "COURSE"
                              ? "bg-blue-200 text-blue-500"
                              : "bg-green-200 text-green-500"
                          } flex items-center justify-center mr-3`}
                        >
                          {activity.type === "COURSE" ? "C" : "CT"}
                        </div>
                        <span>{activity.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{activity.title}</TableCell>
                    <TableCell>{activity.description}</TableCell>
                    <TableCell>{moment(activity.date).fromNow()}</TableCell>
                  </TableRow>
                ))}
                {(!dashboardStats?.recentActivity ||
                  dashboardStats.recentActivity.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No recent activity found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
}
