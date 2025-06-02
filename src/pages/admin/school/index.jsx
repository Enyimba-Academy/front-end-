import { Bell, Plus, Eye, Trash2, Edit2 } from "lucide-react";
import PrimaryButton from "../../../components/shared/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetSchools,
  useDeleteSchool,
} from "../../../hooks/admin/school.hook";
import { useState } from "react";
import StatusBadge from "../../../components/shared/StatusBadge";
import RightModal from "../../../components/shared/RightModal";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../components/ui/table";
import RejectionModal from "../../../components/shared/RejectionModal";
import { ImageUrl } from "@/api/api";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function School() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [status, setStatus] = useState(false);

  const { schools, isLoading } = useGetSchools({
    page: "1",
    limit: "10",
    search: searchQuery,
    sortBy,
    sortOrder,
    status,
  });

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { deleteSchool, isLoading: isDeleting } = useDeleteSchool();

  const navigate = useNavigate();

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">School</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>
        </div>
        <div className="flex justify-end px-6 py-4">
          <PrimaryButton
            className="flex gap-2 cursor-pointer"
            type={"button"}
            onClick={() => {
              navigate("/admin/add-school");
            }}
          >
            <Plus />
            Add School
          </PrimaryButton>
        </div>
      </header>
      <div className="p-6">
        <div className="bg-white rounded-md shadow">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">
              Schools ({schools?.total || 0})
            </h2>
            <div className="flex items-center gap-2 justify-end">
              <Input
                type="text"
                placeholder="Search schools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Created At</SelectItem>
                  <SelectItem value="updatedAt">Updated At</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={false}>Active</SelectItem>
                  <SelectItem value={true}>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>No of Course</TableHead>
                  <TableHead>No of Certificates</TableHead>
                  <TableHead>Total Enrollments</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : !schools?.schools?.length ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No schools found
                    </TableCell>
                  </TableRow>
                ) : (
                  schools?.schools?.map((school) => {
                    // Calculate total certificates and enrollments
                    const totalCertificates = school.courses.reduce(
                      (acc, course) => {
                        return (
                          acc +
                          course.enrollments.reduce((certAcc, enrollment) => {
                            return (
                              certAcc + (enrollment.Certificate?.length || 0)
                            );
                          }, 0)
                        );
                      },
                      0
                    );

                    const totalEnrollments = school.courses.reduce(
                      (acc, course) => {
                        return acc + course.enrollments.length;
                      },
                      0
                    );

                    return (
                      <TableRow key={school.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded bg-gray-200 mr-3 overflow-hidden flex items-center justify-center">
                              {school?.logo ? (
                                <img
                                  src={
                                    school?.logo
                                      ? `${ImageUrl}${school?.logo}`
                                      : "/pick4.png"
                                  }
                                  alt={school.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="text-gray-600 text-lg font-medium">
                                  {school?.name?.charAt(0)?.toUpperCase()}
                                </span>
                              )}
                            </div>
                            <span>{school?.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge
                            status={school?.is_deleted ? "Inactive" : "Active"}
                          />
                        </TableCell>
                        <TableCell>{school?.courses?.length || 0}</TableCell>
                        <TableCell>{totalCertificates}</TableCell>
                        <TableCell>{totalEnrollments}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link to={`/admin/add-school/${school?.id}`}>
                              <Edit2
                                size={18}
                                color="#667085"
                                className="cursor-pointer"
                              />
                            </Link>
                            <Trash2
                              size={18}
                              color="#667085"
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedSchool(school);
                                setIsDeleteModalOpen(true);
                              }}
                            />
                            <Eye
                              size={18}
                              color="#667085"
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedSchool(school);
                                setIsViewModalOpen(true);
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && selectedSchool && (
        <RejectionModal
          isOpen={isDeleteModalOpen}
          toggleModal={() => setIsDeleteModalOpen(false)}
          handleReject={() =>
            deleteSchool(selectedSchool?.id, {
              onSuccess: () => {
                setIsDeleteModalOpen(false);
              },
            })
          }
          handleCancel={() => setIsDeleteModalOpen(false)}
          title="Delete School"
          message="Are you sure you want to delete this school?"
          isLoading={isDeleting}
          buttonText="Yes, Delete"
        />
      )}

      {isViewModalOpen && selectedSchool && (
        <RightModal
          toggleModal={() => setIsViewModalOpen(false)}
          isOpen={isViewModalOpen}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                {selectedSchool?.name}
              </h1>
              <StatusBadge
                status={selectedSchool?.is_active ? "ACTIVE" : "INACTIVE"}
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* School Images */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Logo
                    </h3>
                    <div className="w-32 h-32 border rounded-lg overflow-hidden">
                      {selectedSchool?.logo ? (
                        <img
                          src={`${ImageUrl}${selectedSchool?.logo}`}
                          alt="School Logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 text-2xl font-medium">
                            {selectedSchool?.name?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Cover Image
                    </h3>
                    <div className="w-full h-32 border rounded-lg overflow-hidden">
                      {selectedSchool?.coverImage ? (
                        <img
                          src={`${ImageUrl}${selectedSchool?.coverImage}`}
                          alt="School Cover"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">
                            No cover image available
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700">{selectedSchool?.description}</p>
                </div>

                {/* School Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Created At
                    </h3>
                    <p className="text-gray-700">
                      {new Date(selectedSchool?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Updated At
                    </h3>
                    <p className="text-gray-700">
                      {new Date(selectedSchool?.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Slug
                    </h3>
                    <p className="text-gray-700">{selectedSchool?.slug}</p>
                  </div>
                </div>

                {/* Certificates */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Certificates
                  </h3>
                  <div className="space-y-4">
                    {selectedSchool?.courses?.map((course) => {
                      const courseCertificates = course.enrollments.reduce(
                        (acc, enrollment) => {
                          return acc + (enrollment.Certificate?.length || 0);
                        },
                        0
                      );

                      if (courseCertificates === 0) return null;

                      return (
                        <div key={course.id} className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">
                            {course.title}
                          </h4>
                          <div className="space-y-2">
                            {course.enrollments.map((enrollment) =>
                              enrollment.Certificate?.map((certificate) => (
                                <div
                                  key={certificate.id}
                                  className="bg-gray-50 p-3 rounded"
                                >
                                  <p className="text-sm text-gray-600">
                                    Certificate ID: {certificate.id}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Issue Date:{" "}
                                    {new Date(
                                      certificate.issueDate
                                    ).toLocaleDateString()}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    User ID: {certificate.userId}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Enrollment ID: {certificate.enrollmentId}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Courses */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Courses ({selectedSchool?.courses?.length || 0})
                  </h3>
                  <div className="space-y-4">
                    {selectedSchool?.courses?.map((course) => (
                      <div key={course.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {course.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {course.description}
                            </p>
                          </div>
                          <StatusBadge status={course.status} />
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Price</p>
                            <p className="text-sm font-medium">
                              ₦{course.price.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Level</p>
                            <p className="text-sm font-medium">
                              {course.level || "Not specified"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Enrollments</p>
                            <p className="text-sm font-medium">
                              {course.enrollments.length}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Certificates Issued
                            </p>
                            <p className="text-sm font-medium">
                              {course.enrollments.reduce(
                                (acc, enrollment) =>
                                  acc + (enrollment.Certificate?.length || 0),
                                0
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RightModal>
      )}
    </div>
  );
}
