import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Download, FileText, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// This would be replaced with an actual API call
const useMockCertificates = () => {
  // Mock data
  const certificates = [
    {
      id: "cert-1",
      program_name: "Digital Media Production",
      program_type: "Certificate",
      duration: 6,
      userId: "student-1",
      student: "John Doe",
      courseId: "course-1",
      courseTitle: "Advanced Digital Media",
      createdAt: "2023-05-15",
      status: "issued",
    },
    {
      id: "cert-2",
      program_name: "Web Development Fundamentals",
      program_type: "Diploma",
      duration: 12,
      userId: "student-2",
      student: "Jane Smith",
      courseId: "course-2",
      courseTitle: "Frontend Development Bootcamp",
      createdAt: "2023-06-22",
      status: "issued",
    },
    {
      id: "cert-3",
      program_name: "Audio Engineering",
      program_type: "Professional Development",
      duration: 3,
      userId: "student-3",
      student: "Mike Johnson",
      courseId: "course-3",
      courseTitle: "Professional Audio Production",
      createdAt: "2023-07-10",
      status: "draft",
    },
    {
      id: "cert-4",
      program_name: "Video Editing Masterclass",
      program_type: "Short Course",
      duration: 2,
      userId: "student-4",
      student: "Sarah Williams",
      courseId: "course-4",
      courseTitle: "Professional Video Editing",
      createdAt: "2023-08-05",
      status: "issued",
    },
    {
      id: "cert-5",
      program_name: "Photography Essentials",
      program_type: "Skill Enhancement",
      duration: 1,
      userId: "student-5",
      student: "David Brown",
      courseId: "course-5",
      courseTitle: "Digital Photography Course",
      createdAt: "2023-09-18",
      status: "revoked",
    },
  ];

  return {
    data: {
      certificates,
    },
    isLoading: false,
  };
};

export default function Certificates() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useMockCertificates();

  // Filter certificates based on search term
  const filteredCertificates = !searchTerm
    ? data?.certificates
    : data?.certificates.filter(
        (cert) =>
          cert.program_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.program_type.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Certificates</h1>
          <p className="text-sm text-gray-500">
            Manage and issue certificates for your students
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/certificates/add" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Certificate
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">All Certificates</h2>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search certificates..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="p-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead>Program Type</TableHead>
                <TableHead>Duration (months)</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates && filteredCertificates.length > 0 ? (
                filteredCertificates.map((certificate) => (
                  <TableRow key={certificate.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                        {certificate.program_name}
                      </div>
                    </TableCell>
                    <TableCell>{certificate.program_type}</TableCell>
                    <TableCell>{certificate.duration}</TableCell>
                    <TableCell>{certificate.student}</TableCell>
                    <TableCell>{certificate.courseTitle}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          certificate.status === "issued"
                            ? "bg-green-100 text-green-800"
                            : certificate.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {certificate.status.charAt(0).toUpperCase() +
                          certificate.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Edit"
                          asChild
                        >
                          <Link
                            to={`/admin/certificates/edit/${certificate.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No certificates found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
