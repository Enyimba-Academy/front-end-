import { Bell, ChevronRight } from "lucide-react";
export default function Admin() {
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
            <div className="text-3xl font-bold">1,240</div>
          </div>

          {/* Completion Rate Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">
              Course Completion Rate
            </div>
            <div className="text-3xl font-bold">68%</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-red-600 h-2.5 rounded-full"
                style={{ width: "68%" }}
              ></div>
            </div>
          </div>

          {/* Instructors Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">All Instructors</div>
            <div className="text-3xl font-bold">23</div>
          </div>
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">Revenue (NGN)</div>
            <div className="text-3xl font-bold">₦4,920,000</div>
            <div className="flex items-end h-16 mt-2 space-x-1">
              <div className="bg-red-600 w-6 h-6 rounded-sm"></div>
              <div className="bg-red-600 w-6 h-8 rounded-sm"></div>
              <div className="bg-red-600 w-6 h-10 rounded-sm"></div>
              <div className="bg-red-600 w-6 h-12 rounded-sm"></div>
              <div className="bg-red-600 w-6 h-14 rounded-sm"></div>
              <div className="bg-red-600 w-6 h-16 rounded-sm"></div>
            </div>
          </div>

          {/* Certificates Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">
              Generated Certificates
            </div>
            <div className="text-3xl font-bold">80</div>
          </div>

          {/* Total Courses Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">Total Courses</div>
            <div className="text-3xl font-bold">20</div>
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="px-6 py-3 font-medium">Student</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                  <th className="px-6 py-3 font-medium">Course</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-orange-200 flex items-center justify-center text-orange-500 mr-3">
                        AJ
                      </div>
                      <span>Ada Johnson</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">Enrolled in</td>
                  <td className="px-6 py-4">Cinematography</td>
                  <td className="px-6 py-4 text-gray-500">2 mins ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-500 mr-3">
                        JS
                      </div>
                      <span>John Smith</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">Incomplete</td>
                  <td className="px-6 py-4">Digital Marketing</td>
                  <td className="px-6 py-4 text-gray-500">29th April 2025</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center text-green-500 mr-3">
                        SC
                      </div>
                      <span>Sarah Chen</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">Completed</td>
                  <td className="px-6 py-4">Digital Marketing</td>
                  <td className="px-6 py-4 text-gray-500">1 hour ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
