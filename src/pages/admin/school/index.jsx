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
              Schools ({schools?.data?.length || 0})
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
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : !schools?.schools?.length ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No schools found
                    </TableCell>
                  </TableRow>
                ) : (
                  schools?.schools?.map((school) => (
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
                      <TableCell>{school?.certificates?.length || 0}</TableCell>
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
                  ))
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
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                {selectedSchool?.name}
              </h1>
              <StatusBadge
                status={selectedSchool?.is_active ? "Active" : "Inactive"}
              />
            </div>

            <div className="space-y-6">
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
                  Certificates ({selectedSchool?.certificates?.length || 0})
                </h3>
                {selectedSchool?.certificates?.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="border rounded-lg p-4 mb-2"
                  >
                    <p className="font-medium text-gray-800">
                      {certificate.program_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Type: {certificate.program_type}
                    </p>
                    <p className="text-sm text-gray-600">
                      Duration: {certificate.duration} months
                    </p>
                    <p className="text-sm text-gray-600">
                      Issue Date:{" "}
                      {new Date(certificate.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Courses */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Courses ({selectedSchool?.courses?.length || 0})
                </h3>
                {selectedSchool?.courses?.length === 0 && (
                  <p className="text-gray-500">No courses available</p>
                )}
              </div>
            </div>
          </div>
        </RightModal>
      )}
    </div>
  );
}
