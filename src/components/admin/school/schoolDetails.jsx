"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Eye,
  Film,
  Layers,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
  Phone,
  PlusCircle,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";
import React from "react";

function ContentHeader({ title, children }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-2">{children}</div>
    </div>
  );
}

function DashboardContent({ previewOpen, togglePreviewDrawer }) {
  return (
    <div>
      <ContentHeader title="Dashboard">
        <button
          onClick={togglePreviewDrawer}
          className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
            previewOpen
              ? "bg-red-50 text-red-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Eye className="w-4 h-4 mr-1.5" />
          {previewOpen ? "Hide Preview" : "Show Preview"}
        </button>
      </ContentHeader>
      {/* Rest of the dashboard content */}
    </div>
  );
}

function StudentsContent({ previewOpen, togglePreviewDrawer }) {
  return (
    <div>
      <ContentHeader title="Students">
        <button
          onClick={togglePreviewDrawer}
          className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
            previewOpen
              ? "bg-red-50 text-red-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Eye className="w-4 h-4 mr-1.5" />
          {previewOpen ? "Hide Preview" : "Show Preview"}
        </button>
        <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Student
        </button>
      </ContentHeader>
      {/* Rest of the students content */}
    </div>
  );
}

function CoursesContent({ openPreview, previewOpen, togglePreviewDrawer }) {
  return (
    <div>
      <ContentHeader title="Courses">
        <button
          onClick={togglePreviewDrawer}
          className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
            previewOpen
              ? "bg-red-50 text-red-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Eye className="w-4 h-4 mr-1.5" />
          {previewOpen ? "Hide Preview" : "Show Preview"}
        </button>
        <Link
          href="/admin/courses/add"
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Course
        </Link>
      </ContentHeader>
      {/* Rest of the courses content */}
    </div>
  );
}

function SchoolsContent({ openPreview, previewOpen, togglePreviewDrawer }) {
  return (
    <div>
      <ContentHeader title="Schools">
        <button
          onClick={togglePreviewDrawer}
          className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
            previewOpen
              ? "bg-red-50 text-red-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Eye className="w-4 h-4 mr-1.5" />
          {previewOpen ? "Hide Preview" : "Show Preview"}
        </button>
        <Link
          href="/admin/schools/add"
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add School
        </Link>
      </ContentHeader>
      {/* Rest of the schools content */}
    </div>
  );
}

function VideosContent({ previewOpen, togglePreviewDrawer }) {
  return (
    <div>
      <ContentHeader title="Videos">
        <button
          onClick={togglePreviewDrawer}
          className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
            previewOpen
              ? "bg-red-50 text-red-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Eye className="w-4 h-4 mr-1.5" />
          {previewOpen ? "Hide Preview" : "Show Preview"}
        </button>
        <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          <PlusCircle className="w-4 h-4 mr-2" />
          Upload Video
        </button>
      </ContentHeader>
      {/* Rest of the videos content */}
    </div>
  );
}

function AnalyticsContent({ previewOpen, togglePreviewDrawer }) {
  return (
    <div>
      <ContentHeader title="Analytics">
        <button
          onClick={togglePreviewDrawer}
          className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
            previewOpen
              ? "bg-red-50 text-red-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Eye className="w-4 h-4 mr-1.5" />
          {previewOpen ? "Hide Preview" : "Show Preview"}
        </button>
      </ContentHeader>
      <p>This is the analytics content.</p>
    </div>
  );
}

function CalendarContent({ previewOpen, togglePreviewDrawer }) {
  return (
    <div>
      <ContentHeader title="Calendar">
        <button
          onClick={togglePreviewDrawer}
          className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
            previewOpen
              ? "bg-red-50 text-red-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Eye className="w-4 h-4 mr-1.5" />
          {previewOpen ? "Hide Preview" : "Show Preview"}
        </button>
      </ContentHeader>
      <p>This is the calendar content.</p>
    </div>
  );
}

function MessagesContent({ previewOpen, togglePreviewDrawer }) {
  return (
    <div>
      <ContentHeader title="Messages">
        <button
          onClick={togglePreviewDrawer}
          className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
            previewOpen
              ? "bg-red-50 text-red-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Eye className="w-4 h-4 mr-1.5" />
          {previewOpen ? "Hide Preview" : "Show Preview"}
        </button>
      </ContentHeader>
      <p>This is the messages content.</p>
    </div>
  );
}

function SettingsContent({ previewOpen, togglePreviewDrawer }) {
  return (
    <div>
      <ContentHeader title="Settings">
        <button
          onClick={togglePreviewDrawer}
          className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
            previewOpen
              ? "bg-red-50 text-red-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Eye className="w-4 h-4 mr-1.5" />
          {previewOpen ? "Hide Preview" : "Show Preview"}
        </button>
      </ContentHeader>
      <p>This is the settings content.</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  // Sample data for preview
  const sampleCourse = {
    id: 1,
    title: "Professional Certificate in Photography",
    school: "School of Photography",
    price: 349.99,
    status: "published",
    tag: "POPULAR",
    tagColor: "bg-green-500",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=160&width=320",
    description:
      "Learn professional photography techniques from industry experts.",
    duration: "3 months",
    level: "Intermediate",
    instructor: "Jane Doe",
    enrolledStudents: 245,
    rating: 4.8,
    modules: [
      { title: "Introduction to DSLR", lessons: 5 },
      { title: "Lighting Techniques", lessons: 8 },
      { title: "Composition", lessons: 6 },
    ],
  };

  const sampleSchool = {
    id: 1,
    name: "School of Photography",
    description: "Professional photography education",
    status: "active",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=120&width=120",
    featuredImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=300&width=500",
    director: "Jane Doe",
    email: "photography@artschool.com",
    phone: "+234 123 456 7890",
    location: "Lagos, Nigeria",
    programs: 6,
    students: 450,
    courses: [
      "Professional Certificate in Photography",
      "Advanced Lighting Techniques",
      "Portrait Photography Masterclass",
    ],
    established: "2018",
  };

  const openPreview = (type, data) => {
    console.log("Opening preview for:", type, data);
    setPreviewType(type);
    setPreviewData(data);
    setPreviewOpen(true);
  };

  const togglePreviewDrawer = () => {
    if (previewOpen) {
      closePreview();
    } else {
      // If no preview is open, default to course preview with sample data
      openPreview(
        previewType || "course",
        previewData || (previewType === "school" ? sampleSchool : sampleCourse)
      );
    }
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setTimeout(() => {
      // Don't reset the type and data when closing
      // This allows the drawer to reopen with the same content
    }, 300); // Wait for animation to complete
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md z-20 ${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 ease-in-out flex-shrink-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link href="/admin" className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=40&width=40"
                alt="Logo"
                className="h-8 w-8"
              />
              {sidebarOpen && (
                <span className="ml-2 font-bold text-gray-800">
                  Admin Portal
                </span>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={sidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`flex items-center w-full px-3 py-2 rounded-md ${
                activeSection === "dashboard"
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Dashboard</span>}
            </button>

            <button
              onClick={() => setActiveSection("students")}
              className={`flex items-center w-full px-3 py-2 rounded-md ${
                activeSection === "students"
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Users className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Students</span>}
            </button>

            <button
              onClick={() => setActiveSection("courses")}
              className={`flex items-center w-full px-3 py-2 rounded-md ${
                activeSection === "courses"
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Layers className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Courses</span>}
            </button>

            <button
              onClick={() => setActiveSection("schools")}
              className={`flex items-center w-full px-3 py-2 rounded-md ${
                activeSection === "schools"
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 22V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v15" />
                <path d="M18 22H6" />
                <path d="M12 7v.01" />
                <path d="M12 11v.01" />
                <path d="M12 15v.01" />
                <path d="M12 19v.01" />
              </svg>
              {sidebarOpen && <span className="ml-3">Schools</span>}
            </button>

            <button
              onClick={() => setActiveSection("videos")}
              className={`flex items-center w-full px-3 py-2 rounded-md ${
                activeSection === "videos"
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Film className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Videos</span>}
            </button>

            <button
              onClick={() => setActiveSection("analytics")}
              className={`flex items-center w-full px-3 py-2 rounded-md ${
                activeSection === "analytics"
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Analytics</span>}
            </button>

            <button
              onClick={() => setActiveSection("calendar")}
              className={`flex items-center w-full px-3 py-2 rounded-md ${
                activeSection === "calendar"
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Calendar className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Calendar</span>}
            </button>

            <button
              onClick={() => setActiveSection("messages")}
              className={`flex items-center w-full px-3 py-2 rounded-md ${
                activeSection === "messages"
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              {sidebarOpen && (
                <div className="flex justify-between items-center w-full">
                  <span className="ml-3">Messages</span>
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    5
                  </span>
                </div>
              )}
              {!sidebarOpen && (
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full ml-1">
                  5
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveSection("settings")}
              className={`flex items-center w-full px-3 py-2 rounded-md ${
                activeSection === "settings"
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Settings className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Settings</span>}
            </button>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=40&width=40"
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
              {sidebarOpen && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">admin@artschool.com</p>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <button className="mt-4 flex items-center text-sm text-gray-600 hover:text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Preview Drawer Toggle Button */}
              <button
                onClick={togglePreviewDrawer}
                className={`relative p-2 rounded-md ${
                  previewOpen
                    ? "bg-red-50 text-red-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                } focus:outline-none transition-colors duration-200`}
                title={previewOpen ? "Close Preview" : "Open Preview"}
              >
                {previewOpen ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>

              <button className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=40&width=40"
                    alt="Admin"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="hidden md:block">
                    <span className="text-sm font-medium text-gray-800">
                      Admin User
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>Super Admin</span>
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {activeSection === "dashboard" && (
            <DashboardContent
              previewOpen={previewOpen}
              togglePreviewDrawer={togglePreviewDrawer}
            />
          )}
          {activeSection === "students" && (
            <StudentsContent
              previewOpen={previewOpen}
              togglePreviewDrawer={togglePreviewDrawer}
            />
          )}
          {activeSection === "courses" && (
            <CoursesContent
              openPreview={(data) => openPreview("course", data)}
              previewOpen={previewOpen}
              togglePreviewDrawer={togglePreviewDrawer}
            />
          )}
          {activeSection === "schools" && (
            <SchoolsContent
              openPreview={(data) => openPreview("school", data)}
              previewOpen={previewOpen}
              togglePreviewDrawer={togglePreviewDrawer}
            />
          )}
          {activeSection === "videos" && (
            <VideosContent
              previewOpen={previewOpen}
              togglePreviewDrawer={togglePreviewDrawer}
            />
          )}
          {activeSection === "analytics" && (
            <AnalyticsContent
              previewOpen={previewOpen}
              togglePreviewDrawer={togglePreviewDrawer}
            />
          )}
          {activeSection === "calendar" && (
            <CalendarContent
              previewOpen={previewOpen}
              togglePreviewDrawer={togglePreviewDrawer}
            />
          )}
          {activeSection === "messages" && (
            <MessagesContent
              previewOpen={previewOpen}
              togglePreviewDrawer={togglePreviewDrawer}
            />
          )}
          {activeSection === "settings" && (
            <SettingsContent
              previewOpen={previewOpen}
              togglePreviewDrawer={togglePreviewDrawer}
            />
          )}
        </main>
      </div>

      {/* Preview Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${
          previewOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {previewType === "course" ? "Course Preview" : "School Preview"}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  // Toggle between course and school preview
                  const newType =
                    previewType === "course" ? "school" : "course";
                  setPreviewType(newType);
                  setPreviewData(
                    newType === "course" ? sampleCourse : sampleSchool
                  );
                }}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
                title="Switch Preview Type"
              >
                {previewType === "course" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 22V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v15" />
                    <path d="M18 22H6" />
                    <path d="M12 7v.01" />
                    <path d="M12 11v.01" />
                    <path d="M12 15v.01" />
                    <path d="M12 19v.01" />
                  </svg>
                ) : (
                  <Layers className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={closePreview}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {previewType === "course" && previewData && (
              <CoursePreview course={previewData} />
            )}
            {previewType === "school" && previewData && (
              <SchoolPreview school={previewData} />
            )}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between">
              <button
                onClick={closePreview}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <Link
                href={
                  previewType === "course"
                    ? `/admin/courses/edit/${previewData?.id || 1}`
                    : `/admin/schools/edit/${previewData?.id || 1}`
                }
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed toggle button for preview drawer (visible on mobile) */}
      <button
        onClick={togglePreviewDrawer}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg md:hidden ${
          previewOpen ? "bg-red-600 text-white" : "bg-white text-gray-800"
        }`}
      >
        {previewOpen ? (
          <ChevronRight className="w-6 h-6" />
        ) : (
          <ChevronLeft className="w-6 h-6" />
        )}
      </button>

      {/* Overlay when drawer is open */}
      {previewOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={closePreview}
        ></div>
      )}
    </div>
  );
}

// ... existing code ...
