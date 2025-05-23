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
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Download,
  FileText,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import PrimaryButton from "../../../components/shared/PrimaryButton";
import SearchButton from "../../../components/shared/SearchInput";
import SelectDropDown from "../../../components/shared/SelectDropDown";
import StatusBadge from "../../../components/shared/StatusBadge";

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
  const [filters, setFilters] = useState("all");
  const { data, isLoading } = useMockCertificates();
  const navigate = useNavigate();

  // Filter certificates based on search term and filters
  const filteredCertificates = data?.certificates
    .filter(
      (cert) =>
        !searchTerm ||
        cert.program_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.program_type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((cert) => filters === "all" || cert.status === filters);

  const handleApplyFilters = (activeFilters) => {
    setFilters(activeFilters);
  };

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Certificates
            </h1>
            <p className="text-sm text-gray-500">
              Manage and issue certificates for your students
            </p>
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
        <div className="flex justify-end px-6 py-4">
          <PrimaryButton
            className="flex gap-2 cursor-pointer"
            type={"button"}
            onClick={() => {
              navigate("/admin/certificates/add");
            }}
          >
            <Plus />
            Add Certificate
          </PrimaryButton>
        </div>
      </header>

      <div className="p-6">
        <div className="bg-white rounded-md shadow">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">
              Certificates ({filteredCertificates?.length || 0})
            </h2>
            <div className="flex items-center gap-2 justify-end">
              <SearchButton onSearch={setSearchTerm} />
              <SelectDropDown
                className="w-fit"
                options={[
                  { value: "all", label: "All" },
                  { value: "issued", label: "Issued" },
                  { value: "draft", label: "Draft" },
                  { value: "revoked", label: "Revoked" },
                ]}
                onChange={handleApplyFilters}
              />
            </div>
          </div>

          <div className="p-4">
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredCertificates?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No certificates found
                    </TableCell>
                  </TableRow>
                ) : (
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
                        <StatusBadge status={certificate.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 justify-end">
                          <Download
                            size={18}
                            color="#667085"
                            className="cursor-pointer"
                            title="Download"
                          />
                          <Pencil
                            size={18}
                            color="#667085"
                            className="cursor-pointer"
                            title="Edit"
                            onClick={() =>
                              navigate(
                                `/admin/certificates/edit/${certificate.id}`
                              )
                            }
                          />
                          <Trash2
                            size={18}
                            color="#667085"
                            className="cursor-pointer"
                            title="Delete"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
