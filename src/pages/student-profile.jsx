import { useState } from "react";
import { Download, Edit, Lock, Share2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto bg-white animate-pulse">
      {/* Header Skeleton */}
      <div className="px-4 py-8 md:px-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Image Skeleton */}
        <div className="w-24 h-24 rounded-full bg-gray-200"></div>

        {/* Profile Info Skeleton */}
        <div className="flex-1 text-center md:text-left">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mb-6"></div>

          {/* Stats Skeleton */}
          <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Button Skeleton */}
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex flex-col md:flex-row">
        {/* Left Content Skeleton */}
        <div className="flex-1 border-r border-gray-200">
          {/* Tabs Skeleton */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {[1, 2, 3].map((i) => (
                <div key={i} className="px-6 py-4">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Content Skeleton */}
          <div className="p-6">
            <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <div className="aspect-video w-full bg-gray-200"></div>
              <div className="p-4">
                <div className="h-6 w-64 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="w-full md:w-80 p-6 bg-gray-50">
          {/* Quick Actions Skeleton */}
          <div className="mb-8">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <ul className="space-y-3">
              {[1, 2, 3].map((i) => (
                <li key={i}>
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements Skeleton */}
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <ul className="space-y-4">
              {[1, 2].map((i) => (
                <li key={i} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                  <div className="ml-3">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded mt-1"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentProfile() {
  const { user, isLoadingUser } = useAuth();
  const [activeTab, setActiveTab] = useState("enrolled");
  const navigate = useNavigate();

  if (isLoadingUser) {
    return <LoadingSkeleton />;
  }
  if (!user.profile) {
    return navigate("/onboarding");
  }
  return (
    <div className="max-w-7xl mx-auto bg-white">
      {/* Header with blue top border */}
      <div className="">
        {/* Profile Header */}
        <div className="px-4 py-8 md:px-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=100&width=100"
              alt="Amina Adeyemi"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-semibold text-gray-800">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600 mb-6">
              School of Photography | Enrolled: Jan 2024
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">Courses Completed</p>
                <p className="text-red-600 font-bold text-xl">5/12</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Certificates Earned</p>
                <p className="text-red-600 font-bold text-xl">2</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Projects Published</p>
                <p className="text-red-600 font-bold text-xl">8</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <Link
              to="/edit-profile"
              className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50 transition-colors"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className=""></div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Content */}
        <div className="flex-1 border-r border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("enrolled")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "enrolled"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Enrolled Courses
              </button>
              <button
                onClick={() => setActiveTab("certificates")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "certificates"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Certificates
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "settings"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Settings
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Enrolled Courses Tab */}
            {activeTab === "enrolled" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Enrolled Courses
                </h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                  <div className="aspect-video w-full bg-gray-100">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=240&width=400"
                      alt="Photography class"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Professional Certificate in Photography
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      12 Modules • Next Lesson: Lighting Techniques
                    </p>
                    <button className="text-red-600 font-medium text-sm flex items-center">
                      Continue
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Certificates
                </h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-6 max-w-md">
                  <div className="p-4">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=300&width=400"
                      alt="Certificate"
                      className="w-full h-auto object-contain border border-gray-200"
                    />
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-red-600">
                          <Download size={18} />
                        </button>
                        <button className="text-red-600">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Settings
                </h2>
                <p className="text-gray-600">
                  Account settings and preferences
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-80 p-6 bg-gray-50">
          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Quick Actions
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-red-600"
                >
                  <Edit className="w-5 h-5 mr-3" />
                  <span>Edit Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-red-600"
                >
                  <Download className="w-5 h-5 mr-3" />
                  <span>Download All Certificates</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-red-600"
                >
                  <Lock className="w-5 h-5 mr-3" />
                  <span>Privacy Settings</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Achievements
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">Top 10% Student</p>
                  <p className="text-sm text-gray-600">
                    Photography Excellence
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">
                    7-Day Learning Streak
                  </p>
                  <p className="text-sm text-gray-600">Keep it up!</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
