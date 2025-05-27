import { useState } from "react";
import {
  Download,
  Edit,
  Lock,
  Share2,
  BookOpen,
  Award,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useGetEnrollment } from "../hooks/useEnrollment.hook";
import { EnrollmentStatus } from "../constant/enrollmentEnum";
import StatusBadge from "../components/shared/StatusBadge";
import PrimaryLink from "../components/shared/PrimaryLink";
import StudentNavBar from "../components/StudentNavBar";
import PrimaryButton from "../components/shared/PrimaryButton";
import { usePaystackPayment } from "react-paystack";
import { useQueryClient } from "@tanstack/react-query";
import Certificate from "../components/Certificate";

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
  const [activeTab, setActiveTab] = useState("enrolled");
  const { user } = useAuth();
  const { data, isLoading } = useGetEnrollment();
  const enrollments = data?.enrollments;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const totalProgress =
    enrollments?.reduce((acc, curr) => acc + (curr.progress || 0), 0) /
    (enrollments?.length || 1);
  const completedCourses =
    enrollments?.filter((e) => e.progress === 100).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Welcome back, {user.firstName}! 👋
          </h1>
          <p className="text-red-100 text-sm sm:text-base">
            Continue your learning journey today
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Courses Enrolled</p>
                <p className="text-xl font-semibold text-gray-900">
                  {enrollments?.length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-semibold text-gray-900">
                  {completedCourses}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Average Progress</p>
                <p className="text-xl font-semibold text-gray-900">
                  {Math.round(totalProgress)}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="text-xl font-semibold text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("enrolled")}
                  className={`flex-1 px-4 py-3 text-sm font-medium ${
                    activeTab === "enrolled"
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  My Courses
                </button>
                <button
                  onClick={() => setActiveTab("certificates")}
                  className={`flex-1 px-4 py-3 text-sm font-medium ${
                    activeTab === "certificates"
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Certificates
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === "enrolled" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    My Learning Journey
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {enrollments?.map((enrollment) => (
                      <div
                        key={enrollment.id}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="aspect-video w-full bg-gray-100 relative">
                          <img
                            src={enrollment.course.image || "/pick.png"}
                            alt={enrollment.course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                              <div
                                className="bg-red-600 h-1.5 rounded-full"
                                style={{ width: `${enrollment.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-white text-sm">
                              {enrollment.progress}% Complete
                            </p>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-800 mb-2">
                            {enrollment.course.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 mb-4">
                            <BookOpen className="w-4 h-4 mr-2" />
                            <span>
                              {enrollment.course._count.sections} Modules
                            </span>
                            <span className="mx-2">•</span>
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{enrollment.course.duration}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <StatusBadge status={enrollment.status} />
                            <LinkOrButtonToShow status={enrollment} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates Tab */}
              {activeTab === "certificates" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    My Certificates
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Certificate />
                    {/* {enrollments
                      ?.filter((e) => e.progress === 100)
                      .map((enrollment) => (
                        <Certificate
                          key={enrollment.id}
                          recipientName={`${user.firstName} ${user.lastName}`}
                          courseName={enrollment.course.title}
                          completionDate={new Date(
                            enrollment.updatedAt
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          instructorName={
                            enrollment.course.instructor?.name ||
                            "Course Instructor"
                          }
                        />
                      ))} */}
                    {/* {enrollments?.filter((e) => e.progress === 100).length ===
                      0 && (
                      <div className="col-span-2 text-center py-12">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Award className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No Certificates Yet
                        </h3>
                        <p className="text-gray-600">
                          Complete your courses to earn certificates
                        </p>
                      </div>
                    )} */}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {enrollments?.[0]?.course?.level || "No Level"}
                  </p>
                </div>
              </div>
              <Link
                to="/edit-profile"
                className="flex items-center justify-center w-full px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <Edit className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-gray-700">Edit Profile</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <Download className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-gray-700">
                        Download Certificates
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <Lock className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-gray-700">Privacy Settings</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Achievements</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">Top 10% Student</p>
                    <p className="text-sm text-gray-600">
                      Photography Excellence
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Award className="w-4 h-4" />
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
    </div>
  );
}

function LinkOrButtonToShow({ status }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const config = {
    reference: `${new Date().getTime()}-${status.course.id}`,
    email: user.email,
    amount: status.course.price * 100,
    publicKey: "pk_test_37335d37c9fb118d8a917de0a58a8efde1bb96c4",
    metadata: {
      courseId: status.course.id,
      userId: status.user.id,
      enrollmentId: status.id,
    },
  };
  const initializePayment = usePaystackPayment(config);
  const onSuccess = (reference) => {
    queryClient.invalidateQueries({
      queryKey: ["enrollments"],
    });
    queryClient.invalidateQueries({
      queryKey: ["enrollment"],
    });
  };
  const onClose = () => {
    console.log("closed");
  };
  if (status.status === EnrollmentStatus.PENDING) {
    return <StatusBadge status={status.status} />;
  }
  if (status.status === EnrollmentStatus.APPROVED) {
    return (
      <PrimaryButton
        onClick={() => initializePayment(onSuccess, onClose)}
        className="text-white bg-red-500 font-medium text-xs sm:text-sm flex items-center cursor-pointer"
      >
        Pay Now
      </PrimaryButton>
    );
  }
  if (status.status === EnrollmentStatus.REJECTED) {
    return <StatusBadge status={status.status} />;
  }

  return (
    <PrimaryLink
      to={`/lesson/${status.id}`}
      className="text-red-600 font-medium text-xs sm:text-sm flex items-center cursor-pointer"
    >
      Watch Lesson
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 sm:h-4 sm:w-4 ml-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </PrimaryLink>
  );
}
