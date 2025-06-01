import { useParams, useNavigate } from "react-router-dom";

import { ArrowLeft, Mail, Phone, MapPin, Calendar, User } from "lucide-react";
import { useAdminStudentById } from "@/hooks/admin/student.hook";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton Components
const PersonalInfoSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <Skeleton className="h-6 w-48 mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-start">
          <Skeleton className="w-5 h-5 mr-3 mt-1" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TableSkeleton = ({ rows = 3 }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <Skeleton className="h-6 w-48 mb-4" />
    <div className="space-y-4">
      <div className="flex gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4">
          {[...Array(4)].map((_, j) => (
            <Skeleton key={j} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const StatsSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <Skeleton className="h-6 w-32 mb-4" />
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i}>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  </div>
);

const CertificatesSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <Skeleton className="h-6 w-48 mb-4" />
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-40" />
        </div>
      ))}
    </div>
  </div>
);

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useAdminStudentById(id);
  const student = data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <PersonalInfoSkeleton />
              <TableSkeleton />
              <TableSkeleton />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <StatsSkeleton />
              <CertificatesSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateTotalSpent = () => {
    return (
      student.Payment?.reduce((total, payment) => total + payment.amount, 0) ||
      0
    );
  };

  const calculateAverageProgress = () => {
    if (!student.enrollments?.length) return 0;
    const total = student.enrollments.reduce(
      (sum, enrollment) => sum + enrollment.progress,
      0
    );
    return Math.round(total / student.enrollments.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Students
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {student.firstName} {student.lastName}
              </h1>
              <p className="text-gray-500">Student Details</p>
            </div>
            <StatusBadge status={student.is_blocked ? "Blocked" : "Active"} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="text-gray-900">{student.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900">{student.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="text-gray-900">
                      {formatDate(student.dateOfBirth)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="text-gray-900 capitalize">{student.gender}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900">
                      {student.state}, {student.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enrollments Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Enrollments ({student.enrollments?.length || 0})
              </h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Enrolled Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.enrollments?.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell>{enrollment.courseId}</TableCell>
                        <TableCell>
                          <StatusBadge status={enrollment.status} />
                        </TableCell>
                        <TableCell>{enrollment.progress}%</TableCell>
                        <TableCell>
                          {formatDate(enrollment.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Payments Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Payment History
              </h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.Payment?.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{payment.currency}</TableCell>
                        <TableCell>
                          <StatusBadge status={payment.status} />
                        </TableCell>
                        <TableCell>{formatDate(payment.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Right Column - Stats and Certificates */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Statistics
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Total Courses</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {student.enrollments?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Certificates Earned</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {student.certificates?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Progress</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {calculateAverageProgress()}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {calculateTotalSpent()} NGN
                  </p>
                </div>
              </div>
            </div>

            {/* Certificates Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Certificates ({student.certificates?.length || 0})
              </h2>
              <div className="space-y-4">
                {student.certificates?.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <p className="font-medium text-gray-900">
                      Certificate #{certificate.id.slice(-6)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Issued on {formatDate(certificate.issueDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
